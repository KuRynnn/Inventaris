// src/components/withAuth.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent, allowedRoles) => {
  const WithAuthComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      if (!token) {
        router.push('/auth');
      } else if (!allowedRoles.includes(role)) {
        router.push('/unauthorized');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  // Set the display name for the wrapped component
  WithAuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuthComponent;
};

// Helper function to get the display name of a component
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;