import {React} from 'react'
import {UserCircle} from 'lucide-react'

const CommentCard = ({photo, name, content, key}) => {

    return (
        <div key={key} className='flex flex-col gap-3 px-3 py-2 w-full border-2 border-gray-200 rounded-xl'>
            <div className="flex flex-row inline space-x-6">
                <div className="items-center justify-center flex flex-col">
                    {
                        photo ?(
                            <img src= {'http://localhost:8000/storage/'+photo} alt="photo"  className="h-8 w-8 bg-transparent hover:cursor-pointer rounded-full" />
                        ) : (
                            <UserCircle className="h-8 w-8 bg-transparent hover:cursor-pointer rounded-full" />
                        )
                    }
                </div>
                <div className="flex flex-col items-center justify-center text-sm font-bold ">{name}</div>
            </div>
            <div className='flex-1 justify-center text-sm ml-10'>
                {content}
            </div>
        </div>
    )
}

export default CommentCard ;