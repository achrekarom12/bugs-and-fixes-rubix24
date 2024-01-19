import React, { useState, useEffect } from 'react'
import Blog from '../Elements/Blog'
import Desasterget from '../../API_init/Desasterapi'

const Search = () => {
  const [blogs, setBlogs] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const d = new Desasterget();
      const data = await d.blogs();
      setBlogs(data);
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    const d = new Desasterget();
    const data = await d.blogs(inputValue);
    setBlogs(data);
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col justify-center items-center w-full'>
        <div className='flex flex-row gap-3'>
          <input className='h-[50px] w-[600px] p-2 border-none focus:outline-none' placeholder='Search' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button className='w-[60px] bg-white rounded' onClick={handleSearch}>Search</button>
        </div>
        <div className='w-full h-screen bg-white mt-2 rounded-xl flex flex-col gap-4 justify-center items-center'>
          {
            blogs.map((blog, i) => <Blog key={i} index={i} title={blog["title"]} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Search