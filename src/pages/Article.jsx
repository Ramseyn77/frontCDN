import {React, useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import ArticlePart from '../components/ArticlePart'
import PartX from '../components/PartX'

const Article = () => {


  return (
    <div className='w-screen h-screen overflow-hidden'>
      <Navbar link={'articles'} />
      <div className="flex flex-row">
        <ArticlePart />
        <PartX title={'Faits'} type={'fait'} />
      </div>
    </div>
  )
}

export default Article
