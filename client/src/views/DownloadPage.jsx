'use client';

import React, { useState } from "react";
import {
  DownloadHeader,
  DownloadFolderGrid,
  DownloadActionBar,
  DownloadFileList,
  CreateFolderModal,
} from "../components/download";
import { DailyMission, TopContributors, UpcomingEvent } from "../components/layout/RightSidebar";

/**
 * DownloadPage Component
 * Full production page for user's Download / My Downloads collections, matching screenshot design.
 */
export default function DownloadPage() {
  // Folder state
  const [folders, setFolders] = useState([
    {
      id: "1",
      name: "My imp. resources",
      colorGradient: "from-amber-500 to-orange-600",
      itemCount: 6,
    },
  ]);
  const [activeFolderId, setActiveFolderId] = useState(null);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);

  // File items state matching screenshot
  const [latestFiles, setLatestFiles] = useState([
    { id: "l1", name: "ARE-2027-Mapping-City.xlsx", size: "8.1 MB", format: "xlsx", type: "latest" },
    { id: "l2", name: "ARE-2027-Mapping-City.xlsx", size: "8.1 MB", format: "xlsx", type: "latest" },
    { id: "l3", name: "ARE-2027-Mapping-City.xlsx", size: "8.1 MB", format: "xlsx", type: "latest" },
    { id: "l4", name: "ARE-2027-Mapping-City.xlsx", size: "8.1 MB", format: "xlsx", type: "latest" },
  ]);

  const [oldestFiles, setOldestFiles] = useState([
    { id: "o1", name: "ARE-2027-Mapping-City.xlsx", size: "8.1 MB", format: "xlsx", type: "oldest" },
    { id: "o2", name: "ARE-2027-Mapping-City.xlsx", size: "8.1 MB", format: "xlsx", type: "oldest" },
  ]);

  // Selection & filter states
  const [selectedFileIds, setSelectedFileIds] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  // All current file IDs
  const allFiles = [...latestFiles, ...oldestFiles];
  const allFileIds = allFiles.map((f) => f.id);
  const isAllSelected = allFileIds.length > 0 && selectedFileIds.length === allFileIds.length;

  // Handlers
  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedFileIds([]);
    } else {
      setSelectedFileIds([...allFileIds]);
    }
  };

  const handleToggleSelectFile = (id) => {
    setSelectedFileIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedFileIds.length === 0) return;
    setLatestFiles((prev) => prev.filter((f) => !selectedFileIds.includes(f.id)));
    setOldestFiles((prev) => prev.filter((f) => !selectedFileIds.includes(f.id)));
    setSelectedFileIds([]);
  };

  const handleCreateFolder = (newFolder) => {
    setFolders((prev) => [...prev, newFolder]);
  };

  const handleOpenFile = (file) => {
    alert(`Opening resource: ${file.name}`);
  };

  return (
    <div className="py-3 bg-[#F4F3F0] sm:py-5 lg:py-6 w-full flex-1 min-h-screen">
      {/* 2-Column Responsive Layout: Left Main Workspace, Right Sidebar */}
      <div className="flex flex-col lg:flex-row gap-6">

        {/* LEFT COLUMN: Header, Folders, Action Bar & File Lists */}
        <div className="flex-1 space-y-6 min-w-0">

          {/* Header */}
          <DownloadHeader onOpenCreateFolder={() => setIsCreateFolderOpen(true)} />

          {/* Collections / Folders Grid */}
          <DownloadFolderGrid
            folders={folders}
            activeFolderId={activeFolderId}
            onSelectFolder={setActiveFolderId}
          />

          {/* Action Bar (Select All, Bulk Delete, Filter) */}
          <DownloadActionBar
            isAllSelected={isAllSelected}
            selectedCount={selectedFileIds.length}
            onToggleSelectAll={handleToggleSelectAll}
            onDeleteSelected={handleDeleteSelected}
            activeFilter={activeFilter}
            onSelectFilter={setActiveFilter}
          />

          {/* Categorized File List (Latest & Oldest) */}
          <DownloadFileList
            latestFiles={latestFiles}
            oldestFiles={oldestFiles}
            selectedIds={selectedFileIds}
            folders={folders}
            onToggleSelectFile={handleToggleSelectFile}
            onOpenFile={handleOpenFile}
            onCreateFolder={handleCreateFolder}
          />
        </div>

        {/* RIGHT COLUMN: Sidebar Cards (Missions, Upcoming Events, Top Contributors) */}
        <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0 space-y-3 lg:space-y-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto scrollbar-hide">
          <DailyMission />
          <UpcomingEvent />
          <TopContributors />
        </div>

      </div>

      {/* Create Folder Modal */}
      <CreateFolderModal
        isOpen={isCreateFolderOpen}
        onClose={() => setIsCreateFolderOpen(false)}
        onCreateFolder={handleCreateFolder}
      />
    </div>
  );
}
