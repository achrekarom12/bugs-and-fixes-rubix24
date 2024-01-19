import React, { useState } from 'react';
import SubscribeForm from '../Elements/SubscribeForm';

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div>
      <button 
      className='mt-4 px-2 py-1 bg-blue-500 text-white rounded'
      onClick={handleOpenForm}>Open Form</button>
      {isFormOpen && <SubscribeForm onClose={handleCloseForm} />}
    </div>
  );
};

export default App;