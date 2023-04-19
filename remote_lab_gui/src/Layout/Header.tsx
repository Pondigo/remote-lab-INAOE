import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const Header: React.FC<{ title: string }> = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    //Reload the page
    window.location.reload();
  };

  return (
    <div className="flex justify-between items-center bg-inaoe p-4">
      <button className="bg-white rounded-full p-2" onClick={() => navigate(-1)}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
  <path
    fillRule="evenodd"
    d="M10.707 16.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L7.414 10H17a1 1 0 110 2H7.414l3.293 3.293a1 1 0 010 1.414z"
    clipRule="evenodd"
  />
</svg>

      </button>
      <h1 className="text-white text-xl font-bold">{title}</h1>
      <div className="relative">
      <button onClick={toggleDropdown} className="bg-inaoe rounded-full p-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="#fff">
        <path
            fillRule="evenodd"
            d="M21 12.75a.75.75 0 01-.75.75H3.75a.75.75 0 010-1.5h16.5a.75.75 0 01.75.75zM21 6.75a.75.75 0 01-.75.75H3.75a.75.75 0 010-1.5h16.5a.75.75 0 01.75.75zM3.75 18a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75z"
            clipRule="evenodd"
        />
    </svg>
</button>


      {showDropdown && (
          <div className="absolute top-10 right-0 bg-white shadow-md rounded-md py-2 px-4 z-10">
            <button className="block w-full text-left py-1" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </div>
        )}
        </div>
    </div>
  );
};

export default Header;
