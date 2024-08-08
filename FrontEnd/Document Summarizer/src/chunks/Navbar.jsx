import React, { useState } from 'react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className=" p-4 text-white shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">

          <h1 className="text-xl font-bold text-[#000000]">Document Summarizer</h1>
        </div>

        
        
      </div>
    </nav>
  );
};

export default Navbar;
