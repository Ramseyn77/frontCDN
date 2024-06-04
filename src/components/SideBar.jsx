import {React, useState} from 'react'
import {NavLink} from 'react-router-dom'
import logo from '../uploads/logo.jpeg'

const SideBar = ({visible}) => { 
  const [showMenu, setShowMenu] = useState(visible);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };
  const transitionClass = showMenu ? 'transform translate-x-0' : '-translate-x-full';

  return (
    <div className={`fixed top-1 left-0 h-[80%] sm:h-[70%] md:h-[70%] w-[70%] md:w-[20%] sm:w-[40%] bg-gray-100 shadow-xl rounded-sm z-10 transition duration-500 ease-in-out ${transitionClass}`}>
                <div className="flex flex-col items-center justify-between h-full">
                  <div className="flex flex-col items-center space-y-6 py-4">
                    <div className="flex flex-row items-center justify-between">
                      <img src={logo} alt="Logo" className="h-12 w-12 bg-transparent rounded-full border border-2 border-white-400" />
                      {/* <div className="flex flex-col space-y-1 items-center justify-center">
                        <div className="flex flex-col items-center justify-center rounded-full h-12 w-12 bg-green-500 border border-2 border-white-400 text-white text-md font-bold">
                          AK
                        </div>
                        <NavLink to='/' className='text-gray-400 text-xs font-semibold hover:text-gray-700 hover:underline'>AGONDANOU Kenneth</NavLink>
                      </div> */}
                    </div>
                    <NavLink
                      to="/"
                      className={`text-black font-bold text-sm hover:text-gray-400`}
                      onClick={handleMenuClick}
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/articles"
                      className={`text-black font-bold text-sm hover:text-gray-400 `}
                      onClick={handleMenuClick}
                    >
                      Articles
                    </NavLink>
                    <NavLink
                      to="/"
                      className={`text-black font-bold text-sm hover:text-gray-400 `}
                      onClick={handleMenuClick}
                    >
                      A propos
                    </NavLink>
                    <NavLink
                      to="/"
                      className={`text-black font-bold text-sm hover:text-gray-400`}
                      onClick={handleMenuClick}
                    >
                      Contactez-nous
                    </NavLink>
                    <NavLink
                      to="/"
                      className={`text-black font-bold text-sm hover:text-gray-400`}
                      onClick={handleMenuClick}
                    >
                      Quiz
                    </NavLink>
                    <NavLink
                      to="/search"
                      className={`text-black font-bold text-sm hover:text-gray-400`}
                      onClick={handleMenuClick}
                    >
                      Recherche
                    </NavLink>
                  </div>
                </div>
              </div>
  )
}

export default SideBar
