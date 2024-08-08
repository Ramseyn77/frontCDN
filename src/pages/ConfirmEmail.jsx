import React, { useState } from 'react'
import LogNavbar from '../components/LogNavbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../uploads/logo.jpeg';

const ConfirmEmail = () => {
    const [email, setEmail] = useState(null)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {'email' : email}
        try {
            const response = await axios.post('http://localhost:8000/api/users/rememberEmail', data)
            if (response.data.user) navigate('/changePassword')
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Email non correspondant');
              } else {
                console.error(error);
            }
        }
    }

  return (
    <div className='w-full flex flex-col'>
      <LogNavbar link={'/login'} />
      <div className="flex flex-col space-y-10 items-center w-full p-3 ">
        <div className="items-center justify-center flex flex-col mb-6">
          <img src={logo} alt='Logo' className='h-16 w-16 bg-transparent rounded-full' />
        </div>
        <form className="flex flex-col space-y-6 justify-center items-center w-[70%]">
          <div className='flex flex-col w-full '>
            <div className='flex flex-col justify-center items-center'>
              <div className=' sm:w-[45%] w-full flex flex-col space-y-3 mb-2'>
                <label for='email' className='text-black font-semibold text-md'>Email</label>
                <input name='email' placeholder='Entrer vôtre email' onChange={ (e) => handleChange(e)} 
                className={`w-full outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3 ${error ? 'border-red-300 ' : ''}`} />
              </div>
            </div>
            <div className="flex flex-col w-full justify-center items-center mt-4">
              <button type="submit" 
                onClick = {(e) => handleSubmit(e)}
                className='bg-blue-500 text-md font-bold text-white w-[35%] sm:w-[15%] rounded-lg py-2 hover:bg-blue-400 mb-4'               
              >
                Suivant
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ConfirmEmail
