import React, { useEffect,useState } from 'react'
import ArticleCard from './ArticleCard'
import axios from 'axios'
import EventCard from './EventCard'
import { useParams, useNavigate } from 'react-router-dom'

const PartX = ({title, type, reload}) => {
  const {id} = useParams()
  const [articles, setArticles] = useState([])
  const [events, setEvents] = useState([])
  const connectedId = localStorage.getItem('user_id') 

  useEffect(()=>{
    if(type === 'redacteur'){
      fetchArticles()
    }
    if (type === 'article') {
      fetchRessources()
    }
    if (type === 'fait') {
      fetchEvents(id)
    }
    reinisialize()
  },[])

  const reinisialize = async () => {
    if(reload) {
      if(type === 'redacteur'){
        fetchArticles()
      }
      if (type === 'article') {
        fetchRessources()
      }
      if (type === 'fait') {
        fetchEvents(id)
      }
    }
  }

  const fetchEvents = async (id) =>{
    try {
      const response = await axios.get('http://localhost:8000/api/articles/events/'+id)
      console.log(response.data.events)
      setEvents(response.data.events)
    } catch (error) {
      console.error('Error Message', error)
    }
  }

  const fetchArticles = async () => {
    try {   
        const results = await axios.get(`http://localhost:8000/api/articles`)
        setArticles(results.data.articles)
        console.log(articles)
    } catch (error) {
      console.error('Error with articles:', error)
    }
  }

  const fetchRessources = async () => {
    try {
      if(connectedId){
        const results = await axios.get('http://localhost:8000/api/users/'+connectedId+'/consultations')
        setArticles(results.data.articles)
      }else{
        setArticles([])
      }
      console.log(articles)
    } catch (error) {
      console.error('Error with articles:', error)
    }
  }

  const sortedData = articles.sort((a, b) => {
    if (a.id < b.id) {
      return 1;
    } else if (a.id > b.id) {
      return -1;
    } else {
      return 0;
    }
  });

  const navigate = useNavigate()
  const handleClick =  async(id) => {
    try{
      navigate('/articles/show/'+id)
    } catch (error) {
      console.error('message', error)
    }
  }

  return (
    <div className='w-[30%] sm:w-[25%] md:h-[1200px] h-[582px]  py-0 px-2 bg-gray-300'>
        <div className="w-full text-black h-[5%] text-md sm:text-2xl md:text-lg font-bold flex flex-col items-center justify-center mb-3 top-0 bg-gray-300 ">
            {title}
        </div>

            {
              !connectedId && (
                <div className=' flex flex-col items-center justify-center mt-40 font-semibold text-xs sm:text-lg md:text-md'>
                  Connectez-vous
                </div>
              )
            }

            {
              type === 'article' ? (
              <div className="space-y-2">
                {
                  sortedData.length > 0 ? (
                    sortedData.map((item,i) => (
                      <ArticleCard key={i} number={item.numero} name={item.nom} content={item.contenu} onClick={(e) => handleClick(item.id)} />
                    ))
                  ) : <div className='flex flex-col items-center justify-center mt-40 font-semibold text-xs sm:text-lg md:text-md'>
                        Aucune consultation
                      </div>
                }
              </div>
              ) :
              <div></div>
            }

            {
              type === 'redacteur' ? (
              <div className="space-y-2 overflow-y-auto h-[78vh] md:[85vh]">
                {
                  sortedData.length > 0 ? (
                    sortedData.map((item) => (
                      <ArticleCard number={item.numero} name={item.nom} content={item.contenu} />
                    ))
                  ) : <div></div>
                }
              </div>
              ) :
              <div></div>
            }

            {
              type === 'fait' ? (
              <div className="space-y-2 overflow-y-auto h-[78vh] md:[85vh]">
                {
                  events.length > 0 ? (
                    events.map((item) => (
                      <EventCard number={item.id}  content={item.contenu} />
                    ))
                  ) : <div className='flex flex-col items-center justify-center mt-40 font-semibold text-xs sm:text-lg md:text-md'>
                       Aucun fait signaler
                     </div>
                }
              </div>
              ) : <div></div>
            }
      
    </div>
  )
}

export default PartX
