import React, { useState } from 'react'
import Desasterget from '../../API_init/Desasterapi.js';
import Earthquakeget from '../../API_init/earthquake.js';
import Climate from '../Elements/Climate.jsx';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import Marquee from "react-fast-marquee";
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

const e = new Earthquakeget();
const edata = await e.alerts();

const d = new Desasterget();
const data = await d.alerts();

const d2 = new Desasterget();
const data2 = await d2.alerts2();

const key = {
    googleMapsApiKey: ' AIzaSyB1XUi0NtTF-tzkXfztumuiE--O10b7tTc',
};

const mapStyles = {
    height: '100%',
    width: '100%',
};

const defaultCenter = {
    lat: 20.59,
    lng: 78.96,
};

function Card({ cardKey, title, content, color }) {
    const [bgColor, setBgColor] = useState('white');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleCardClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const markers = [
        { position: { lat: data2[0]['loc'][1], lng: data2[0]['loc'][0] }, content: 'Marker 1' },
        { position: { lat: data2[1]['loc'][1], lng: data2[1]['loc'][0] }, content: 'Marker 2' },
        { position: { lat: data2[2]['loc'][1], lng: data2[2]['loc'][0] }, content: 'Marker 3' },

    ];

    return (

        <div>
            <div className=' bg-gray-200 shadow-2xl border border-black rounded-lg p-4 mb-4'
                style={{ backgroundColor: bgColor, transition: 'background-color 0.2s' }}
                onMouseEnter={() => setBgColor(color)}
                onMouseLeave={() => setBgColor('white')}
                onClick={handleCardClick}>
                <h3 className='text-l leading-tight mb-2' style={{ fontWeight: 500 }}>{title}</h3>
                <hr style={{ backgroundColor: 'black', height: '2px' }} />
                <p className=''>{content}</p>
            </div>

            {isPopupOpen && (
                <div className='absolute top-32  left-0 w-full h-full flex items-center justify-center'>
                    <div className='h-[550px] w-[900px] border border-black flex flex-row bg-white p-4 rounded-lg shadow-2xl'>
                        <div className='w-[400px] h-[400px] mt-12 bg-gray-600 overflow-hidden rounded-lg'>
                            <GoogleMap
                                mapContainerStyle={mapStyles}
                                center={markers[cardKey].position}
                                zoom={10}
                            >
                                {markers.map((marker, index) => (
                                    <MarkerF
                                        key={index}
                                        position={markers[cardKey].position}
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
                                    </MarkerF>
                                ))}
                            </GoogleMap>


                        </div>
                        <div className='relative flex items-center justify-center flex-grow'>
                            <button className="absolute top-0 right-0" onClick={handleClosePopup}>Close</button>
                            <div className='flex flex-col gap-2'>
                                <div className='w-[400px] h-[30px] bg-white border border-black p-1 rounded'>
                                    <h2 className='justify-center text-center ' style={{ fontWeight: 500, fontFamily: 'Poppins' }}>Source: {data2[cardKey]['source']} </h2>

                                </div>
                                <div className='w-[400px] h-[30px] bg-white border border-black  p-1 rounded' style={{ backgroundColor: data2[cardKey]['color'] }}>
                                    <h2 className='justify-center text-center ' style={{ fontWeight: 500, fontFamily: 'Poppins' }}>Level: {data2[cardKey]['level']}</h2>
                                </div>
                                <div className='w-[400px] h-[300px] bg-white border border-black  p-2 rounded overflow-scroll' >
                                    <h2 className='justify-center text-center ' style={{ fontWeight: 500, fontFamily: 'Poppins' }}>Precautionary Steps</h2>
                                    <p style={{fontFamily: 'Poppins', fontWeight: 300}}>{data2[cardKey]['message']}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }

        </div >
    );
}

function Earth({ loc, magnitude, time }) {
    return (
        <div>
            <p className='font-semibold mr-2'>{magnitude} Magnitude | {loc} | {time}<span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span> </p>

        </div>
    );
}


const Disasters = () => {

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: ' AIzaSyB1XUi0NtTF-tzkXfztumuiE--O10b7tTc',
    });
    const markers = [
        { position: { lat: data[0]['loc'][1], lng: data[0]['loc'][0] }, content: 'Marker 1' },
        { position: { lat: data[1]['loc'][1], lng: data[1]['loc'][0] }, content: 'Marker 2' },
        { position: { lat: data[2]['loc'][1], lng: data[2]['loc'][0] }, content: 'Marker 3' }

    ];

    return (
        <>
            <div className='w-full h-[552px] sm:mt-[5px] mt-[10px] mb-4'>
                <div className='flex items-center justify-center'>
                    <h1 className='font-semibold mr-5 mb-3' style={{ fontSize: 24, color: 'white' }}>Recent Earthquakes:</h1>
                    <div className='w-[600px] bg-white shadow rounded-lg p-4 mb-4 item-center justify-center flex overflow-hidden'>
                        <Marquee pauseOnHover="this.stop();">

                            <Earth loc={edata[0]['loc']} magnitude={edata[0]['magnitude']} time={edata[0]["time"]} />
                            <Earth loc={edata[1]['loc']} magnitude={edata[1]['magnitude']} time={edata[1]["time"]} />
                            <Earth loc={edata[2]['loc']} magnitude={edata[2]['magnitude']} time={edata[2]["time"]} />
                            <Earth loc={edata[3]['loc']} magnitude={edata[3]['magnitude']} time={edata[3]["time"]} />
                        </Marquee>
                    </div>
                </div>

                <div className='flex flex-row gap-1 items-center justify-center mt-[10px]'>
                    <div className='w-[600px] h-[600px] bg-gray-600 overflow-hidden rounded-lg'>
                        {isLoaded ? (
                            <GoogleMap
                                mapContainerStyle={mapStyles}
                                center={defaultCenter}
                                zoom={4.5}
                            >
                                {markers.map((marker, index) => (
                                    <MarkerF
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
                                    </MarkerF>
                                ))}
                            </GoogleMap>

                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    <div className='w-[400px] h-[600px] bg-white shadow-lg rounded-lg p-4 overflow-scroll'>
                        <h2 className='text-xl font-bold mb-4 text-center' style={{ fontFamily: 'Poppins', fontWeight: 700 }}>Alerts</h2>

                        <Card cardKey={0} title={data[0]['message']} content={data[0]['source']} color={data[0]['color']} />
                        <Card cardKey={1} title={data[1]['message']} content={data[1]['source']} color={data[1]['color']} />
                        <Card cardKey={2} title={data[2]['message']} content={data[2]['source']} color={data[2]['color']} />

                    </div>
                </div>

                <div className='mt-5 mb-5 justify-center text-center flex' >
                    <p className='mr-4'>
                        <h2 style={{ color: 'orange', fontSize: 20, fontFamily: 'Poppins' }}>Orange</h2>ALERT
                    </p>
                    <p>
                        <h2 style={{ color: 'yellow', fontSize: 20, fontFamily: 'Poppins' }}>Yellow</h2>WATCH
                    </p>
                </div>

            </div >
        </>
    )
}


export default Disasters

