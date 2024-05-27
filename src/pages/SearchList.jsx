import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const SearchList = () => {
  const { word } = useParams();
  const [articles, setArticles] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/articles');
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
  
    fetchArticles(); 
  }, []); 
  
  useEffect(() => {
    const filterArticles = () => {
      if (word.trim() === '') {
        setResults([])
      }else{
        const wordLower = word.toLowerCase()
        const filtered = articles.filter((article) => {
          const articleText = (article.nom + ' ' + article.contenu).toLowerCase()
          return articleText.includes(wordLower)
        })
        setResults(filtered)
      }
    }
    filterArticles()
  }, [word, articles])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar link="articles" />
      <div className="flex-grow overflow-auto py-4 px-4 md:px-8">
        {results.length > 0 ? (
          <div className="w-full flex flex-col items-center">
            {results.map((item, i) => (
              <div key={i} className="sm:w-[50%] w-full md:w-[70%] mx-auto flex flex-col items-center justify-center space-x-6 mb-3 py-2 px-3 rounded-md">
                <div className="flex flex-row items-center w-full space-x-3">
                  <button type="button" className="text-blue-500 font-semibold text-sm sm:text-md hover:underline hover:text-blue-400">
                    {`Articles ${item.numero} :`}
                  </button>
                  <div className="text-sm sm:text-md font-semibold">{item.nom}</div>
                </div>
                <div
                  className="text-xs sm:text-sm" style={{display: '-webkit-box',WebkitLineClamp: 2,WebkitBoxOrient: 'vertical',overflow: 'hidden',}}>
                  {item.contenu}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 mt-2">Aucun article trouvé pour le mot "{word}".</div>
        )}
      </div>
    </div>
  );
};

export default SearchList;