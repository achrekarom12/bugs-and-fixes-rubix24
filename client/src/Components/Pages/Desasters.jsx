import React from 'react'
import Desdata from '../../utils/Desasterinfo.js';
import Climate from '../Elements/Climate.jsx';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Desasterget from '../../API_init/Desasterapi.js';

const d = new Desasterget();
const data = await d.alerts();
function Card({ title, content }) {
    return (
        <div className='bg-white shadow rounded-lg p-4 mb-4'>
            <h3 className='font-bold text-xl mb-2'>{title}</h3>
            <p>{content}</p>
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
        lat: data[0]["loc"][1],
        lng: data[0]["loc"][0],
    };
    
    const markers = [
        { position: { lat: data[0]["loc"][1], lng: data[0]["loc"][0] }, content: 'Marker 1' },
        { position: { lat: 37.785, lng: -122.406 }, content: 'Marker 2' },
        // Add more markers as needed
    ];

    return (
        <>
            <div className='w-full h-[552px] sm:mt-[5px] mt-[10px] '>

                <div className='flex flex-row gap-1 items-center justify-center mt-[10px]'>
                    <div className='w-[500px] h-[600px] bg-gray-600 overflow-hidden rounded-lg'>
                        {isLoaded ? (
                            <GoogleMap
                                mapContainerStyle={mapStyles}
                                center={defaultCenter}
                                zoom={4.5}
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
                    <div className='w-[400px] h-[600px] bg-white shadow-lg rounded-lg p-4'>
                        <h2 className='text-xl font-bold mb-4 text-center' style={{ fontFamily: 'Poppins', fontWeight: 500 }}>Disaster Alerts</h2>
                        <Card title='Card 1' content='Content for Card 1' />
                        <Card title='Card 2' content='Content for Card 2' />
                        <Card title='Card 3' content='Content for Card 3' />
                        <Card title='Card 4' content='Content for Card 4' />
                        <Card title='Card 5' content='Content for Card 5' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Desasters
