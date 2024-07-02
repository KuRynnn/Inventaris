// components/Sidebar.js
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Button from './Button';
import NavItems from './NavItems';
import { RiLogoutBoxLine } from 'react-icons/ri';

const Sidebar = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'petugas';

  return (
    <div className="w-72 bg-white p-4 flex flex-col h-screen">
      <h1 className="text-blue-800 font-bold text-xl mb-6 text-center">InventoryApp</h1>
      <NavItems role={role} />
      <Button 
        variant="secondary" 
        className="mt-4 w-full flex items-center justify-start hover:bg-gray-100" 
        size="medium"
      >
        <RiLogoutBoxLine className="mr-3" size={24} />
        <span>Logout</span>
      </Button>
    </div>
  );
};

export default Sidebar;