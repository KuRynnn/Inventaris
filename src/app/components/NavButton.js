// components/NavButton.js
import React from 'react';
import Link from 'next/link';
import Button from './Button';

const NavButton = ({ href, icon: Icon, children, isActive, role }) => {
  const fullHref = `${href}?role=${role}`;
  return (
    <Link href={fullHref} passHref className="w-full block px-2">
      <Button 
        variant={isActive ? 'primary' : 'nav'} 
        className={`w-full text-left flex items-center`}
        size="medium"
      >
        <Icon className="mr-3 flex-shrink-0" size={24} />
        <span className="flex-grow">{children}</span>
      </Button>
    </Link>
  );
};

export default NavButton;