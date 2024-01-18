import React, { useState } from 'react';

const SubscribeForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or validation logic here
    // You can also send the form data to your backend or handle it as needed
    console.log('Form submitted:', { name, phoneNumber, email, location });
    onClose(); // Close the form after submission
  };

  return (
    <div className='flex items-center justify-center'>
      <div className='w-[300px] h-[400px] bg-white shadow-lg rounded-lg mt-6 mb-6 p-4'>
        <h1 className='text-center mt-2 font-semibold text-xl'>Subscribe to Get Alerts on Your Phone!</h1>
        <p className='p-2 text-center'>Get notifications on your phone as soon as our systems detect alerts, disasters detected around you.</p>
        <form className='grid grid-cols-1 gap-4 p-2' onSubmit={handleSubmit}>
          <input type='text' placeholder='Name' className='h-[40px] border border-black rounded p-2' value={name} onChange={(e) => setName(e.target.value)} />
          <input type='number' placeholder='Phone Number' className='h-[40px] border border-black rounded p-2' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <input type='email' placeholder='Email' className='h-[40px] border border-black rounded p-2' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='text' placeholder='Location' className='h-[40px] border border-black rounded p-2' value={location} onChange={(e) => setLocation(e.target.value)} />
          <button type='submit' className='mt-4 px-2 py-1 bg-blue-500 text-white rounded'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SubscribeForm;
