import React, { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import LogNavbar from '../components/LogNavbar'
import InputForm from '../components/InputForm';
import logo from '../uploads/logo.jpeg';
import google from '../uploads/google.png';
import { NavLink } from 'react-router-dom';
import InputPassword from '../components/InputPassword';
import axios from 'axios'

const Register = () => {
  const [user, setUser] = useState({
    'nom' : '', 
    'prenom' :'',
    'email':'', 
    'password':'', 
    'cpassword':''
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user')
    if (accessToken && user) {
      navigate('/');
      return;
    }

  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleRegisterGoogle = async () => {
    alert('registred with google')
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users', user)
      if (response.data.user) {
        navigate('/emailVerify/'+response.data.user.id)
        alert(response.data.code)
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <div className='flex flex-col sm:h-full w-screen max-h-screen overflow-y-auto '>
      <LogNavbar link={'/register'}/>
      <div className="flex flex-col space-y-2 items-center w-full p-3  ">
        <div className="absolute z-[-6] flex flex-col mt-40 ">
          <img src={logo} alt='Logo' className='h-24 w-24 bg-transparent rounded-full blur-sm' />
        </div>
        <form className="flex flex-col space-y-6 justify-center w-[50%]">
          <div className='flex flex-col w-full'>
            <div className='flex flex-col sm:flex-row justify-between items-center'>
              <div className=' sm:w-[45%] w-full flex flex-col space-y-3 mb-2'>
                <label for='nom' className='text-black font-semibold text-md'>Nom</label>
                <input name='nom' placeholder='Entrer vôtre nom' onChange={ (e) => handleChange(e)} className={`w-full outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3 ${errors.nom ? 'border-red-300' : ''}`} value={user.nom} />
              </div>
              <div className=' sm:w-[45%] w-full flex flex-col space-y-3 mb-2'>
                <label for='prenom' className='text-black font-semibold text-md'>Prénoms</label>
                <input name='prenom' placeholder='Entrer vos prénoms' onChange={ (e) => handleChange(e)} className={`w-full outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3 ${errors.prenom ? 'border-red-300' : ''}`} value={user.prenom} />
              </div>
            </div>
            <InputForm name={'email'} label={'Email'} onChange={ (e) => handleChange(e)} placeholder='Entrer une adresse email ' value={user.email} error={errors.email ? true : false} />
            <InputPassword name={'password'} onChange={ (e) => handleChange(e)} label={'Mot de passe '} placeholder='Entrer le mot de passe ' value={user.password} error={errors.password ? true : false} />
            <InputPassword name={'cpassword'} onChange={ (e) => handleChange(e)} label={'Confirmer le mot de passe'} placeholder='Confirmer le mot de passe' value={user.cpassword} error={errors.cpassword ? true : false} />
          </div>
          <div className="flex flex-col w-full">
            <button type="submit" 
              className='bg-blue-500 text-md font-bold text-white w-full rounded-lg py-2 hover:bg-blue-400 mb-4'
              onClick={(e) => handleRegister(e)}
            >
              S'enregistrer
            </button>

            <button type='button' 
              className='bg-blue-200 flex flex-row justify-center space-x-4 text-sm font-bold text-blue-500 w-full rounded-lg py-2 hover:bg-blue-300 mb-4'
              onClick={handleRegisterGoogle}
            >
              <div>
                <img src={google} alt="Goole logo" />
              </div>
              <div className='flex flex-col items-center justify-center mt-1'>  Continuer avec google   </div>
            </button>

            <div className="flex flex-row space-x-3 text-gray-400  text-sm items-center justify-center">
              Vous avez déjà un compte ? <NavLink to='/login' className=' ml-2 font-semibold text-blue-500 hover:text-blue-300'>connectez vous</NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
