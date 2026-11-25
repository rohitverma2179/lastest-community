'use client';

import React, { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const CommunityShell = React.lazy(() => import('./CommunityShell'));

/**
 * MainLayout renders the global Header/NavBar and Footer, 
 * using {children} or <Outlet /> to dynamically swap page content on route changes.
 * Automatically scrolls to top on navigation.
 */
export default function MainLayout({ children }) {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      window.scrollTo(0, 0);
    }
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
      <React.Suspense fallback={<div className="min-h-screen bg-[#f3f4f6]" />}>
        <CommunityShell>{children || <Outlet />}</CommunityShell>
      </React.Suspense>
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

