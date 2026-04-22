import React, { useState } from 'react';
const ContactUs = () => {
  const contactStyle = {
    backgroundImage : `url(https://i.pinimg.com/1200x/ee/d4/7e/eed47ed6b514b7784d3fa9f7c063c07b.jpg)`,
    backgroundSize:'Cover',
    height:'100vh'
  }
 const handleSubmit = async () => {
        alert("Message Sent");
      }
  return (
   
    <div id="Contact" style={contactStyle}>
      <div className="mx-auto rounded-xl  p-5">
        <div className="text-center mb-3">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Connect With Us!
          </h1>
        </div>

        <div className="gap-1" onSubmit={handleSubmit}>
          <div className="p-3 rounded-lg">
            <form className="space-y-3 w-110 mx-auto" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '15px', width: '90%', maxWidth: '700px' }}>
              <div>
                <label htmlFor="name" className="block text-black text-md font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-lg transition duration-150 ease-in-out"
                  placeholder="Username"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-black text-md font-medium text-gray-700">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-lg transition duration-150 ease-in-out"
                  placeholder="email"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-black text-md font-medium text-gray-700">
                  Your Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="2"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-lg transition duration-150 ease-in-out"
                  placeholder="Tell us what's on your mind..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-lg text-xl font-semibold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transform hover:scale-105 transition-transform duration-200 ease-in-out"
                
               >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;