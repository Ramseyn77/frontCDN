import React from 'react';
import LogNavbar from '../components/LogNavbar';
import InputForm from '../components/InputForm';
import logo from '../uploads/logo.jpeg';
import google from '../uploads/google.png';
import { NavLink } from 'react-router-dom';
import InputPassword from '../components/InputPassword';

const Login = () => {

  const handleLogin = async (e) => {
    e.preventDefault();
    alert('Logged');
  }

  const handleLoginGoogle = async () => {
    alert('Logged with google');
  }

  return (
    <div className='flex flex-col space-y-10 h-full w-full'>
      <LogNavbar link={'/login'}/>
      <div className="flex flex-col space-y-10 items-center w-full p-3 ">
        <div className="items-center justify-center flex flex-col mb-6">
          <img src={logo} alt='Logo' className='h-16 w-16 bg-transparent rounded-full' />
        </div>
        <form className="flex flex-col space-y-6 justify-center w-[50%] border-1">
          <div className='flex flex-col w-full'>
            <InputForm name={'email'} label={'Email'} placeholder='Enter your email adress ' />
            <InputPassword name={'password'} label={'Password'} placeholder='Enter your password' isLogin={true} />
          </div>
          <div className="flex flex-col w-full">
            <button type="submit" 
              className='bg-blue-500 text-md font-bold text-white w-full rounded-lg py-2 hover:bg-blue-400 mb-4'
              onClick={(e) => handleLogin(e)}
            >
              Login now
            </button>

            <button type='button' 
              className='bg-blue-200 flex flex-row justify-center space-x-4 text-sm font-bold text-blue-500 w-full rounded-lg py-2 hover:bg-blue-300 mb-4'
              onClick={handleLoginGoogle}
            >
              <div>
                <img src={google} alt="Goole logo" />
              </div>
              <div className='flex flex-col items-center justify-center mt-1'>  Continue with google   </div>
            </button>

            <div className="flex flex-row space-x-3 text-gray-400  text-sm items-center justify-center">
              Have You An Account ? <NavLink className=' ml-2 font-semibold text-blue-500 hover:text-blue-300'>register</NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
