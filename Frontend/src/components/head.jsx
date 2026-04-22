import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
function Head() {
  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 pt-2">
        <div className="flex items-center justify-between h-16 text-black">
          <Logo/>
          <nav className="hidden md:flex items-center space-x-8">
            <a smooth href='#Home' className="hover:text-violet-900 transition-colors">Home</a>
            <a smooth href='#About' className="hover:text-violet-900 transition-colors">About Us</a>
            <a smooth href='#Features' className="hover:text-violet-900 transition-colors">Features</a>
            <a smooth href='#Contact' className="hover:text-violet-900 transition-colors">Contact Us</a>
            <Link to='/Dashboard' className="hover:text-violet-900 transition-colors">Explore</Link>
            
            <Link to="/register">
              <button className="rounded text-white p-2" style={{backgroundColor:'#783fa4'}}>Register</button>
            </Link>
            <Link to="/login">
              <button className='rounded text-white p-2' style={{backgroundColor:'#783fa4'}}>Login</button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Head;