import React from 'react'
import LogNavbar from '../components/LogNavbar'

const Register = () => {
  return (
    <div className='flex flex-col space-y-10 h-full w-screen'>
      <LogNavbar link={'/register'}/>
    </div>
  )
}

export default Register
