import React from 'react'
import Head from './head'
import HomeImg from '../assets/HomeImg.jpeg'
import Footer from './Footer'

import About from './About'
import Features from './Features'
import ContactUs from './Contact'

const Home = () => {
  const HomeContentStyle = {
    backgroundImage: `url(${HomeImg})`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    width: '100%',
  };
  return (
    <>
    <div>
    <Head/>
      <div id="Home" style={HomeContentStyle} className='top-0 mt-0 overflow-x-hidden'>
        <div className='flex'> 
          <div className='flex flex-col gap-5 px-40 mt-30 font-serif'>
            <h1 className='text-7xl text-violet-600'>Welcome to the</h1>
            <h1 className='text-7xl text-violet-600'> Global Kitchen</h1>
            <p className='text-2xl text-pink-700 italic'>Let's See what today's Dishes 😋</p>
          </div>
        </div>
      </div>
      <section id="About">
        <About/>
      </section>
      <section id="Features">
        <Features/>
      </section>
      <section id="Contact">
        <ContactUs/>
      </section>

      <Footer/>
      </div>
    </>
  )
}

export default Home