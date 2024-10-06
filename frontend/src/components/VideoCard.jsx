import React, { useState } from 'react';

const VideoCard = ({ videos }) => {
  const [sortedVideos, setSortedVideos] = useState(videos);
  const [sortOption, setSortOption] = useState('likes');

  const handleSort = (e) => {
    const option = e.target.value;
    setSortOption(option);

    const sorted = [...videos];
    if (option === 'views') {
      sorted.sort((a, b) => b.views - a.views);
    } else if (option === 'likes') {
      sorted.sort((a, b) => b.likes - a.likes);
    }
    setSortedVideos(sorted);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="mr-2 font-semibold text-black">Sort by:</label>
        <select
          value={sortOption}
          onChange={handleSort}
          className="p-2 border rounded-lg p-2 text-black"
        >
          <option value="views">Views</option>
          <option value="likes">Likes</option>
        </select>
      </div>
      <div className="flex flex-wrap -mx-2">
        {sortedVideos && sortedVideos.length > 0 ? (
          sortedVideos.map(video => (
            <div key={video.videoId} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-6"> 
              <div className="bg-white shadow-lg rounded-lg p-4 h-full flex flex-col">
                <h3 className="font-bold text-lg text-black mb-2">{video.title}</h3>
                <div className="w-full h-40 overflow-hidden mb-4">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover rounded-lg"/>
                </div>
                <p className="text-black flex-grow">{video.description}</p>
                <p className="text-black">Views: {video.views}</p>
                <p className="text-black mb-2">Likes: {video.likes}</p>
                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  className="text-blue-500 hover:underline mt-auto">
                  Watch Video
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-red-700">No videos available</p>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
