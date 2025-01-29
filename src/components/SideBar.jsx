import {React, useState, useEffect} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {fetchData} from '../api'
import {UserCircle, HomeIcon, NotebookIcon,Book , FolderKanban, FileQuestionIcon, SearchIcon, PlusCircleIcon, User} from 'lucide-react'



const SideBar = ({visible}) => { 
  const [showMenu, setShowMenu] = useState(visible);
  const [user, setUser] = useState(null); 
  const [showOption, setShowOption] = useState(false);
  const navigate = useNavigate()
  const navlinks =[
      {title:" ", class:HomeIcon,text:"Acceuil"},
      {title:"articles", class:NotebookIcon,text:"Articles"},
      {title:"quiz", class:FileQuestionIcon,text:"Quiz"},
      {title:"expert", class:User,text:"Experts"},
      {title:"tutoriel", class:Book,text:"Tutoriels"},
      {title:"search", class:SearchIcon,text:"Rechercher"},
      {title:"about", class:FolderKanban,text:"A propos"},
  ]

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
      const response = await fetchData('/api/users/' + id);
      setUser(response.user);
    } catch (error) {
      console.error('Message', error);
    }
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleClick = () => {
    navigate('/profil')
  }

  const renderAddLink = () => {
    if (user && user.status === 2) {
      return (
        <div className="items-center justify-center flex flex-col relative group">
          <button onClick={handleOptionClick}  className="relativ group flex flex-row gap-2 items-center border-none text-blue-500 font-bold text-sm hover:text-blue-400 transition-color">
            <PlusCircleIcon className="h-8 w-8 font-foreground " />
            <div className="top-1 left-20 absolute bg-blue-400 text-xs text-white rounded-sm px-4 py-1 opacity-0 group-hover:opacity-100 transition-opacity ease-in delay-150">Ajouter</div>
          </button>
            { showOption && (
              <div className={`absolute top-[-10] left-20 z-1 w-32 bg-white border border-gray-300 shadow-lg rounded-md py-2 gap-2 opacity-0 transition-opacity ease-in delay-150`}>
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
    <div className={`fixed top-20 left-0 h-[83%] w-[18%] sm:w-[8%] bg-gray-200 shadow-xl rounded-sm transition-transform ease-in delay-150`}>
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="flex flex-row items-center justify-between">
            {
              user && user.profil ?(
                <img src= {'http://localhost:8000/storage/'+user.profil} alt="Logo" onClick={handleClick} className="h-12 w-12 bg-transparent border-4 border-blur rounded-full hover:cursor-pointer" />
              ) : (
                <UserCircle onClick={handleClick} className="h-12 w-12 bg-transparent border-4 border-blue-400 rounded-full hover:cursor-pointer" />
              )
            }
          </div>
          {renderAddLink()}
          {
            navlinks.map((item, i) => (
              <NavLink
                key={i}
                to={"/"+item.title}
                className={`flex gap-2 items-center justify-center text-blue-500 font-bold text-sm hover:text-blue-400 transition-color relative group `}
                onClick={handleMenuClick}
              >
                <item.class className='h-8 w-8 inline font-foreground' />
                <div className="top-1 left-20 absolute bg-blue-400 text-xs text-white rounded-sm px-4 py-1 opacity-0 group-hover:opacity-100 transition-opacity ease-in delay-150">{item.text}</div>
              </NavLink>
            ))
          }
          
        </div>
      </div>
    </div>
  )
}

export default SideBar
