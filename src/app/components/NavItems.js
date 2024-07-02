// components/NavItems.js
import React from 'react';
import { usePathname } from 'next/navigation';
import NavButton from './NavButton';
import { RiDashboardLine, RiArchiveLine, RiTeamLine } from 'react-icons/ri';
import { MdOutlineSubdirectoryArrowRight } from 'react-icons/md';

const NavItems = ({ role }) => {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const navItems = role === 'admin' 
    ? [
        { href: "/dashboard", label: "Dashboard", icon: RiDashboardLine },
        { href: "/movement-request-transaction", label: "Request Pemindahan Barang", icon: MdOutlineSubdirectoryArrowRight },
        { href: "/item-management", label: "Manajemen Barang", icon: RiArchiveLine },
        { href: "/officer-list", label: "Daftar Petugas", icon: RiTeamLine },
      ]
    : [
        { href: "/dashboard", label: "Dashboard", icon: RiDashboardLine },
        { href: "/item-management", label: "Manajemen Barang", icon: RiArchiveLine },
        { href: "/tasks", label: "Tugas", icon: RiTeamLine },
      ];

  return (
    <nav className="flex-grow flex flex-col space-y-3">
      {navItems.map((item) => (
        <NavButton 
          key={item.href} 
          href={item.href} 
          icon={item.icon} 
          isActive={isActive(item.href)}
          role={role}
        >
          {item.label}
        </NavButton>
      ))}
    </nav>
  );
};

export default NavItems;