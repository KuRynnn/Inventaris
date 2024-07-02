// src/app/movement-request-transaction/[id]/page.js
'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useParams } from 'next/navigation';
import Sidebar from '../../components//Sidebar';
import AppBar from '../../components/AppBar';
import Button from '../../components/Button';

const DetailPemindahanPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const id = params.id;
  const role = searchParams.get('role');

  // Mock data - in a real app, you'd fetch this based on the id
  const itemDetail = {
    namaBarang: 'Kabel HDMI',
    qty: 1,
    namaPeminjam: 'Rama Padiliwinata',
    nip: '1010101010',
    waktuPinjam: '10:00 AM / Jumat, 07/06/2024',
    waktuPemindahan: '2:00 PM / Jumat, 07/06/2024',
    detailPemindahan: 'Ruangan F2',
  };

  const handleAccept = () => {
    router.push(`/movement-request-transaction/${id}/nota-dinas?role=${role}`);
  };

  const handleReject = () => {
    router.push(`/movement-request-transaction?role=${role}`);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <AppBar title="Pemindahan Barang" />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-black">Detail Pemindahan Barang</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-2 gap-4 text-black">
              <p><strong>Nama Barang:</strong> {itemDetail.namaBarang}</p>
              <p><strong>Qty:</strong> {itemDetail.qty}</p>
              <p><strong>Nama Peminjam:</strong> {itemDetail.namaPeminjam}</p>
              <p><strong>NIP:</strong> {itemDetail.nip}</p>
              <p><strong>Waktu Pinjam:</strong> {itemDetail.waktuPinjam}</p>
              <p><strong>Waktu Pemindahan:</strong> {itemDetail.waktuPemindahan}</p>
              <p><strong>Detail Pemindahan:</strong> {itemDetail.detailPemindahan}</p>
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <Button variant="primary" onClick={handleAccept}>Accept</Button>
              <Button variant="danger" onClick={handleReject}>Reject</Button>
            </div>
          </div>
          <Button variant="secondary" className="mt-4" onClick={() => router.push(`/movement-request-transaction?role=${role}`)}>Back</Button>
        </div>
      </div>
    </div>
  );
};

export default DetailPemindahanPage;