import React from 'react'

const EventCard = ({number,content}) => {
    return (
        <div className="w-full shadow-md flex flex-col sm:px-3 sm:py-2 px-1 rounded-sm mb-2 bg-gray-100">
          <div className="flex flex-col mb-2 px-2 ">
              <span className=' text-blue-400 text-xs sm:text-sm font-semibold'>{'Fait '+ number + ' :'} </span>
          </div>
          <div className="sm:px-2 px-1 text-xs sm:text-sm">
              {content}
          </div>
        </div>
    )
}

export default EventCard
