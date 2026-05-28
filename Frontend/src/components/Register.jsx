import React, { useState } from 'react';
import Logo from '../components/Logo'; 
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!username || !email || !password) {
        alert("All fields are required for registration.");
        return;
      }

      const response = await fetch(`${API_URL}/api/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username, 
          email,
          password
        })
      });

      const data = await response.json(); 
      if (response.ok) { 
        alert(data.message); 
        console.log(data);
        navigate('/login'); 
      } else {
        alert(data.message || "An error occurred during registration. Please try again.");
        console.error("Registration error response:", data);
      }

    } catch (error) {
      console.error("Network error during registration:", error);
      alert("Could not connect to the server. Please check your network or try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const pageStyle = { 
    backgroundImage: `url(https://i.pinimg.com/1200x/4b/ae/ed/4baeedc4ea603d718216493cd6c660f5.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem'
  };

  return (
    <div style={pageStyle}>
      <div className="bg-white/95 backdrop-blur-md p-8 sm:p-12 rounded-3xl shadow-2xl w-full max-w-md mx-auto border border-white/50 animate-fadeIn">
        <div className="flex flex-col items-center mb-8">
          <Link to='/' className="block transform hover:scale-102 transition-transform mb-4">
            <Logo />
          </Link>
          <span className="text-violet-600 font-bold uppercase tracking-widest text-xs bg-violet-50 px-3.5 py-1.5 rounded-full inline-block">
            Start Free
          </span>
        </div>
        
        <h2 className="text-3xl font-black text-center text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-sm sm:text-base mb-8">
          Join our global foodie community today.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5"> 
          <div>
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder="Choose a username"
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 rounded-xl transition-all outline-none text-base text-gray-800"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              type="email" 
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 rounded-xl transition-all outline-none text-base text-gray-800"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Create a strong password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-50/50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 rounded-xl transition-all outline-none text-base text-gray-800"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 border-none rounded-xl text-lg font-bold text-white bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 shadow-lg shadow-violet-200/50 hover:shadow-xl hover:shadow-violet-300/60 active:scale-98 transform hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating Account...
              </>
            ) : (
              <>
                Sign Up
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </>
            )}
          </button>
        </form>
        
        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-violet-600 hover:text-pink-600 font-bold hover:underline transition-colors">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;