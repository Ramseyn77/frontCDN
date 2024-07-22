import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import logo from '../uploads/logo.jpeg';
import searchIcon from '../uploads/search-black.png';
import SideBar from '../components/SideBar';
import {UserCircle, MenuIcon} from 'lucide-react'
import Chargement from './Chargement';

const Navbar = ({ link }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeLink, setActiveLink] = useState(link);
  const [showMenu, setShowMenu] = useState(false);
  const [showDiv, setShowDiv] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleProfilClick = () => {
    setShowDiv(!showDiv) 
  }

  const handleClick = () => {
    setShowDiv(false)
    navigate('/profil')
  }

  const handleConnectClick = () => {
    setShowDiv(false)
    navigate('/login')
  }

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

  const renderAddLink = () => {
    if (user && user.status === 2) {
      return (
        <NavLink
          to="/add"
          className={`text-black font-bold text-sm ${activeLink === 'add' ? 'text-gray-400' : ''}`}
        >
          Ajouter
        </NavLink>
      );
    }
    return null;  // Return null if conditions are not met
  };


  return (
    <div className="w-screen border-b-1 border-gray-100 ">
      <div className="flex flex-row items-center justify-between p-4 w-full h-[12%]">
        <div className="items-center justify-center flex flex-col">
          <img src={logo} alt="Logo" className="h-12 w-12 bg-transparent rounded-full" />
        </div>
        {/* Navigation Links */}
        <div className="hidden md:flex flex-row justify-center items w-[80%]">
          <div className="flex flex-row items-center justify-between py-1 px-2 space-x-16">
            <NavLink
              to="/"
              className={`text-black font-bold text-sm ${activeLink === 'home' ? 'text-gray-400' : ''}`}
            >
              Acceuil
            </NavLink>
            <NavLink
              to="/articles"
              className={`text-black font-bold text-sm ${activeLink === 'articles' ? 'text-gray-400' : ''}`}
            >
              Articles
            </NavLink>
            {renderAddLink()}
            <NavLink
              to="/quiz"
              className={`text-black font-bold text-sm ${activeLink === 'quiz' ? 'text-gray-400' : ''}`}
            >
              Quiz
            </NavLink>
            <NavLink
              to="/about"
              className={`text-black font-bold text-sm ${activeLink === 'about' ? 'text-gray-400' : ''}`}
            >
              A propos
            </NavLink>
          </div>
        </div>
        {/* Profile & Search (Visible on all screens except small) */}
        <div className="hidden md:flex flex-row items-center justify-between py-1 px-2 space-x-6">
          <div className="items-center justify-center flex flex-col">
            <img
              src={searchIcon}
              alt="profile"
              onClick={() => navigate('/search')}
              className="h-6 w-6 bg-transparent rounded-full hover:cursor-pointer"
            />
          </div>
          <div className="items-center justify-center flex flex-col relative group">
            {
              user && user.profil ?(
                <img src= {'http://localhost:8000/storage/'+user.profil} alt="Logo" onClick={handleProfilClick} className="h-6 w-6 bg-transparent hover:cursor-pointer rounded-full" />
              ) : (
                <UserCircle onClick={handleProfilClick} className="h-6 w-6 bg-transparent hover:cursor-pointer rounded-full" />
              )
            }
            {showDiv && (
            <div className="absolute top-10 right-10 z-100 w-32 bg-white border border-gray-300 shadow-lg rounded-md py-2 gap-2">
              {
                user != null ? (
                  <>
                    <button onClick={handleClick} className='text-sm font-semibold flex flex-col justify-center items-center hover:bg-gray-200 w-full px-3 py-2'>Profil</button>
                    <button className='text-sm font-semibold flex flex-col justify-center items-center hover:bg-gray-200 w-full px-3 py-2'>Déconnexion</button>
                  </>
                ) :(
                  <button onClick={handleConnectClick} className='text-sm font-semibold flex flex-col justify-center items-center hover:bg-gray-200 w-full px-3 py-2'> Se Connecter </button>
                )
              }
            </div>
          )}
          </div>
        </div>
        {/* Menu Button (Visible on small screens) */}
        <div className="md:hidden items-center justify-center flex flex-col">
          <MenuIcon className="h-8 w-8 bg-transparent rounded-full hover:cursor-pointer"
          onClick={handleMenuClick} />
        </div>
        {showMenu && (
          <SideBar visible={showMenu} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
