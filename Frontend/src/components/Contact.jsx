import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactStyle = {
    backgroundImage: `url(https://i.pinimg.com/736x/8f/c9/24/8fc924c553d1000673d1c4ea603d7182.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      alert("Thank you! Your message has been received.");
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div id="Contact" style={contactStyle} className="py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/50 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Contact details & styling */}
            <div className="lg:col-span-5 bg-gradient-to-br from-violet-600 to-indigo-700 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
              {/* Background abstract overlay decorative shapes */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10">
                <span className="text-pink-300 font-bold uppercase tracking-widest text-sm bg-white/10 px-4 py-1.5 rounded-full inline-block mb-4">Get In Touch</span>
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 leading-tight">
                  Let's Spark A Culinary Conversation
                </h2>
                <p className="text-indigo-100 text-base sm:text-lg mb-8 sm:mb-12 leading-relaxed">
                  Have a suggestion, support request, or commercial proposal? Drop us a line and our kitchen support team will reply within 24 hours.
                </p>
                
                {/* Contact List */}
                <div className="space-y-6">
                  {/* Item 1: Address */}
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-white/10 rounded-xl text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Office Location</h4>
                      <p className="text-indigo-150 text-sm sm:text-base">123 Culinary Boulevard, Foodie City, FC 90210</p>
                    </div>
                  </div>

                  {/* Item 2: Email */}
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-white/10 rounded-xl text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Email Us</h4>
                      <p className="text-indigo-150 text-sm sm:text-base">support@globalkitchen.com</p>
                    </div>
                  </div>

                  {/* Item 3: Phone */}
                  <div className="flex gap-4 items-start">
                    <div className="p-3 bg-white/10 rounded-xl text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Phone Hotline</h4>
                      <p className="text-indigo-150 text-sm sm:text-base">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-6 border-t border-white/10 relative z-10 hidden lg:block">
                <p className="text-indigo-200 italic text-sm">
                  "Good food brings people together. Let's make something amazing today."
                </p>
              </div>
            </div>

            {/* Right Column: Contact form */}
            <div className="lg:col-span-7 p-8 sm:p-12 bg-white">
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Send Us A Message</h3>
                <p className="text-gray-500 text-base">We will review your message and reply as soon as possible.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="block w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-800 transition-all outline-none"
                      placeholder="Jane Doe"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="block w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-800 transition-all outline-none"
                      placeholder="jane.doe@example.com"
                    />
                  </div>
                </div>

                {/* Message TextArea */}
                <div>
                  <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="block w-full px-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-gray-800 transition-all outline-none resize-none"
                    placeholder="Describe how we can support you..."
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 border-none rounded-xl shadow-lg shadow-violet-200/50 hover:shadow-xl hover:shadow-violet-300/60 text-lg font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-violet-300 active:scale-98 transform hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;