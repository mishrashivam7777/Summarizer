import React, { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
const FileUploader = () => {
  const [dragOver, setDragOver] = useState(false);
  const [fileData, setFile] = useState(null);
  const [responseData, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch data
  const fetchData = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      setLoading(true); // Set loading to true when the request starts
      // Change url according to backend
      const response = await axios.post(
        "http://127.0.0.1:5000/summarize",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response.status);

      if (response.status === 200 || response.status === 201) {
        setResponse(response.data); // Use response.data to get the actual data
        console.log(response.data);
      }
    } catch (error) {
      setError(error.response.data.error);
      console.log('Error',error.response.data.error)
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false); // Set loading to false when the request ends
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setFile(file);
      fetchData(file); // Call fetchData when a file is selected
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      console.log("Dropped file:", file.name);
      setFile(file);
      fetchData(file); // Call fetchData when a file is dropped
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div className="text-center">
      <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
        Quickly extract key points from your documents with our advanced
        summarization tools. Save time and enhance productivity with ease.
      </p>
      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-md transition-colors ${
          dragOver
            ? "bg-gray-100 border-gray-400"
            : "bg-gray-50 border-gray-300"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <p className="text-lg text-gray-600 mb-4">
          Drag & drop your document here, or
        </p>

        <div>
          {loading ? (
            <ClipLoader color="#000000" loading={loading} size={50} />
          ) : (
            <label className="bg-white text-black font-[600] border-[1px] border-[#000000] px-4 py-2 rounded cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              Upload Document
            </label>
          )}
        </div>

        <p className="text-sm text-gray-400 mt-2">
          Accepted file formats: .pdf
        </p>

        {/* for error  */}
        <div>
          {error && (
            <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-3 rounded relative mt-[15px]">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline">{` ${error}`}</span>
          </div>
          )}
        </div>

        {responseData && (
          <div className="mt-4">
            <textarea
              value={responseData.summary || ""}
              className="min-h-[200px] border-[1px] border-[#000000] mt-[10px] min-w-[250px] sm:min-w-[500px] p-[10px] rounded-[10px] overflow-hidden"
              readOnly
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
