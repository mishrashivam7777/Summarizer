import React, { useState } from "react";
import Navbar from "../chunks/Navbar";
import Card from "../chunks/Card";
import Instructions from "../chunks/Instructions";
import Footer from "../chunks/Footer";
import Unlimited from '../assets/Icons/unlimited.png'
import Thunder from '../assets/Icons/Thunder.png'
import Security from '../assets/Icons/Security.png'
const cardData = [
  {
    imageUrl: Unlimited,
    heading: "Unlimited",
    description:
      "This document summarizer is highly effective and allows you to summarize documents as many times as needed",
  },
  {
    imageUrl: Thunder,
    heading: "Fast",
    description:
      "Its conversion process is powerful. Therefore, it takes less time to convert all the selected files.",
  },
  {
    imageUrl: Security,
    heading: "Security",
    description:
      "All files uploaded by you will be automatically permanently erased from our servers after 2 hours.",
  },
];

function Dashboard() {
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      // Perform further actions with the file if needed
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      console.log("Dropped file:", file.name);
      // Perform further actions with the file if needed
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
    <div className="h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full bg-white p-6">
        <h1 className="text-[36px] md:text-[48px] lg:text-[56px] text-black font-extrabold text-center leading-relaxed tracking-tight shadow-md mb-6">
          Summarize your Documents in Seconds
        </h1>
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
            <label className="bg-white text-black font-[600] border-[1px] border-[#000000] px-4 py-2 rounded cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              Upload Document
            </label>
            <p className="text-sm text-gray-400 mt-2">
              Accepted file formats: .pdf, .docx
            </p>
          </div>
        </div>
      </div>


      <div className="flex flex-wrap justify-center p-6 gap-6">
        {cardData.map((data, index) => (
          <Card
            key={index}
            imageUrl={data.imageUrl}
            heading={data.heading}
            description={data.description}
          />
        ))}
      </div>


      <div className="container mx-auto p-6">
        <Instructions />
      </div>
      <div className="container mx-auto p-6">
        <Footer/>
      </div>
    </div>
  );
}

export default Dashboard;
