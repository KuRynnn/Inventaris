'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import AppBar from '../../components/AppBar';
import Button from '../../components/Button';
import { useAuth } from '../../../contexts/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import api from '../../../utils/api';

const AddItem = () => {
  const router = useRouter();
  const { user, getUserIdFromToken } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 1,
    roomId: '',
    supplierId: '',
    status: 'BARANG_MASUK',
    availability: true,
    type: 'inventory',
    inputBy: '',
    file: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoomsAndSuppliers();
    const userId = getUserIdFromToken();
    if (userId) {
      setFormData(prevData => ({
        ...prevData,
        inputBy: userId
      }));
    }
  }, [getUserIdFromToken]);

  const fetchRoomsAndSuppliers = async () => {
    setIsLoading(true);
    try {
      const [roomsResponse, suppliersResponse] = await Promise.all([
        api.get('/rooms'),
        api.get('/supplier')
      ]);
      setRooms(roomsResponse.data);
      setSuppliers(suppliersResponse.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('Failed to load necessary data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = {
        name: formData.name,
        description: formData.description,
        quantity: parseInt(formData.quantity),
        roomId: parseInt(formData.roomId),
        supplierId: parseInt(formData.supplierId),
        inputBy: formData.inputBy,
        status: formData.status,
        availability: formData.availability,
        type: formData.type,
      };

      await api.post('/items', submitData);

      if (formData.file) {
        const fileData = new FormData();
        fileData.append('file', formData.file);
        await api.post('/items/upload-file', fileData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      router.push('/item-management');
    } catch (error) {
      console.error('Failed to submit item:', error);
      setError('Failed to add item');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <AppBar title="Input Barang Masuk" />
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nama Barang</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  rows="3"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Qty</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Jenis Barang</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                >
                  <option value="inventory">Inventaris</option>
                  <option value="consumable">Habis Pakai</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Ruangan</label>
                <select
                  name="roomId"
                  value={formData.roomId}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                >
                  <option value="">Select a room</option>
                  {rooms.length > 0 ? (
                    rooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name} - {room.building}
                      </option>
                    ))
                  ) : (
                    <option disabled>Data tidak ada</option>
                  )}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Supplier</label>
                <select
                  name="supplierId"
                  value={formData.supplierId}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                >
                  <option value="">Select a supplier</option>
                  {suppliers.length > 0 ? (
                    suppliers.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>Data tidak ada</option>
                  )}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Input File Nota Dinas (.pdf)</label>
                <input
                  type="file"
                  name="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-blackw"
                />
              </div>

              <div className="flex space-x-4">
                <Button type="submit" variant="primary">Submit</Button>
                <Button variant="secondary" onClick={() => router.push('/item-management')}>Back</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;