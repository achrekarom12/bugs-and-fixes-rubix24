import React from 'react'

const Navbar = () => {
  return (
    <div className='w-full h-[78px] bg-transparent pl-[18px] py-[20px]'>
      <div className='grid grid-flow-col'>
        <img src='./icons/menue.svg' className='w-[45px] h-[38px] hover:scale-150 transition-transform duration-300 ease-in-out' />
        <img className='text-[#ffff]' src='./logo/Logo.png'/>
      </div>
    </div>
  )
}

export default Navbar
