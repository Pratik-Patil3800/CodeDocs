
import React from 'react'
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/upload");
  };
  const handleCollaboration = () => {
    navigate("/collab");
  };
  return (

    <div>
       <section class="text-gray-600 body-font bg-black">
        <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <div class="text-center lg:w-2/3 w-full">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-green-600">
              AI-Powered Code Demo Documentation System
            </h1>
            <p class="mb-8 leading-relaxed">
            Introducing an AI-powered solution that transforms the way you document code! No more tedious manual documentation — our tool automatically generates clear, concise explanations from your code snippets. Boost your productivity by instantly writing, running, and testing code with seamless IDE integration, and collaborate with your team in real-time using Collaborative Coding for effortless teamwork!
            </p>
            <div class="flex justify-center">
              <button
                onClick={handleUploadClick}
                class="inline-flex text-white bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-700 rounded text-lg"
              >
                Generate Document
              </button>
              <button
                onClick={handleCollaboration}
                class="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded text-lg"
              >
                Code Here!
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;
