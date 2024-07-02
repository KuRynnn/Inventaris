// src/app/page.js
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const router = useRouter();
  const handleLogin = (role) => {
    // In a real app, you'd authenticate here and store the role in a secure way
    // For now, we'll just pass it as a query parameter
    router.push(`/dashboard?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8 text-blue-800">InventoryApp</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Choose Login Type</h2>
        <div className="space-y-4">
          <button
            onClick={() => handleLogin('admin')}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Login as Admin
          </button>
          <button
            onClick={() => handleLogin('petugas')}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
          >
            Login as Petugas
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;