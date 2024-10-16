'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = () => {
    const token = localStorage.getItem('accessToken');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    try {
      console.log('Attempting login with:', credentials);
      const response = await api.post('/auth/login', credentials);
      console.log('Full login response:', response);
      const { data } = response;
      console.log('Login response data:', data);
      
      if (!data.accessToken) {
        throw new Error('No access token received');
      }
  
      const userData = {
        username: data.username,
        role: data.role
      };
      setUser(userData);
      
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(userData));
  
      console.log('Login successful, user set:', userData);
      router.push('/dashboard');
      return userData;
    } catch (error) {
      console.error('Login failed:', error);
      console.error('Error details:', error.response || error.message || error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      console.log('Attempting registration with:', userData);
      const { data } = await api.post('/auth/register', userData);
      console.log('Registration response:', data);
      return data;
    } catch (error) {
      console.error('Registration failed:', error.response || error.message || error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    router.push('/auth');
  };

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const decodedToken = JSON.parse(jsonPayload);
        return decodedToken.userId || decodedToken.sub; // Adjust this based on your token structure
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, checkUserLoggedIn, getUserIdFromToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);