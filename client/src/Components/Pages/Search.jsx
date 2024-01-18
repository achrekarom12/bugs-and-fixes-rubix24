import React from 'react'
import Blog from '../Elements/Blog'
import Desasterget from '../../API_init/Desasterapi'

const d = new Desasterget();
const data = await d.blogs();

const Search = () => {
  const blogss = [];
  for (var i = 0; i < data.length; i++) {
    blogss.push(<Blog key={i} title={data[i]["title"]} />)
  }
  return (
    <div className='h-screen w-full'>
      <div className='flex flex-col justify-center items-center w-full '>
        <div className='flex flex-row gap-3'>
          <input className='h-[30px] w-[600px] input-border border-none focus:outline-none' placeholder='Search'/>
          <button className='w-auto h-auto bg-red-500'>Search</button>
        </div>
        <div className='w-full h-screen bg-white mt-2 rounded-lg flex flex-col gap-10 justify-center items-center'>
          {
            blogss
          }
        </div>
      </div>
    </div>
  )
}

export default Search
