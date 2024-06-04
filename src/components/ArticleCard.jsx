import React from 'react'

const ArticleCard = ({number,name,content}) => {
  return (
    <div className="w-full bg-white shadow-lg flex flex-col px-3 py-2 rounded-sm mb-2">
        <div className="flex flex-row items-center mb-2 space-x-1">
            <span className='text-sm font-semibold'>Article 366 : </span>
            <span className='text-sm'>Lorem ipsum dolor sit amet fugiat</span>
        </div>
        <div className="px-2 text-sm" style={{display: '-webkit-box',WebkitLineClamp: 2,WebkitBoxOrient: 'vertical',overflow: 'hidden',}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga animi ullam possimus, sunt a
            nesciunt tempore qui magni, expedita Beatae eligendi expedita dolorem! . Fuga animi ullam possimus, sunt a
            rerum sit atque saepe? Earum, placeat ullam. Beatae eligendi expedita dolorem!
        </div>
    </div>
  )
}

export default ArticleCard
