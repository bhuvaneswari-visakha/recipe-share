import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Link, useNavigate } from 'react-router-dom';

const Head2 = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        <div className="max-w-7xl mx-auto px-2 ">
          <div className="flex items-center justify-between h-18">
            <Logo/>
            <nav className=" md:px-8 sm:px-1  items-center text-bold space-x-10 " style={{fontSize:'15px'}}>
              <Link to='/Dashboard'><a href="#home" className="text-black hover:text-green-900 transition-colors">Home</a></Link>
              {isLoggedIn && ( 
                <Link to='/create' className="text-black hover:text-green-900 transition-colors">
                  create Post </Link>
              )}
              <a href="#Posts" className="text-black hover:text-green-900 transition-colors">Posts</a>
              
              {isLoggedIn && ( 
              <Link to='/Profile'><a href="#profile" className="text-black hover:text-green-900 transition-colors">Profile</a></Link>
              )}
              {isLoggedIn && (
                <button
                  className=" rounded-2xl p-2 text-white hover:bg-red-600 transition-colors" style={{backgroundColor:'#783fa4',fontSize:'15px'}}
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              ) }
              {!isLoggedIn && ( 
              <Link to='/'><button href="#back"  className=" rounded-2xl p-2 text-white hover:bg-red-600 transition-colors" style={{backgroundColor:'#783fa4',fontSize:'15px'}}
                >Back</button></Link>
              )}
            </nav>
          </div>
        </div>
      </header>
   
  );
}

export default Head2;