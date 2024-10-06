import React, { useState } from 'react';
import { FcSearch } from "react-icons/fc";
import axios from 'axios';
import VideoCard from './VideoCard';
import ArticleCard from './ArticleCard';
import PaperCard from './PaperCard';

const Search = () => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const SearchTerm = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3000/search', { search });
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch data");
      setData(null);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      SearchTerm();
    }
  };

  return (
    <div className='mt-12 w-full h-auto flex flex-col items-center'>
      <form onSubmit={handleSubmit} className='relative flex flex-row items-center w-full lg:w-2/3 bg-white shadow-md rounded-lg'>
        <FcSearch className='absolute left-4 text-2xl' />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='p-4 pl-12 w-full border-none focus:ring-2 focus:ring-blue-400'
          placeholder='Search'/>
        <button type='submit' className='bg-white text-black font-semibold rounded-lg p-4 w-40 hover:bg-grey-600 transition duration-300'>
          Search
        </button>
      </form>

      <div className="mt-8 px-8 lg:px-16 w-full">
        {loading && <p className="text-center text-white font-bold">Loading...</p>}
        {error && <p className="text-center text-red-500 font-semibold">{error}</p>}
        {data && (
          <>
            <div className="flex justify-center mb-6">
              <button onClick={() => setActiveTab(0)} 
              className={`mx-2 p-2 font-semibold ${activeTab === 0 ? 'text-black-700 border-b-2 border-blue-700' : 'text-gray-500'}`}>
                Videos
              </button>
              <button onClick={() => setActiveTab(1)} 
              className={`mx-2 p-2 font-semibold ${activeTab === 1 ? 'text-black-700 border-b-2 border-blue-700' : 'text-gray-500'}`}>
                Articles
              </button>
              <button onClick={() => setActiveTab(2)} 
              className={`mx-2 p-2 font-semibold ${activeTab === 2 ? 'text-black-700 border-b-2 border-blue-700' : 'text-gray-500'}`}>
                Academic Papers
              </button>
            </div>

            {activeTab === 0 && <VideoCard videos={data.videos} />}
            {activeTab === 1 && <ArticleCard articles={data.articles} />}
            {activeTab === 2 && <PaperCard papers={data.papers} />}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
