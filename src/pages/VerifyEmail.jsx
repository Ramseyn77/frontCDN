import React from 'react'
import LogNavbar from '../components/LogNavbar'
import { useState } from 'react'
import { useEffect } from 'react'
import logo from '../uploads/logo.jpeg';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const VerifyEmail = () => {
  const [code, setCode] = useState(null)
  const [error, setError] = useState('')
  const {id} = useParams()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCode(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {'code' : code}
    console.log(data)
    try {
      const response = await axios.post('http://localhost:8000/api/users/emailVerify/'+id, data)
      console.log(response)
      navigate('/login')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('INcompatible code');
      } else {
        console.error(error);
      }
    }
  }

  return (
    <div className='w-full fex flex-col'>
      <LogNavbar link={'/register'} />
      <div className="flex flex-col space-y-10 items-center w-full p-3 ">
        <div className="items-center justify-center flex flex-col mb-6">
          <img src={logo} alt='Logo' className='h-16 w-16 bg-transparent rounded-full' />
        </div>
        <form className="flex flex-col space-y-6 justify-center items-center w-[70%]">
          <div className='flex flex-col w-full '>
            <div className='flex flex-col justify-center items-center'>
              <div className=' sm:w-[45%] w-full flex flex-col space-y-3 mb-2'>
                <label for='code' className='text-black font-semibold text-md'>Code de confirmation</label>
                <input name='code' placeholder='Entrer vôtre code' onChange={ (e) => handleChange(e)} 
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

export default VerifyEmail
