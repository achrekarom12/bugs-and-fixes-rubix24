import React from 'react'
import Navbar from '../Elements/Navbar';
import Sidebar from '../Elements/Sidebar'
import Desasters from './Desasters.jsx';
import ContactUs from './ContactUs.jsx';


const visiblity_states = ["visible","hidden"];

const Home = () => {

 // Initial map center coordinates
  return (
    <>
      <Navbar />
      <div className='h-screen w-full'>
        <Sidebar visiblity={visiblity_states[1]}/>
        <Desasters/>
        {/* <ContactUs/> */}
      </div>
    </>
  )
}

export default Home
