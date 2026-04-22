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
    <div id="About" style={AboutStyle} className="py-12 sm:py-16 lg:py-20">
      <div className="px-4 sm:px-6 lg:px-8 text-black rounded-lg mx-auto max-w-6xl">
        <section className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600 text-center mb-8 sm:mb-12">
            What We Offer 🎯
          </h2>
          
          <ul className="space-y-4 sm:space-y-6">
            <li className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 border-l-4 border-purple-600 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <strong className="text-purple-700 text-lg sm:text-xl block mb-2">🍳 Effortless Sharing:</strong>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Easily upload your recipes with detailed ingredients, instructions, and mouth-watering photos.
              </p>
            </li>
            
            <li className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 border-l-4 border-purple-600 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <strong className="text-purple-700 text-lg sm:text-xl block mb-2">🔍 Endless Discovery:</strong>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Browse a growing collection of diverse recipes from fellow food lovers, find inspiration, and expand your culinary horizons.
              </p>
            </li>
            
            <li className="bg-gradient-to-r from-pink-50 to-orange-50 p-4 sm:p-6 border-l-4 border-purple-600 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <strong className="text-purple-700 text-lg sm:text-xl block mb-2">📚 Seamless Organization:</strong>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Keep all your recipes in one place, categorized, tagged, and easily searchable for quick access.
              </p>
            </li>
            
            <li className="bg-gradient-to-r from-green-50 to-blue-50 p-4 sm:p-6 border-l-4 border-purple-600 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <strong className="text-purple-700 text-lg sm:text-xl block mb-2">👥 Community Connection:</strong>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                Connect with other home cooks, share tips, and build your culinary network (coming soon!).
              </p>
            </li>
          </ul>
          
          <section className="text-center mt-8 sm:mt-12 pt-8 border-t border-gray-300">
            <p className="text-lg sm:text-xl text-gray-700 mb-6">
              Ready to share your culinary genius or discover your next favorite meal?
            </p>
            <Link 
              to="/register" 
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-bold transition-all transform hover:-translate-y-1 hover:shadow-2xl"
            >
              Get Started 🚀
            </Link>
          </section>
        </section>
      </div>
    </div>
  );
};

export default About;