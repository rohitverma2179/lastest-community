'use client';

import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home as HomeIcon, Users, BookOpen, Briefcase, Bell } from "lucide-react";
import Header from "./Header/Header";
import Footer from "./Footer";
import QuestionCard from "../feed/QuestionCard";

/**
 * MainLayout renders the global Header, global Footer, and a mobile bottom navigation bar.
 */
export default function MainLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isModalOpen } = useSelector((state) => state.posts);

  const mobileNavItems = [
    { id: "home", label: "Home", icon: HomeIcon, path: "/portal" },
    { id: "connections", label: "Connections", icon: Users, path: "#" },
    { id: "resources", label: "Resources", icon: BookOpen, path: "/portal/resources" },
    { id: "jobs", label: "Jobs", icon: Briefcase, path: "#" },
    { id: "notifications", label: "Alerts", icon: Bell, path: "#", badge: 3 }
  ];

  const getActiveState = (item) => {
    if (item.path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(item.path);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f4f6] pb-16 md:pb-0">
      {/* Global Desktop Navigation Header */}
      <Header />
      
      {/* Ask / Request Modal */}
      {isModalOpen && <QuestionCard />}
      
      {/* Main Page Area */}
      <main className="flex-1 flex flex-col w-full max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1850px] mx-auto  sm:px-4 md:px-6">
        {children || <Outlet />}
      </main>

      {/* Global Footer (only visible on desktop or large views, hidden on mobile feed to keep it clean) */}
      <div className="hidden md:block">
        {/* <Footer /> */}
      </div>

      {/* Mobile Bottom Navigation Bar (Visible on mobile/mini-phones, hidden on md screens and up) */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200/80 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] z-40 flex items-center justify-around px-2 hidden-md-ext backdrop-blur-md bg-white/95 pb-safe">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = getActiveState(item);
          return (
            <button
              key={item.id}
              onClick={() => item.path !== "#" && navigate(item.path)}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-all duration-150 select-none cursor-pointer ${
                isActive ? "text-[#0096FF]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5 stroke-[2]" />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white ring-2 ring-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-bold mt-1 tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}







