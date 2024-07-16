// src/app/auth/page.js
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate authentication
    if (isLogin) {
      // Login
      if (username === 'admin' && password === 'password') {
        // Store role in localStorage
        localStorage.setItem('role', 'admin');
        router.push('/dashboard');
      } else if (username === 'petugas' && password === 'password') {
        // Store role in localStorage
        localStorage.setItem('role', 'petugas');
        router.push('/dashboard');
      } else {
        alert('Invalid username or password');
      }
    } else {
      // Registration
      // For simplicity, we'll just store the role as 'petugas'
      localStorage.setItem('role', 'petugas');
      router.push('/dashboard');
    }    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center text-black">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border rounded text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded text-black"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-4 text-blue-500 hover:underline"
        >
          {isLogin ? 'Need to register?' : 'Already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;