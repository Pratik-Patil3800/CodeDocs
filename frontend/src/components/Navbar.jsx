

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoutClick = () => {
    onLogout();  
    navigate("/");  
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleTutClick = () => {
    navigate("/codelab");
  };

  return (
    <div>
      <header className="text-gray-600 body-font w-full bg-black bg-blur  px-4 sm:px-20 py-2">
        <div className="container mx-auto flex flex-wrap p-5 items-center justify-between">
          <a className="flex title-font font-medium items-center text-gray-900">
            <span onClick={handleLogoClick} className="ml-3 text-3xl text-green-600">CodeDocs</span>
          </a>
          <span className='display-flex space-x-3'>
            <button onClick={handleTutClick} className="inline-flex items-center bg-green-600 py-2 px-3 focus:outline-none hover:bg-gray-900 rounded text-white border-black border-2">
              Tutorials
            </button>
            {isAuthenticated ? (
              <button onClick={handleLogoutClick} className="inline-flex items-center bg-red-600 py-2 px-3 focus:outline-none hover:bg-gray-900 rounded text-white border-black border-2">
                Logout
              </button>
            ) : (
              <button onClick={handleLoginClick} className="inline-flex items-center bg-green-600 py-2 px-3 focus:outline-none hover:bg-gray-900 rounded text-white border-black border-2">
                Login
              </button>
            )}
          </span>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
