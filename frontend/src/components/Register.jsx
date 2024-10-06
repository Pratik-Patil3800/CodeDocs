import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Register() {

  const[username, setUsername] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const [formData, setFormData] = useState({username : '', email: '', password: '' });

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', {
        username,
        email,
        password
      });
      console.log(response.data);      
      alert('Data stored successfully!');
    } catch (error) {
      console.error('Error storing data:', error);
      alert('Failed to store data');
    }
  }
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 border-gray-500 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold text-center  text-green-500">Register</h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">

          <div>
              <label htmlFor="email-address" className="sr-only">
               Username
              </label>
              <input
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>


            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

         

          <div className="flex items-center justify-between">
           
            <button 
              type="submit"
              
              className="w-1/3 px-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
             Register
            </button>
            <div className="text-sm text-green-400">
              Already have an account? &nbsp;
            <button onClick={handleLoginClick} href="#" className="font-medium text-lg text-green-600 hover:text-green-500">
            Sign in
              </button>
              
            </div>
            
          </div>
        </form>
      

        
      </div>
    </div>
  );
}

export default Register;
