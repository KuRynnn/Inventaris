// src/app/movement-request-transaction/[id]/nota-dinas/page.js
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import Sidebar from '../../../components/Sidebar';
import AppBar from '../../../components/AppBar';
import Button from '../../../components/Button';
import withAuth from '../../../components/withAuth';

const NotaDinasPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  // Mock data - in a real app, you'd fetch this based on the id
  const itemDetail = {
    namaBarang: 'Kabel HDMI',
    qty: 1,
    namaPeminjam: 'Rama Padiliwinata',
    nip: '1010101010',
    waktuPinjam: '10:00 AM / Jumat, 07/06/2024',
    waktuPemindahan: '2:00 PM / Jumat, 07/06/2024',
    detailPemindahan: 'Ruangan F1',
  };

  const handleDownloadPDF = () => {
    // Implement PDF download logic here
    console.log('Downloading PDF...');
  };

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
              <p><strong>Nama Barang:</strong> {itemDetail.namaBarang}</p>
              <p><strong>Qty:</strong> {itemDetail.qty}</p>
              <p><strong>Nama Peminjam:</strong> {itemDetail.namaPeminjam}</p>
              <p><strong>NIP:</strong> {itemDetail.nip}</p>
              <p><strong>Waktu Pinjam:</strong> {itemDetail.waktuPinjam}</p>
              <p><strong>Waktu Pemindahan:</strong> {itemDetail.waktuPemindahan}</p>
              <p><strong>Detail Pemindahan:</strong> {itemDetail.detailPemindahan}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <Button variant="secondary" onClick={() => router.push(`/movement-request-transaction/${id}`)}>Back</Button>
            <Button variant="primary" onClick={handleDownloadPDF}>Download PDF</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotaDinasPage;
//export default withAuth(NotaDinasPage, ['admin']);