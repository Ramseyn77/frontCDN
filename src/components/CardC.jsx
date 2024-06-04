import React from 'react'

const CardC = ({key,number,name,onClick}) => {
  return (
    <button key={key} onClick={onClick} className="flex flex-row h-[10%] w-[60%] rounded-sm shadow-md hover:bg-gray-200 mb-4 ">
            <div className="h-[92px] w-[15%] bg-black items-center rounded-sm justify-center flex text-sm font-bold text-white border-r-2 border-black ">
              {"Chap."+ (number)}
            </div>
            <div className="w-full h-[92px] py-1 px-3 font-semibold flex flex-col space-y-6 justify-center items-center">
              {name}
            </div>
    </button>
  )
}

export default CardC
