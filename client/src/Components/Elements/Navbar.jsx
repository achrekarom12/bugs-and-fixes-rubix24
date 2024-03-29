import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import { FaMagnifyingGlass } from "react-icons/fa6";

const Navbar = (props) => {

  return (
    <div className='w-full h-[98px] bg-white justify-center pl-[18px] py-[20px] mb-9'>
      <div style={{ backgroundColor: '#0184b0' }} className=' h-[60px] rounded-full mr-[20px]'>
        <img src={logo} alt='logo' className='w-[40px] h-[40px] absolute ml-2 mt-2 cursor-pointer' />
        <p className=' text-white absolute ml-14 mt-3' style={{ fontFamily: 'Poppins', fontSize: 24 }}>Rakshak</p>

        <div className='grid grid-flow-col justify-center mb-2 '>
          <Link to='/' onClick={() => { props.visiblitieupdate(0) }}
            className='  p-2 rounded mt-2 mb-4 mr-4 hover:scale-150 transition-transform duration-300 ease-in-out' style={{ backgroundColor: 'white', fontFamily: 'Poppins', fontWeight: 700, color: '#0184b0' }}>Home</Link>
          <Link to='/search' onClick={() => { props.visiblitieupdate(1) }}
            className=' p-2 rounded mt-2  mb-4 mr-4  hover:scale-125 transition-transform duration-300 ease-in-out' style={{ backgroundColor: 'white', fontFamily: 'Poppins', fontWeight: 700, color: '#0184b0' }}>Search</Link>
          <Link to='/volunteer' onClick={() => { props.visiblitieupdate(1) }}
            className='  p-2 rounded mt-2 mb-4 mr-4  hover:scale-125 transition-transform duration-300 ease-in-out' style={{ backgroundColor: 'white', fontFamily: 'Poppins', fontWeight: 700, color: '#0184b0' }}>DSS</Link>
          <Link to='/contact' onClick={() => { props.visiblitieupdate(2) }}
            className='  p-2 rounded mt-2 mb-4 mr-4  hover:scale-125 transition-transform duration-300 ease-in-out' style={{ backgroundColor: 'white', fontFamily: 'Poppins', fontWeight: 700, color: '#0184b0' }}>Contact Us</Link>
            {/* <Link to='/image' onClick={() => { props.visiblitieupdate(2) }}
            className='  p-2 rounded mt-2 mb-4 mr-4  hover:scale-125 transition-transform duration-300 ease-in-out' style={{ backgroundColor: 'white', fontFamily: 'Poppins', fontWeight: 700, color: '#0184b0' }}>Image</Link> */}
          <Link to='/chatbot' onClick={() => { props.visiblitieupdate(2) }}
            className='  p-2 rounded mt-2 mb-4 mr-4  hover:scale-125 transition-transform duration-300 ease-in-out' style={{ backgroundColor: 'white', fontFamily: 'Poppins', fontWeight: 700, color: '#0184b0' }}>Chatbot</Link>
          <Link to='/tweetsAnalysis' onClick={() => { props.visiblitieupdate(2) }}
            className='  p-2 rounded mt-2 mb-4 mr-4  hover:scale-125 transition-transform duration-300 ease-in-out' style={{ backgroundColor: 'white', fontFamily: 'Poppins', fontWeight: 700, color: '#0184b0' }}>Tweets</Link>
          <Link to='/contact' onClick={() => { props.visiblitieupdate(2) }}
            className='  p-2 rounded mt-2 mb-4 mr-4 hover:scale-125 transition-transform duration-300 ease-in-out' style={{ backgroundColor: 'white', fontFamily: 'Poppins', fontWeight: 700, color: '#0184b0' }}>Subsribe Now</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
