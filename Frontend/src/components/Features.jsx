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
    <>
      <div id="Features" style={FeaturesSectionStyle} className="text-white">
        <div className="p-3 rounded-lg bg-opacity-90 mb-3 mx-auto max-w-5xl text-gray-800 pt-20 relative z-10">
          <h2 className="text-4xl text-[#783fa4] text-center italic mb-8">
            "Use our features to improve your cooking skills."
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mt-10">

            <div className="bg-gradient-to-br from-violet-100 to-white p-4 rounded-lg shadow-md border border-primary-orange transform transition duration-300 hover:scale-105 hover:shadow-xl">
             <h3 className="text-lg font-semibold text-primary-orange mb-3 flex items-center">
                <span className="material-icons mr-2 text-xl">travel_explore</span>Endless Discovery
              </h3>
              <p className="text-lg text-gray-700">
                Browse a growing collection of diverse recipes from fellow food lovers. Find inspiration, explore new cuisines, and expand your culinary horizons with endless possibilities.
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-white p-4 rounded-lg shadow-md border border-primary-orange transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg font-semibold text-primary-orange mb-3 flex items-center">
                <span className="material-icons mr-2 text-xl">auto_stories</span>Seamless Organization
              </h3>
              <p className="text-lg text-gray-700">
                Keep all your recipes in one place, categorized, tagged, and easily searchable for quick access. Never lose a favorite recipe again and spend more time cooking.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-white p-4 rounded-lg shadow-md border border-primary-orange transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg font-semibold text-primary-orange mb-3 flex items-center">
                <span className="material-icons mr-2 text-xl">group</span>Community Connection
              </h3>
              <p className="text-lg text-gray-700">
                Get ready to connect with other home cooks, share tips, and build your culinary network. A vibrant community awaits to enhance your cooking journey!
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-white p-4 rounded-lg shadow-md border border-primary-orange transform transition duration-300 hover:scale-105 hover:shadow-xl">
              <h3 className="text-lg font-semibold text-primary-orange mb-3 flex items-center">
                <span className="material-icons mr-2 text-xl">bookmark_add</span>Personalized Collections
              </h3> 
              <p className="text-lg text-gray-700">
                Save recipes you love, create custom collections, and access your culinary inspirations anytime, anywhere. Tailor your cooking experience to your unique tastes.
              </p>
            </div>
          </div>

          <section className="text-center mt-12 pt-8 border-t border-dashed border-gray-300">
            <Link
              to="/register"
              className="inline-block bg-primary-orange text-white px-10 py-4 rounded-full text-xl font-bold no-underline
                        bg-[#783fa4] hover:-translate-y-1 hover:shadow-lg"
            >
              Get Started Now!
            </Link>
          </section>
        </div>
      </div>
    </>
  );
};

export default Features;