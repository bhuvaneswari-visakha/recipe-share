import React, { useState } from 'react';

const ContactUs = () => {
  const contactStyle = {
    backgroundImage: `url(https://i.pinimg.com/1200x/ee/d4/7e/eed47ed6b514b7784d3fa9f7c063c07b.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Message Sent Successfully!");
  };

  return (
    <div id="Contact" style={contactStyle} className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              Connect With Us
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              We'd love to hear from you
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-800 text-sm sm:text-base font-semibold mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base sm:text-lg transition-all outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-800 text-sm sm:text-base font-semibold mb-2">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base sm:text-lg transition-all outline-none"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-800 text-sm sm:text-base font-semibold mb-2">
                Your Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="5"
                required
                className="block w-full px-4 py-3 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base sm:text-lg transition-all outline-none resize-none"
                placeholder="Tell us what's on your mind..."
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 sm:py-4 px-6 border-none rounded-lg shadow-lg text-lg sm:text-xl font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transform hover:scale-105 transition-all"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;