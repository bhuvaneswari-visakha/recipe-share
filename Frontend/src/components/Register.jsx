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
    padding: '1rem'
  };

  return (
    <div style={pageStyle}>
      <div className="bg-white bg-opacity-95 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md mx-4">
        <Link to='/' className="block mb-4">
          <Logo />
        </Link>
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Create Your Account 🎉
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5"> 
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-semibold text-gray-700 block">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder="Choose a username"
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border-2 border-gray-300 focus:border-purple-500 rounded-lg px-4 py-3 transition-colors outline-none"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700 block">
              Email
            </label>
            <input
              type="email" 
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-2 border-gray-300 focus:border-purple-500 rounded-lg px-4 py-3 transition-colors outline-none"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-semibold text-gray-700 block">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Create a strong password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-2 border-gray-300 focus:border-purple-500 rounded-lg px-4 py-3 transition-colors outline-none"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-lg text-white font-semibold bg-purple-600 hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        
        <p className="text-sm mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;