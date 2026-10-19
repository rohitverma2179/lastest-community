import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import CmainLayout from '../components/layout/CmainLayout';
import Home from '../views/Home';
import CommunityPage from '../views/CommunityPage';
import ContactPage from '../views/ContactPage';
import CoursesPage from '../views/CoursesPage';
import ResourcesPage from '../views/ResourcesPage';
import EventsPage from '../views/EventsPage';
import Chomepage from '../views/Chomepage';
import PostDetailPage from '../views/PostDetailPage';
import ComingSoon from '../views/ComingSoon';
import AuthPage from '../views/AuthPage';
import PrivacyPage from '../views/PrivacyPage';
import TermsPage from '../views/TermsPage';
import CommunityGuidelinesPage from '../views/CommunityGuidelinesPage';
import DownloadPage from '../views/DownloadPage';
import WishlistPage from '../views/WishlistPage';
import SettingsPage from '../views/SettingsPage';
import ProfilePage from '../views/ProfilePage';
import OtherProfilePage from '../views/OtherProfilePage';
import PortalResourcesPage from '../views/PortalResourcesPage';
import BlogListPage from '../views/BlogListPage';
import BlogDetailPage from '../views/BlogDetailPage';
import Landingpage from '../views/Landingpage';
import EsgLandingpage from '../views/EsgLandingpage';

import ProtectedRoute from '../components/auth/ProtectedRoute';

/**
 * Declares all routes under MainLayout and CmainLayout.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'iso-certification-training-india',
        element: <Landingpage />,
      },
      {
        path: 'esg-certification-course-india',
        element: <EsgLandingpage />,
      },
      {
        path: 'community',
        element: <CommunityPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'courses',
        element: <CoursesPage />,
      },
      {
        path: 'resources',
        element: <ResourcesPage />,
      },
      {
        path: 'blog',
        element: <BlogListPage />,
      },
      {
        path: 'blog/:slug',
        element: <BlogDetailPage />,
      },
      {
        path: 'events',
        element: <EventsPage />,
      },
      {
        path: 'download',
        element: <DownloadPage />,
      },
      {
        path: 'wishlist',
        element: <WishlistPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'profile/:id',
        element: <OtherProfilePage />,
      },
      {
        path: 'user/:id',
        element: <OtherProfilePage />,
      },

      {
        path: 'post/:id',
        element: <PostDetailPage />,
      },
      {
        path: 'privacy-policy',
        element: <PrivacyPage />,
      },
      {
        path: 'privacy',
        element: <PrivacyPage />,
      },
      {
        path: 'terms-and-conditions',
        element: <TermsPage />,
      },
      {
        path: 'terms',
        element: <TermsPage />,
      },
      {
        path: 'community-guidelines',
        element: <CommunityGuidelinesPage />,
      },
    ],
  },
  {
    path: 'login',
    element: <AuthPage mode="login" />,
  },
  {
    path: 'signup',
    element: <AuthPage mode="signup" />,
  },
  {
    path: '/coming-soon',
    element: <ComingSoon />,
  },

  {
    path: '/portal',
    element: <ProtectedRoute />,
    children: [
      {
        element: <CmainLayout />,
        children: [
          {
            index: true,
            element: <Chomepage />,
          },
          {
            path: 'resources',
            element: <PortalResourcesPage />,
          },
          {
            path: 'events',
            element: <EventsPage />,
          },
          {
            path: 'download',
            element: <DownloadPage />,
          },
          {
            path: 'wishlist',
            element: <WishlistPage />,
          },
          {
            path: 'profile',
            element: <ProfilePage />,
          },
          {
            path: 'profile/:id',
            element: <OtherProfilePage />,
          },
          {
            path: 'user/:id',
            element: <OtherProfilePage />,
          },
          {
            path: 'settings',
            element: <SettingsPage />,
          },
          {
            path: 'post/:id',
            element: <PostDetailPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
