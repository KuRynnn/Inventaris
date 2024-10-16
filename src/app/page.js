'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import api from '../utils/api';

const LandingPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    requesterName: '',
    body: '',
    itemId: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.post('/movement-requests', formData);
      setSuccess('Movement request submitted successfully!');
      setFormData({ title: '', requesterName: '', body: '', itemId: '' });
    } catch (error) {
      setError('Failed to submit request. Please try again.');
      console.error('Error submitting request:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800">Inventory System</h1>
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/auth" className="text-gray-800 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-lg mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Submit Movement Request</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="requesterName" className="block text-gray-700 text-sm font-bold mb-2">
              Requester Name
            </label>
            <input
              type="text"
              id="requesterName"
              name="requesterName"
              value={formData.requesterName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="block text-gray-700 text-sm font-bold mb-2">
              Request Details
            </label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              required
            ></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="itemId" className="block text-gray-700 text-sm font-bold mb-2">
              Item ID
            </label>
            <input
              type="text"
              id="itemId"
              name="itemId"
              value={formData.itemId}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit Request
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default LandingPage;