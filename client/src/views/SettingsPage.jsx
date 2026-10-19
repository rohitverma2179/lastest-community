'use client';

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/user.thunk";
import AccountTab from "../components/settings/AccountTab";
import PrivacyTab from "../components/settings/PrivacyTab";
import NotificationsTab from "../components/settings/NotificationsTab";
import ContentTab from "../components/settings/ContentTab";
import AboutTab from "../components/settings/AboutTab";
import { 
  User, 
  Shield, 
  Bell, 
  Clipboard, 
  HelpCircle, 
  Info, 
  ArrowLeft,
  Lock,
  Eye,
  MessageSquare,
  Mail,
  Video,
  Image,
  Volume2,
  MessageCircle,
  FileText,
  ShieldCheck,
  Heart
} from "lucide-react";

export default function SettingsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("account");
  const [showMobileContent, setShowMobileContent] = useState(false);

  const handleSignOut = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (err) {
      console.error("Logout request failed:", err);
    }
    navigate("/");
  };

  const menuItems = [
    { id: "account", label: "Account", icon: User },
    { id: "privacy", label: "Privacy and security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "content", label: "Content and media", icon: Clipboard },
    { id: "help", label: "Help", icon: HelpCircle },
    { id: "about", label: "About", icon: Info },
  ];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setShowMobileContent(true);
  };

  const handleBack = () => {
    if (showMobileContent) {
      setShowMobileContent(false);
    } else {
      navigate("/portal");
    }
  };

  // Render dummy toggle switch for placeholders
  const ToggleSwitch = ({ defaultChecked = false }) => {
    const [checked, setChecked] = useState(defaultChecked);
    return (
      <button 
        type="button"
        onClick={() => setChecked(!checked)}
        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 focus:outline-none cursor-pointer ${
          checked ? "bg-[#0096FF]" : "bg-slate-200"
        }`}
      >
        <div 
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    );
  };

  // Render placeholders for other tabs to keep design uniform
  const renderPlaceholderTab = (title, items) => {
    return (
      <div className="bg-white rounded-[20px] border border-[#f1f5f9] p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        {/* Header with Back Arrow */}
        <div className="flex items-center gap-3.5 mb-7 pb-2 select-none">
          <button 
            onClick={handleBack}
            className="p-1 rounded-lg hover:bg-slate-100 transition duration-150 text-slate-800 cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <span className="text-xl font-bold text-[#1e293b] tracking-tight">{title}</span>
        </div>

        <div className="space-y-1">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="flex items-center justify-between py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50"
              >
                <div className="flex items-center gap-4">
                  <Icon className="w-5 h-5 text-slate-800 stroke-[2]" />
                  <span className="text-[#1e293b] font-medium text-[15px]">{item.label}</span>
                </div>
                <div>
                  {item.type === "toggle" && <ToggleSwitch defaultChecked={item.defaultChecked} />}
                  {item.type === "chevron" && <ArrowLeft className="w-5 h-5 text-slate-400 rotate-180 stroke-[2]" />}
                  {item.type === "text" && <span className="text-[#94a3b8] text-[15px] font-normal tracking-wide">{item.value}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="py-6 md:py-8 max-w-[1600px] mx-auto w-full px-4 md:px-0">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        
        {/* Left Sidebar Menu */}
        <div 
          className={`w-full md:w-[260px] lg:w-[280px] shrink-0 bg-white rounded-[20px] border border-[#f1f5f9] p-4 shadow-[0_4px_24px_rgba(0,0,0,0.02)] ${
            showMobileContent ? "hidden md:block" : "block"
          }`}
        >
          <h2 className="text-xl font-bold text-[#1e293b] mb-5 px-3 tracking-tight">Settings</h2>
          
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 text-left rounded-xl transition-all duration-150 font-medium text-[14.5px] cursor-pointer ${
                    isActive 
                      ? "text-[#0096FF] bg-blue-50/20 font-semibold" 
                      : "text-[#475569] hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  <Icon 
                    className={`w-[18px] h-[18px] stroke-[2] ${
                      isActive ? "text-[#0096FF]" : "text-[#475569]"
                    }`} 
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
            
            <div className="h-px bg-slate-100 my-4" />
            
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-3 text-left rounded-xl text-[#ff4d4f] hover:bg-red-50/50 transition-all duration-150 font-medium text-[14.5px] cursor-pointer"
            >
              <span>Sign out</span>
            </button>
          </nav>
        </div>

        {/* Right Active Tab Content Card */}
        <div 
          className={`flex-1 w-full ${
            showMobileContent ? "block" : "hidden md:block"
          }`}
        >
          {activeTab === "account" && <AccountTab onBack={handleBack} />}

          {activeTab === "privacy" && <PrivacyTab onBack={handleBack} />}

          {activeTab === "notifications" && <NotificationsTab onBack={handleBack} />}

          {activeTab === "content" && <ContentTab onBack={handleBack} />}

          {activeTab === "help" && renderPlaceholderTab("Help", [
            { label: "Help Center", icon: HelpCircle, type: "chevron" },
            { label: "Contact Support", icon: MessageCircle, type: "chevron" },
            { label: "Community Guidelines", icon: FileText, type: "chevron" }
          ])}

          {activeTab === "about" && <AboutTab onBack={handleBack} />}
        </div>

      </div>
    </div>
  );
}
