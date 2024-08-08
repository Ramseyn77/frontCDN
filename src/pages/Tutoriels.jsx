import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { ChevronUp, ChevronDown } from 'lucide-react';

const Tutoriels = () => {
  const [tutoriels, setTutoriels] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]); 
  const [word, setWord] = useState(null);
  const [showDetails, setShowDetails] = useState([]); 

  useEffect(() => {
    fetchRessources();
  }, []);

  const handleShow = (id) => {
    const updatedShowDetails = [...showDetails]; 
    updatedShowDetails[id] = !updatedShowDetails[id]; 
    setShowDetails(updatedShowDetails);
  };

  const handleChange = (e) => {
    setWord(e.target.value);
    filterRessources(word);
  };

  const fetchRessources = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tutoriels');
      setTutoriels(response.data.tutoriels);
      setFilteredResults(response.data.tutoriels); 
    } catch (error) {
      console.log('Error');
    }
  };

  const filterRessources = async (word) => {
    if (word === null) {
      setFilteredResults(tutoriels);
      return; 
    }

    const wordLower = word.toLowerCase();
    const filtered = tutoriels.filter((tuto) =>
      tuto.titre.toLowerCase().includes(wordLower)
    );
    setFilteredResults(filtered);
  };

  return (
    <div className='flex flex-col'>
      <Navbar link={'tutoriel'} />
      <div className="flex-grow overflow-auto py-4 px-4 md:px-8 h-[80vh] ">
        <div className="flex flex-col items-center justify-center w-full mb-6 ">
          <input
            name="word"
            value={word}
            onChange={handleChange}
            placeholder="Recherche..."
            className="w-full sm:w-[90vh] flex-grow outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3 sm:text-base md:text-sm"
          />
        </div>
        {filteredResults.length > 0 ? (
          <div className="w-full flex flex-col items-center">
            {filteredResults.map((item, i) => (
              <div key={i} className='flex flex-col mb-3'>
                <button
                  onClick={() => handleShow(i)}
                  className={`flex flex-row items-center justify-between gap-6 rounded-lg w-full py-3 px-4 bg-gray-200 `}
                >
                  {item.titre}
                  {showDetails[i] ? ( 
                    <ChevronUp className='h-6 w-6 inline font-foreground items-end' />
                  ) : (
                    <ChevronDown className='h-6 w-6 inline font-foreground items-end' />
                  )}
                </button>
                {showDetails[i] && ( 
                  <div className="w-full sm:w-[90vh] flex flex-col items-center justify-center py-2 px-4 ">
                    {item.contenu}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-40 text-gray-500 mt-2 mx-auto flex flex-col items-center justify-center sm:w-[50%] w-full md:w-[70%]">Aucun tutoriels enregistrer.</div>
        )}
      </div>
    </div>
)}
export default Tutoriels
