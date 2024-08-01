import { React, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import logo from '../uploads/logo.jpeg';
import { MailIcon, Briefcase, UserCircle } from 'lucide-react';
import Chargement from '../components/Chargement';

const Profil = () => {
  const [user, setUser] = useState({
    id: '',
    nom: '',
    prenom: '',
    email: '',
    profession: '',
    profil: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem('user_id');
    if (id) {
      fetchUser(id);
    }
  }, []);

  const fetchUser = async (id) => {
    try {
      const response = await axios.get('http://localhost:8000/api/users/' + id);
      setUser({ ...response.data.user, id });
    } catch (error) {
      console.error('Message', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setUser({ ...user, [name]: files[0] });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('nom', user.nom);
      formData.append('prenom', user.prenom);
      formData.append('email', user.email);
      formData.append('profession', user.profession);
      if (user.profil) {
        formData.append('profil', user.profil);
      }

      const response = await axios.post('http://localhost:8000/api/users/' + user.id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      handleUpdate(response.data.user);
      setIsSubmitting(false);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error(error);
      }
      setIsSubmitting(false);
    }
  };

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  if (!user) {
    return (
      <div className='w-full h-auto'>
        <Chargement />
      </div>
    );
  }

  return (
    <div className='w-full h-auto'>
      <Navbar />
      <div className="w-full flex items-center justify-center p-4">
        <div className="w-[80%] flex flex-col sm:flex-row items-center p-4 shadow-xl rounded-lg bg-white mt-4 sm:mt-2 gap-10 max-h-[80vh] overflow-y-auto sm:overflow-hidden">
          <div className=" w-[40%] flex flex-col items-center justify-center p-2 gap-8 ">
            <div className="items-center justify-center flex flex-col">
              {user.profil ? (
                <img src={'http://localhost:8000/storage/'+user.profil} alt="Logo" className="h-20 w-20 sm:h-40 sm:w-40 bg-transparent border-4 border-blur rounded-full" />
              ) : (
                <UserCircle className="h-20 w-20 bg-transparent border-4 border-blur rounded-full" />
              )}
            </div>
            <div className="text-center mt-12 flex flex-col gap-3">
              <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-3">
                {user.nom + ' ' + user.prenom}
              </h3>
              <div className="text-sm leading-normal flex flex-row items-center gap-1 mt-0 mb-2 text-blueGray-400 font-bold">
                <MailIcon className='h-4 w-4 inline' />
                {user.email}
              </div>
              <div className="text-sm leading-normal flex flex-row items-center gap-1 mt-0 mb-2 text-blueGray-400 font-bold">
                <Briefcase className='h-4 w-4 inline' />
                <div className="">{user.profession ? user.profession : 'Pas de profession enregistrée'}</div>
              </div>
            </div>
          </div>

          <div className="w-[100%] md:w-[60%] p-2 ">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nom</label>
                <input type="text" onChange={(e) => handleChange(e)} name="nom" value={user.nom} className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-300 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light ${errors.nom ? 'border-red-300' : ''}`} placeholder="DOE" required />
              </div>
              <div>
                <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Prenom</label>
                <input type="text" onChange={(e) => handleChange(e)} name="prenom" value={user.prenom} className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-300 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light ${errors.prenom ? 'border-red-300' : ''}`} placeholder="John" required />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                <input type="email" onChange={(e) => handleChange(e)} name="email" value={user.email} className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-300 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light ${errors.email ? 'border-red-300' : ''}`} placeholder="johndoe@gmail.com" required />
              </div>
              <div>
                <label htmlFor="profession" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Profession</label>
                <input type="text" onChange={(e) => handleChange(e)} name="profession" value={user.profession} className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-300 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light ${errors.profession ? 'border-red-300' : ''}`} placeholder="Entrer vôtre profession" required />
              </div>
              <div>
                <label htmlFor="profil" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Profil</label>
                <input type="file" onChange={(e) => handleChange(e)} name="profil" className="w-full block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" />
              </div>
              <button type="submit" className={`py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-500 sm:w-fit hover:bg-blue-700 focus:outline-none dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-colors ${Object.keys(errors).length ? 'bg-red-300 text-white' : ''}`}>{isSubmitting ? 'En cours...' : 'Mettre à jour'}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
