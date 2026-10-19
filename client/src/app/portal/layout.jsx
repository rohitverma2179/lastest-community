'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import CmainLayout from '@/components/layout/CmainLayout';

export default function PortalLayout({ children }) {
  return (
    <ProtectedRoute>
      <CmainLayout>{children}</CmainLayout>
    </ProtectedRoute>
  );
}
