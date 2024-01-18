import React, { useState } from 'react'
import Navbar from '../Elements/Navbar';

import Desasters from './Disasters.jsx';
import ContactUs from './ContactUs.jsx';
import Blog_page from './Search.jsx';
import SubscribeForm from '../Elements/Subscribeform';


const Home = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      <div className='h-screen w-full flex flex-row gap-2'>

        <div>
          {/* Your main content */}
          <button className="border-2 border-black p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
          onClick={openForm}>Open Subscribe Form</button>

          {/* Conditionally render the form based on state */}
          {isFormOpen && <SubscribeForm onClose={closeForm} />}
        </div>
      </div>
    </>
  )
}

export default Home
