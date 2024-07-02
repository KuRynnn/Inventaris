// app/item-management/page.js
'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import AppBar from '../components/AppBar';
import StatCard from '../components/StatCard';
import FlexibleTable from '../components/FlexibleTable';
import Button from '../components/Button';

const ItemManagementPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const role = searchParams.get('role') || 'petugas';

  const [activeTab, setActiveTab] = useState('Barang Inventaris');
  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, no: 1, namaBarang: 'kabel HDMI', jumlah: 3, supplier: 'PT Asikin Aja' },
    { id: 2, no: 2, namaBarang: 'proyektor', jumlah: 5, supplier: 'PT Asikin Aja' },
    // ... other itemsw
  ]);

  const [consumableItems, setConsumableItems] = useState([
    { id: 1, no: 1, namaBarang: 'kertas A4', jumlah: 500, supplier: 'PT Asikin Aja' },
    { id: 2, no: 2, namaBarang: 'spidol', jumlah: 50, supplier: 'PT Asikin Aja' },
    // ... other items
  ]);

  const handleDelete = (itemId) => {
    console.log(`Delete item with id: ${itemId}`);
    // Implement delete logic here
  };

  const handleDetail = (itemId) => {
    router.push(`/item-management/${itemId}?role=${role}`);
  };
  
  const inventoryColumns = [
    { key: 'no', title: 'No', align: 'center'},
    { key: 'namaBarang', title: 'Nama Barang' },
    { key: 'jumlah', title: 'Jumlah' },
    { key: 'supplier', title: 'Supplier' },
    { 
      key: 'action', 
      title: 'Action', 
      render: (_, item) => (
        <div className="flex space-x-2">
          {role === 'admin' && (
            <Button variant="detail" size="small" onClick={() => handleDetail(item.id)}>
              detail
            </Button>
          )}
          {role === 'petugas' && (
            <>
              <Button variant="danger" size="small" onClick={() => handleDelete(item.id)}>
                delete
              </Button>
              <Button variant="detail" size="small" onClick={() => handleDetail(item.id)}>
                detail
              </Button>
            </>
          )}
        </div>
      )
    },
  ];

  const consumableColumns = [
    { key: 'no', title: 'No' },
    { key: 'namaBarang', title: 'Nama Barang' },
    { key: 'jumlah', title: 'Jumlah' },
    { key: 'supplier', title: 'Supplier' },
    ...(role === 'petugas' ? [{
      key: 'action',
      title: 'Action',
      render: (_, item) => (
        <Button variant="danger" size="small" onClick={() => handleDelete(item.id)}>
          delete
        </Button>
      )
    }] : []),
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
                variant={activeTab === 'Barang Inventaris' ? 'detail' : 'secondary'}
                onClick={() => setActiveTab('Barang Inventaris')}
              >
                Barang Inventaris
              </Button>
              <Button
                variant={activeTab === 'Barang Habis Pakai' ? 'detail' : 'secondary'}
                onClick={() => setActiveTab('Barang Habis Pakai')}
              >
                Barang Habis Pakai
              </Button>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 border rounded-md w-64"
            />
          </div>

          <div className="flex space-x-4 mb-6">
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
              subtitle="Hari Ini"
              bgColor="bg-red-100"
              textColor="text-red-600"
            />
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold text-black">
                {activeTab === 'Barang Inventaris' ? 'Data Barang Inventaris' : 'Data Barang Habis Pakai'}
              </h2>
              {role === 'petugas' && (
                <div className="flex space-x-2">
                  <Button variant="secondary">Pilih Semua</Button>
                  <Button variant="primary">Tambah Barang</Button>
                </div>
              )}
            </div>
            <FlexibleTable 
              columns={activeTab === 'Barang Inventaris' ? inventoryColumns : consumableColumns} 
              data={activeTab === 'Barang Inventaris' ? inventoryItems : consumableItems} 
              rowKeyField="id" 
            />
          </div>
          <div className="mt-4 flex justify-between items-center">
              <div className="flex space-x-2">
                <Button variant="secondary" onClick={() => router.push('/movement-request-transaction?page=prev')}>previous</Button>
                <Button variant="secondary" onClick={() => router.push('/movement-request-transaction?page=next')}>next</Button>
              </div>
              <span className="text-black">Page 1 of 1</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ItemManagementPage;