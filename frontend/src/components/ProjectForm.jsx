import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigating to /addfiles after submission

function ProjectForm() {
 
  const [projectName, setprojectName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
  
  
    try {
      console.log(projectName,category,description);
      const response = await axios.post('http://localhost:3001/api/project/createNewRepo', {projectName,description},
        {withCredentials: true,}
      );
      console.log(response.data);
      alert('Data stored successfully!');
    } catch (error) {
      console.error('Error storing data:', error);
      alert('Failed to store data');
    }
  };
  

  return (
    <div>
      <section className="text-gray-300 bg-black body-font relative min-h-screen">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col text-center w-full mb-10">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4 text-green-600">Add New Project</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-full sm:w-1/2 mx-auto">
                  <div className="relative">
                    <label htmlFor="name" className="leading-7 text-sm text-gray-300">Project Name</label>
                    <input
                      type="text"
                      id="projectName"
                      name="projectName"
                     
                      onChange={(e) => setprojectName(e.target.value)}
                      className="w-full bg-gray-800 bg-opacity-50 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-800 focus:ring-2 focus:ring-green-500 text-base outline-none text-gray-100 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="Enter project name"
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-full sm:w-1/2 mx-auto">
                  <div className="relative">
                    <label htmlFor="category" className="leading-7 text-sm text-gray-300">Category</label>
                    <select
                      id="category"
                      name="category"
                     
                      onChange={(e) => setCategory(e.target.value)} 
                      className="w-full bg-gray-800 bg-opacity-50 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-800 focus:ring-2 focus:ring-green-500 text-base outline-none text-gray-100 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                      required
                    >
                      <option value="" disabled>Select a category</option>
                      <option value="web development">Web Development</option>
                      <option value="data science">Data Science</option>
                      <option value="mobile apps">Mobile Apps</option>
                      <option value="machine learning">Machine Learning</option>
                    </select>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label htmlFor="description" className="leading-7 text-sm text-gray-300">Description</label>
                    <textarea
                      id="description"
                      name="description"
                     
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-gray-800 bg-opacity-50 rounded border border-gray-700 focus:border-green-500 focus:bg-gray-800 focus:ring-2 focus:ring-green-500 h-32 text-base outline-none text-gray-100 py-2 px-4 resize-none leading-6 transition-colors duration-200 ease-in-out"
                      placeholder="Describe the project..."
                    ></textarea>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button type="submit" className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">
                    Add Project
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ProjectForm;
