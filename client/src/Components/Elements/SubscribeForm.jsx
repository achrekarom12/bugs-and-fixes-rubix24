import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../database/firebase';

const SubscribeForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { name, phoneNumber, email, location };

    try {
      const docRef = await addDoc(collection(db, "subscribers"), formData);
      console.log("Document written with ID: ", docRef.id);
      alert('You have been subscribed!');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    onClose();
  };

  return (
    <div className='fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50'>
      <div className='w-[300px] h-[400px] bg-white shadow-lg rounded-lg p-4'>
        <button onClick={onClose} className='absolute right-2 top-2 bg-white text-black font-bold rounded px-3 py-1'>X</button>
        <h1 className='text-center mt-2 font-semibold text-xl'>Subscribe to Get Alerts on Your Phone!</h1>
        <p className='p-2 text-center'>Get notifications on your phone as soon as our systems detect alerts, disasters detected around you.</p>
        <form className='grid grid-cols-1 gap-4 p-2' onSubmit={handleSubmit}>
          <input type='text' placeholder='Name' className='h-[40px] border border-black rounded p-2' value={name} onChange={(e) => setName(e.target.value)} />
          <input type='number' placeholder='Phone Number' className='h-[40px] border border-black rounded p-2' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <input type='email' placeholder='Email' className='h-[40px] border border-black rounded p-2' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='text' placeholder='Location' className='h-[40px] border border-black rounded p-2' value={location} onChange={(e) => setLocation(e.target.value)} />
          <div className='text-center'>
            <button type='submit' className='mt-4 px-2 py-1 bg-blue-500 text-white rounded'>Subscribe</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscribeForm;
