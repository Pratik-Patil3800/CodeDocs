import React from "react";
import { useNavigate } from "react-router-dom";

function Tutorial() {
  const navigate = useNavigate();

  const handleTutClick = () => {
    navigate("/addproject");
  };
  return (
    <div className="bg-black">
      <section class="text-gray-600 body-font lg:px-36 px-10 ">
        <div class="container px-5 py-24 mx-auto flex flex-wrap">
          <h2 class="sm:text-3xl text-2xl text-green-700 font-medium title-font mb-2 md:w-2/5">
      Share your Knowledge with Others by writing a tutorial.{" "}
          </h2>
          <div class="md:w-3/5 md:pl-6">
            <p class="leading-relaxed text-base">
              By writing a tutorial you can guide other coders just like you to
              write and understand how a particular code works step by step.
            </p>
            <div class="flex md:mt-4 mt-6">
              <button onClick={handleTutClick}class="inline-flex text-white bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded">
                Write Tutorial
              </button>
              <a class="text-green-500 inline-flex items-center ml-4">
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Tutorial;
