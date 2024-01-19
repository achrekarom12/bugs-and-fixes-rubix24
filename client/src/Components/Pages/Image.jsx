import React, { useState } from 'react';
import Desasterget from '../../API_init/Desasterapi'
import axios from 'axios';

const Image = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [prediction, setPrediction] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setImageUrl(URL.createObjectURL(file));
    };

    const handlePredictClick = async () => {
        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
    
            const response = await axios.post('http://127.0.0.1:5000/predictImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            const reply = response.data.reply; // Corrected here
            console.log(reply);
            // Set the state or do something with the reply
        } catch (error) {
            console.error('Error predicting:', error);
        }
    };

    return (
        <div className=' flex justify-center items-center'>
            <div className='h-[500px] w-[400px] flex flex-col justify-between items-center bg-white rounded-lg mr-4'>
                <input className='mt-56 ml-9 text-center' type="file" accept="image/*" onChange={handleFileChange} />
                <button className='rounded p-2 m-2' style={{ backgroundColor: "#0184b0", color: 'white' }} onClick={() => { handlePredictClick() }}>Upload</button>
            </div>
            <div className='h-[500px] w-[500px] flex flex-col justify-center items-center bg-white rounded-lg ml-4'>
                {prediction && (
                    <div className="mt-4">
                        <p>{reply}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Image;
