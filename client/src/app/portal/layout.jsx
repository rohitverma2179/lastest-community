'use client';

import '@/styles/portal.css';
import { Providers } from '@/app/providers';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import CmainLayout from '@/components/layout/CmainLayout';

export default function PortalLayout({ children }) {
  return (
    <Providers>
      <ProtectedRoute>
        <CmainLayout>{children}</CmainLayout>
      </ProtectedRoute>
    </Providers>
  );
}
