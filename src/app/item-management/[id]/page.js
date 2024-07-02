// src/app/item-management/[id]/page.js
'use client';

import React from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import AppBar from '../../components/AppBar';
import Sidebar from '../../components/Sidebar';
import ItemDetail from '../../components/ItemDetail';
import FlexibleTable from '../../components/FlexibleTable';
import Button from '../../components/Button';

const ItemDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'petugas';

  // Mock data for the item detail
  const itemDetail = {
    namaBarang: 'Kabel HDMI',
    qty: 1,
    jenisBarang: 'Inventaris Kelas',
    supplier: 'PT Asikin Aja',
    ruangan: 'Ruangan F1',
    pemindahanTerakhir: '14:00 / Jumat, 07/06/2024',
  };

  const itemInstances = [
    { no: 1, namaBarang: 'Kabel HDMI', jumlah: 1, kondisiBarang: 'Baik', ruangan: 'F1' },
    { no: 2, namaBarang: 'Kabel HDMI', jumlah: 1, kondisiBarang: 'Kerusakan Minor', ruangan: 'F2' },
    { no: 3, namaBarang: 'Kabel HDMI', jumlah: 1, kondisiBarang: 'Kerusakan Mayor', ruangan: 'F3' },
  ];

  const columns = [
    { key: 'no', title: 'No' },
    { key: 'namaBarang', title: 'Nama Barang' },
    { key: 'jumlah', title: 'Jumlah' },
    { key: 'kondisiBarang', title: 'Kondisi Barang' },
    { key: 'ruangan', title: 'Ruangan' },
  ];

  const handleBack = () => {
    router.push(`/item-management?role=${role}`);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <AppBar title="Manajemen Barang" />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-black">Detail Barang Inventaris</h2>
          <ItemDetail itemDetail={itemDetail} />
          <div className="bg-white rounded-lg shadow mt-6">
            <FlexibleTable
              columns={columns}
              data={itemInstances}
              rowKeyField="no"
            />
          </div>
          <div className="flex justify-between items-center p-4 border-t">
              <Button variant="secondary" onClick={handleBack}>back</Button>
              <div className="flex items-center space-x-2">
                <Button variant="secondary">previous</Button>
                <Button variant="secondary">next</Button>
              </div>
              <span className="text-sm text-gray-500">Page 1 of 7</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;