'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppBar from '../../components/AppBar';
import Sidebar from '../../components/Sidebar';
import ItemDetail from '../../components/ItemDetail';
import FlexibleTable from '../../components/FlexibleTable';
import Button from '../../components/Button';
import { useAuth } from '../../../contexts/AuthContext';
import { useProtectedRoute } from '../../../hooks/useProtectedRoute';
import api from '../../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const ItemDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { loading: authLoading } = useProtectedRoute([0, 1]);
  const [itemDetail, setItemDetail] = useState(null);
  const [itemInstances, setItemInstances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (user) {
      fetchItemDetail();
      fetchItemInstances();
    }
  }, [user, id, page]);

  const fetchItemDetail = async () => {
    try {
      const { data } = await api.get(`/items/${id}`);
      setItemDetail(data);
    } catch (error) {
      console.error('Error fetching item detail:', error);
      setError('Failed to load item detail');
    }
  };

  const fetchItemInstances = async () => {
    try {
      const { data } = await api.get(`/items/${id}/instances`, {
        params: { page, limit: 10 }
      });
      setItemInstances(data.instances);
      setTotalPages(data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching item instances:', error);
      setError('Failed to load item instances');
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/item-management');
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  if (authLoading || isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;
  if (!user || !itemDetail) return null;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <AppBar title="Manajemen Barang" />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-black">Detail Barang</h2>
          <ItemDetail itemDetail={itemDetail} />
          <div className="mt-6">
            <Button variant="secondary" onClick={handleBack}>Back</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;