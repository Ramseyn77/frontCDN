import {React,useState} from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../uploads/logo.jpeg';

const LogNavbar = ({link}) => {

  const [activeLink, setActiveLink] = useState(link); 

  return (
    <div className='flex flex-row items-center justify-between p-4 w-full h-[12%]'>
      <div className="items-center justify-center flex flex-col">
        <img src={logo} alt='Logo' className='h-12 w-12 bg-transparent rounded-full' />
      </div>
      <div className="flex flex-row items-center justify-between py-1 px-2 space-x-6">
        <NavLink
          to='/register'
          className={`text-black font-bold text-sm ${activeLink === '/register' ? 'text-gray-400' : ''}`} 
        >
          Register
        </NavLink>
        <NavLink
          to='/login' 
          className={`text-black font-bold text-sm ${activeLink === '/login' ? 'text-gray-400' : ''}`} 
        >
          Login
        </NavLink>
      </div>
    </div>
  )
}

export default LogNavbar;
