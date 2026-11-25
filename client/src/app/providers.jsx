'use client';

import React, { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
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

function LazyToaster() {
  const [ToasterComp, setToasterComp] = useState(null);

  useEffect(() => {
    let active = true;
    import('react-hot-toast').then((mod) => {
      if (active) setToasterComp(() => mod.Toaster);
    });
    return () => { active = false; };
  }, []);

  return ToasterComp ? <ToasterComp position="top-right" /> : null;
}

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <AuthInit>
        {children}
        <LazyToaster />
      </AuthInit>
    </Provider>
  );
}
