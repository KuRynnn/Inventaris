'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export const useProtectedRoute = (allowedRoles = []) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth');
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        router.push('/unauthorized'); // Make sure to create this page
      }
    }
  }, [user, loading, router, allowedRoles]);

  return { user, loading };
};