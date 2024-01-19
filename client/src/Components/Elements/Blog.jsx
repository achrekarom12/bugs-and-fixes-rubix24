import React from 'react'

const Blog = (props) => {
  return (
    <div className='flex items-center w-[779px] h-[108px] rounded shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out' style={{ backgroundColor: "#0184b0" }}>
      <div className="ml-8" style={{ color: "white", fontSize: 64, fontWeight: 900 }}>{props.index + 1}</div>
      <h1 className='ml-[50px] ' style={{ color: "white", fontSize: 20, fontWeight: 600 }}>{props.title}</h1>
      <a className='ml-[100px] mt-[50px]' style={{ color: "white" }}>{props.link}</a>
      <button className="bg-white rounded-lg p-2 mr-2 ml-16" style={{ fontFamily: 'Poppins' }} onClick={() => window.location.href = props.link}>Read Report</button>
    </div>
  )
}

export default Blog
