import React from 'react'

const EventCard = ({number,content}) => {
    return (
        <div className="w-full bg-white shadow-lg flex flex-col sm:px-3 sm:py-2 px-1 rounded-sm mb-2">
          <div className="flex flex-col space-x-1 md:flex-col items-center justify-center mb-2 space-x-1 lg:w-full ">
              <span className=' text-xs sm:text-sm font-semibold'>{'Fait '+ number + ' :'} </span>
          </div>
          <div className="sm:px-2 px-1 text-xs sm:text-sm">
              {content}
          </div>
        </div>
    )
}

export default EventCard
