import React, { useState } from "react";
import { ArrowLeft, ChevronRight, PenSquare, User, Ban, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

// Simple toggle switch
const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <button 
      type="button"
      onClick={onChange}
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

export default function PrivacyTab({ onBack }) {
  // Sub-view state: 'main' | 'interaction' | 'muted' | 'blocked'
  const [subView, setSubView] = useState("main");
  
  // Interaction form states
  const [whoCanInteract, setWhoCanInteract] = useState("anyone"); // 'anyone' | 'nobody'
  const [followersChecked, setFollowersChecked] = useState(false);
  const [followChecked, setFollowChecked] = useState(false);
  const [mentionChecked, setMentionChecked] = useState(false);
  const [showListsDropdown, setShowListsDropdown] = useState(false);

  // Muted and Blocked users states
  const [blockedUsers, setBlockedUsers] = useState([
    {
      id: "u_sunil",
      name: "Sunil Kumar",
      role: "ISO 50001 Lead...",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80"
    }
  ]);
  const [mutedUsers, setMutedUsers] = useState([
    {
      id: "u_sunil",
      name: "Sunil Kumar",
      role: "ISO 50001 Lead...",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80"
    }
  ]);

  // Main privacy tab states
  const [allowFollow, setAllowFollow] = useState(true);

  // Actions
  const handleUnblock = (userId, name) => {
    setBlockedUsers(blockedUsers.filter(u => u.id !== userId));
    toast.success(`Unblocked ${name}`);
  };

  const handleUnmute = (userId, name) => {
    setMutedUsers(mutedUsers.filter(u => u.id !== userId));
    toast.success(`Unmuted ${name}`);
  };

  const handleClearHistory = () => {
    toast.success("History cleared successfully!");
  };

  const handleInteractionSubmit = (e) => {
    e.preventDefault();
    toast.success("Interaction settings updated!");
    setSubView("main");
  };

  // --- SUB-VIEW: INTERACTION SETTINGS ---
  if (subView === "interaction") {
    return (
      <div className="bg-white rounded-[20px] border border-[#f1f5f9] p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6 pb-2 select-none border-b border-gray-100/60">
          <button 
            onClick={() => setSubView("main")}
            className="p-1 rounded-lg hover:bg-slate-100 transition duration-150 text-slate-800"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <span className="text-[17px] md:text-[18px] font-semibold text-slate-800 tracking-tight">Interaction settings</span>
        </div>

        {/* Info text */}
        <p className="text-[13.5px] text-[#475569] mb-6 text-center leading-relaxed max-w-[620px] mx-auto">
          If you mute an account, their posts will no longer appear in your feed or notifications. They won't be notified that you muted them.
        </p>

        <form onSubmit={handleInteractionSubmit} className="space-y-4">
          {/* Grid Options (Anyone / Nobody) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Anyone Card */}
            <div 
              onClick={() => setWhoCanInteract("anyone")}
              className={`flex items-center gap-3.5 p-4 rounded-xl border-2 cursor-pointer transition select-none ${
                whoCanInteract === "anyone" 
                  ? "border-[#0096FF] bg-blue-50/5" 
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                whoCanInteract === "anyone" ? "border-[#0096FF]" : "border-slate-300"
              }`}>
                {whoCanInteract === "anyone" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0096FF]" />
                )}
              </div>
              <span className={`text-[15px] font-semibold ${
                whoCanInteract === "anyone" ? "text-slate-900" : "text-slate-500"
              }`}>
                Anyone
              </span>
            </div>

            {/* Nobody Card */}
            <div 
              onClick={() => setWhoCanInteract("nobody")}
              className={`flex items-center gap-3.5 p-4 rounded-xl border-2 cursor-pointer transition select-none ${
                whoCanInteract === "nobody" 
                  ? "border-[#0096FF] bg-blue-50/5" 
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                whoCanInteract === "nobody" ? "border-[#0096FF]" : "border-slate-300"
              }`}>
                {whoCanInteract === "nobody" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0096FF]" />
                )}
              </div>
              <span className={`text-[15px] font-semibold ${
                whoCanInteract === "nobody" ? "text-slate-900" : "text-slate-400"
              }`}>
                Nobody
              </span>
            </div>

          </div>

          {/* Checkboxes List */}
          <div className="space-y-3 pt-2">
            
            {/* Followers Checkbox */}
            <div 
              onClick={() => setFollowersChecked(!followersChecked)}
              className="flex items-center gap-3.5 p-4 rounded-xl border border-slate-200 cursor-pointer select-none hover:bg-slate-50/40"
            >
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition shrink-0 ${
                followersChecked ? "border-[#0096FF] bg-[#0096FF] text-white" : "border-slate-350"
              }`}>
                {followersChecked && (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                )}
              </div>
              <span className={`text-[14.5px] font-medium ${followersChecked ? "text-slate-800" : "text-[#94a3b8]"}`}>
                Your followers
              </span>
            </div>

            {/* People you follow Checkbox */}
            <div 
              onClick={() => setFollowChecked(!followChecked)}
              className="flex items-center gap-3.5 p-4 rounded-xl border border-slate-200 cursor-pointer select-none hover:bg-slate-50/40"
            >
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition shrink-0 ${
                followChecked ? "border-[#0096FF] bg-[#0096FF] text-white" : "border-slate-350"
              }`}>
                {followChecked && (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                )}
              </div>
              <span className={`text-[14.5px] font-medium ${followChecked ? "text-slate-800" : "text-[#94a3b8]"}`}>
                People you follow
              </span>
            </div>

            {/* People you mention Checkbox */}
            <div 
              onClick={() => setMentionChecked(!mentionChecked)}
              className="flex items-center gap-3.5 p-4 rounded-xl border border-slate-200 cursor-pointer select-none hover:bg-slate-50/40"
            >
              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition shrink-0 ${
                mentionChecked ? "border-[#0096FF] bg-[#0096FF] text-white" : "border-slate-350"
              }`}>
                {mentionChecked && (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                )}
              </div>
              <span className={`text-[14.5px] font-medium ${mentionChecked ? "text-slate-800" : "text-[#94a3b8]"}`}>
                People you mention
              </span>
            </div>

            {/* Lists Dropdown select */}
            <div 
              onClick={() => setShowListsDropdown(!showListsDropdown)}
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 cursor-pointer select-none hover:bg-slate-50/40"
            >
              <span className="text-[14.5px] font-medium text-[#94a3b8]">
                Select from your lists
              </span>
              <ChevronRight className={`w-5 h-5 text-slate-400 stroke-[2] transition-transform ${
                showListsDropdown ? "rotate-90" : ""
              }`} />
            </div>

          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              className="px-6 py-2.5 bg-[#0096FF] hover:bg-[#0085f2] text-white rounded-lg font-bold text-xs tracking-wider transition duration-150 cursor-pointer select-none shadow-xs"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

  // --- SUB-VIEW: MUTED ACCOUNTS ---
  if (subView === "muted") {
    return (
      <div className="bg-white rounded-[20px] border border-[#f1f5f9] p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6 pb-2 select-none border-b border-gray-100/60">
          <button 
            onClick={() => setSubView("main")}
            className="p-1 rounded-lg hover:bg-slate-100 transition duration-150 text-slate-800 cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <span className="text-[17px] md:text-[18px] font-semibold text-slate-800 tracking-tight">Muted accounts</span>
        </div>

        {/* Info text */}
        <p className="text-[13.5px] text-[#475569] mb-6 text-center leading-relaxed max-w-[620px] mx-auto pb-4">
          If you mute an account, their posts will no longer appear in your feed or notifications. They won't be notified that you muted them.
        </p>

        {/* Separator */}
        <div className="h-px bg-slate-100 mb-6" />

        {/* Muted users list */}
        {mutedUsers.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">No muted accounts.</div>
        ) : (
          <div className="space-y-4">
            {mutedUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between py-2 px-1">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-[15px] font-bold text-slate-800">{user.name}</h4>
                    <p className="text-[11.5px] text-slate-400 mt-0.5">{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleUnmute(user.id, user.name)}
                  className="px-4 py-2 bg-[#0096FF] hover:bg-[#0085f2] text-white rounded-lg text-xs font-bold transition select-none cursor-pointer"
                >
                  Unmute account
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // --- SUB-VIEW: BLOCKED ACCOUNTS ---
  if (subView === "blocked") {
    return (
      <div className="bg-white rounded-[20px] border border-[#f1f5f9] p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6 pb-2 select-none border-b border-gray-100/60">
          <button 
            onClick={() => setSubView("main")}
            className="p-1 rounded-lg hover:bg-slate-100 transition duration-150 text-slate-800 cursor-pointer"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <span className="text-[17px] md:text-[18px] font-semibold text-slate-800 tracking-tight">Blocked accounts</span>
        </div>

        {/* Info text */}
        <p className="text-[13.5px] text-[#475569] mb-6 text-center leading-relaxed max-w-[620px] mx-auto pb-4">
          After blocking, neither account can see the other's posts, reply to or mention each other, or interact with each other in any way.
        </p>

        {/* Separator */}
        <div className="h-px bg-slate-100 mb-6" />

        {/* Blocked users list */}
        {blockedUsers.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">No blocked accounts.</div>
        ) : (
          <div className="space-y-4">
            {blockedUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between py-2 px-1">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-[15px] font-bold text-slate-800">{user.name}</h4>
                    <p className="text-[11.5px] text-slate-400 mt-0.5">{user.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleUnblock(user.id, user.name)}
                  className="px-4 py-2 bg-[#0096FF] hover:bg-[#0085f2] text-white rounded-lg text-xs font-bold transition select-none cursor-pointer"
                >
                  Unblock
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // --- SUB-VIEW: MAIN PRIVACY LIST ---
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
        <span className="text-xl font-bold text-[#1e293b] tracking-tight">Privacy and security</span>
      </div>

      {/* Settings list */}
      <div className="space-y-1">
        
        {/* Interaction Settings */}
        <button
          onClick={() => setSubView("interaction")}
          className="w-full flex items-center justify-between py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50 text-left cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <PenSquare className="w-5 h-5 text-slate-800 stroke-[2]" />
            <span className="text-[#1e293b] font-medium text-[15px]">Interaction settings</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 stroke-[2]" />
        </button>

        {/* Muted Accounts */}
        <button
          onClick={() => setSubView("muted")}
          className="w-full flex items-center justify-between py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50 text-left cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <User className="w-5 h-5 text-slate-800 stroke-[2]" />
            <span className="text-[#1e293b] font-medium text-[15px]">Muted accounts</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 stroke-[2]" />
        </button>

        {/* Blocked Accounts */}
        <button
          onClick={() => setSubView("blocked")}
          className="w-full flex items-center justify-between py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50 text-left cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <Ban className="w-5 h-5 text-slate-800 stroke-[2]" />
            <span className="text-[#1e293b] font-medium text-[15px]">Blocked accounts</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 stroke-[2]" />
        </button>

        {/* Allow peopel to follow you (Toggle) */}
        <div className="flex items-center justify-between py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50">
          <span className="text-[#1e293b] font-medium text-[15px] pl-9">Allow peopel to follow you</span>
          <ToggleSwitch checked={allowFollow} onChange={() => setAllowFollow(!allowFollow)} />
        </div>

        {/* Clear History */}
        <div className="flex items-center justify-between py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50">
          <button
            onClick={handleClearHistory}
            className="text-red-500 font-medium text-[15px] hover:underline cursor-pointer"
          >
            Clear history
          </button>
          <button
            onClick={handleClearHistory}
            className="text-red-500 hover:text-red-600 font-bold text-[14px] transition-colors py-0.5 px-2.5 rounded-lg hover:bg-red-50 cursor-pointer"
          >
            Clear
          </button>
        </div>

      </div>
    </div>
  );
}
