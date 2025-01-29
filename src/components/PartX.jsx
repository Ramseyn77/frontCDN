import React, { useEffect,useState } from 'react'
import ArticleCard from './ArticleCard'
import {fetchData} from '../api'
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
  },[])

  if(reload) {
    if(type === 'redacteur'){
      fetchArticles()
    }
    if (type === 'fait') {
      fetchEvents(id)
    }
  }
 

  const fetchEvents = async (id) =>{
    try {
      const response = await fetchData('/api/articles/events/'+id)
      setEvents(response.events)
    } catch (error) {
      console.error('Error Message', error)
    }
  }

  const fetchArticles = async () => {
    try {   
        const results = await fetchData(`/api/articles`)
        setArticles(results.articles)
    } catch (error) {
      console.error('Error with articles:', error)
    }
  }

  const fetchRessources = async () => {
    try {
      if(connectedId){
        const results = await fetchData('/api/users/'+connectedId+'/consultations')
        const data = await results.articles
        const uniqueData = Object.values(
          data.reduce((acc, item) => {
            acc[item.nom] = item
            return acc
          }, {})
        ) 
        setArticles(uniqueData)
      }else{
        setArticles([])
      }
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
    <div className='w-[30%] sm:w-[25%] sm:h-[1200px] md:h-[1200px] lg:h-[582px] overflow-y-hidden py-0 sm:px-2 '>
        <div className="w-full text-blue-400 h-[5%] px-2 sm:text-sm md:text-md lg:text-2xl font-bold flex flex-col items-center justify-center mb-3 top-0 md:top-2 ">
            {title}
        </div>

            {
              !connectedId && (
                <div className=' flex flex-col items-center justify-center text-blue-400 mt-40 font-semibold text-xs sm:text-lg md:text-md'>
                  Connectez-vous
                </div>
              )
            }

            {
              type === 'article' ? (
              <div className="space-y-2 overflow-y-auto h-[78vh]">
                {
                  sortedData.length > 0 ? (
                    sortedData.map((item,i) => (
                      <>
                        <ArticleCard key={i} number={item.numero} name={item.nom} content={item.contenu} onClick={(e) => handleClick(item.id)} />
                      </>
                    ))
                  ) : <div className='flex flex-col items-center justify-center text-blue-400 mt-40 font-semibold text-xs sm:text-lg md:text-md'>
                        Aucune consultation
                      </div>
                }
              </div>
              ) :
              <div></div>
            }

            {
              type === 'redacteur' ? (
              <div className="space-y-2 overflow-y-auto h-[78vh]">
                {
                  sortedData.length > 0 ? (
                    sortedData.map((item) => (
                      <ArticleCard number={item.numero} name={item.nom} content={item.contenu} onClick={(e) => handleClick(item.id)} />
                    ))
                  ) : <div></div>
                }
              </div>
              ) :
              <div></div>
            }

            {
              type === 'fait' ? (
              <div className="space-y-2 overflow-y-auto h-[78vh]">
                {
                  events.length > 0 ? (
                    events.map((item) => (
                      <>
                        <EventCard number={item.id}  content={item.contenu} />
                      </>
                    ))
                  ) : <div className='flex flex-col items-center justify-center mt-40 text-blue-400  font-semibold text-xs sm:text-lg md:text-md'>
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
