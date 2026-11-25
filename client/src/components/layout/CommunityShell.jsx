'use client';

import React from 'react';
import { Providers } from '@/app/providers';
import Header from './Header/Header';
import '@/styles/portal.css';

export default function CommunityShell({ children }) {
  return (
    <Providers>
      <div className="min-h-screen flex flex-col bg-[#f3f4f6]">
        <Header />
        <main className="flex-1 flex flex-col w-full max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1850px] mx-auto px-3 sm:px-4 md:px-6">
          {children}
        </main>
      </div>
    </Providers>
  );
}
