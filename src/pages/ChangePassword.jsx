import React, { useState } from 'react'
import LogNavbar from '../components/LogNavbar'
import InputPassword from '../components/InputPassword';
import InputForm from '../components/InputForm';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../uploads/logo.jpeg';

const ChangePassword = () => {
    const [user, setUser] = useState({
        'code' : '',
        'password' : '',
        'cpassword': ''
    })
    const navigate = useNavigate()
    const [errors, setErrors] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/users/changePassword', user)
            if (response.data.user) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                localStorage.removeItem('user_id');
                navigate('/login');
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
              } else if (error.response && error.response.status === 401) {
                setErrorMessage(error.response.data.message);
            }else {
                setError(error.response.data.message);
            }
        }
    }
  return (
    <div className='w-full flex flex-col'>
      <LogNavbar link={'/login'}/>
      <div className="flex flex-col space-y-10 items-center w-full p-3 ">
        <div className="items-center justify-center flex flex-col mb-6">
          <img src={logo} alt='Logo' className='h-16 w-16 bg-transparent rounded-full' />
        </div>
        <form method='post' className="flex flex-col space-y-6 justify-center w-[50%]">
          <div className='flex flex-col w-full'>
            <InputForm name={'code'} label={'Code'} onChange={ (e) => handleChange(e)} value={user.code} 
            placeholder='Entrer code de vérification. Veillez consutes vos mails ' error={ error ? true : false} />
            <InputPassword name={'password'} label={'Mot de passe'} onChange={ (e) => handleChange(e)} value={user.password} 
            placeholder='Entrer le mot de passe'error={ errors.password || errorMessage ? true : false} />
            <InputPassword name={'cpassword'} label={'Confirmer le mot de passe'} onChange={ (e) => handleChange(e)} value={user.cpassword} 
            placeholder='Confirmer le mot de passe'  error={ errors.cpassword || errorMessage ? true : false} />
          </div>
          <div className="flex flex-col w-full justify-center items-center mt-4">
            <button type="submit" 
              onClick = {(e) => handleSubmit(e)}
              className='bg-blue-500 text-md font-bold text-white w-[35%] sm:w-[15%] rounded-lg py-2 px-3 hover:bg-blue-400 mb-4'               
            >
              Soummettre
            </button>
          </div>
        </form>
    </div>
    </div>
  )
}

export default ChangePassword
