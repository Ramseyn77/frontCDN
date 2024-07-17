import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';

const List = () => {
    const {id,type} = useParams()
    const [articles, setArticles] = useState([])

    const user_id = localStorage.getItem('user_id')
    useEffect(() => {
      fetcArticles()
    },[])

    const fetcArticles = async () => {
       try {
          if (type === 'titre') {
              const response = await axios.get('http://localhost:8000/api/titres/'+id+'/articles')
              setArticles(response.data.articles)
          }else if(type === "chapitre"){
              const response = await axios.get('http://localhost:8000/api/chapitres/'+id+'/articles')
              setArticles(response.data.articles)
          }else {
              setArticles([])
          }
       } catch (error) {
        console.error('Error whith articles', error)
       }
    }
    const navigate = useNavigate()
    const handleClick =  async(id) => {
      try {
        if (user_id) {
          const dataSend = {
            user_id : user_id,
            article_id : id
          }
          const response = await axios.post('http://localhost:8000/api/consultations', dataSend)
          console.log(response.data.message)
        }
        navigate('/articles/show/'+id)
      } catch (error) {
        console.error('message', error)
      }
    }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar link="articles" />
      <div className="flex-grow overflow-auto py-4 px-4 md:px-8 h-[70vh] ">
        {articles.length > 0 ? (
          <div className="w-full flex flex-col items-center">
            {articles.map((item, i) => (
              <div key={i} className="sm:w-[50%] w-full md:w-[70%] mx-auto flex flex-col items-center justify-center space-x-6 mb-3 py-2 px-3 rounded-md">
                <div className="flex flex-row items-center w-full space-x-3">
                  <button type="button" onClick={(e) => handleClick(item.id)} className="text-blue-500 font-semibold text-sm sm:text-md hover:underline hover:text-blue-400">
                    {`Articles ${item.numero} :`}
                  </button>
                  <div className="text-sm sm:text-md font-semibold">{item.nom}</div>
                </div>
                <div
                  className="text-xs sm:text-sm" style={{display: '-webkit-box',WebkitLineClamp: 2,WebkitBoxOrient: 'vertical',overflow: 'hidden',}}>
                  {item.contenu}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-40 text-gray-500 mt-2 mx-auto flex flex-col items-center justify-center sm:w-[50%] w-full md:w-[70%]">Aucun article trouvé pour cet "{type}".</div>
        )}
      </div>
    </div>
  )
}

export default List
