'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import AppBar from '../../components/AppBar';
import Button from '../../components/Button';
import api from '../../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useAuth } from '../../../contexts/AuthContext';
import { useProtectedRoute } from '../../../hooks/useProtectedRoute';

const DetailPemindahanPage = () => {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const { loading: authLoading } = useProtectedRoute(['admin', 'petugas']);
  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchRequestDetail();
    }
  }, [user, params.id]);

  const fetchRequestDetail = async () => {
    try {
      const { data } = await api.get(`/movement-requests/${params.id}`);
      setRequest(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching request detail:', error);
      setError('Failed to load request details');
      setIsLoading(false);
    }
  };

  const handleAccept = async () => {
    try {
      await api.put(`/movement-requests/${params.id}`, { status: 'approved' });
      router.push(`/movement-request-transaction/${params.id}/nota-dinas`);
    } catch (error) {
      console.error('Error accepting request:', error);
      alert('Failed to accept request');
    }
  };

  const handleReject = async () => {
    try {
      await api.put(`/movement-requests/${params.id}`, { status: 'rejected' });
      router.push('/movement-request-transaction');
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Failed to reject request');
    }
  };

  if (authLoading || isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;
  if (!user || !request) return null;

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <AppBar title="Pemindahan Barang" />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-black">Detail Pemindahan Barang</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-2 gap-4 text-black">
              <p><strong>Nama Barang:</strong> {request.itemName}</p>
              <p><strong>Qty:</strong> {request.quantity}</p>
              <p><strong>Nama Peminjam:</strong> {request.requestedBy}</p>
              <p><strong>NIP:</strong> {request.nip}</p>
              <p><strong>Waktu Pinjam:</strong> {request.createdAt}</p>
              <p><strong>Waktu Pemindahan:</strong> {request.moveTime}</p>
              <p><strong>Detail Pemindahan:</strong> From {request.fromLocation} to {request.toLocation}</p>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              {user.role === 'admin' && (
                <>
                  <Button variant="primary" onClick={handleAccept}>Accept</Button>
                  <Button variant="danger" onClick={handleReject}>Reject</Button>
                </>
              )}
            </div>
          </div>
          <Button variant="secondary" className="mt-4" onClick={() => router.push('/movement-request-transaction')}>Back</Button>
        </div>
      </div>
    </div>
  );
};

export default DetailPemindahanPage;