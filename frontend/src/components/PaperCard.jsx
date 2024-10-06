import React from 'react';

const PaperCard = ({ papers }) => {
  return (
    <div>
      {papers && papers.length > 0 ? (
        papers.map(paper => (
          <div key={paper.link} className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h3 className="font-bold text-lg text-black mb-4">{paper.title}</h3>
            <p className="text-black mb-2">{paper.snippet}</p>
            <p className="italic text-black mb-4">{paper.summary}</p>
            <a href={paper.link} className="text-blue-700 hover:underline">
              Read Paper
            </a>
          </div>
        ))
      ) : (
        <p className="text-black">No academic papers available</p>
      )}
    </div>
  );
};

export default PaperCard;
