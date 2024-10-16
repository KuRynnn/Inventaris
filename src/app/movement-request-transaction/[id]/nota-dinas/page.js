'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Sidebar from '../../../components/Sidebar';
import AppBar from '../../../components/AppBar';
import Button from '../../../components/Button';
import api from '../../../../utils/api';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useAuth } from '../../../../contexts/AuthContext';
import { useProtectedRoute } from '../../../../hooks/useProtectedRoute';

const NotaDinasPage = () => {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const { loading: authLoading } = useProtectedRoute(['admin']);
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

  const handleDownloadPDF = async () => {
    try {
      const response = await api.get(`/movement-requests/${params.id}/pdf`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `nota-dinas-${params.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF');
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
          <h2 className="text-2xl font-bold mb-6 text-black">Surat Nota Dinas</h2>
          <div className="bg-white rounded-lg shadow p-6 border-2 border-blue-500">
            <h3 className="text-xl font-semibold mb-4 text-center text-black">Surat Nota Dinas Pemindahan Barang</h3>
            <div className="grid grid-cols-1 gap-4 text-black">
              <p><strong>Nama Barang:</strong> {request.itemName}</p>
              <p><strong>Qty:</strong> {request.quantity}</p>
              <p><strong>Nama Peminjam:</strong> {request.requestedBy}</p>
              <p><strong>NIP:</strong> {request.nip}</p>
              <p><strong>Waktu Pinjam:</strong> {request.createdAt}</p>
              <p><strong>Waktu Pemindahan:</strong> {request.moveTime}</p>
              <p><strong>Detail Pemindahan:</strong> From {request.fromLocation} to {request.toLocation}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <Button variant="secondary" onClick={() => router.push(`/movement-request-transaction/${params.id}`)}>Back</Button>
            <Button variant="primary" onClick={handleDownloadPDF}>Download PDF</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotaDinasPage;