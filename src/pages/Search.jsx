import {React,useState,useEffect} from 'react';
import logo from '../uploads/logo.jpeg';
import menu from '../uploads/menu.png' ;
import profil from '../uploads/profile.png' ;
import search from '../uploads/search.png'
import axios from 'axios';
import {useNavigate, NavLink} from 'react-router-dom'
import SideBar from '../components/SideBar'

const Search = () => {
  const [articles, setArticles] = useState([])
  const [results, setResults] = useState([])
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate()
  
  useEffect(() => {
    fetchArticles()
  },[])

  const handleMenuClick = () => {
    setShowMenu(!showMenu)
  };

  const fetchArticles = async () => {
    try {
      const log = await axios.get('http://localhost:8000/api/articles')
      setArticles(log.data.articles)
    } catch (error) {
      console.log('Bad request')
    }
  }
    
  const [value, setValue] = useState('')
  const [showResults, setShowResults] = useState(false)

  const filterWords = async () => {
    if(value.trim() === ''){
      setResults([])
    } else {
      const searchItem = value.toLocaleLowerCase()
      let wordSet = new Set()
      articles.forEach( article => {
        const words = (article.nom + ' ' + article.contenu).toLocaleLowerCase().split(/\s+/)
        words.forEach( word => {
          if(word.includes(searchItem)){
            wordSet.add(word)
          }
        })
      })
      setResults(Array.from(wordSet))
    }
  }

  const onchange = (e) => {
    setValue(e.target.value)
    filterWords()
    setShowResults(true)
  }

  const handleClick = (item) => {
    navigate('/search/'+item)
  }

  return (
    <div className="container mx-auto">
        <div className="flex flex-row items-center justify-between p-4 relative">
          {/* Logo */}
          <div className="items-center justify-center flex flex-col">
            <img src={logo} alt="Logo" className="h-12 w-12 bg-transparent rounded-full" />
          </div>
          {/* Search Bar */}
          <div className="flex flex-row justify-center items w-[80%]">
            <input
              name="search"
              value={value}
              onChange={(e) => onchange(e)}
              placeholder="Saisissez le mot clé..."
              className="flex-grow outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3 sm:text-base md:text-sm"
            />
          </div>
          {/* Menu Button & Profile (Visible on medium and larger screens) */}
          <div className="hidden md:flex flex-row items-center justify-between py-1 px-2 space-x-6">
            <div className="items-center justify-center flex flex-col">
              <img src={profil} alt="profile" className="h-8 w-8 bg-transparent rounded-full hover:cursor-pointer" />
            </div>
            <div className="items-center justify-center flex flex-col">
              <img src={menu} alt="menu" onClick={handleMenuClick} className="h-8 w-8 bg-transparent rounded-full hover:cursor-pointer" />
            </div>
          </div>
          {/* Menu Button (Visible on small screens) */}
          <div className="md:hidden items-center justify-center flex flex-col">
            <img src={menu} alt="menu" className="h-8 w-8 bg-transparent rounded-full hover:cursor-pointer" 
            onClick={handleMenuClick} />
          </div>
          {/* Mini Sidebar (Visible when menu is open) */}
          {
            showMenu && (
              <SideBar visible={showMenu} />
            )       
          }
        </div>


      {showResults && value ? (
        <div className="w-[100%] flex flex-col justify-center items-center mt-3 px-8 py-4">
          <div className="w-[70%] h-full flex flex-col justify-center items-center px-4 py-3 shadow-xl overflow-auto max-h-[500px]">
           {results.length > 0 ? (
              results.map((item, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={(e) => handleClick(item)}
                  className="w-[100%] flex flex-row items-center space-x-6 mb-2 text-md text-black font-semibold py-2 px-3 hover:bg-gray-200 hover:text-gray-800"
                >
                  <img src={search} alt="search-icon" className="h-6 w-6 bg-transparent rounded-full" />
                  <div className="">{item}</div>
                </button>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center text-black text-lg font-semibold p-10">
                Aucune correspondance trouvée
              </div>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default Search