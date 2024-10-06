import React from 'react';

const ArticleCard = ({ articles }) => {
  return (
    <div>
      {articles && articles.length > 0 ? (
        articles.map(article => (
          <div key={article.link} className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h3 className="font-bold text-lg text-black mb-4">{article.title}</h3>
            <p className="text-black mb-4">{article.snippet}</p>
            <a href={article.link} className="text-blue-500 hover:underline">
              Read Article
            </a>
          </div>
        ))
      ) : (
        <p className="text-red-700">No articles available</p>
      )}
    </div>
  );
};

export default ArticleCard;
