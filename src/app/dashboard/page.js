'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import AppBar from '../components/AppBar';
import FlexibleTable from '../components/FlexibleTable';
import withAuth from '../components/withAuth';

// Moved static data outside the component
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

const DashboardPage = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, []);

  if (role === null) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col">
        <AppBar title="Dashboard" />
        <div className="flex-1 p-8">
          <h2 className="text-2xl font-bold mb-6 text-black">Welcome Back, {role === 'admin' ? 'Admin' : 'Petugas'}!</h2>
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
//export default withAuth(DashboardPage, ['admin', 'petugas']);