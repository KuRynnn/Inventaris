import React from 'react';
import Image from 'next/image';
import { useAuth } from '../../contexts/AuthContext';

const AppBar = ({ title }) => {
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-sm z-10 relative">
      <h1 className="text-xl font-semibold text-black">{title}</h1>
      <div className="flex items-center">
        <span className="mr-2 text-black">{user?.username}</span>
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