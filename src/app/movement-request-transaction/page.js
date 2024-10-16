'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import AppBar from '../components/AppBar';
import FlexibleTable from '../components/FlexibleTable';
import Button from '../components/Button';
import api from '../../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';
import { useProtectedRoute } from '../../hooks/useProtectedRoute';

const RequestManagementPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { loading: authLoading } = useProtectedRoute(['admin', 'petugas']);
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [user, page, search]);

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/movement-requests`, {
        params: {
          page,
          limit: 10,
          search
        }
      });
      setRequests(data.requests);
      setTotalPages(data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setError('Failed to load movement requests');
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  if (authLoading || isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;
  if (!user) return null;

  const columns = [
    { key: 'id', title: 'No', align: 'center' },
    { key: 'itemName', title: 'Nama Barang' },
    { key: 'quantity', title: 'Jumlah', align: 'center' },
    { key: 'fromLocation', title: 'Ruangan Awal' },
    { key: 'toLocation', title: 'Ruangan Pemindahan' },
    { 
      key: 'action', 
      title: 'Action', 
      align: 'center',
      render: (_, item) => (
        <Button 
          variant="detail" 
          size="small" 
          onClick={() => router.push(`/movement-request-transaction/${item.id}`)}
        >
          detail
        </Button>
      )
    },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <AppBar title="Pemindahan Barang" />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-black">Request Pemindahan Barang</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 border rounded-md w-64"
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className="bg-white rounded-lg shadow">
            <FlexibleTable 
              columns={columns} 
              data={requests} 
              rowKeyField="id" 
            />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex space-x-2">
              <Button variant="secondary" onClick={handlePrevPage} disabled={page === 1}>previous</Button>
              <Button variant="secondary" onClick={handleNextPage} disabled={page === totalPages}>next</Button>
            </div>
            <span className="text-black">Page {page} of {totalPages}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestManagementPage;