import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full h-[78px] bg-[#17242E] pl-[18px] py-[20px]'>
      <div className='grid grid-flow-col'>
        <img src='./icons/menue.svg' className='w-[45px] h-[38px] hover:scale-150 transition-transform duration-300 ease-in-out' />
        <h1 className='text-[#ffff]'>Disaster app</h1>
      </div>
    </div>
  )
}

export default Navbar
