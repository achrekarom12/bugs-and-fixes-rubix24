import React from 'react'
import Desdata from '../../utils/Desasterinfo.js';
import Climate from '../Elements/Climate.jsx';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';


const Desasters = () => {
    const center = [51.505, -0.09];
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: ' AIzaSyB1XUi0NtTF-tzkXfztumuiE--O10b7tTc',
    });

    const mapStyles = {
        height: '100%',
        width: '100%',
    };

    const defaultCenter = {
        lat: 37.7749,
        lng: -122.4194,
    };

    const markers = [
        { position: { lat: 37.7749, lng: -122.4194 }, content: 'Marker 1' },
        { position: { lat: 37.785, lng: -122.406 }, content: 'Marker 2' },
        // Add more markers as needed
      ];

    return (
        <>
            <div className='w-full h-[552px] sm:mt-[50px] mt-[10px] '>
                <h1 className='sm:text-[38px] text-[20px] text-center font-bold'>Disaster's in your location</h1>
                <div className='flex flex-row gap-10 items-center justify-center mt-[10px]'>
                    <div className='w-[500px] h-screen bg-gray-600 overflow-hidden'>
                        {isLoaded ? (
                            <GoogleMap
                                mapContainerStyle={mapStyles}
                                center={defaultCenter}
                                zoom={10}
                            >
                                {markers.map((marker, index) => (
                                    <Marker
                                        key={index}
                                        position={marker.position}
                                        icon={{
                                            url: './icons/disaster_icons/Earthquakes.png',
                                            scaledSize: new window.google.maps.Size(40, 40), 
                                        }}
                                        onClick={() => {
                                            console.log(`Marker ${index + 1} clicked!`);
                                        }}
                                    >
                                        {marker.content && (
                                            <div>
                                                <h3>{marker.content}</h3>
                                            </div>
                                        )}
                                    </Marker>
                                ))}
                            </GoogleMap>

                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <Climate />
                </div>
                {/* <div className='flex sm:flex-row flex-col sm:gap-20 gap-3 sm:ml-[297px] ml-0'>
                    <div className='flex-row gap-3 flex mt-10'>
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
                </div> */}
            </div>
        </>
    )
}

export default Desasters
