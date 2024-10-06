const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dontenv=require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());

const API_KEY_YOUTUBE = process.env.API_KEY_YOUTUBE;
const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;
const API_KEY_CUSTOM_SEARCH = process.env.API_KEY_CUSTOM_SEARCH;

const fetchYouTubeVideos = async (query) => {
  const maxResults = 10;
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=${maxResults}&key=${API_KEY_YOUTUBE}`;

  try {
    const searchResponse = await axios.get(searchUrl);

    const videoIds = searchResponse.data.items.map(video => video.id.videoId).join(',');
    if (!videoIds) {
      return [];
    }

    const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${API_KEY_YOUTUBE}`;
    const statsResponse = await axios.get(statsUrl);

    const videos = searchResponse.data.items.map((video, index) => ({
      title: video.snippet.title,
      description: video.snippet.description,
      videoId: video.id.videoId,
      thumbnail: video.snippet.thumbnails.default.url,
      views: statsResponse.data.items[index]?.statistics?.viewCount || 'N/A',
      likes: statsResponse.data.items[index]?.statistics?.likeCount || 'N/A',
    }));

    return videos;
  } catch (error) {
    console.error('Error fetching YouTube videos and statistics', error);
    return [];
  }
};

const fetchArticlesAndBlogs = async (query) => {
  const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${SEARCH_ENGINE_ID}&key=${API_KEY_CUSTOM_SEARCH}`;
  try {
    const response = await axios.get(url);
    const articles = response.data.items.map((item) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
    }));
    return articles.slice(0, 6);
  } catch (error) {
    console.error('Error', error);
    return [];
  }
};

const fetchAcademicPapers = async (query) => {
  try {
    const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${query}&retmode=json&retmax=5`;
    const searchResponse = await axios.get(searchUrl);
    const ids = searchResponse.data.esearchresult.idlist.join(',');

    if (!ids) {
      console.log('No IDs found.');
      return [];
    }

    const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids}&retmode=json`;
    const summaryResponse = await axios.get(summaryUrl);

    const papers = Object.values(summaryResponse.data.result)
      .filter(paper => paper.uid)
      .map(paper => ({
        title: paper.title,
        snippet: paper.source,
        summary: paper.title.split('. ').slice(0, 2).join('. ') + '.',
        link: `https://pubmed.ncbi.nlm.nih.gov/${paper.uid}/`,
      }));

    return papers;
  } catch (error) {
    console.error('Error fetching PubMed papers:', error.response?.data || error.message);
    return [];
  }
};


app.post('/search', async (req, res) => {
  const searchTerm = req.body.search;
  try {
    const videos = await fetchYouTubeVideos(searchTerm);
    const articles = await fetchArticlesAndBlogs(searchTerm);
    const papers = await fetchAcademicPapers(searchTerm); 
    res.json({ videos, articles,papers });
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
