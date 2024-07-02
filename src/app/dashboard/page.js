// src/app/dashboard/page.js
'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import AppBar from '../components/AppBar';
import FlexibleTable from '../components/FlexibleTable';

const DashboardPage = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'petugas'; // Default to petugas if no role is specified

  const statusBarang = [
    { id: 1, no: 1, namaBarang: 'Kabel LAN', jenisBarang: 'barang keluar masuk', waktu: '10.00 AM / Jumat, 07/06/2024' },
    { id: 2, no: 2, namaBarang: 'sabun cuci tangan', jenisBarang: 'barang habis pakai', waktu: '10.00 AM / Jumat, 07/06/2024' },
    // ... add more items as needed
  ];

  const columns = [
    { key: 'no', title: 'No', align: 'center'},
    { key: 'namaBarang', title: 'Nama Barang' },
    { key: 'jenisBarang', title: 'Jenis Barang', render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        value === 'barang keluar masuk' ? 'bg-orange-100 text-orange-800' :
        value === 'barang habis pakai' ? 'bg-red-100 text-red-800' :
        'bg-blue-100 text-blue-800'
      }`}>
        {value}
      </span>
    )},
    { key: 'waktu', title: 'Waktu' },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col">
        <AppBar title="Dashboard" />
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-6 text-black">Welcome Back, {role === 'admin' ? 'Admin' : 'User'}!</h2>
          <div className="flex mb-6 gap-4">
            <StatCard 
              number={23} 
              title="Barang Inventaris" 
              subtitle="Terakhir 3 hari lalu" 
              bgColor="bg-blue-100"
              textColor="text-blue-600"
            />
            <StatCard 
              number={10} 
              title="Barang Habis Pakai" 
              subtitle="Terakhir Hari Ini" 
              bgColor="bg-orange-100"
              textColor="text-orange-600"
            />
            {role === 'admin' && (
              <StatCard 
                number={5} 
                title="Request Pemindahan Barang" 
                subtitle="Hari Ini" 
                bgColor="bg-red-100"
                textColor="text-red-600"
              />
            )}
          </div>

          <h3 className="text-xl font-bold mb-4 text-black">Status Barang Terbaru</h3>
          <FlexibleTable columns={columns} data={statusBarang} rowKeyField="id" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;