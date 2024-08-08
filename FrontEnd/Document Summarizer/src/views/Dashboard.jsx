import React, { useState } from "react";
import Navbar from "../chunks/Navbar";
import Card from "../chunks/Card";
import Instructions from "../chunks/Instructions";
import Footer from "../chunks/Footer";
import Unlimited from "../assets/Icons/unlimited.png";
import Thunder from "../assets/Icons/Thunder.png";
import Security from "../assets/Icons/Security.png";
import FileUploader from "../chunks/FileUploader";

function Dashboard() {
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

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full bg-white p-6">
        <h1 className="text-[36px] md:text-[48px] lg:text-[56px] text-black font-extrabold text-center leading-relaxed tracking-tight shadow-md mb-6">
          Summarize your Documents in Seconds
        </h1>
        <FileUploader />
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
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
