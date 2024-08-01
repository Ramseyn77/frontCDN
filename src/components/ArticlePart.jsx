import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard'
import ShowCard from './ShowCard'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { CheckCircle, X } from 'lucide-react'
import axios from 'axios'

const ArticlePart = () => {
    const [article, setArticle] = useState([])
    const [comments, setComments] = useState([])
    const [contenu, setContenu] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [submitButtonText, setSubmitButtonText] = useState('')
    const {id} = useParams()
    const user_id = localStorage.getItem('user_id')
    
    useEffect(()=>{
      fetchArticle(id)
      fetchComments(id)
    }, [])

    const fetchComments = async (id) =>{
      try {
        const response = await axios.get('http://localhost:8000/api/articles/comments/'+id)
        console.log(response.data.comments)
        setComments(response.data.comments)
      } catch (error) {
        console.error('Error Message', error)
      }
    }

    const fetchArticle = async (id) => {
      try {
        const response = await axios.get('http://localhost:8000/api/articles/'+id)
        console.log(response.data.article)
        setArticle(response.data.article)
      } catch (error) {
        console.error('Error Message', error)
      }
    }

    const handleChange = (e) => {
      setContenu(e.target.value)
    }

    const handleAnnul = () => {
      setShowForm(false)
    }


    const handleSubmit = async (e) => {
      e.preventDefault()
      const dataSend = {
        user_id :user_id, 
        article_id: id, 
        contenu : contenu
      }
      try {
        if (submitButtonText === 'Commentaire') {
          const response = await axios.post('http://localhost:8000/api/comments', dataSend)
          if (response.status===200 ||response.status===201) fetchComments()
        }
        if (submitButtonText === 'Fait') {
          const response = await axios.post('http://localhost:8000/api/events', dataSend)   
        }
        setContenu('')
        setShowForm(false)
      } catch (error) {
        
      }
    }

    const handleShowForm = (buttonText) => {
      setShowForm(true)
      setSubmitButtonText(buttonText)
    }
    
    return (
      <div className='sm:w-[75%] w-[70%] h-auto p-4'>
        <div className='w-full flex flex-col py-3 items-center justify-center'>
          {showForm ? (
            <form method="post" className='flex flex-col justify-center items-center w-full sm:mt-20 sm:w-[50%] '>
              <div className="flex flex-col space-y-2 px-2 py-1 w-full mb-2">
                <label htmlFor='contenu' className='text-black font-semibold text-md'>{submitButtonText}</label>
                <textarea name='contenu' value={contenu} onChange={e => handleChange(e)} rows={10} placeholder={submitButtonText} className='w-full outline-none border border-2 border-gray-300 rounded-lg text-gray-300 text-sm focus:text-gray-900 focus:border-blue-300 px-2 py-3' required />
              </div>

              <div className="w-full flex flex-row items-center justify-between px-3 mt-2 ">
                <button type="submit" onClick={handleAnnul} className='flex flex-row gap-2 items-center px-3 py-2 text-sm text-white font-bold bg-red-400 rounded-md hover:bg-red-300 transition-color' >
                  Annuler
                  <X className='inline h-4 w-4 ' />
                </button>
                <button type="submit" onClick={(e) => handleSubmit(e)} className='flex flex-row gap-2 items-center px-3 py-2 text-sm text-white font-bold bg-blue-400 rounded-md hover:bg-[#6acde5] transition-color'>
                  {submitButtonText}
                  <CheckCircle className='inline h-4 w-4 ' />
                </button>
              </div>
            </form>
          ) : (
            <div className="w-[70%] flex flex-col space-y-6 overflow-y-auto max-h-[80vh]">
              <ShowCard onShowForm={handleShowForm} numero={article.numero} name={article.nom} content={article.contenu} />
              <div className='flex flex-col items-center justify-center text-2xl font-bold'>Commentaires</div>
              {
                comments.length > 0 ?
                (
                  comments.map((item, i) => {
                    return (
                      <CommentCard photo={item.user.profil} name={item.user.nom +' '+ item.user.prenom} content={item.contenu} />
                    )
                  })
                ) : <div className='flex flex-col items-center justify-center mt-10 text-lg font-bold'>Aucun commentaire</div>
              }
            </div>
          )
          }
        </div>
      </div>
    )
}

export default ArticlePart
