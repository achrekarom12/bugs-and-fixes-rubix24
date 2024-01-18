import React from 'react'

const Sidebar = (props) => {
  return (
    <>
   
    <div className={` bg-[#C7C7C7] w-[256px] h-screen z-[100] ${props.visiblity} top-0`}>
      <div className='flex flex-col gap-[71px] px-[20px] pt-[150px] cursor-pointer'>
        <div className='h-auto w-[216px] hover:scale-105 ease-out duration-300'>
          <h1 className='text-[31px]'>Home</h1>
          <p className=' text-[12px]'>Get updates about your Hometown</p>
        </div>

        <div className='h-auto w-[216px] hover:scale-105 ease-out duration-300 cursor-pointer'>
          <h1 className=' text-[31px]'>Volunteer</h1>
          <p className=' text-[12px]'>volunteer for Rehab Centers</p>
        </div>

        <div className='h-auto w-[216px] hover:scale-105 ease-out duration-300 cursor-pointer'>
          <h1 className=' text-[31px]'>News</h1>
          <p className=' text-[12px]'>Stay updated with latest disaster news</p>
        </div>
        <div className='h-auto w-[216px] hover:scale-105 ease-out duration-300 cursor-pointer'>
          <h1 className=' text-[31px]'>Help</h1>
          <p className=' text-[12px]'>Contacts</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Sidebar
