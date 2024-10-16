'use client';

import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import Sidebar from '../components/Sidebar';
import AppBar from '../components/AppBar';
import FlexibleTable from '../components/FlexibleTable';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';
import { useProtectedRoute } from '../../hooks/useProtectedRoute';

const RoomManagementPage = () => {
  const { user } = useAuth();
  const { loading: authLoading } = useProtectedRoute([0, 1]); // Allow both admin (0) and petugas (1)
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: '',
    building: '',
    number: '',
    address: ''
  });

  useEffect(() => {
    if (user) {
      fetchRooms();
    }
  }, [user]);

  const fetchRooms = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/rooms');
      setRooms(data);
    } catch (error) {
      setError('Failed to load rooms');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    if (user.role !== 1) {
      alert('Only petugas can add rooms');
      return;
    }
    try {
      await api.post('/rooms', newRoom);
      setNewRoom({ name: '', building: '', number: '', address: '' });
      setShowAddForm(false);
      fetchRooms();
    } catch (error) {
      alert('Failed to add room');
    }
  };

  const handleDeleteRoom = async (roomId) => {
    if (user.role !== 1) {
      alert('Only petugas can delete rooms');
      return;
    }
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await api.delete(`/rooms/${roomId}`);
        fetchRooms();
      } catch (error) {
        alert('Failed to delete room');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom(prev => ({ ...prev, [name]: value }));
  };

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'building', title: 'Building' },
    { key: 'number', title: 'Number' },
    { key: 'address', title: 'Address' },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, room) => (
        user.role === 1 && (
          <Button variant="danger" size="small" onClick={() => handleDeleteRoom(room.id)}>Delete</Button>
        )
      ),
    },
  ];

  if (authLoading || isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;
  if (!user) return null;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <AppBar title="Room Management" />
        <div className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Rooms</h2>
            {user.role === 1 && (
              <Button variant="primary" onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? 'Cancel' : 'Add New Room'}
              </Button>
            )}
          </div>

          {showAddForm && user.role === 1 && (
            <form onSubmit={handleAddRoom} className="mb-6 bg-white p-4 rounded shadow">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={newRoom.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="building" className="block text-sm font-medium text-gray-700">Building</label>
                  <input
                    type="text"
                    name="building"
                    id="building"
                    value={newRoom.building}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="number" className="block text-sm font-medium text-gray-700">Number</label>
                  <input
                    type="text"
                    name="number"
                    id="number"
                    value={newRoom.number}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={newRoom.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <Button type="submit" variant="primary">Add Room</Button>
              </div>
            </form>
          )}

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <FlexibleTable columns={columns} data={rooms} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomManagementPage;