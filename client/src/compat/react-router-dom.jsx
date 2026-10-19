'use client';

import React, { forwardRef, createContext, useContext, useEffect, useMemo, Suspense } from 'react';
import NextLink from 'next/link';
import {
  useRouter as useNextRouter,
  usePathname as useNextPathname,
  useSearchParams as useNextSearchParams,
  useParams as useNextParams,
} from 'next/navigation';

export const OutletContext = createContext(null);

export function OutletProvider({ children, value }) {
  return <OutletContext.Provider value={value}>{children}</OutletContext.Provider>;
}

export function Outlet() {
  const content = useContext(OutletContext);
  return content || null;
}

export function useOutletContext() {
  return useContext(OutletContext);
}

export const Link = forwardRef(function Link({ to, href, children, ...props }, ref) {
  const destination = to || href || '#';
  return (
    <NextLink ref={ref} href={destination} {...props}>
      {children}
    </NextLink>
  );
});

export const NavLink = forwardRef(function NavLink({ to, href, className, children, ...props }, ref) {
  const destination = to || href || '#';
  const pathname = usePathname();
  const isActive = pathname === destination;
  const computedClass = typeof className === 'function' ? className({ isActive }) : className;
  return (
    <NextLink ref={ref} href={destination} className={computedClass} {...props}>
      {typeof children === 'function' ? children({ isActive }) : children}
    </NextLink>
  );
});

export function useNavigate() {
  const router = useNextRouter();
  return React.useCallback(
    (to, options) => {
      if (!router) return;
      if (typeof to === 'number') {
        if (to === -1) router.back();
        return;
      }
      if (options?.replace) {
        router.replace(to);
      } else {
        router.push(to);
      }
    },
    [router]
  );
}

export function useLocation() {
  const pathname = useNextPathname() || '/';
  let searchStr = '';
  try {
    const searchParams = useNextSearchParams();
    searchStr = searchParams?.toString() ? `?${searchParams.toString()}` : '';
  } catch (e) {
    // searchParams may throw if accessed outside Suspense during SSR
  }

  return useMemo(
    () => ({
      pathname,
      search: searchStr,
      hash: typeof window !== 'undefined' ? window.location.hash : '',
      state: null,
    }),
    [pathname, searchStr]
  );
}

export function useParams() {
  const params = useNextParams();
  return params || {};
}

export { useNextSearchParams as useSearchParams };

export function Navigate({ to, replace }) {
  const router = useNextRouter();
  useEffect(() => {
    if (router && to) {
      if (replace) router.replace(to);
      else router.push(to);
    }
  }, [router, to, replace]);
  return null;
}

export function createBrowserRouter(routes) {
  return routes;
}

export function RouterProvider({ router }) {
  return null;
}

export default {
  Link,
  NavLink,
  useNavigate,
  useLocation,
  useParams,
  Navigate,
  Outlet,
  OutletProvider,
  useOutletContext,
  createBrowserRouter,
  RouterProvider,
};
