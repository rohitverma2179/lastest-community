import React, { useState } from "react";
import { X, FolderPlus, Palette } from "lucide-react";

/**
 * CreateFolderModal Component
 * Allows users to create a new folder/collection for organizing saved resources.
 */
export default function CreateFolderModal({ isOpen, onClose, onCreateFolder }) {
  const [folderName, setFolderName] = useState("");
  const [selectedColor, setSelectedColor] = useState("orange");

  if (!isOpen) return null;

  const colorOptions = [
    { id: "orange", name: "Orange", bg: "from-amber-500 to-orange-600" },
    { id: "blue", name: "Blue", bg: "from-sky-500 to-blue-600" },
    { id: "emerald", name: "Emerald", bg: "from-emerald-500 to-teal-600" },
    { id: "purple", name: "Purple", bg: "from-purple-500 to-indigo-600" },
    { id: "rose", name: "Rose", bg: "from-rose-500 to-pink-600" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!folderName.trim()) return;

    onCreateFolder({
      id: Date.now().toString(),
      name: folderName.trim(),
      color: selectedColor,
      colorGradient: colorOptions.find((c) => c.id === selectedColor)?.bg || "from-amber-500 to-orange-600",
      itemCount: 0,
    });

    setFolderName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-150 border border-slate-100">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
            <FolderPlus className="w-5 h-5 text-[#0096FF]" />
            <span>Create New Folder</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Folder Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. My imp. resources, ISO Guides..."
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#0096FF]/30 focus:border-[#0096FF] transition text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-slate-500" />
              <span>Theme Color</span>
            </label>
            <div className="flex items-center gap-3">
              {colorOptions.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedColor(c.id)}
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${c.bg} transition-all cursor-pointer ring-offset-2 ${
                    selectedColor === c.id ? "ring-2 ring-[#0096FF] scale-110 shadow-sm" : "hover:scale-105 opacity-80"
                  }`}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#0096FF] hover:bg-[#0082de] rounded-xl shadow-xs transition cursor-pointer"
            >
              Create Folder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
