import React, { useEffect,useState } from 'react'
import ArticleCard from './ArticleCard'
import axios from 'axios'

const PartX = ({title, type}) => {
  const [articles, setArticles] = useState([])
  const connectedId = null 

  useEffect(()=>{
    fetchRessources()
  },[])

  const fetchRessources = async () => {
    if(connectedId){
      const results = await axios.get(`http://localhost:8000/api/users/${connectedId}/consultations`)
      setArticles(results.data.articles)
    }
    setArticles([])
  }
 

  return (
    <div className='w-[25%] h-[582px] py-0 px-2 bg-gray-300 overflow-auto'>
        <div className="text-black h-[10%] text-2xl font-bold flex flex-col items-center justify-center mb-3 sticky top-0 bg-gray-300 z-10 ">
            {title}
        </div>

            {
              !connectedId && (
                <div className=' flex flex-col items-center justify-center mt-40 font-semibold text-lg'>
                  Connectez-vous
                </div>
              )
            }

            {
              type === 'article' ? (
              <div className="space-y-2">
                
              </div>
              ) :
              <div></div>
            }
      
    </div>
  )
}

export default PartX
