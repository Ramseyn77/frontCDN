import {React, useState} from 'react'
import visible from '../uploads/eye-visible.png'
import notvisible from '../uploads/eye-notVisible.png'
import {NavLink} from 'react-router-dom'

const InputPassword = ({ label, onChange, name, value, placeholder, isLogin, error }) => {
    const [show, setShow] = useState(false);
    const handleVisible = () => {
        setShow(!show)
    }
    return (
        <div className='flex flex-col space-y-3 mb-2'>
        <div className='flex flex-row justify-between'>
          <label for={name} className='text-black font-semibold text-md'>{label}</label>
          {isLogin && <NavLink to='/login' className='text-sm text-gray-400 hover:text-gray-200 '>forgot password ?</NavLink>}
        </div>
        <div className='w-full flex flex-row justify-between items-center relative'>
          <input
            type={show ? 'text' : 'password'}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full h-[100%] outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3  sm:text-base md:text-sm ${error ? 'bg-red-300': ''} ${show && 'text-gray-900' }`  } 
            required />
          <button
            type='button'
            className="h-full px-2 absolute right-2 top-1/2 transform -translate-y-1/2" 
            onClick={() => setShow(!show)}
          >
            {show ? <img src={notvisible} className="h-5 w-5" /> : <img src={visible} className="h-5 w-5" />}
          </button>
        </div>
      </div>
    );
  };
  

export default InputPassword
