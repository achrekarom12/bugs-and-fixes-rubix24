import React from 'react'

const Navbar = (props) => {
  return (
    <div className='w-full h-[78px] bg-transparent pl-[18px] py-[20px]'>
      <div className='grid grid-flow-col'>
        <img src='./icons/menue.svg' onClick={()=> {props.visiblitieupdate(0)}} className={`w-[45px] h-[38px] hover:scale-150 transition-transform duration-300 ease-in-out`}/>
        <img src='./icons/x.png' onClick= {()=>{props.visiblitieupdate(1)}} className='w-[40px] h-[40px] hover:scale-125 transition-transform duration-300 ease-in-out'/>
        {/* <img className='text-[#ffff]' src='./logo/Logo.png'/> */}
      </div>
    </div>
  )
}

export default Navbar
