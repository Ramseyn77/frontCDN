import {React,useEffect, useState} from 'react'
import CardH from './CardH'
import CardT from './CardT'
import CardC from './CardC'
import {fetchData} from '../api'
import { useNavigate } from 'react-router-dom'

const ArticlesPart = () => {
  const [activLink, setActivLink] = useState('livre')
  const [livres, setLivres] = useState([])
  const [chapitres, setChapitres] = useState([])
  const [titres, setTitres] = useState([])
  const navigate = useNavigate()
  const [value, setValue] = useState()

  useEffect(  () => {
    fetchLivres()
  },[])

  const fetchLivres = async () => {
    try {
      const result = await fetchData('/api/livres');
      setLivres(result.livres); 
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchTitres = async () => {
    try {
      const result = await fetchData('/api/titres');
      setTitres(result.titres);
    } catch (error) {
      console.error('Error fetching titles:', error);
    }
  };

  const fetchChapitres = async () => {
    try {
      const log = await fetchData('/api/chapitres');
      setChapitres(log.chapitres);
    } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  }

  const handleClickL = async () => {
    setActivLink('livre')
    fetchLivres()
  }

  const handleClickT = async () => {
    setActivLink('titre')
    fetchTitres()
  }

  const handleClickC = async () => {
    setActivLink('chapitre')
    fetchChapitres()
  }

  const handleCardClick = async (livreId) => {
    try {
      setActivLink('titre')
      const result = await fetchData(`/api/livres/${livreId}/titres`)
      setTitres(result.titres)
    } catch (error) {
      console.error('Error for titles :', error)
    }
  }

  const handleCardClickT = async (titreId) => {
      try {
        const result = await fetchData(`/api/titres/${titreId}/chapitres`)
        const chapitres = result.chapitres
        if (chapitres.length === 0) {
          navigate('/articles/titre/'+titreId)
        }
        setActivLink('chapitre')
        setChapitres(result.chapitres)
      } catch (error) {
        console.error('Problem with chapiter',error)
      }
    }

  const handleCardClickC = async (chapitreId) => {
    try {
      const result = await fetchData(`/api/chapitres/${chapitreId}/articles`)
      navigate('/articles/chapitre/'+chapitreId)
    } catch (error) {
      console.error('Problem with chapiter',error)
    }
  }

  const filterWords = (type, word) => {
      const searchTerm = word.toLowerCase();
      if (type === 'titre') {
        const results = titres.filter((item) => {
          return item.nom.toLowerCase().indexOf(searchTerm) !== -1;
        });
        setTitres(results);
      } else {
        const results = chapitres.filter((item) => {
          return item.nom.toLowerCase().indexOf(searchTerm) !== -1;
        });
        setChapitres(results);
      }
    };
    

  const search = (e) => {
    setValue(e.target.value)
    const searchItem = e.target.value
    if(activLink === 'titre'){
      filterWords('titre',searchItem)
    }else {
      filterWords('chapitre',searchItem)
    }
  }

  return (
    <div className='sm:w-[75%] w-[70%] h-auto md:h-[100%] p-4 border-r-2 border-gray-300 '>
      <div className="flex flex-row items-center justify-between p-2 px-2 sm:px-6 mb-2">
        <button
        type="button"
        onClick={handleClickL}
        className={`" text-sm sm:text-md py-1 px-2 sm:px-6  items-center justify-center ${activLink === 'livre' ? ' items-center justify-center bg-gray-400 py-1 text-white font-semibold px-2 sm:px-6 rounded-md border-none' : ''} font-semibold rounded-sm"`}
        >
            Livres
        </button>

        <button type="button"
        onClick={handleClickT}
        className={`" text-sm sm:text-md  py-1 px-2 sm:px-6 items-center justify-center ${activLink === 'titre' ? ' items-center justify-center bg-gray-400 py-1 text-white font-semibold px-2 sm:px-6  rounded-md border-none' : ''} font-semibold rounded-sm"`}
        >
            Titres
        </button>
        <button type="button"
        onClick={handleClickC}
        className={`" text-sm sm:text-md  py-1 px-2 sm:px-6  items-center justify-center ${activLink === 'chapitre' ? ' items-center justify-center bg-gray-400 py-1 text-white font-semibold px-2 sm:px-6 rounded-md border-none' : ''} font-semibold rounded-sm "`}
        >
            Chapitres
        </button>
      </div>
      <div className='w-full flex flex-col items-center'>
      { activLink === 'titre' || activLink === 'chapitre' ?
            (<input
              name="search"
              value={value}
              onChange={(e) => search(e)}
              placeholder={`${activLink === 'titre' ? "Rechercher un titre..." : "Rechercher un chapitre..."} `}
              className="w-[80%] sm:w-[60%] flex-grow outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-3 py-2 sm:text-base md:text-sm"
            />
            ) : <div></div>
      }
      </div>

      <div className="w-full flex flex-col space-y-4 px-6 py-3 items-center justify-center mt-6 h-auto">
          <div className='w-full flex flex-col items-center overflow-y-auto max-h-[60vh] lg:max-h-[70vh] md:max-h-[80vh]'>
            { activLink === 'livre' &&
              ( 
                livres.map((item, i) => {
                  return (
                    <CardH key={i} number={item.id} name={item.nom} onClick={() => handleCardClick(item.id)} />
                  )
                })
              )
            }

            { activLink === 'titre' && 
              ( 
                titres.length > 0 ? (
                  titres.map((item, i) => {
                    return (
                      <CardT key={i} number={item.id} name={item.nom}  onClick={() => handleCardClickT(item.id)} />
                    )
                  })
                ) : (
                  <div className="mt-40 text-gray-500 mt-2 mx-auto flex flex-col items-center justify-center sm:w-[50%] w-full md:w-[70%]">Aucun Titre trouvé pour cet Livre.</div>
                )
              )
            }

            { activLink === 'chapitre' && 
              ( 
                chapitres.map((item, i) => {
                  return  (
                    <CardC key={i} number={item.numero} name={item.nom} onClick={() =>  handleCardClickC(item.id)} />
                  )
                })
              )
            }


          </div>
      </div>
    </div>
  )
}

export default ArticlesPart
