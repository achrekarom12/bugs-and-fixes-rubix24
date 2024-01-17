import React from 'react'
import Navbar from '../Elements/Navbar';
import Sidebar from '../Elements/Sidebar'
import Desasters from './Desasters.jsx';




const Home = () => {

 // Initial map center coordinates
  return (
    <>
      <Navbar />
      <div className='flex flex-row h-screen'>
        <Sidebar />
        <div>
         <Desasters/>
        </div>
      </div>
    </>
  )
}

export default Home
