'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import AppBar from '../components/AppBar';
import StatCard from '../components/StatCard';
import FlexibleTable from '../components/FlexibleTable';
import Button from '../components/Button';
import api from '../../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';
import { useProtectedRoute } from '../../hooks/useProtectedRoute';

const ItemManagementPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { loading: authLoading } = useProtectedRoute([0, 1]);
  const [activeTab, setActiveTab] = useState('inventory');
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (user) {
      fetchItems();
      fetchStats();
    }
  }, [user, activeTab, page, search]);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/items', {
        params: { page, limit: 10, search, type: activeTab }
      });
      console.log('API response:', response);
      const { data } = response;
      console.log('Items data:', data);
      setItems(data.items || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Failed to load items:', error);
      setError('Failed to load items');
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await api.get('/items/stats');
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleDelete = async (itemId) => {
    if (user.role !== 1) {
      alert('Only petugas can delete items');
      return;
    }
    try {
      await api.delete(`/items/${itemId}`);
      fetchItems();
      fetchStats();
    } catch (error) {
      alert('Failed to delete item');
    }
  };

  const handleDetail = (itemId) => {
    router.push(`/item-management/${itemId}`);
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

  const handleAddItem = () => {
    router.push(`/item-management/add-item`);
  };

  if (authLoading || isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;
  if (!user) return null;

  const columns = [
    { key: 'id', title: 'No', align: 'center' },
    { key: 'name', title: 'Nama Barang' },
    { key: 'quantity', title: 'Jumlah' },
    { key: 'supplierName', title: 'Supplier' },
    {
      key: 'action',
      title: 'Action',
      render: (_, item) => (
        <div className="flex space-x-2">
          <Button variant="detail" size="small" onClick={() => handleDetail(item.id)}>
            detail
          </Button>
          {user.role === 1 && (
            <Button variant="danger" size="small" onClick={() => handleDelete(item.id)}>
              delete
            </Button>
          )}
        </div>
      )
    },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <AppBar title="Manajemen Barang" />
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <Button
                variant={activeTab === 'inventory' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('inventory')}
              >
                Barang Inventaris
              </Button>
              <Button
                variant={activeTab === 'consumable' ? 'primary' : 'secondary'}
                onClick={() => setActiveTab('consumable')}
              >
                Barang Habis Pakai
              </Button>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 border rounded-md w-64"
              value={search}
              onChange={handleSearch}
            />
          </div>

          <div className="flex space-x-4 mb-6">
            <StatCard
              number={stats.inventoryCount || 0}
              title="Barang Inventaris"
              subtitle="Total Count"
              bgColor="bg-blue-100"
              textColor="text-blue-600"
            />
            <StatCard
              number={stats.consumableCount || 0}
              title="Barang Habis Pakai"
              subtitle="Total Count"
              bgColor="bg-red-100"
              textColor="text-red-600"
            />
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold text-black">
                Data {activeTab === 'inventory' ? 'Barang Inventaris' : 'Barang Habis Pakai'}
              </h2>
              {user.role === 1 && (
                <Button variant="primary" onClick={() => handleAddItem()}>
                  Tambah Barang
                </Button>
              )}
            </div>
            {items.length > 0 ? (
              <FlexibleTable
                columns={columns}
                data={items}
                rowKeyField="id"
              />
            ) : (
              <p className="p-4 text-center text-gray-500">No items found</p>
            )}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <Button variant="secondary" onClick={handlePrevPage} disabled={page === 1}>
              previous
            </Button>
            <span className="text-black">Page {page} of {totalPages}</span>
            <Button variant="secondary" onClick={handleNextPage} disabled={page === totalPages}>
              next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemManagementPage;