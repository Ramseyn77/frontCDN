import {React,useState} from 'react'
import logo from '../uploads/logo.jpeg';
import menu from '../uploads/menu.png' ;
import profil from '../uploads/profile.png' ;
import searchIcon from '../uploads/search-black.png'
import {useNavigate,NavLink} from 'react-router-dom'

const DevNavbar = ({link}) => {
    const navigate = useNavigate()
    const [activeLink, setActiveLink] = useState(link); 
  return (
    <div className='w-screen'>
      <div className='flex flex-row items-center justify-between p-4 w-full h-[12%]'>
        <div className="items-center justify-center flex flex-col">
          <img src={logo} alt='Logo' className='h-12 w-12 bg-transparent rounded-full' />
        </div>
        <div className="flex flex-row justify-center items w-[60%]">
            <div className="flex flex-row items-center justify-between py-1 px-2 space-x-6">
                <NavLink
                  to='/'
                  className={`text-black font-bold text-sm ${activeLink === 'home' ? 'text-gray-400' : ''}`} 
                >
                  Home
                </NavLink>
                <NavLink
                  to='/' 
                  className={`text-black font-bold text-sm ${activeLink === 'articles' ? 'text-gray-400' : ''}`} 
                >
                  Articles
                </NavLink>
                <NavLink
                  to='/' 
                  className={`text-black font-bold text-sm ${activeLink === 'about' ? 'text-gray-400' : ''}`} 
                >
                  A propos
                </NavLink>
                <NavLink
                  to='/' 
                  className={`text-black font-bold text-sm ${activeLink === 'contact' ? 'text-gray-400' : ''}`} 
                >
                  Contactez-nous
                </NavLink>
            </div>
        </div>
        <div className="flex flex-row items-center justify-between py-1 px-2 space-x-6">
          <div className="items-center justify-center flex flex-col">
            <img src={searchIcon} alt='profile' onClick={(e) => { navigate('/search'); }} className='h-8 w-8 bg-transparent rounded-full hover:cursor-pointer' />
          </div>
          <div className="items-center justify-center flex flex-col">
            <img src={profil} alt='profile' className='h-8 w-8 bg-transparent rounded-full hover:cursor-pointer' />
          </div> 
          <div className="items-center justify-center flex flex-col">
            <img src={menu} alt='menu' className='h-8 w-8 bg-transparent rounded-full hover:cursor-pointer' />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default DevNavbar
