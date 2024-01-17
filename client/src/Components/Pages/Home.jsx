import React from 'react'
import Navbar from '../Elements/Navbar';
import Sidebar from '../Elements/Sidebar'
const Home = () => {
  return (
    <>
    <Navbar/>
    <div className='flex flex-row h-screen'>
      <Sidebar/>
      <div className='w-[899px] h-[552px]  mt-[90px] ml-[27px] mr-[24px]'>
        <h1 className='text-[#ffff] text-[38px]'>Disaster's in your location</h1>
        <div className='w-[800px] h-[437px] bg-white'></div>
      </div>
    </div>
    </>
  )
}

export default Home
