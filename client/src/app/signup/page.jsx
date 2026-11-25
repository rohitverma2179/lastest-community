'use client';

import { Providers } from '@/app/providers';
import AuthPage from '@/pages/AuthPage';

export default function Page() {
  return (
    <Providers>
      <AuthPage mode="signup" />
    </Providers>
  );
}
