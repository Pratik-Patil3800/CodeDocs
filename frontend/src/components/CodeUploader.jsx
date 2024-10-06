import React, { useState } from "react";
import axios from "axios";
import MarkdownDisplay from "./MarkdownDisplay";

function CodeUploader() {
  const [codeText, setCodeText] = useState("");
  const [extraPrompt, setextraPrompt] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [mdcontent, setmdcontent] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  
  const handleTextChange = (event) => {
    setCodeText(event.target.value);
    setSelectedFile(null); 
  };
  const handlepromptChange = (event) => {
    setextraPrompt(event.target.value);
  };

  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCodeText(e.target.result);
        setSelectedFile(file);
        setIsUploading(false);
      };
      reader.onerror = (e) => {
        console.error("Error reading file:", e);
        setIsUploading(false);
      };
      reader.readAsText(file);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit");
  
    try {
     
      const payload = {
        code: codeText,
        extraPrompt: extraPrompt 
      };
      
      const headers = { "Content-Type": "application/json" };
  
      const response = await axios.post(
        "http://localhost:3001/api/generate-docs",
        payload,
        {
          headers,
          withCredentials: true,
        }
      );
      
      setmdcontent(response.data.documentation);
      console.log("Documentation generated:", response.data.documentation);
  
    } catch (error) {
      console.error("Error generating documentation:", error);
    }
  };
  

  return (
    <div className="bg-black">
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">
          <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-green-500">
              Paste Code to Generate Documentation
            </h1>
            <p className="mb-8 leading-relaxed text-grey-300">
              Paste your code or upload a file to generate documentation.
            </p>
            <div className="flex flex-col w-full justify-center items-center">
             
              <div className="relative mb-4 w-full">
                <label
                  htmlFor="code-textarea"
                  className="block text-left text-sm text-gray-500 mb-2"
                >
                  Your Code
                </label>
                <textarea
                  id="code-textarea"
                  rows="15"
                  className="w-full h-60 bg-gray-800 bg-opacity-50 rounded focus:ring-2 focus:ring-green-200 focus:bg-transparent border border-gray-300 focus:border-green-500 text-base outline-none text-gray-200 py-2 px-3 resize-none transition-colors duration-200 ease-in-out"
                  value={codeText}
                  onChange={handleTextChange}
                  placeholder="Paste your code here or upload a file..."
                ></textarea>
                  <textarea
                  id="code-textarea"
                  rows="15"
                  className="w-full h-20 bg-gray-800 bg-opacity-50 rounded focus:ring-2 focus:ring-green-200 focus:bg-transparent border border-gray-300 focus:border-green-500 text-base outline-none text-gray-200 py-2 px-3 resize-none transition-colors duration-200 ease-in-out"
                  value={extraPrompt}
                  onChange={handlepromptChange}
                  placeholder="Provide extra prompt for Custom Generation of Documentation"
                ></textarea>
              </div>

            
              <div className="mb-4 w-full">
                <label
                  htmlFor="file-upload"
                  className="block text-left text-sm text-gray-600 mb-2"
                >
                  Or Upload a File
                </label>
                <input
                  type="file"
                  id="file-upload"
                  accept=".js,.jsx,.ts,.tsx,.py,.java,.c,.cpp,.txt" 
                  onChange={handleFileChange}
                  className="block w-1/3 justify-center text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-green-500"
                />
                {isUploading && (
                  <p className="text-sm text-gray-500 mt-2">Uploading...</p>
                )}
                {selectedFile && (
                  <p className="text-sm text-gray-700 mt-2">
                    Selected File: {selectedFile.name}
                  </p>
                )}
              </div>

             
              <button
                onClick={handleSubmit}
                className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
              >
                Generate Document
              </button>

              {mdcontent ? (
                <MarkdownDisplay mdcontent={mdcontent} />
              ) : (
                <p>Click the button to generate documentation.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CodeUploader;