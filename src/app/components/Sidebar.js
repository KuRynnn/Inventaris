import React from 'react';
import Button from './Button';
import NavItems from './NavItems';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-72 bg-white p-4 flex flex-col h-screen">
      <h1 className="text-blue-800 font-bold text-xl mb-6 text-center">Vento</h1>
      <NavItems role={user.role} />
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