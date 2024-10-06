import React from 'react'

function Features() {
  return (
    <div className='bg-black'>
      <section class="text-gray-600 body-font px-24">
  <div class="container px-5 py-12 mx-auto">
    <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
      <h1 class="sm:text-3xl text-4xl font-medium title-font mb-2 text-green-700">Our Features</h1>
     
    </div>
    <div class="flex flex-wrap -m-4">
      <div class="xl:w-1/3 md:w-1/3 p-4">
        <div class="border border-gray-700 p-6 rounded-lg  transform transition duration-300 shadow-md shadow-gray-800 hover:scale-105 hover:shadow-lg">
         
          <h2 class="text-lg text-green-700 text-center font-medium title-font mb-2">AI Driven Document Generation</h2>
          <p class="leading-relaxed text-white text-center">Generate document of a code by using AI within few seconds. </p>
        </div>
      </div>
      <div class="xl:w-1/3 md:w-1/3 p-4">
        <div class="border border-gray-700 p-6 rounded-lg  transform transition duration-300 shadow-md shadow-gray-800 hover:scale-105 hover:shadow-lg">
          
          <h2 class="text-lg text-green-700 text-center font-medium title-font mb-2">IDE Integration</h2>
          <p class="leading-relaxed text-white text-center">Write the code, run and get the result within few seconds.</p>
        </div>
      </div>
      <div class="xl:w-1/3 md:w-1/3 p-4">
        <div class="border border-gray-700 p-6 rounded-lg  transform transition duration-300 shadow-md shadow-gray-800 hover:scale-105 hover:shadow-lg">
         
          <h2 class="text-lg text-green-700 text-center font-medium title-font mb-2">Collaborative Coding</h2>
          <p class="leading-relaxed text-white text-center">Collaborate with your friends and get instant feedback.</p>
        </div>
      </div>
    
    </div>
  
  </div>
</section>
    </div>
  )
}

export default Features
