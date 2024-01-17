import React from 'react'
import Navbar from '../Elements/Navbar';
import Sidebar from '../Elements/Sidebar'
import Desdata from '../../utils/Desasterinfo.js';
const Home = () => {
  return (
    <>
      <Navbar />
      <div className='flex flex-row h-screen'>
        <Sidebar />
        <div>

          {/* map witll be here */}
          
          <div className='w-[899px] h-[552px] mt-[90px] ml-[277px]'>
            <h1 className='text-[#ffff] text-[38px]'>Disaster's in your location</h1>
            <div className='w-[800px] h-[437px] bg-white rounded-[40px]'></div>
          </div>
          <div className='flex flex-row gap-3 ml-[297px]'>
            <div className='flex flex-col gap-[4px]'>
              <img className='w-[21px] h-[21px]' src={Desdata.Earthquakes.img} />
              <img className='w-[21px] h-[21px]' src={Desdata.Floods.img} />
              <img className='w-[21px] h-[21px]' src={Desdata.Volcanic_Eruptions.img} />
              <img className='w-[21px] h-[21px]' src={Desdata.Wildfires.img} />
            </div>
            <div className='flex flex-col gap-[4px]'>
              <h1 className='text-[#FF6A00]'>{Desdata.Earthquakes.name}</h1>
              <h1 className='text-[#FF6A00]'>{Desdata.Floods.name}</h1>
              <h1 className='text-[#FF6A00]'>{Desdata.Volcanic_Eruptions.name}</h1>
              <h1 className='text-[#FF6A00]'>{Desdata.Wildfires.name}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
