import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Link, useNavigate } from 'react-router-dom';

const Head2 = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); 

  const handleLogout = () => {
    localStorage.clear(); 
    setIsLoggedIn(false);
    navigate('/login'); 
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo/>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link to='/Dashboard' className="text-gray-800 hover:text-purple-600 transition-colors font-medium text-base">
              🏠 Home
            </Link>
            
            {isLoggedIn && ( 
              <Link to='/create' className="text-gray-800 hover:text-purple-600 transition-colors font-medium text-base">
                ➕ Create Post
              </Link>
            )}
            
            <Link to='/Posts' className="text-gray-800 hover:text-purple-600 transition-colors font-medium text-base">
              📖 Posts
            </Link>
            
            {isLoggedIn && ( 
              <Link to='/Profile' className="text-gray-800 hover:text-purple-600 transition-colors font-medium text-base">
                👤 Profile
              </Link>
            )}
            
            {isLoggedIn ? (
              <button
                className="px-5 py-2 rounded-lg text-white font-semibold bg-red-600 hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
                onClick={handleLogout}
              >
                🚪 Log Out
              </button>
            ) : (
              <Link to='/'>
                <button className="px-5 py-2 rounded-lg text-white font-semibold bg-purple-600 hover:bg-purple-700 transition-all shadow-md hover:shadow-lg">
                  ← Back
                </button>
              </Link>
            )}
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
              <Link 
                to='/Dashboard' 
                className="text-gray-800 hover:text-purple-600 transition-colors py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                🏠 Home
              </Link>
              
              {isLoggedIn && ( 
                <Link 
                  to='/create' 
                  className="text-gray-800 hover:text-purple-600 transition-colors py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ➕ Create Post
                </Link>
              )}
              
              <Link 
                to='/Posts' 
                className="text-gray-800 hover:text-purple-600 transition-colors py-2 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                📖 Posts
              </Link>
              
              {isLoggedIn && ( 
                <Link 
                  to='/Profile' 
                  className="text-gray-800 hover:text-purple-600 transition-colors py-2 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  👤 Profile
                </Link>
              )}
              
              <div className="pt-2">
                {isLoggedIn ? (
                  <button
                    className="w-full px-5 py-2 rounded-lg text-white font-semibold bg-red-600 hover:bg-red-700 transition-all shadow-md"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    🚪 Log Out
                  </button>
                ) : (
                  <Link to='/' onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full px-5 py-2 rounded-lg text-white font-semibold bg-purple-600 hover:bg-purple-700 transition-all shadow-md">
                      ← Back
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Head2;