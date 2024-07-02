// src/app/components/AppBar.js
import React from 'react';
import Image from 'next/image';

const AppBar = ({ title }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm z-10 relative">
      <h1 className="text-xl font-semibold text-black">{title}</h1>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
          <Image
            src="/images/PP.png"
            alt="User Avatar"
            width={40}
            height={40}
          />
        </div>
      </div>
    </div>
  );
};

export default AppBar;