import React, { useState, useEffect } from "react";
import axios from "axios";
import MarkdownDisplay from "./MarkdownDisplay"; 
import { useParams } from "react-router-dom";

function Project() {
  const [currentStep, setCurrentStep] = useState(1);
  const [pages, setPages] = useState([]);
  const [mdContent, setMdContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { repo_id } = useParams();
 
  const handleNext = () => {
    if (currentStep < pages.length) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:3001/api/retrive/listpages", {
          repo_id: repo_id,  
        }, {
          withCredentials: true,
        });
        setPages(response.data.pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, [repo_id]);

  useEffect(() => {
    const fetchMdContent = async () => {
      if (pages.length > 0) {
        try {
          const response = await axios.post("http://localhost:3001/api/project/getFileContent", 
            { projectId: repo_id, filePath: pages[currentStep - 1] },  
            {withCredentials: true,
          });
          console.log(response.data.content)
          setMdContent(response.data.content);
        } catch (error) {
          setError(error.message);
        }
      }
    };
    fetchMdContent();
  }, [currentStep, pages]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen flex ">
      <aside className="w-1/4 bg-slate-950 border-4 border-slate-800 shadow-lg p-4 flex flex-col justify-between">
        <div className="mt-2">
          <h1 className="text-green-600 text-2xl text-center font-bold bg-slate-900 p-2 mb-6">Project Name</h1>
          <ul className="space-y-2">
            {pages.map((step, index) => (
              <li
                key={index}
                className={`cursor-pointer p-2 rounded ${
                  currentStep === index + 1
                    ? "border-l-4 border-green-600 text-green-600 font-bold bg-green-50"
                    : "text-gray-400"
                }`}
                onClick={() => setCurrentStep(index + 1)}
              >
                {index + 1}. {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-0 text-gray-400">
          <div className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="green"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25a3.75 3.75 0 00-7.5 0V9M6 11.25V19.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 19.5v-8.25M9.75 14.25h4.5"
              />
            </svg>
            <span className="text-sm text-green-600">Written by Pratik Patil</span>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="green"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 3v1.5m7.5-1.5V4.5m-7.5 0h7.5m-7.5 0H5.25A2.25 2.25 0 003 6.75v12A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75v-12A2.25 2.25 0 0018.75 4.5h-2.25m-7.5 0V3m7.5 9H9"
              />
            </svg>
            <span className="text-sm text-green-600">Last updated: Oct 4, 2024</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-slate-900 p-8">
        <h1 className="text-2xl text-green-500 font-bold mb-2">
          {currentStep}. {pages[currentStep - 1]}
        </h1>
        

        <div className="overflow-y-auto h-[calc(100vh-10rem)] scrollbar-hide border-4 border-gray-300 mt-4 px-4">
          <MarkdownDisplay mdcontent={mdContent} />
        </div>

        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button className="px-4 py-2 rounded bg-gray-300 text-gray-800" onClick={handleBack}>
              Back
            </button>
          )}
          {currentStep < pages.length && (
            <button className="px-4 py-2 rounded bg-green-600 text-white" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

export default Project;
