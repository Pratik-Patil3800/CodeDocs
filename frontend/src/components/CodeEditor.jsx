
import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { executeCode } from "../api.js";
import { ref, onValue, set } from "firebase/database";
import { database } from "../firebaseConfig.js";
import { CODE_SNIPPETS } from "../constants.js";
import axios from "axios";
import Navbar from "./Navbar.jsx";
import MarkdownDisplay from "./MarkdownDisplay";

const CodeEditor = ({ username, roomid }) => {
  const [code, setCode] = useState(CODE_SNIPPETS.cpp);
  const [filePath, setFilePath] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("Run Your Code......");
  const [loading, setLoading] = useState(false);
  const [docLoading, setDocLoading] = useState(false); 
  const [toastMessage, setToastMessage] = useState(null);
  const [mdcontent, setmdcontent] = useState("");

  useEffect(() => {
    const codeRef = ref(database, "code-editor/" + roomid);
    onValue(codeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCode(data);
      }
    });
  }, [roomid]);

  const handleCodeChange = (value) => {
    setCode(value);
    set(ref(database, "code-editor/" + roomid), value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit");

    try {
      const payload = { code: code };
      const headers = { "Content-Type": "application/json" };

      // Sending the code as text
      const response = await axios.post(
        "http://localhost:3001/api/generate-docs",
        payload,
        {
          headers,
          withCredentials: true,
        }
      );
      console.log("Documentation generated:", response.data.documentation);
      setmdcontent(response.data.documentation);
    } catch (error) {
      console.error("Error generating documentation:", error);
    }
  };

  const runCode = async () => {
    try {
      setLoading(true);
      const response = await executeCode(language, code);

      if (response.stderr) {
        setOutput(response.run.stderr);
      } else {
        if (response.run.stdout === "") setOutput("Error in code....");
        else setOutput(response.run.stdout);
      }
    } catch (error) {
      setToastMessage({
        type: "error",
        title: "Error running code",
        description: error.message,
      });
    }
    setLoading(false);
  };

  const getLanguageExtension = (language) => {
    switch (language) {
      case "cpp":
        return cpp();
      case "javascript":
        return javascript();
      case "java":
        return java();
      case "python":
        return python();
      default:
        return javascript();
    }
  };

  return (
    <>
      <div className="container">
       
        {toastMessage && (
          <div
            className={`fixed top-5 right-5 bg-${
              toastMessage.type === "error" ? "red" : "green"
            }-500 text-white px-4 py-2 rounded shadow-lg z-50`}
          >
            <strong>{toastMessage.title}</strong>
            <p>{toastMessage.description}</p>
            <button
              onClick={() => setToastMessage(null)}
              className="mt-2 text-sm underline"
            >
              Close
            </button>
          </div>
        )}

        <div className="mb-4">
          <p>
            <strong>Username:</strong> {username}
          </p>
          <p>
            <strong>Room ID:</strong> {roomid}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
         
          <div className="flex-1">
            <div className="mb-4">
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  switch (e.target.value) {
                    case "javascript":
                      setCode(CODE_SNIPPETS.javascript);
                      break;
                    case "python":
                      setCode(CODE_SNIPPETS.python);
                      break;
                    case "java":
                      setCode(CODE_SNIPPETS.java);
                      break;
                    case "cpp":
                      setCode(CODE_SNIPPETS.cpp);
                      break;
                    default:
                      setCode(CODE_SNIPPETS.javascript);
                  }
                }}
                className="w-full p-2 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
            </div>
            <div className="border border-gray-600 bg-gray-900 rounded-lg overflow-hidden">
              <CodeMirror
                value={code}
                height="400px"
                extensions={[getLanguageExtension(language), oneDark]}
                theme={oneDark}
                onChange={(value) => handleCodeChange(value)}
              />
            </div>
          </div>

         
          <div className="flex-1 flex flex-col">
            <div className="flex gap-4 mb-4">
              <button
                onClick={runCode}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 transition duration-200 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : (
                  "Run Code"
                )}
              </button>
             
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-200 flex items-center justify-center"
                disabled={docLoading}
              >
                {docLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : (
                  "Generate Documentation"
                )}
              </button>
            </div>
            <div className="flex-1">
              <textarea
                value={output}
                readOnly
                className="w-full h-full p-4 bg-gray-900 text-white border border-gray-600 rounded-lg resize-none"
                placeholder="Output will appear here..."
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        
        {mdcontent ? <MarkdownDisplay mdcontent={mdcontent} /> : ""}
      </div>
    </>
  );
};

export default CodeEditor;
