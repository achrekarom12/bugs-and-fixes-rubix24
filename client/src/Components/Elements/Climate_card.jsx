import React from 'react'

const Climate_card = (props) => {
    return (
        <div className='w-auto h-auto'>
            <div className='sm:w-[252px] w-[100px] h-[100px] sm:h-[280px]  bg-blue-800 rounded-md'>
                <h1 className='text-center'>{props.Cityname}</h1>
                <div className='flex flex-row justify-center items-center mt-10'>
                    <div>logo</div>
                    <h1>{props.Temprature}</h1>
                </div>
                <div className='flex flex-row justify-center items-center'>
                    <div className=''>
                        <h1>Calm</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Climate_card
