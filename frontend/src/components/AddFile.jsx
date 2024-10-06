/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";

const AddPost = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
    };

    try {
      const response = await fetch("http://localhost:3001/addFile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        // Reset form fields
        setTitle("");
        setContent("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to save post");
    }
  };

  return (
    <div>
      <div className="w-full max-w-screen-lg p-8 bg-white rounded-lg mx-auto my-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold text-sm mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter Title"
              className="w-full px-3 py-2 border rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}//When the input field's value changes (i.e., when the user types something), the onChange event is triggered.The function (e) => setTitle(e.target.value) is called with the event object e.
              required

            />
          </div>

          <div className="mb-4">
            <label htmlFor="post" className="block text-gray-700 text-sm font-bold mb-2">
              Post
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
              Options
            </label>
          </div>

          <div className="flex gap-4 mt-6">
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md">
              Create Post
            </button>
            <button
              type="button"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md"
              onClick={() => {
                setTitle("");
                setContent("");
              }}
            >
              Reset Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
