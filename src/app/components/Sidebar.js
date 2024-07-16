// components/Sidebar.js
import React, { useEffect, useState } from 'react';
import Button from './Button';
import NavItems from './NavItems';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, []);

  const handleLogout = () => {
    // Remove the role from localStorage
    localStorage.removeItem('role');
    // Navigate to the /auth route
    router.push('/auth');
  };

  if (role === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-72 bg-white p-4 flex flex-col h-screen">
      <h1 className="text-blue-800 font-bold text-xl mb-6 text-center">InventoryApp</h1>
      <NavItems role={role} />
      <Button
        variant="secondary"
        className="mt-4 w-full flex items-center justify-start hover:bg-gray-100"
        size="medium"
        onClick={handleLogout}
      >
        <RiLogoutBoxLine className="mr-3" size={24} />
        <span>Logout</span>
      </Button>
    </div>
  );
};

export default Sidebar;