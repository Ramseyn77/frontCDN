import {React, useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import UserCard from '../components/UserCard'
import Chargement from '../components/Chargement'
import axios from 'axios'

const Experts = () => {
  const [experts, setExperts] = useState([])

  useEffect(() => {
    fetchExperts()
  }, [])

  const fetchExperts = async () => {
    try{
      const response = await axios.get('http://localhost:8000/api/experts')
      setExperts(response.data.experts)
    }catch(error) {
      console.error('Message', error)
    }
  }

  return (
    <div className='w-full'>
      <Navbar link={'expert'} />
      <div className="w-full flex items-center justify-center p-4">
        <div className="w-[80%] flex flex-wrap items-center justify-around p-4 sm:mt-2 sm:gap-4 gap-6 max-h-[80vh] overflow-y-auto ">
          {
            experts.length > 0 ? (                
              experts.map((item, i) => (
                <>
                  <UserCard profil={item.profil} name={item.nom +' '+ item.prenom} email={item.email} profession={item.profession} />
                </>
              ))
            ) :
            <Chargement />
          }       
        </div>
      </div>
    </div>
  )
}

export default Experts
