'use client';

import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from '@/redux/store';
import { fetchCurrentUser } from '@/features/auth/user.thunk';

function AuthInit({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('eg_token');
      if (token) {
        dispatch(fetchCurrentUser());
      }
    }
  }, [dispatch]);

  return children;
}

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <AuthInit>
        {children}
        <Toaster position="top-right" />
      </AuthInit>
    </Provider>
  );
}
