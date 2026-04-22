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
    padding: '1rem'
  };

  return (
    <div style={LoginStyle}>
      <div className="bg-white bg-opacity-95 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md mx-4">
        <Link to='/' className="block mb-4">
          <Logo />
        </Link>
        
        <p className="text-purple-600 text-sm mb-2">
          Please login to get access to your account
        </p>
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
          Welcome Back
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-semibold text-gray-700 block">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full border-2 border-gray-300 focus:border-purple-500 rounded-lg px-4 py-3 transition-colors outline-none"
            />
          </div>
          
          <button
            type="submit" 
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-lg text-white font-semibold bg-purple-600 hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          
          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-purple-600 hover:text-purple-700 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;