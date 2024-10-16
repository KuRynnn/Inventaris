'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import AppBar from '../components/AppBar';
import FlexibleTable from '../components/FlexibleTable';
import api from '../../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';

const DashboardPage = () => {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth');
    } else if (user) {
      fetchDashboardData();
    }
  }, [user, authLoading, router]);

  const fetchDashboardData = async () => {
    console.log('Dashboard: Starting fetchDashboardData');
    try {
      console.log('Dashboard: Fetching items and stats');
      const [itemsResponse, statsResponse] = await Promise.all([
        api.get('/items'),
        api.get('/items/stats')
      ]);
      console.log('Dashboard: Items response:', itemsResponse.data);
      console.log('Dashboard: Stats response:', statsResponse.data);
      setItems(itemsResponse.data.items || []);
      setStats(statsResponse.data || {});
    } catch (error) {
      console.error('Dashboard: Error fetching data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;
  if (!user) return null;

  const columns = [
    { key: 'no', title: 'No', align: 'center'},
    { key: 'name', title: 'Nama Barang' },
    { key: 'type', title: 'Jenis Barang', render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        value === 'inventory' ? 'bg-orange-100 text-orange-800' :
        value === 'consumable' ? 'bg-red-100 text-red-800' :
        'bg-blue-100 text-blue-800'
      }`}>
        {value}
      </span>
    )},
    { key: 'updatedAt', title: 'Waktu', render: (value) => new Date(value).toLocaleString() },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <AppBar title="Dashboard" />
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6 text-black">
            {user.role === 0 ? 'Welcome Admin' : 'Welcome Petugas'}
          </h1>
          <h2 className="text-2xl font-bold mb-6 text-black">Welcome Back, {user.role === 0 ? 'Admin' : 'Petugas'}!</h2>
          <div className="flex mb-6 gap-4">
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
              bgColor="bg-orange-100"
              textColor="text-orange-600"
            />
            {user.role === 0 && (
              <StatCard 
                number={stats.pendingRequestsCount || 0} 
                title="Request Pemindahan Barang" 
                subtitle="Pending" 
                bgColor="bg-red-100"
                textColor="text-red-600"
              />
            )}
          </div>

          <h3 className="text-xl font-bold mb-4 text-black">Status Barang Terbaru</h3>
          <FlexibleTable columns={columns} data={items} rowKeyField="id" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;