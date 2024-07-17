import {React,useState, useEffect} from 'react';
import LogNavbar from '../components/LogNavbar';
import InputForm from '../components/InputForm';
import logo from '../uploads/logo.jpeg';
import google from '../uploads/google.png';
import { NavLink, useNavigate } from 'react-router-dom';
import InputPassword from '../components/InputPassword';
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user')

    if (accessToken && user) {
      navigate('/');
      return;
    }

  },[])

  const [userData, setUser] = useState({
    'email': '',
    'password' : '',
  })

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
  const { name, value } = e.target;
  setUser({ ...userData, [name]: value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', userData) 
      if (response.data.token) {
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('user', response.data.user);
        localStorage.setItem('user_id', response.data.user.id);
        navigate('/')
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        setErrorMessage(error.response.data.message || 'An error occurred during login');
      } else {
        setErrorMessage('An error occurred during login');
      }
    }
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
        <form method='post' className="flex flex-col space-y-6 justify-center w-[50%] border-1">
          <div className='flex flex-col w-full'>
            <InputForm name={'email'} label={'Email'} onChange={ (e) => handleChange(e)} value={userData.email} placeholder='Entrer vôtre adresse email ' />
            <InputPassword name={'password'} label={'Mot de passe'} onChange={ (e) => handleChange(e)} value={userData.password} placeholder='Entrer le mot de passe' isLogin={true} />
          </div>
          <div className="flex flex-col w-full">
            <button type="submit" 
              className='bg-blue-500 text-md font-bold text-white w-full rounded-lg py-2 hover:bg-blue-400 mb-4'
              onClick={(e) => handleLogin(e)}
            >
              Connecter vous 
            </button>

            <button type='button' 
              className='bg-blue-200 flex flex-row justify-center space-x-4 text-sm font-bold text-blue-500 w-full rounded-lg py-2 hover:bg-blue-300 mb-4'
              onClick={handleLoginGoogle}
            >
              <div>
                <img src={google} alt="Goole logo" />
              </div>
              <div className='flex flex-col items-center justify-center mt-1'>  Continuer avec google   </div>
            </button>

            <div className="flex flex-row space-x-3 text-gray-400  text-sm items-center justify-center">
              Avez vous un compte ? <NavLink to='/register' className=' ml-2 font-semibold text-blue-500 hover:text-blue-300'>s'enregistrer</NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
