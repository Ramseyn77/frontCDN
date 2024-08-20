import React, { useState,useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

const About = () => {
    const [mail, setMail] = useState({
        'mailSender' : '',
        'subject' : '' ,
        'content' : ''
    }) 

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setMail({ ...mail, [name]: value });
    }
    const [errors, setErrors] = useState('')

    const handleSubmit = async (e) => {
        try {
            const response = await axios.post('http://localhost:8000/api/mail', mail)
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
              } else {
                console.error(error);
              }
        }
    }

  return (
    <div className="w-full h-auto">
        <Navbar link='about' />
        <div className="w-full flex items-center justify-center text-gray-700 p-4">
        <div className="w-[80%] flex flex-col sm:flex-row items-center p-4 shadow-xl  rounded-lg bg-white mt-4 sm:mt-2 gap-10 max-h-[80vh] overflow-y-auto sm:overflow-hidden">
                <div className="about sm:w-[60%]  flex flex-col p-2 gap-4 ">
                    <div className="text-3xl font-bold items-start flex flex-col mb-4 text-gray-700 ">A propos</div>
                    <div className="text-md w-[95%]">
                    Le projet CDN (Code du Numérique) est une plateforme dédiée à la diffusion d'articles juridiques spécifiques au
                    domaine du numérique au Bénin. Ce site web offre un accès direct aux ressources légales, permettant aux utilisateurs de mieux comprendre et naviguer les enjeux juridiques dans le domaine du numérique. En plus de cela, CDN propose des informations et des conseils pratiques sur la cybercriminalité, incluant des guides pour sécuriser ses appareils informatiques et ses données en ligne.
                    Avec comme phrase d'accroche "Informez-vous et protégez-vous en ligne avec CDN, votre allié contre la
                    cybercriminalité", CDN se positionne comme un outil indispensable pour toute personne souhaitant 
                    rester informée et protégée dans le monde numérique.
                    Ce site s'adresse aussi bien aux professionnels du droit qu'à toute personne désireuse de 
                    comprendre les lois en vigueur dans le domaine numérique au Bénin et de se prémunir contre les
                    menaces cybernétiques.
                    </div>
                </div>

                <div className="w-[100%] md:w-[60%] p-2">
                    <div className="text-3xl font-bold items-start flex flex-col mb-4 ">Contactez-nous</div>
                    <form action="#" class="space-y-4">
                        <div>
                            <label for="email" classNaùe="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                            <input type="email" name="mailSender" onChange={(e) => handleChange(e)} value={mail.mailSender} className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-300 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light ${errors.mailSender ? 'border-red-300' : ''} `} placeholder="name@gmail.com" required />
                        </div>
                        <div>
                            <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sujet</label>
                            <input type="text" name="subject" onChange={(e) => handleChange(e)} value={mail.subject} className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-300 focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light ${errors.subject ? 'border-red-300' : ''} `} placeholder="Comment pouvons vous aidez ?" required />
                        </div>
                        <div class="sm:col-span-2">
                            <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Message</label>
                            <textarea name="content" onChange={(e) => handleChange(e)} value={mail.content} rows="6" className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:border-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${errors.content ? 'border-red-300' : ''}`} placeholder="Laisser un commentaire..."></textarea>
                        </div>
                        <button type="submit" onClick={(e) => handleSubmit(e)} className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-500 sm:w-fit hover:bg-blue-700  focus:outline-none dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About
