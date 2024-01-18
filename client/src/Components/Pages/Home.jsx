import React, { useState } from 'react'
import Navbar from '../Elements/Navbar';
import Disaster from './Disasters.jsx';
import ContactUs from './ContactUs.jsx';
import Blog_page from './Blog_page.jsx';
import SubscribeForm from '../Elements/Subscribeform';

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
        {/* <Disaster/> */}
        {/* <ContactUs /> */}
        {/* <Blog_page/> */}
        <SubscribeForm />
      </div>
    </>
  )
}

export default Home
