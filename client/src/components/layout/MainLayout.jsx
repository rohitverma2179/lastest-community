'use client';

import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Header from './Header/Header';
import Footer from './Footer';

/**
 * MainLayout renders the global Header/NavBar and Footer, 
 * using {children} or <Outlet /> to dynamically swap page content on route changes.
 * Automatically scrolls to top on navigation.
 */
export default function MainLayout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const isCommunityRoute =
    pathname.startsWith('/profile') ||
    pathname.startsWith('/user') ||
    pathname.startsWith('/download') ||
    pathname.startsWith('/wishlist') ||
    pathname.startsWith('/post/');

  const hideFooter = isCommunityRoute || pathname.includes('/portal');

  if (isCommunityRoute) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f3f4f6]">
        <Header />
        <main className="flex-1 flex flex-col w-full max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1850px] mx-auto px-3 sm:px-4 md:px-6">
          {children || <Outlet />}
        </main>
      </div>
    );
  }

  return (
    <div className="legacy-styles-wrapper">
      <NavBar />
      {children || <Outlet />}
      {!hideFooter && <Footer />}
    </div>
  );
}

