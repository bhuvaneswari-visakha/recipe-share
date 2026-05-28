import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const AboutStyle = {
    backgroundImage: `url(https://i.pinimg.com/736x/86/31/97/8631973ad7d921356cca29e309029e74.jpg)`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  };

  return (
    <div id="About" style={AboutStyle} className="py-28 sm:py-36 lg:py-44 flex items-center justify-center">
      <div className="px-4 sm:px-6 lg:px-8 text-black rounded-lg mx-auto w-full max-w-5xl">
        <section className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-10 sm:p-16 lg:p-20 pb-20 sm:pb-28 lg:pb-32 border border-white/50">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="text-violet-600 font-bold tracking-widest text-sm uppercase bg-violet-50 px-4 py-1.5 rounded-full inline-block mb-4">Our Core Philosophy</span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 mb-6 sm:mb-8">
              What We <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-pink-600">Offer You</span>
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed">
              We empower food enthusiasts and creators around the globe to connect, discover, and build their culinary legacies with ease.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-20">
            {/* Card 1: Effortless Sharing */}
            <div className="group bg-white border border-gray-100 hover:border-violet-200/80 shadow-md hover:shadow-2xl rounded-2xl p-8 sm:p-10 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-violet-600"></div>
              <div className="flex gap-6 items-start">
                <div className="p-4 bg-violet-50 text-violet-600 rounded-2xl group-hover:bg-violet-600 group-hover:text-white transition-all duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-violet-700 transition-colors">Effortless Sharing</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Easily upload your recipes with detailed ingredients, instructions, and mouth-watering photos to showcase your creative work.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Card 2: Endless Discovery */}
            <div className="group bg-white border border-gray-100 hover:border-pink-200/80 shadow-md hover:shadow-2xl rounded-2xl p-8 sm:p-10 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-pink-500"></div>
              <div className="flex gap-6 items-start">
                <div className="p-4 bg-pink-50 text-pink-500 rounded-2xl group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">Endless Discovery</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Browse a growing collection of diverse recipes from fellow food lovers, find inspiration, and expand your culinary horizons.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Card 3: Seamless Organization */}
            <div className="group bg-white border border-gray-100 hover:border-amber-200/80 shadow-md hover:shadow-2xl rounded-2xl p-8 sm:p-10 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
              <div className="flex gap-6 items-start">
                <div className="p-4 bg-amber-50 text-amber-500 rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">Seamless Organization</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Keep all your recipes in one place, beautifully categorized, tagged, and easily searchable for quick, stress-free access.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Card 4: Community Connection */}
            <div className="group bg-white border border-gray-100 hover:border-emerald-200/80 shadow-md hover:shadow-2xl rounded-2xl p-8 sm:p-10 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
              <div className="flex gap-6 items-start">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">Community Connection</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Connect with other passionate home cooks, swap expert tips, write detailed reviews, and build your culinary network.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <section className="text-center mt-12 pt-12 border-t border-gray-150 max-w-2xl mx-auto">
            <h4 className="text-3xl font-extrabold text-gray-900 mb-4">Begin Your Culinary Adventure</h4>
            <p className="text-gray-600 text-lg sm:text-xl mb-10 leading-relaxed">
              Ready to share your culinary genius or discover your next signature dish? Create a free account now.
            </p>
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white px-10 py-4.5 rounded-2xl text-lg font-bold shadow-lg shadow-violet-200/50 hover:shadow-xl hover:shadow-violet-300/60 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              Get Started Free
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </section>
        </section>
      </div>
    </div>
  );
};

export default About;