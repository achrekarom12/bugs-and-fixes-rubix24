import React from 'react'




const Blog = (props) => {
  return (
    <div className='w-[779px] h-[108px] bg-[#F2F2F2] shadow-lg'>
      <h1 className='ml-[100px]'>{props.title}</h1>
      <p className='ml-[100px] mt-[50px]'>time</p>
    </div>
  )
}

export default Blog
