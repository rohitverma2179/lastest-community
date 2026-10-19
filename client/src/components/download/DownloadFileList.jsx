import React, { useState } from "react";
import {
  Download,
  MoreVertical,
  ExternalLink,
  Link as LinkIcon,
  Folder,
  Plus,
  X,
  Check,
} from "lucide-react";

/**
 * WishlistFileList Component
 * Displays sectioned lists of saved files ("Latest", "Oldest") with:
 * - Selection checkboxes
 * - File format badges & details
 * - Hover-revealed Download icon button
 * - OPEN action button
 * - 3-Dots dropdown menu (Share, Copy Link, Select Folder, Add Folder)
 * - Select Folders Modal & New Folder Modal matching exact screenshots
 */
export default function DownloadFileList({
  latestFiles = [],
  oldestFiles = [],
  selectedIds = [],
  folders = [
    { id: "1", name: "My imp. resources" },
    { id: "2", name: "Image list" },
  ],
  onToggleSelectFile,
  onOpenFile,
  onDownloadFile,
  onCreateFolder,
}) {
  const [openMenuFileId, setOpenMenuFileId] = useState(null);
  const [isSelectFolderOpen, setIsSelectFolderOpen] = useState(false);
  const [isNewFolderOpen, setIsNewFolderOpen] = useState(false);
  const [activeFileForFolder, setActiveFileForFolder] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [localFolders, setLocalFolders] = useState(folders);
  const [toastMessage, setToastMessage] = useState("");

  const activeFolders = folders && folders.length > 0 ? folders : localFolders;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  const handleDownload = (file) => {
    if (onDownloadFile) {
      onDownloadFile(file);
    } else {
      showToast(`Downloading ${file.name}...`);
    }
  };

  const handleCreateNewFolder = (e) => {
    e.preventDefault();
    const folderName = newFolderName.trim() || "Untitled workspace";
    const newFolderObj = {
      id: Date.now().toString(),
      name: folderName,
      colorGradient: "from-amber-500 to-orange-600",
      itemCount: 1,
    };

    if (onCreateFolder) {
      onCreateFolder(newFolderObj);
    }
    setLocalFolders((prev) => [...prev, newFolderObj]);
    setNewFolderName("");
    setIsNewFolderOpen(false);
    showToast(`Created folder "${folderName}"`);
  };

  const handleAddToFolderSubmit = () => {
    if (selectedFolderId) {
      const targetFolder = activeFolders.find((f) => f.id === selectedFolderId);
      showToast(`Added to "${targetFolder?.name || "Folder"}"`);
    }
    setIsSelectFolderOpen(false);
    setSelectedFolderId(null);
  };

  const renderFileRow = (file) => {
    const isSelected = selectedIds.includes(file.id);

    return (
      <div
        key={file.id}
        className={`group relative bg-white rounded-2xl border transition-all duration-150 p-3 sm:p-4 flex items-center justify-between gap-3 shadow-2xs hover:shadow-sm ${
          isSelected
            ? "border-[#0096FF]/50 bg-sky-50/20"
            : "border-slate-200/80 hover:border-slate-300"
        }`}
      >
        {/* Left Side: Checkbox, Badge & Details */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelectFile(file.id)}
            className="w-4 h-4 rounded text-[#0096FF] border-slate-300 focus:ring-[#0096FF] cursor-pointer shrink-0"
          />

          {/* Format Icon Badge */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#057642] text-white flex items-center justify-center text-[10px] sm:text-xs font-black tracking-tight shrink-0 shadow-2xs">
            XLS
          </div>

          {/* Title & Metadata */}
          <div className="min-w-0 flex-1">
            <h4 className="text-xs sm:text-sm font-bold text-slate-800 truncate tracking-tight">
              {file.name}
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-0.5">
              Downloaded . {file.size || "8.1 MB"}
            </p>
          </div>
        </div>

        {/* Right Side: Hover Download Icon, OPEN Action Button, 3 Dots Options Menu */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 relative">
          {/* Download Icon Button (Appears on Row Hover) */}
          <button
            type="button"
            onClick={() => handleDownload(file)}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-slate-400 hover:text-[#0096FF] p-2 rounded-full hover:bg-slate-100 cursor-pointer shrink-0 active:scale-90"
            title="Download resource"
          >
            <Download className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>

          {/* OPEN Action Button */}
          <button
            type="button"
            onClick={() => onOpenFile(file)}
            className="px-5 sm:px-6 py-1.5 sm:py-2 bg-[#0096FF] hover:bg-[#0082de] text-white text-xs font-bold rounded-full shadow-2xs hover:shadow-xs transition cursor-pointer shrink-0 uppercase tracking-wide active:scale-95"
          >
            OPEN
          </button>

          {/* Three Dots Menu Button */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenuFileId(openMenuFileId === file.id ? null : file.id);
              }}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer shrink-0"
              title="More options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {/* 3-Dots Options Dropdown Menu (Matching Image 4) */}
            {openMenuFileId === file.id && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => setOpenMenuFileId(null)}
                />
                <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-30 animate-in fade-in zoom-in-95 duration-150">
                  {/* Share */}
                  <button
                    type="button"
                    onClick={() => {
                      setOpenMenuFileId(null);
                      if (navigator.share) {
                        navigator.share({ title: file.name, url: window.location.href }).catch(() => {});
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        showToast("Resource link copied!");
                      }
                    }}
                    className="w-full px-4 py-2.5 text-left hover:bg-slate-50 flex items-center gap-3 text-xs font-semibold text-slate-700 transition"
                  >
                    <ExternalLink className="w-4 h-4 text-slate-500" />
                    <span>Share</span>
                  </button>

                  {/* Copy link */}
                  <button
                    type="button"
                    onClick={() => {
                      setOpenMenuFileId(null);
                      navigator.clipboard.writeText(window.location.href);
                      showToast("Link copied to clipboard!");
                    }}
                    className="w-full px-4 py-2.5 text-left hover:bg-slate-50 flex items-center gap-3 text-xs font-semibold text-slate-700 transition"
                  >
                    <LinkIcon className="w-4 h-4 text-slate-500" />
                    <span>Copy link</span>
                  </button>

                  {/* Select Folder */}
                  <button
                    type="button"
                    onClick={() => {
                      setOpenMenuFileId(null);
                      setActiveFileForFolder(file);
                      setIsSelectFolderOpen(true);
                    }}
                    className="w-full px-4 py-2.5 text-left hover:bg-slate-50 flex items-center gap-3 text-xs font-semibold text-slate-700 transition"
                  >
                    <Folder className="w-4 h-4 text-slate-500" />
                    <span>Select Folder</span>
                  </button>

                  {/* Add Folder Section */}
                  <div className="border-t border-slate-100 my-1 pt-1.5 px-1">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenMenuFileId(null);
                        setActiveFileForFolder(file);
                        setIsNewFolderOpen(true);
                      }}
                      className="w-full px-3 py-1.5 text-left hover:bg-slate-50 flex items-center justify-between text-xs font-semibold text-slate-700 transition rounded-xl"
                    >
                      <div className="flex items-center gap-2.5">
                        <Plus className="w-4 h-4 text-slate-500" />
                        <span>Add Folder</span>
                      </div>
                      {/* <span className="text-slate-400 text-[10px]">▼</span> */}
                    </button>

                    {/* Sub Item: New Folder */}
                    {/* <div className="pl-7 pr-1 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setOpenMenuFileId(null);
                          setActiveFileForFolder(file);
                          setIsNewFolderOpen(true);
                        }}
                        className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-left text-xs font-semibold text-slate-700 transition"
                      >
                        New Folder
                      </button>
                    </div> */}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 relative">
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* LATEST SECTION */}
      {latestFiles.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-slate-500 tracking-wide px-1">
            Latest
          </h3>
          <div className="space-y-2.5">
            {latestFiles.map(renderFileRow)}
          </div>
        </div>
      )}

      {/* OLDEST SECTION */}
      {oldestFiles.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-semibold text-slate-500 tracking-wide px-1">
            Oldest
          </h3>
          <div className="space-y-2.5">
            {oldestFiles.map(renderFileRow)}
          </div>
        </div>
      )}

      {latestFiles.length === 0 && oldestFiles.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-2">
          <p className="text-sm font-bold text-slate-700">No saved resources found</p>
          <p className="text-xs text-slate-400">Save resources or create folders to see them here.</p>
        </div>
      )}

      {/* SELECT FOLDERS MODAL (Matching Image 2) */}
      {isSelectFolderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 border border-slate-100">
            {/* Header */}
            <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">Select Folders</h3>
              <button
                type="button"
                onClick={() => setIsSelectFolderOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Folder List Body */}
            <div className="p-4 space-y-1 max-h-60 overflow-y-auto">
              {activeFolders.map((folder) => {
                const isFolderSelected = selectedFolderId === folder.id;
                return (
                  <div
                    key={folder.id}
                    onClick={() => setSelectedFolderId(isFolderSelected ? null : folder.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition ${
                      isFolderSelected ? "bg-sky-50 text-[#0096FF]" : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <Folder className={`w-4.5 h-4.5 ${isFolderSelected ? "text-[#0096FF] fill-[#0096FF]" : "text-black fill-black"}`} />
                    <span className="text-xs font-semibold flex-1">{folder.name}</span>
                    {isFolderSelected && <Check className="w-4 h-4 text-[#0096FF]" />}
                  </div>
                );
              })}
            </div>

            {/* Footer Actions */}
            <div className="p-4 pt-2 space-y-2">
              <button
                type="button"
                onClick={handleAddToFolderSubmit}
                className="w-full py-2.5 bg-[#0096FF] hover:bg-[#0082de] text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer active:scale-98"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setIsSelectFolderOpen(false)}
                className="w-full py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50 transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW FOLDER MODAL (Matching Image 3) */}
      {isNewFolderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 border border-slate-100">
            {/* Header */}
            <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">New Folder</h3>
              <button
                type="button"
                onClick={() => setIsNewFolderOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Input Body */}
            <form onSubmit={handleCreateNewFolder} className="p-5 space-y-4">
              <input
                type="text"
                placeholder="Untitled workspace"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                autoFocus
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0096FF]/30 focus:border-[#0096FF] transition"
              />

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsNewFolderOpen(false)}
                  className="px-4 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-[#0096FF] hover:bg-[#0082de] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer active:scale-95"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
