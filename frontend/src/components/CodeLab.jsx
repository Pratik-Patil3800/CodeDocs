import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CodeLab = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomains, setSelectedDomains] = useState({
    AI: false,
    ML: false,
    WebDev: false,
    DataScience: false,
    CloudComputing: false,
  });
  const [tutorials, setTutorials] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCheckboxChange = (domain) => {
    setSelectedDomains({
      ...selectedDomains,
      [domain]: !selectedDomains[domain],
    });
  };

  const handleSearchButtonClick = () => {
    console.log("Searching for:", searchQuery);
    console.log("Selected Domains:", selectedDomains);
  };

 
  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/retrive/allprojects");
        setTutorials(response.data.projects); 
      } catch (error) {
        setError(error.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchTutorials();
  }, []);

  return (
    <div className="flex h-screen">
     
      <aside className="w-64 bg-black border-2 border-gray-800 text-green-400 p-4 flex flex-col justify-between">
        <div>
         
          <div className="flex items-center justify-center h-16 bg-black border-b mb-4 p-2 rounded">
            <h1 className="text-3xl font-bold">CodeLab</h1>
          </div>

         
          <ul className="flex-1 overflow-y-auto">
            {Object.keys(selectedDomains).map((domain) => (
              <li
                key={domain}
                className="mb-2 flex items-center border-b border-green-600 py-2 hover:bg-green-600 rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedDomains[domain]}
                  onChange={() => handleCheckboxChange(domain)}
                  className="mr-3 h-4 w-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                  id={`checkbox-${domain}`}
                />
                <label
                  htmlFor={`checkbox-${domain}`}
                  className="cursor-pointer hover:text-gray-300 text-gray-300 text-lg"
                >
                  {domain === "WebDev"
                    ? "Web Development"
                    : domain === "DataScience"
                    ? "Data Science"
                    : domain === "CloudComputing"
                    ? "Cloud Computing"
                    : domain}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </aside>

     
      <main className="flex-1 p-6 flex flex-col bg-black relative">
       
        <div className="mb-4 flex items-center pb-12 px-12">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search tutorials..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-1/3 h-10 p-2 pl-10 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 absolute top-2 left-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 11a4 4 0 118 0 4 4 0 01-8 0zm6 8l6-6"
              />
            </svg>
            
            <button
              onClick={handleSearchButtonClick}
              className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200"
            >
              Search
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-12 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <p className="text-white">Loading tutorials...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : tutorials.length > 0 ? (
              tutorials.map((tutorial) => (
                <div
                  id={tutorial.repo_id} 
                  onClick={() => navigate(`/project/${tutorial.repo_id}`)}
                  className="bg-white bg-opacity-10 backdrop-blur-md border border-gray-700 p-4 shadow-md rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <h3 className="text-xl text-green-500 font-bold mb-2">
                    {tutorial.name}
                  </h3>
                  <p className="text-gray-500">{tutorial.description}</p>
                </div>
              ))
            ) : (
              <p className="text-white">No tutorials found.</p>
            )}
          </div>
        </div>

       
      </main>
    </div>
  );
};

export default CodeLab;
