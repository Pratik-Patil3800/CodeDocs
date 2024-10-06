
import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import Login from "../Login";
import { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./Navbar";

function Colab() {
  const [login, setlogin] = useState(true);
  const [username, setusername] = useState("");
  const [roomid, setroomid] = useState("");

 
  const skipLogin = () => {
    setlogin(false);
    setusername("Guest"); 
    setroomid("-");
  };


  const joinRoom = () => {
    if (username.trim() === "" || roomid.trim() === "") {
      alert("Please enter both Username and Room ID.");
      return;
    }
    setlogin(false);
  };

  return (
    
    <div className="min-h-screen bg-black text-gray-600 body-font px-24">
        
      <Toaster />
      {login ? (
        <section className="container mx-auto py-24 flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-green-300 mt-6">
              Join the Collaborative Coding
            </h1>
            <p className="leading-relaxed mt-4">
              Generate a room ID and share it with your friends or join using an
              existing room ID.
            </p>

            <div className="mt-8">
              <p className="text-lg text-green-300 mb-4">
              Master coding on your own !
              </p>
              <button
                className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                onClick={skipLogin}
              >
               Start Coding
              </button>
            </div>
          </div>

          <div className="lg:w-2/6 md:w-1/2 bg-white bg-opacity-10 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-green-300 text-lg font-medium title-font mb-5">
              Join Room
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="username"
                className="leading-7 text-sm text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="roomId"
                className="leading-7 text-sm text-gray-600"
              >
                Room ID
              </label>
              <input
                type="text"
                id="room"
                name="room"
                className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={roomid}
                onChange={(e) => setroomid(e.target.value)}
              />
            </div>
            <button
              className="text-white bg-green-500 border-0 py-2 px-4 focus:outline-none w-1/2 hover:bg-green-600 rounded text-lg"
              onClick={joinRoom}
            >
              Join Room
            </button>
            <span className="text-xs text-gray-500 mt-3">
              {`Don't have an ID?`}
              <h5
                onClick={() => {
                  setroomid(uuidv4());
                }}
                className="text-green-500 hover:text-green-600 cursor-pointer"
              >
                Create new room.
              </h5>
            </span>
          </div>
        </section>
      ) : (
        <section className="container mx-auto py-24">
          <div className="p-8 bg-gray-800 rounded-lg w-full max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
             
              <h1 className="text-3xl font-medium text-green-500">Code Editor</h1>
            </div>
            <CodeEditor roomid={roomid} username={username} />
          </div>
        </section>
      )}
    </div>
  );
}

export default Colab;
