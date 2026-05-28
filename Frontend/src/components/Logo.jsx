import React from 'react'

const Logo = () => {
  return (
    <div className="flex gap-2 items-center">
       <img className="h-10 w-10 rounded-full object-cover" src="https://i.pinimg.com/1200x/28/01/7d/28017dd7111d42c644763aa1a24dfd49.jpg" alt="Logo"/>   
       <h1 className='text-2xl font-bold italic text-violet-900'>Global Kitchen</h1>
    </div>
  )
}

export default Logo
