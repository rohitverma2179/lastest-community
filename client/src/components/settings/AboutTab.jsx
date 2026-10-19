import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, BookOpen, MessageSquare, X } from "lucide-react";
import toast from "react-hot-toast";

export default function AboutTab({ onBack }) {
  const navigate = useNavigate();
  const [showReportModal, setShowReportModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCloseModal = () => {
    setShowReportModal(false);
    setTitle("");
    setDescription("");
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    if (!title || !description) {
      return toast.error("Please fill in all fields");
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Error report submitted successfully! Thank you.");
      setLoading(false);
      handleCloseModal();
    }, 1000);
  };

  return (
    <div className="bg-white rounded-[20px] border border-[#f1f5f9] p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
      {/* Header with Back Arrow */}
      <div className="flex items-center gap-3.5 mb-7 pb-2 select-none">
        <button 
          onClick={onBack}
          className="p-1 rounded-lg hover:bg-slate-100 transition duration-150 text-slate-850 cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
        <span className="text-xl font-bold text-[#1e293b] tracking-tight">About</span>
      </div>

      {/* Settings list */}
      <div className="space-y-1">
        
        {/* Terms of Service */}
        <button
          onClick={() => navigate("/terms-and-conditions")}
          className="w-full flex items-center justify-between py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50 text-left cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <BookOpen className="w-5 h-5 text-slate-800 stroke-[2]" />
            <span className="text-[#1e293b] font-medium text-[15px]">Terms of Service</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 stroke-[2]" />
        </button>

        {/* Privacy Policy */}
        <button
          onClick={() => navigate("/privacy-policy")}
          className="w-full flex items-center justify-between py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50 text-left cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <BookOpen className="w-5 h-5 text-slate-800 stroke-[2]" />
            <span className="text-[#1e293b] font-medium text-[15px]">Privacy Policy</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 stroke-[2]" />
        </button>

        {/* Send error report */}
        <button
          onClick={() => setShowReportModal(true)}
          className="w-full flex items-center justify-between py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50 text-left cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <MessageSquare className="w-5 h-5 text-slate-800 stroke-[2]" />
            <span className="text-[#1e293b] font-medium text-[15px]">Send error report</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 stroke-[2]" />
        </button>

      </div>

      {/* --- SEND ERROR REPORT MODAL (Matching layout and placeholders exactly) --- */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 transition-all duration-300 animate-fade-in">
          <div className="bg-white rounded-[24px] max-w-[425px] w-full p-6 md:p-7 shadow-2xl border border-slate-100 relative transform transition-all">
            
            {/* Close icon X */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>

            <form onSubmit={handleSubmitReport}>
              <div className="mb-6">
                <h3 className="text-[20px] font-bold text-[#0f172a] tracking-tight">Send error report</h3>
              </div>

              <div className="space-y-4 mb-6">
                {/* Title field */}
                <div>
                  <label className="block text-[10.5px] font-bold text-[#005391] tracking-wider mb-2">
                    TITLE
                  </label>
                  <div className="bg-[#f8f9fa] rounded-xl px-4 py-3.5 w-full">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Does ISO 9001 require a documented internal audit procedure?"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-transparent border-none outline-none w-full text-slate-800 placeholder-slate-350 text-[13.5px] font-medium"
                    />
                  </div>
                </div>

                {/* Description field */}
                <div>
                  <label className="block text-[10.5px] font-bold text-[#005391] tracking-wider mb-2">
                    DESCRIPTION
                  </label>
                  <div className="bg-[#f8f9fa] rounded-2xl px-4 py-3.5 w-full">
                    <textarea
                      required
                      rows={5}
                      placeholder="Add detail, standard/clause, sector, and what you've already tried..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="bg-transparent border-none outline-none w-full text-slate-800 placeholder-slate-350 text-[13.5px] font-medium resize-none min-h-[110px]"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0096FF] hover:bg-[#0085f2] text-white rounded-2xl py-3.5 font-bold text-sm tracking-wide transition duration-150 shadow-xs cursor-pointer select-none"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-full bg-white border border-slate-200 text-[#0f172a] hover:bg-slate-50 rounded-2xl py-3.5 font-bold text-sm transition duration-150 shadow-xs cursor-pointer select-none"
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
