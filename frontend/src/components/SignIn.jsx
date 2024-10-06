import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function SignIn() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

 

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:3001/api/auth/login', { email, password },
          {
            withCredentials:true,
          }
        );
        
        if (response.status === 200) {
           
            localStorage.setItem('authToken', response.data.token);
            navigate("/"); 
        }
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data.message) {
           
            setErrorMessage(error.response.data.message);
        } else {
            setErrorMessage("Something went wrong. Please try again.");
        }
    }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="max-w-md w-full p-8 space-y-6 bg-gray-800 border-gray-500 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-500">Sign in</h2>

        <form onSubmit={handleLoginClick} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">username address</label>
              <input
                id="email"
                name="email"
                type="username"
                autoComplete="email"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="email"
                
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
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
              Sign in
            </button>

            <div className="text-sm text-green-400">
              Don't have an account? &nbsp;
              <button
                onClick={handleRegisterClick}
                className="font-medium text-lg text-green-600 hover:text-green-500"
              >
                Register
              </button>
            </div>
          </div>
        </form>

      
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default SignIn;
