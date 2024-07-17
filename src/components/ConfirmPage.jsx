import {React, useState, useEffect} from 'react'
import axios from 'axios'

const ConfirmPage = ({numero, nom, contenu,titre_id, section_id,chapitre_id, livre_id}) => {
  const [livre,setLivre] = useState({})
  const [titre,setTitre] = useState({})
  const [chapitre,setChapitre] = useState({})
  const [section,setSection] = useState({})

  useEffect(() => {
    fetchRessources()
  })
  const fetchRessources = async () => {
   try {
      const response = await axios.get('http://localhost:8000/api/livres/'+livre_id)
      const resultat = await axios.get('http://localhost:8000/api/titres/'+titre_id)
      const result = await axios.get('http://localhost:8000/api/chapitres/'+chapitre_id)
      const log = await axios.get('http://localhost:8000/api/sections/'+section_id)
      setLivre(response.data.livre)
      setChapitre(result.data.chapitre)
      setTitre(resultat.data.titre)
      setSection(log.data.section)
   } catch (error) {
    console.error('problem :', error)
   }
  }

  return (
    <div className='flex flex-col space-y-2 px-6 py-3 items-center justify-center w-full'>
      <div className="flex flex-col justify-center items-center w-full sm:w-[70%]">
        <div className='flex flex-col justify-center items-center space-y-4 w-full'>
          <div className="flex flex-row space-x-2 px-2 py-1 w-full mb-2 items-center">
            <span className='font-bold text-md'>{'Livre '+livre.id+' : '} </span>
            <span className='text-md'>{livre.nom}</span>
          </div>
          <div className="flex flex-row space-x-2 px-2 py-1 w-full mb-2 items-center">
            <span className='font-bold text-md'>{'Titre '+ titre.numero +' : '}</span>
            <span className='text-md'>{titre.nom}</span>
          </div>
          {
            chapitre && (
              <div className="flex flex-row space-x-2 px-2 py-1 w-full mb-2 items-center">
                <span className='font-bold text-md'>{'Chapitre '+chapitre.numero+' : '} </span>
                <span className='text-md'>{chapitre.nom}</span>
              </div>
            )
          }
            {
              section && (
                <div className="flex flex-row space-x-2 px-2 py-1 w-full mb-2 items-center">
                  <span className='font-bold text-md'>{'Section '+ section.numero +' : '} </span>
                  <span className='text-md'>{section.nom}</span>
                </div>
              )
            }
          <div className="flex flex-row space-x-2 px-2 py-1 w-full mb-2 items-center">
            <span className='font-bold text-md'>Numéro : </span>
            <span className='text-md'>{numero}</span>
          </div>
          <div className="flex flex-row space-x-2 px-2 py-1 w-full mb-2 items-center">
            <span className='font-bold text-md'>Intitulé : </span>
            <span className='text-md'>{nom}</span>
          </div>
          <div className="flex flex-row px-2 py-1 w-full items-center ">
            <span className='font-bold text-md'>Contenu : </span>
          </div>
            <div className='flex flex-row w-full px-2  text-md items-center'>{contenu}</div>
        </div>
      
      </div>
    </div>
  )
}

export default ConfirmPage
