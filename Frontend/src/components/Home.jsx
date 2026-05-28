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
    backgroundPosition: 'center',
    minHeight: '100vh',
    width: '100%',
  };
  
  return (
    <>
    <div>
    <Head/>
      <div id="Home" style={HomeContentStyle} className='top-0 mt-0 overflow-x-hidden'>
        <div className='flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8'> 
          <div className='flex flex-col gap-4 sm:gap-6 lg:gap-8 text-center lg:text-left max-w-4xl'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-violet-600 font-bold leading-tight'>
              Welcome to the
            </h1>
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-violet-600 font-bold leading-tight'>
              Global Kitchen
            </h1>
            <p className='text-xl sm:text-2xl md:text-3xl text-pink-700 italic font-medium'>
              Let's See what today's Dishes 😋
            </p>
          </div>
        </div>
      </div>
      <section id="About" className="py-8 sm:py-12 bg-transparent">
        <About/>
      </section>
      <section id="Features" className="py-8 sm:py-12 bg-transparent">
        <Features/>
      </section>
      <section id="Contact" className="py-8 sm:py-12 bg-transparent">
        <ContactUs/>
      </section>

      <Footer/>
      </div>
    </>
  )
}

export default Home