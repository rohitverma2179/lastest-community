'use client';

import { Suspense } from 'react';
import CertificatePage from '@/pages/CertificatePage';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#002b49]" />}>
      <CertificatePage />
    </Suspense>
  );
}
