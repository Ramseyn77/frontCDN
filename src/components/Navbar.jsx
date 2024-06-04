import { React, useState } from 'react';
import logo from '../uploads/logo.jpeg';
import menu from '../uploads/menu.png';
import profil from '../uploads/profile.png';
import searchIcon from '../uploads/search-black.png';
import { useNavigate, NavLink } from 'react-router-dom';
import SideBar from '../components/SideBar'

const Navbar = ({ link }) => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(link);
  const [showMenu, setShowMenu] = useState(false);
  const handleMenuClick = () => {
    setShowMenu(!showMenu)
  };

  return (
    <div className="w-screen">
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
              Home
            </NavLink>
            <NavLink
              to="/articles"
              className={`text-black font-bold text-sm ${activeLink === 'articles' ? 'text-gray-400' : ''}`}
            >
              Articles
            </NavLink>
            <NavLink
              to="/"
              className={`text-black font-bold text-sm ${activeLink === 'about' ? 'text-gray-400' : ''}`}
            >
              A propos
            </NavLink>
            <NavLink
              to="/"
              className={`text-black font-bold text-sm ${activeLink === 'contact' ? 'text-gray-400' : ''}`}
            >
              Contactez-nous
            </NavLink>
            <NavLink
              to="/"
              className={`text-black font-bold text-sm ${activeLink === 'quiz' ? 'text-gray-400' : ''}`}
            >
              Quiz
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
              className="h-8 w-8 bg-transparent rounded-full hover:cursor-pointer"
            />
          </div>
          <div className="items-center justify-center flex flex-col">
            <img src={profil} alt="profile" className="h-8 w-8 bg-transparent rounded-full hover:cursor-pointer" />
          </div>
        </div>
        {/* Menu Button (Visible on small screens) */}
        <div className="md:hidden items-center justify-center flex flex-col">
          <img src={menu} alt="menu" className="h-8 w-8 bg-transparent rounded-full hover:cursor-pointer"
          onClick={handleMenuClick} />
        </div>
        {
            showMenu && (
              <SideBar visible={showMenu} />
            )       
          }
      </div>
    </div>
  );
};

export default Navbar;
