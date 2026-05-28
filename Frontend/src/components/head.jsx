import React, { useState } from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

function Head() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-violet-100/40 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 text-black">
          <Link to="/" className="transform hover:scale-102 transition-transform">
            <Logo/>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 flex-wrap justify-end">
            <a href='#Home' className="relative py-2 text-gray-700 hover:text-violet-700 transition-colors font-medium whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-violet-600 after:to-pink-500 hover:after:w-full after:transition-all after:duration-300">Home</a>
            <a href='#About' className="relative py-2 text-gray-700 hover:text-violet-700 transition-colors font-medium whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-violet-600 after:to-pink-500 hover:after:w-full after:transition-all after:duration-300">About Us</a>
            <a href='#Features' className="relative py-2 text-gray-700 hover:text-violet-700 transition-colors font-medium whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-violet-600 after:to-pink-500 hover:after:w-full after:transition-all after:duration-300">Features</a>
            <a href='#Contact' className="relative py-2 text-gray-700 hover:text-violet-700 transition-colors font-medium whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-violet-600 after:to-pink-500 hover:after:w-full after:transition-all after:duration-300">Contact Us</a>
            <Link to='/Dashboard' className="relative py-2 text-gray-700 hover:text-violet-700 transition-colors font-medium whitespace-nowrap after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-violet-600 after:to-pink-500 hover:after:w-full after:transition-all after:duration-300">Explore</Link>
            
            <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
              <Link to="/login" className="whitespace-nowrap">
                <button className="rounded-xl border border-violet-600 text-violet-700 px-5 py-2 hover:bg-violet-50 active:scale-95 transition-all font-semibold cursor-pointer text-sm">
                  Login
                </button>
              </Link>
              <Link to="/register" className="whitespace-nowrap">
                <button className="rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white px-5 py-2 shadow-md shadow-violet-200/50 hover:shadow-lg hover:shadow-violet-300/60 active:scale-95 transition-all font-semibold cursor-pointer text-sm">
                  Register
                </button>
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2 rounded-xl hover:bg-violet-50 text-gray-700 hover:text-violet-700 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-violet-50 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              <a href='#Home' className="hover:text-violet-700 hover:bg-violet-50 transition-all px-4 py-2.5 rounded-xl font-medium" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href='#About' className="hover:text-violet-700 hover:bg-violet-50 transition-all px-4 py-2.5 rounded-xl font-medium" onClick={() => setMobileMenuOpen(false)}>About Us</a>
              <a href='#Features' className="hover:text-violet-700 hover:bg-violet-50 transition-all px-4 py-2.5 rounded-xl font-medium" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href='#Contact' className="hover:text-violet-700 hover:bg-violet-50 transition-all px-4 py-2.5 rounded-xl font-medium" onClick={() => setMobileMenuOpen(false)}>Contact Us</a>
              <Link to='/Dashboard' className="hover:text-violet-700 hover:bg-violet-50 transition-all px-4 py-2.5 rounded-xl font-medium" onClick={() => setMobileMenuOpen(false)}>Explore</Link>
              
              <div className="flex flex-col gap-2 pt-4 border-t border-violet-50 px-4">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                  <button className="w-full rounded-xl border border-violet-600 text-violet-700 px-4 py-2.5 hover:bg-violet-50 transition-all font-semibold cursor-pointer">
                    Login
                  </button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full">
                  <button className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 text-white px-4 py-2.5 hover:opacity-95 shadow-md shadow-violet-200/50 transition-all font-semibold cursor-pointer">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Head;