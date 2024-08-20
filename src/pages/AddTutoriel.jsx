import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InputForm from '../components/InputForm'
import Navbar from '../components/Navbar'

const AddTutoriel = () => {
    const [tutoriel, setTutoriel] = useState({
        'titre' :  '' ,
        'contenu' : ''
    })
    const [errors, setErrors] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTutoriel({ ...tutoriel, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault() 
        try {
            const response = await axios.post('http://localhost:8000/api/tutoriels', tutoriel)
            if (response.data.tutoriel) navigate('/sucess')
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
              } else {
                setErrorMessage('Une erreur est survenu lors de l\'enrégistrement ');
            }
        }
    }
  return (
    <div className='flex flex-col'>
      <Navbar link={'tutoriel'}/>
      <div className="flex flex-col space-y-10 items-center w-full p-3 ">
        <form method='post' className="flex flex-col space-y-6 justify-center w-[50%] mt-6">
            { errorMessage && (
                <div className='flex flex-col items-center justify-center py-2 w-full bg-red-300 text-white font-semibold rounded-md mb-2'>
                    {errorMessage}
                </div>
            )}
            <div className='flex flex-col w-full'>
                <InputForm name={'titre'} label={'Titre'} onChange={ (e) => handleChange(e)} value={tutoriel.titre} 
                placeholder='Entrer le titre ' error={ errors.titre ? true : false} />

                <label htmlFor='contenu' className='text-black font-semibold text-md'>Contenu</label>
                <textarea name='contenu' value={tutoriel.contenu} onChange={e => handleChange(e)} rows={10}
                 placeholder='Contenu' 
                 className={`w-full outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3 ${errors.contenu ? 'text-red-400 border-red-300' : ''} `} required />

            </div>
            <div className="flex flex-col w-full justify-center items-center mt-4">
              <button type="submit" 
                onClick = {(e) => handleSubmit(e)}
                className='sm:w-[30%] w-full bg-blue-500 text-md font-bold text-white w-[35%] sm:w-[15%] rounded-lg py-2 px-3 hover:bg-blue-400 mb-4'               
              >
                Terminé
              </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default AddTutoriel
