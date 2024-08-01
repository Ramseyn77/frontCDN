import React from 'react'
import { UserCircle, MailIcon, Briefcase } from 'lucide-react'

const UserCard = ({profil, name,email,profession}) => {
  return (
    <div className=' border shadow-md shadow-gray-300 rounded-xl px-3 py-2 '>
        <div className="items-center justify-center flex flex-col ">        
        {profil ? (
                <img src={'http://localhost:8000/storage/'+profil} alt="Logo" className="h-16 w-16 bg-transparent border-4 border-blur rounded-full" />
              ) : (
                <UserCircle className="h-16 w-16 bg-transparent border-4 border-blur rounded-full" />
              )}
        </div>
        <div className="text-center mt-3 flex flex-col gap-3">
            <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-3">
                {name}
            </h3>
            <div className="text-sm leading-normal flex flex-row items-center gap-1 mt-0 mb-2 text-blueGray-400 font-bold">
            <MailIcon className='h-4 w-4 inline' />
                {email}
            </div>
            <div className="text-sm leading-normal flex flex-row items-center gap-1 mt-0 mb-2 text-blueGray-400 font-bold">
            <Briefcase className='h-4 w-4 inline' />
            <div className="">{profession ? profession : 'Pas de profession enregistrée'}</div>
            </div>
        </div>
    </div>
  )
}

export default UserCard
