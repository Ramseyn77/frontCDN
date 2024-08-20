import {React, useState, useEffect} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import logo from '../uploads/logo.jpeg'
import {UserCircle, HomeIcon, NotebookIcon,Book , FolderKanban, FileQuestionIcon, SearchIcon, PlusCircleIcon, User} from 'lucide-react'
import axios from 'axios'
import Chargement from './Chargement'

const SideBar = ({visible}) => { 
  const [showMenu, setShowMenu] = useState(visible);
  const [user, setUser] = useState(null); 
  const [showOption, setShowOption] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userc = localStorage.getItem('user');
    const id = localStorage.getItem('user_id');
    if (accessToken && userc) {
      fetchUser(id);
    }
  }, []);
  const handleOptionClick = () => {
    setShowOption(!showOption)
  }
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
        <div className="items-center justify-center flex flex-col relative group">
          <button onClick={handleOptionClick}  className="flex flex-row gap-2 items-center border-none text-blue-500 font-bold text-sm hover:text-blue-400 transition-color">
            <PlusCircleIcon className="h-4 w-4 font-foreground " />
            Ajouter
          </button>
            { showOption && (
              <div className="absolute top-10 right-10 z-100 w-32 bg-white border border-gray-300 shadow-lg rounded-md py-2 gap-2">
                <NavLink to={'/add'}  className='text-sm font-semibold flex flex-col justify-center items-center hover:bg-gray-200 w-full px-3 py-2'> Un Article</NavLink>
                <NavLink to={'/addQuiz'} className='text-sm font-semibold flex flex-col justify-center items-center hover:bg-gray-200 w-full px-3 py-2'>Un Quiz</NavLink>
                <NavLink to={'/addTutoriel'} className='text-sm font-semibold flex flex-col justify-center items-center hover:bg-gray-200 w-full px-3 py-2'>Un Tutoriel</NavLink>
              </div>
            )}
        </div>
      );
    }
    return null;  
  };

  return (
    <div className={`fixed top-1 left-0 h-[80%] sm:h-[70%] md:h-[70%] w-[70%] md:w-[20%] sm:w-[40%] bg-gray-200 shadow-xl rounded-sm z-10 transition-transform ${transitionClass}`}>
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="flex flex-row items-center justify-between">
            {
              user && user.profil ?(
                <img src= {'http://localhost:8000/storage/'+user.profil} alt="Logo" onClick={handleClick} className="h-20 w-20 bg-transparent border-4 border-blur rounded-full hover:cursor-pointer" />
              ) : (
                <UserCircle onClick={handleClick} className="h-20 w-20 bg-transparent border-4 border-blue-400 rounded-full hover:cursor-pointer" />
              )
            }
          </div>
          <NavLink
            to="/"
            className={`flex gap-2 items-start justify-center text-blue-500 font-bold text-sm hover:text-blue-400 transition-color `}
            onClick={handleMenuClick}
          >
            <HomeIcon className='h-4 w-4 inline font-foreground' />
            <div className="">Home</div>
          </NavLink>
          <NavLink
            to="/articles"
            className={`flex gap-2 items-start justify-center text-blue-500 font-bold text-sm hover:text-blue-400 transition-color `}
            onClick={handleMenuClick}
          >
            <NotebookIcon className='h-4 w-4 inline font-foreground'/>
            <div className="">Articles</div>
          </NavLink>
          {renderAddLink()}
          <NavLink
            to="/quiz"
            className={`flex gap-2 items-start justify-center text-blue-500 font-bold text-sm hover:text-blue-400 transition-color `}
            onClick={handleMenuClick}
          >
            <FileQuestionIcon className='h-4 w-4 inline font-foreground'/>
            <div className="">Quiz</div>
          </NavLink>
          <NavLink
            to="/expert"
            className={`flex gap-2 items-start justify-center text-blue-500 font-bold text-sm hover:text-blue-400 transition-color `}
            onClick={handleMenuClick}
          >
            <User className='h-4 w-4 inline font-foreground'/>
            <div className="">Experts</div>
          </NavLink>
          <NavLink
            to="/tutoriel"
            className={`flex gap-2 items-start justify-center text-blue-500 font-bold text-sm hover:text-blue-400 transition-color `}
            onClick={handleMenuClick}
          >
            <Book className='h-4 w-4 inline font-foreground'/>
            <div className="">Tutoriels</div>
          </NavLink>
          <NavLink
            to="/search"
            className={`flex gap-2 items-start justify-center text-blue-500 font-bold text-sm hover:text-blue-400 transition-color `}
            onClick={handleMenuClick}
          >
            <SearchIcon className='h-4 w-4 inline font-foreground'/>
            <div className="">Rechercher</div>
          </NavLink>
          <NavLink
            to="/about"
            className={`flex gap-2 items-start justify-center text-blue-500 font-bold text-sm hover:text-blue-400 transition-color `}
            onClick={handleMenuClick}
          >
            <FolderKanban className='h-4 w-4 inline font-foreground'/>
            <div className="">A propos</div>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default SideBar
