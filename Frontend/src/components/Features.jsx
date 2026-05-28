import React from 'react';
import { Link } from 'react-router-dom'; 

const Features = () => {
  const FeaturesSectionStyle = {
    backgroundImage: `url(https://i.pinimg.com/736x/da/b3/fc/dab3fc91ee6e0e9f23a977c238842073.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <div id="Features" style={FeaturesSectionStyle} className="py-28 sm:py-36 lg:py-44 flex items-center justify-center">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto w-full max-w-5xl">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-10 sm:p-16 lg:p-20 pb-20 sm:pb-28 lg:pb-32 border border-white/50 animate-fadeIn">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <span className="text-pink-600 font-bold tracking-widest text-sm uppercase bg-pink-50 px-4 py-1.5 rounded-full inline-block mb-4">Unmatched Capabilities</span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 mb-6 sm:mb-8">
              Explore Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-pink-600">Amazing Features</span>
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed">
              Unlock a professional suite of tools specifically crafted to boost your home cooking and recipe creation skills to the next level.
            </p>
          </div>
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-20">
            {/* Card 1: Endless Discovery */}
            <div className="group bg-gradient-to-br from-violet-50/50 to-white p-8 sm:p-10 rounded-2xl shadow-md border border-violet-100/60 hover:border-violet-300 hover:shadow-[0_20px_40px_rgba(120,63,164,0.1)] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-violet-600"></div>
              <div className="flex gap-4 items-center mb-6">
                <div className="p-4 bg-violet-100 text-violet-700 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-violet-700 transition-colors">
                  Endless Discovery
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Browse a growing collection of diverse recipes from fellow food lovers. Find instant inspiration, explore exotic cuisines, and expand your culinary horizons.
              </p>
            </div>
 
            {/* Card 2: Seamless Organization */}
            <div className="group bg-gradient-to-br from-pink-50/50 to-white p-8 sm:p-10 rounded-2xl shadow-md border border-pink-100/60 hover:border-pink-300 hover:shadow-[0_20px_40px_rgba(236,72,153,0.1)] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-pink-600"></div>
              <div className="flex gap-4 items-center mb-6">
                <div className="p-4 bg-pink-100 text-pink-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.282.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.282.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                  Seamless Organization
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Keep all your recipes in one place, categorized, tagged, and easily searchable for instant retrieval. Never lose track of a family recipe again.
              </p>
            </div>
 
            {/* Card 3: Community Connection */}
            <div className="group bg-gradient-to-br from-blue-50/50 to-white p-8 sm:p-10 rounded-2xl shadow-md border border-blue-100/60 hover:border-blue-300 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <div className="flex gap-4 items-center mb-6">
                <div className="p-4 bg-blue-100 text-blue-700 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a19.942 19.942 0 01-6-1.3V10a2 2 0 012-2h12zm0 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v3m10 11H7a2 2 0 01-2-2V5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Community Connection
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Connect directly with other home cooks, exchange feedback, ask ingredients questions, and build a beautiful, collaborative food community.
              </p>
            </div>
 
            {/* Card 4: Personalized Collections */}
            <div className="group bg-gradient-to-br from-orange-50/50 to-white p-8 sm:p-10 rounded-2xl shadow-md border border-orange-100/60 hover:border-orange-300 hover:shadow-[0_20px_40px_rgba(245,158,11,0.1)] hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
              <div className="flex gap-4 items-center mb-6">
                <div className="p-4 bg-orange-100 text-orange-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  Personalized Collections
                </h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Save the recipes you absolute adore, build custom collections, and retrieve them on the go. Tailor your kitchen experience to your specific taste profile.
              </p>
            </div>
          </div>
 
          <section className="text-center mt-12 pt-12 border-t border-gray-150 max-w-xl mx-auto">
            <h4 className="text-3xl font-extrabold text-gray-900 mb-4">Ready to Upgrade Your Kitchen?</h4>
            <p className="text-gray-600 text-lg sm:text-xl mb-10 leading-relaxed">
              Join thousands of foodies sharing their creative cooking recipes globally.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white px-10 py-4.5 rounded-2xl text-lg font-bold shadow-lg shadow-violet-200/50 hover:shadow-xl hover:shadow-violet-300/60 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              Get Started Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Features;