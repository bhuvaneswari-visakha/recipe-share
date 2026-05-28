import React, { useState } from "react";
import Logo from "./Logo";
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      alert("Login successful");
      console.log("User data:", data);
      localStorage.setItem("user", data.user);
      localStorage.setItem("token", data.token);

      navigate("/Dashboard");

    } catch (error) {
      console.error("Login failed:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const LoginStyle = {
    backgroundImage: `url(https://i.pinimg.com/736x/40/30/31/4030316e4ddbf553bedbb79872f035fe.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center', 
    minHeight: '100vh', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1.5rem',
    width: '100%',
  };

  return (
    <div style={LoginStyle}>
      <div className="bg-white/95 backdrop-blur-md p-8 sm:p-12 rounded-3xl shadow-2xl w-full max-w-md mx-auto border border-white/50 animate-fadeIn">
        <div className="flex flex-col items-center mb-8">
          <Link to='/' className="block transform hover:scale-102 transition-transform mb-4">
            <Logo />
          </Link>
          <span className="text-violet-600 font-bold uppercase tracking-widest text-xs bg-violet-50 px-3.5 py-1.5 rounded-full inline-block">
            Member Access
          </span>
        </div>
        
        <h2 className="text-3xl font-black text-center text-gray-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm sm:text-base mb-8">
          Enter your login credentials below to continue.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your username"
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Your secure password"
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
                Logging In...
              </>
            ) : (
              <>
                Sign In
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </>
            )}
          </button>
          
          <p className="text-center text-gray-500 text-sm mt-4">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-violet-600 hover:text-pink-600 font-bold hover:underline transition-colors">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;