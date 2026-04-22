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
    <div id="Features" style={FeaturesSectionStyle} className="py-12 sm:py-16 lg:py-20">
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-purple-600 text-center font-bold mb-4 sm:mb-6">
            Amazing Features
          </h2>
          <p className="text-center text-gray-600 text-lg sm:text-xl mb-8 sm:mb-12 italic">
            Use our features to improve your cooking skills
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-gradient-to-br from-violet-100 to-white p-6 sm:p-8 rounded-xl shadow-lg border-2 border-purple-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-purple-700 mb-4">
                Endless Discovery
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Browse a growing collection of diverse recipes from fellow food lovers. Find inspiration, explore new cuisines, and expand your culinary horizons.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-100 to-white p-6 sm:p-8 rounded-xl shadow-lg border-2 border-pink-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-pink-700 mb-4">
                Seamless Organization
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Keep all your recipes in one place, categorized, tagged, and easily searchable for quick access. Never lose a favorite recipe again.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-white p-6 sm:p-8 rounded-xl shadow-lg border-2 border-blue-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4">
                Community Connection
              </h3>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Connect with other home cooks, share tips, and build your culinary network. A vibrant community awaits to enhance your cooking journey.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-100 to-white p-6 sm:p-8 rounded-xl shadow-lg border-2 border-orange-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-orange-700 mb-4">
                Personalized Collections
              </h3> 
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                Save recipes you love, create custom collections, and access your culinary inspirations anytime, anywhere. Tailor your experience to your tastes.
              </p>
            </div>
          </div>

          <section className="text-center mt-10 sm:mt-16 pt-8 border-t border-gray-300">
            <Link
              to="/register"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-bold transition-all transform hover:-translate-y-1 hover:shadow-2xl"
            >
              Get Started Now
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Features;