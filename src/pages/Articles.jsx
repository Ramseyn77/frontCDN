import React from 'react'
import Navbar from '../components/Navbar'
import ArticlesPart from '../components/ArticlesPart'
import PartX from '../components/PartX'

const Articles = () => {
  return (
    <div className='w-screen h-full'>
      <Navbar link={'articles'} />
      <div className="flex flex-row">
        <ArticlesPart />
        <PartX title={'Récement consulter'} type={'article'} />
      </div>
    </div>
  )
}

export default Articles
