import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Desdata from '../../utils/Desasterinfo.js';


const Desasters = () => {
    const center = [51.505, -0.09]; 
    return (
        <>
            <div className='w-[899px] h-[552px] mt-[50px] ml-[277px]'>
                <h1 className=' text-[38px]'>Disaster's in your location</h1>
                <div className='w-[800px] h-[437px] bg-gray-600 rounded-[40px] overflow-hidden'>
                    <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={center}>
                            <Popup>
                                A marker on OpenStreetMap!
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
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
            </div></>
    )
}

export default Desasters
