import React from 'react'

const ArticleCard = ({number,name,content, onClick}) => {
  return (
    <button onClick={onClick} className="w-full bg-white shadow-lg hover:bg-gray-200 flex flex-col sm:px-3 sm:py-2 px-1 rounded-sm mb-2">
        <div className="flex flex-col space-x-1 sm:flex-row md:flex-col items-center justify-center mb-2 space-x-1 lg:w-full ">
            <span className=' text-xs sm:text-sm font-semibold'>{'Article '+ number +' :'} </span>
            <span className='text-xs sm:text-sm'>{name}</span>
        </div>
        <div className="sm:px-2 px-1 text-xs sm:text-sm" style={{display: '-webkit-box',WebkitLineClamp: 2,WebkitBoxOrient: 'vertical',overflow: 'hidden',}}>
            {content}
        </div>
    </button>
  )
}

export default ArticleCard
