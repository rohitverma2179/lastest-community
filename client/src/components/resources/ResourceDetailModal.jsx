import React, { useState } from "react";
import { X, Download, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";

export default function ResourceDetailModal({ resource, onClose, onDownload }) {
  const [downloaded, setDownloaded] = useState(false);

  if (!resource) return null;

  const getAuthorInitials = (name) => {
    if (!name) return "A";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name[0].toUpperCase();
  };

  const author = resource?.author || (typeof resource?.uploadedBy === "object" ? resource?.uploadedBy : null);
  const authorName =
    resource?.uploaderName ||
    (author
      ? typeof author === "object"
        ? `${author.firstName || author.name || ""} ${author.lastName || ""}`.trim()
        : author
      : "Community Member") ||
    "Community Member";
  const authorAvatar = author?.avatar || resource?.uploaderAvatar || resource?.avatar;
  const authorColor = author?.color;

  const handleDownload = () => {
    setDownloaded(true);
    if (onDownload) onDownload(resource);
    setTimeout(() => {
      setDownloaded(false);
    }, 2000);
  };

  const fileType = (resource.type || "XLS").toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
        {/* Modal Gradient Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-[#0b4b66] to-[#0f172a] text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            {/* File Icon Block with Gradient */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0096FF] to-[#0284c7] text-white font-black text-xl flex items-center justify-center shrink-0 shadow-lg border border-white/20">
              {fileType}
            </div>

            <div className="pr-6">
              <span className="inline-block bg-white/15 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-1">
                {resource.category || "General"}
              </span>
              <h2 className="text-lg sm:text-xl font-bold leading-snug">
                {resource.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-300 mt-2">
                <span>Format: {fileType}</span>
                <span>•</span>
                <span>Size: {resource.fileSize || "1.5MB"}</span>
                <span>•</span>
                <span>Downloads: {(resource.downloads || 1200).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Summary / Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Resource Description
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {resource.summary ||
                "This comprehensive template includes pre-configured audit items, disclosure mappings, and calculation formulas designed specifically for QEHS professionals."}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {(resource.tags || ["esg", "reporting", "audit"]).map((tag, idx) => (
              <span
                key={idx}
                className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-md border border-slate-200"
              >
                #{tag.toLowerCase()}
              </span>
            ))}
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl border border-gray-200/80">
            {authorAvatar ? (
              <img
                src={authorAvatar}
                alt={authorName}
                className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0 shadow-xs"
              />
            ) : (
              <div
                style={authorColor ? { backgroundColor: authorColor } : undefined}
                className={`w-9 h-9 rounded-full ${!authorColor ? "bg-gradient-to-tr from-[#0b4b66] to-[#0284c7]" : ""} text-white font-extrabold flex items-center justify-center shrink-0 shadow-xs`}
              >
                {getAuthorInitials(authorName)}
              </div>
            )}
            <div>
              <div className="text-xs font-bold text-slate-900">
                Uploaded by {authorName}
              </div>
              <div className="text-[11px] text-slate-500">
                Shared {resource.timeAgo || "1 week ago"} • Verified Contributor
              </div>
            </div>
          </div>

          {/* Guidelines Notice */}
          <div className="flex items-start gap-2 text-xs text-slate-600 bg-amber-50/90 p-3 rounded-xl border border-amber-200">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Free community download. Please review and tailor this document to your company’s specific safety and regulatory standards before site deployment.
            </span>
          </div>

          {/* CTA Footer */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-gray-100">
            <div className="text-xs text-slate-600">
              Cost: <strong className="text-amber-700 font-extrabold text-sm">M {resource.meritPoints || 100}</strong> Merit
            </div>

            <button
              onClick={handleDownload}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold shadow-md transition flex items-center gap-2 cursor-pointer ${
                downloaded
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                  : "bg-gradient-to-r from-[#ff6b00] to-[#ff8800] hover:from-[#ea580c] hover:to-[#f97316] text-white"
              }`}
            >
              {downloaded ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  <span>Download Resource</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
