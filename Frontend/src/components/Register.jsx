import React, { useState } from 'react';
import Logo from '../components/Logo'; 
import { Link, useNavigate } from 'react-router-dom';
import Head from './head';
import { API_URL } from '../config';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
   e.preventDefault()
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
    }
  };

  const pageStyle = { 
    backgroundImage: `url(https://i.pinimg.com/1200x/4b/ae/ed/4baeedc4ea603d718216493cd6c660f5.jpg)`,
    backgroundSize: 'cover',
    height: '100vh',
    width: '100%',
    alignItems: 'center',
  };

  return (
    <div style={pageStyle}>
      <div className="p-6 mx-100 top-[50%] rounded w-7/10 md:w-4/10"> 
      <div style={{ marginTop:'20px',backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '15px', width: '100%', maxWidth: '600px' }} >
        <Logo />
        <h2 className="text-xl font-bold mb-4 text-center mt-5">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="register-form flex flex-col mt-10 gap-3" > 
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-medium">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
               
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              type="email" 
              id="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
              
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2"
             
            />
          </div>
          <button
            type="submit" 
            className='bg-[#783fa4] p-2 px-4 rounded-xl text-white'
          >
            Register
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
        </p>
      </div>
      </div>
    </div>
  );
};

export default Register;