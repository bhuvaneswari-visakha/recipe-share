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
    <div id="About" style={AboutStyle}>
      <div className="p-5 text-black rounded-lg mx-auto pt-20 max-w-4xl relative z-10">
        <section className="mb-8 pb-5 border-dashed">
          <h2 className="text-3xl font-semibold text-[#783fa4] text-center mb-4">What We Offer</h2>
          <ul className="list-none p-0 mt-5">
            <li className="p-4 mb-3 border-2 border-l-6 border-[#783fa4]  rounded-md text-lg leading-relaxed">
              <strong className="text-primary-orange">Effortless Sharing:</strong> Easily upload your recipes with detailed ingredients, instructions, and mouth-watering photos.
            </li>
            <li className="p-4 mb-3 border-2 border-l-6 border-[#783fa4] rounded-md text-lg leading-relaxed">
              <strong className="text-primary-orange">Endless Discovery:</strong> Browse a growing collection of diverse recipes from fellow food lovers, find inspiration, and expand your culinary horizons.
            </li>
            <li className="p-4 mb-3 border-2 border-l-6 border-[#783fa4]  rounded-md text-lg leading-relaxed">
              <strong className="text-primary-orange">Seamless Organization:</strong> Keep all your recipes in one place, categorized, tagged, and easily searchable for quick access.
            </li>
            <li className="p-4 mb-3 border-2 border-l-6 border-[#783fa4]  rounded-md text-lg leading-relaxed">
              <strong className="text-primary-orange">Community Connection:</strong> Connect with other home cooks, share tips, and build your culinary network (coming soon!).
            </li>
          </ul>
        </section>
        <section className="text-center mt-5">
          <p className="text-lg text-text-dark mb-5">
            Ready to share your culinary genius or discover your next favorite meal?
            <br />
            <Link to="/register" className="inline-block text-white px-8 py-3 rounded-lg text-xl font-bold no-underline mt-5 bg-[#783fa4] hover:-translate-y-0.5">
              Get Start
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;