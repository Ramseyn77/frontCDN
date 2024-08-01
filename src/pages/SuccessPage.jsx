import React from 'react'
import Navbar from '../components/Navbar'

const SuccessPage = () => {
  return (
    <div className='w-full h-full'>
      <Navbar />
      <div class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div class="text-center">
          <p class="text-base font-semibold text-indigo-600">200</p>
          <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Success</h1>
          <p class="mt-6 text-base leading-7 text-gray-600">Félicitation, la ressource a été créer avec succès</p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a href="/" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage
