// app/movement-request-transaction/page.js
'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import AppBar from '../components/AppBar';
import FlexibleTable from '../components/FlexibleTable';
import Button from '../components/Button';

const RequestManagementPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  const items = [
    { id: 1, no: 1, namaBarang: 'kabel HDMI', jumlah: 1, ruanganAwal: 'F1', ruanganPemindahan: 'F2' },
    { id: 2, no: 2, namaBarang: 'proyektor', jumlah: 1, ruanganAwal: 'F1', ruanganPemindahan: 'F2' },
    // ... other items
  ];

  const columns = [
    { key: 'no', title: 'No', align: 'center' },
    { key: 'namaBarang', title: 'Nama Barang' },
    { key: 'jumlah', title: 'Jumlah', align: 'center' },
    { key: 'ruanganAwal', title: 'Ruangan Awal' },
    { key: 'ruanganPemindahan', title: 'Ruangan Pemindahan' },
    { 
      key: 'action', 
      title: 'Action', 
      align: 'center',
      render: (_, item) => (
        <Button 
          variant="detail" 
          size="small" 
          onClick={() => router.push(`/movement-request-transaction/${item.id}?role=${role}`)}
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
          <div className="bg-white rounded-lg shadow">
            <FlexibleTable 
              columns={columns} 
              data={items} 
              rowKeyField="id" 
            />
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex space-x-2">
              <Button variant="secondary" onClick={() => router.push(`/movement-request-transaction?role=${role}&page=prev`)}>previous</Button>
              <Button variant="secondary" onClick={() => router.push(`/movement-request-transaction?role=${role}&page=next`)}>next</Button>
            </div>
            <span className="text-black">Page 1 of 1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestManagementPage;