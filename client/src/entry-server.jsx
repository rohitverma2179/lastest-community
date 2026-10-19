import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import store from './redux/store.js';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import ResourcesPage from './pages/ResourcesPage';
import CoursesPage from './pages/CoursesPage';
import ContactPage from './pages/ContactPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import CommunityPage from './pages/CommunityPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CommunityGuidelinesPage from './pages/CommunityGuidelinesPage';
import Landingpage from './pages/Landingpage';

export function render(url) {
  return renderToString(
    <Provider store={store}>
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="blog" element={<BlogListPage />} />
            <Route path="blog/:slug" element={<BlogDetailPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="privacy-policy" element={<PrivacyPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms-and-conditions" element={<TermsPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="community-guidelines" element={<CommunityGuidelinesPage />} />
            <Route path="iso-certification-training-india" element={<Landingpage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
   
  );
}