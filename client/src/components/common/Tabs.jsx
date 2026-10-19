import React from "react";

export default function Tabs({ tabs, activeTab, onChange, className = "" }) {
  return (
    <div className={`flex items-center gap-3 overflow-x-auto pb-0.5 scrollbar-hide ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`tab-btn ${isActive ? "active" : "inactive"}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
