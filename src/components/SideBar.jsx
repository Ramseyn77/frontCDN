import {React, useState, useEffect} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import logo from '../uploads/logo.jpeg'
import {UserCircle, HomeIcon, NotebookIcon, FolderKanban, FileQuestionIcon, SearchIcon, PlusCircleIcon} from 'lucide-react'
import axios from 'axios'
import Chargement from './Chargement'

const SideBar = ({visible}) => { 
  const [showMenu, setShowMenu] = useState(visible);
  const [user, setUser] = useState(null); 
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userc = localStorage.getItem('user');
    const id = localStorage.getItem('user_id');
    if (accessToken && userc) {
      fetchUser(id);
    }
  }, []);

  const fetchUser = async (id) => {
    try {
      const response = await axios.get('http://localhost:8000/api/users/' + id);
      setUser(response.data.user);
    } catch (error) {
      console.error('Message', error);
    }
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };
  const transitionClass = showMenu ? 'transform translate-x-0' : '-translate-x-full';

  const handleClick = () => {
    navigate('/profil')
  }

  const renderAddLink = () => {
    if (user && user.status === 2) {
      return (
        <NavLink
          to="/add"
          className={`flex gap-2 items-start justify-center text-black font-bold text-sm hover:text-gray-400`}
        >
          <PlusCircleIcon className='h-4 w-4 inline'/>
          <div className="">Ajouter</div>
        </NavLink>
      );
    }
    return null; 
  };

  return (
    <div className={`fixed top-1 left-0 h-[80%] sm:h-[70%] md:h-[70%] w-[70%] md:w-[20%] sm:w-[40%] bg-gray-100 shadow-xl rounded-sm z-10 transition-transform ${transitionClass}`}>
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="flex flex-row items-center justify-between">
            {
              user && user.profil ?(
                <img src= {'http://localhost:8000/storage/'+user.profil} alt="Logo" onClick={handleClick} className="h-20 w-20 bg-transparent border-4 border-blur rounded-full hover:cursor-pointer" />
              ) : (
                <UserCircle onClick={handleClick} className="h-20 w-20 bg-transparent border-4 border-blur rounded-full hover:cursor-pointer" />
              )
            }
          </div>
          <NavLink
            to="/"
            className={`flex gap-2 items-start justify-center text-black font-bold text-sm hover:text-gray-400`}
            onClick={handleMenuClick}
          >
            <HomeIcon className='h-4 w-4 inline'/>
            <div className="">Home</div>
          </NavLink>
          <NavLink
            to="/articles"
            className={`flex gap-2 items-start justify-center text-black font-bold text-sm hover:text-gray-400 `}
            onClick={handleMenuClick}
          >
            <NotebookIcon className='h-4 w-4 inline'/>
            <div className="">Articles</div>
          </NavLink>
          {renderAddLink()}
          <NavLink
            to="/about"
            className={`flex gap-2 items-start justify-center text-black font-bold text-sm hover:text-gray-400 `}
            onClick={handleMenuClick}
          >
            <FolderKanban className='h-4 w-4 inline'/>
            <div className="">A propos</div>
          </NavLink>
          <NavLink
            to="/quiz"
            className={`flex gap-2 items-start justify-center text-black font-bold text-sm hover:text-gray-400 `}
            onClick={handleMenuClick}
          >
            <FileQuestionIcon className='h-4 w-4 inline'/>
            <div className="">Quiz</div>
          </NavLink>
          <NavLink
            to="/search"
            className={`flex gap-2 items-start justify-center text-black font-bold text-sm hover:text-gray-400 `}
            onClick={handleMenuClick}
          >
            <SearchIcon className='h-4 w-4 inline'/>
            <div className="">Rechercher</div>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default SideBar
