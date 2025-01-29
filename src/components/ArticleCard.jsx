import React from 'react'

const ArticleCard = ({number,name,content, onClick}) => {
  return (
    <button onClick={onClick} className="w-full bg-gray-100 hover:bg-white hover:shadow-md flex flex-col sm:px-3 sm:py-2 px-1 rounded-md mb-2">
        <div className=" mb-1 sm:px-2 px-1">
            <span className=' text-xs sm:text-sm font-semibold text-blue-400 '>{'Article '+ number +' '} : </span>
            <span className='text-xs sm:text-sm'>{name}</span>
        </div>
        <div className="sm:px-2 px-1 text-xs sm:text-sm" style={{display: '-webkit-box',WebkitLineClamp: 2,WebkitBoxOrient: 'vertical',overflow: 'hidden',}}>
            {content}
        </div>
    </button>
  )
}

export default ArticleCard
