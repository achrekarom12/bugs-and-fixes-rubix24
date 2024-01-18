import React, { useState } from 'react';
import Desasterget from '../../API_init/Desasterapi'

const Image = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleUpload = async () => {
        // Create a FormData object to send the image file to the backend
        const formData = new FormData();
        formData.append('image', selectedImage);
        console.log("Image Gone");

        const d = new Desasterget();
        const data = await d.images(formData);
        // Send the image to the backend for processing
        console.log(data);
    };

    return (
        <div className=' flex justify-center items-center'>
            <div className='h-[500px] w-[400px] flex flex-col justify-between items-center bg-white rounded-lg mr-4'>
                <input className='mt-56 ml-9 text-center' type="file" onChange={handleImageChange} />
                <button className='rounded p-2 m-2' style={{ backgroundColor: "#0184b0", color: 'white' }} onClick={handleUpload}>Upload</button>
            </div>
            <div className='h-[500px] w-[500px] flex flex-col justify-center items-center bg-white rounded-lg ml-4'>
                <p></p>
            </div>
        </div>
    );
};

export default Image;
