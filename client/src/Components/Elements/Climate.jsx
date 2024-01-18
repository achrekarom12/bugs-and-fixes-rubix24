import React from 'react'
import Climate_card from './Climate_card'

const Climate = () => {
  return (
    <div className='sm:w-[800px] w-full h-screen rounded-[10px] flex flex-col justify-center items-center gap-3'>
      <h1 className='text-center text-[40px]'>Current wheater in major countires</h1>
      <div className='flex flex-col gap-3 overflow-hidden'>
        <Climate_card Cityname="Mumbai" Temprature="1000c"/>
        <Climate_card Cityname="Pune" Temprature="-1000c"/>
        <Climate_card Cityname="Delhi" Temprature="-1000c"/>
        <Climate_card Cityname="Ahemdabad" Temprature="-1000c"/>
      </div>
    </div>
  )
}

export default Climate
