import React, { useState } from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

function Head() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 text-black">
          <Logo/>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a href='#Home' className="hover:text-violet-900 transition-colors font-medium">Home</a>
            <a href='#About' className="hover:text-violet-900 transition-colors font-medium">About Us</a>
            <a href='#Features' className="hover:text-violet-900 transition-colors font-medium">Features</a>
            <a href='#Contact' className="hover:text-violet-900 transition-colors font-medium">Contact Us</a>
            <Link to='/Dashboard' className="hover:text-violet-900 transition-colors font-medium">Explore</Link>
            
            <Link to="/register">
              <button className="rounded-lg text-white px-4 py-2 hover:opacity-90 transition-opacity font-medium" style={{backgroundColor:'#783fa4'}}>
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className='rounded-lg text-white px-4 py-2 hover:opacity-90 transition-opacity font-medium' style={{backgroundColor:'#783fa4'}}>
                Login
              </button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <nav className="lg:hidden py-4 border-t border-gray-200 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <a href='#Home' className="hover:text-violet-900 transition-colors py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href='#About' className="hover:text-violet-900 transition-colors py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>About Us</a>
              <a href='#Features' className="hover:text-violet-900 transition-colors py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href='#Contact' className="hover:text-violet-900 transition-colors py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Contact Us</a>
              <Link to='/Dashboard' className="hover:text-violet-900 transition-colors py-2 font-medium" onClick={() => setMobileMenuOpen(false)}>Explore</Link>
              
              <div className="flex flex-col space-y-2 pt-2">
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full rounded-lg text-white px-4 py-2 hover:opacity-90 transition-opacity font-medium" style={{backgroundColor:'#783fa4'}}>
                    Register
                  </button>
                </Link>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className='w-full rounded-lg text-white px-4 py-2 hover:opacity-90 transition-opacity font-medium' style={{backgroundColor:'#783fa4'}}>
                    Login
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