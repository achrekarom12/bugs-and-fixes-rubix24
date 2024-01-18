import React, { useState } from 'react'
import Navbar from '../Elements/Navbar';
import Sidebar from '../Elements/Sidebar'
import Desasters from './Desasters.jsx';
import ContactUs from './ContactUs.jsx';
import Blog_page from './Blog_page.jsx';

const Home = () => {
  const visiblity_states = ["visible", "hidden"];
  const [visible, setvisible] = useState(1);
  const visiblitieupdate = (state) => {
    setvisible(state);
  }
  return (
    <>
      <Navbar visiblitieupdate={visiblitieupdate} />
      <div className='h-screen w-full flex flex-row gap-2'>
        <Sidebar visiblity={visiblity_states[visible]} visiblitieupdate={visiblitieupdate}/>
        {/* <Desasters/> */}
        {/* <ContactUs /> */}
        <Blog_page/>
      </div>
    </>
  )
}

export default Home
