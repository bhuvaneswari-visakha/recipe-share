import React, { useState } from "react";
import Logo from "./Logo";
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

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

    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
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
    }
  };
const LoginStyle = {
    backgroundImage: `url(https://i.pinimg.com/736x/40/30/31/4030316e4ddbf553bedbb79872f035fe.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center', 
    minHeight: '100vh', 
    display: 'flex', 
  };

  return (
    <>
    <div style={LoginStyle}>
      
    <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '15px', width: '90%', maxWidth: '500px' }} className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 p-6 rounded">
      
      <Link to='/'><Logo /></Link>
      <p className="text-[#783fa4] text-sm" style={{fontSize:'8px'}}>Please login to get access to your account</p>
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} >
        <div className="register-form flex flex-col gap-3">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter Username"
              required
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
              className="border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            type="submit" 
            className='p-2 px-4 rounded-xl text-white'
            style={{backgroundColor:'#783fa4'}}
          >
            Login
          </button>
          <p>Don't have any account? <Link to="/register" className="text-blue-600 hover:underline">register here</Link></p>
          
        </div>
      </form>
    </div>
    </div>
</>
);
};
export default Login;