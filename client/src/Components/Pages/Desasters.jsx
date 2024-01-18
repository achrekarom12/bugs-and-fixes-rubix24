import React, { useState } from 'react'
import Desasterget from '../../API_init/Desasterapi.js';
import Earthquakeget from '../../API_init/earthquake.js';
import Climate from '../Elements/Climate.jsx';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import Marquee from "react-fast-marquee";

const e = new Earthquakeget();
const edata = await e.alerts();

const d = new Desasterget();
const data = await d.alerts();
function Card({ title, content, color }) {
    const [bgColor, setBgColor] = useState('white');

    return (
        <div className='bg-white shadow rounded-lg p-4 mb-4'
            style={{ backgroundColor: bgColor, transition: 'background-color 0.2s' }}
            onMouseEnter={() => setBgColor(color)}
            onMouseLeave={() => setBgColor('white')}>
            <h3 className='text-l leading-tight mb-2' style={{ fontWeight: 500 }}>{title}</h3>
            <p className=''>{content}</p>
        </div>
    );
}

function Earth({ loc, magnitude }) {
    return (
        <div>
            <p className='font-semibold mr-2'>Magnitude: {magnitude}   Location: {loc} <span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span> </p>

        </div>
    );
}

const Desasters = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: ' AIzaSyB1XUi0NtTF-tzkXfztumuiE--O10b7tTc',
    });

    const mapStyles = {
        height: '100%',
        width: '100%',
    };

    const defaultCenter = {
        lat: 20.59,
        lng: 78.96,
    };
    const markers = [
        { position: { lat: data[0]['loc'][1], lng: data[0]['loc'][0] }, content: 'Marker 1' },
        { position: { lat: data[1]['loc'][1], lng: data[1]['loc'][0] }, content: 'Marker 2' },
        { position: { lat: data[2]['loc'][1], lng: data[2]['loc'][0] }, content: 'Marker 3' },
        { position: { lat: data[3]['loc'][1], lng: data[3]['loc'][0] }, content: 'Marker 4' },
        { position: { lat: data[4]['loc'][1], lng: data[4]['loc'][0] }, content: 'Marker 5' },
        { position: { lat: data[5]['loc'][1], lng: data[5]['loc'][0] }, content: 'Marker 6' },
        { position: { lat: data[6]['loc'][1], lng: data[6]['loc'][0] }, content: 'Marker 7' },
        { position: { lat: data[7]['loc'][1], lng: data[7]['loc'][0] }, content: 'Marker 8' },

        { position: { lat: data[8]["loc"][1], lng: data[8]["loc"][0] }, content: 'Marker 1' },

        // Add more markers as needed
    ];

    return (
        <>
            <div className='w-full h-[552px] sm:mt-[5px] mt-[10px] '>
                <div className='flex items-center justify-center'>
                    <div className='w-[800px] bg-white shadow rounded-lg p-4 mb-4 item-center justify-center flex overflow-hidden'>
                        <Marquee>
                            <Earth loc={edata[0]['loc']} magnitude={edata[0]['magnitude']} />
                            <Earth loc={edata[1]['loc']} magnitude={edata[1]['magnitude']} />
                            <Earth loc={edata[2]['loc']} magnitude={edata[2]['magnitude']} />
                            <Earth loc={edata[3]['loc']} magnitude={edata[3]['magnitude']} />
                        </Marquee>
                    </div>
                </div>

                <div className='flex flex-row gap-1 items-center justify-center mt-[10px]'>
                    <div className='w-[500px] h-[600px] bg-gray-600 overflow-hidden rounded-lg'>
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
                        <h2 className='text-xl font-bold mb-4 text-center' style={{ fontFamily: 'Poppins', fontWeight: 700 }}>Disaster Alerts</h2>
                        <Card title={data[0]['message']} content={data[0]['source']} color={data[0]['color']} />
                        <Card title={data[1]['message']} content={data[1]['source']} color={data[1]['color']} />
                        <Card title={data[2]['message']} content={data[2]['source']} color={data[2]['color']} />
                        <Card title={data[3]['message']} content={data[3]['source']} color={data[3]['color']} />
                        <Card title={data[4]['message']} content={data[4]['source']} color={data[4]['color']} />
                        <Card title={data[5]['message']} content={data[5]['source']} color={data[5]['color']} />
                        <Card title={data[6]['message']} content={data[6]['source']} color={data[6]['color']} />
                        <Card title={data[7]['message']} content={data[7]['source']} color={data[7]['color']} />
                        <Card title={data[8]['message']} content={data[8]['source']} color={data[8]['color']} />
                    </div>
                </div>
            </div >
        </>
    )
}

export default Desasters
