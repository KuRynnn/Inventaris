'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(1); // Default to Petugas (1)
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, login, register } = useAuth();

  useEffect(() => {
    if (user) {
      console.log('User detected, redirecting to dashboard');
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isLogin) {
        console.log('Attempting login...');
        await login({ username, password });
        console.log('Login successful, user should be redirected');
      } else {
        if (password !== confirmPassword) {
          setError("Passwords don't match");
          return;
        }
        console.log('Attempting registration...');
        await register({ username, password, role });
        console.log('Registration successful, switching to login');
        setIsLogin(true);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setError('Registration successful. Please log in.');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.response?.data?.message || error.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center text-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          {!isLogin && (
            <>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <select
                value={role}
                onChange={(e) => setRole(Number(e.target.value))}
                className="w-full p-2 mb-4 border rounded"
                required
              >
                <option value={0}>Admin</option>
                <option value={1}>Petugas</option>
              </select>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
          }}
          className="w-full mt-4 text-blue-500 hover:underline"
        >
          {isLogin ? 'Need to register?' : 'Already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;