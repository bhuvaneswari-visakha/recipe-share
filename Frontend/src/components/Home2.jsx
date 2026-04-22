import React from 'react'
import Head2 from './Head2'
import Posts from './Posts'

const Home2 = () => {
    const home2Style = {
        backgroundImage : `url("https://i.pinimg.com/1200x/33/28/af/3328af5718cce4f16135b6d02b322330.jpg")`,
        backgroundSize:'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center center', 
        minHeight: '100vh', 
        width: '100%',
    }
  return (
    <div>
      <Head2/>
    <div id='home' style={home2Style}>
        <div className='py-20 px-10 gap-10 italic height-10/10'>
          <img className='h-50 px-5 pt-5 rounded-full w-60 mx-40 m-4  z-50' src="https://i.pinimg.com/1200x/28/01/7d/28017dd7111d42c644763aa1a24dfd49.jpg" />
      <h1 className='text-purple-700 text-7xl font-serif mx-20'>Global Kitchen</h1>
      </div>
      </div>
      <section id="Posts">
      <Posts/>
      </section>
    </div>
  )
}

export default Home2
