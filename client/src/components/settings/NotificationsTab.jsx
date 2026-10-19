import React, { useState } from "react";
import { ArrowLeft, ChevronRight, Bell, BellRing, Heart, MessageSquare, UserPlus, MessageCircle, Mail, X } from "lucide-react";
import toast from "react-hot-toast";

// Custom Checkbox component matching screenshot styling
const Checkbox = ({ checked, label, onChange }) => {
  return (
    <div 
      onClick={onChange}
      className="flex items-center gap-3 cursor-pointer select-none py-1"
    >
      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition shrink-0 ${
        checked ? "border-[#0096FF] bg-[#0096FF] text-white" : "border-slate-350 bg-white"
      }`}>
        {checked && (
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )}
      </div>
      <span className="text-[14.5px] font-medium text-slate-800">
        {label}
      </span>
    </div>
  );
};

// Custom Radio item matching screenshot styling
const RadioRow = ({ checked, label, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3.5 cursor-pointer transition select-none ${
        checked 
          ? "p-4 rounded-2xl bg-[#f3f4f6]" 
          : "py-2 px-4 hover:bg-slate-50/30 rounded-xl"
      }`}
    >
      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
        checked ? "border-[#0096FF] bg-[#0096FF]" : "border-slate-400 bg-white"
      }`}>
        {checked && (
          <div className="w-2 h-2 rounded-full bg-white" />
        )}
      </div>
      <span className={`text-[14.5px] font-medium transition-colors ${checked ? "text-slate-800" : "text-slate-500"}`}>
        {label}
      </span>
    </div>
  );
};

export default function NotificationsTab({ onBack }) {
  // Sub-view: 'main' | 'activity' | 'allow_posts'
  const [subView, setSubView] = useState("main");
  
  // Modal type: null | 'likes' | 'replies' | 'followers' | 'messages' | 'message_requests'
  const [modalType, setModalType] = useState(null);

  // States for sub-screens & modals
  // 1. Allow others to be notified of your posts
  const [notifyWho, setNotifyWho] = useState("anyone"); // 'anyone' | 'followers_i_follow' | 'no_one'

  // 2. Activity from others
  const [activityPush, setActivityPush] = useState(true);
  const [activityInApp, setActivityInApp] = useState(false);

  // 3. Likes Modal state
  const [likesPush, setLikesPush] = useState(false);
  const [likesInApp, setLikesInApp] = useState(false);
  const [likesFrom, setLikesFrom] = useState("everyone"); // 'everyone' | 'people_i_follow'

  // 4. Replies Modal state
  const [repliesPush, setRepliesPush] = useState(false);
  const [repliesInApp, setRepliesInApp] = useState(true);
  const [repliesFrom, setRepliesFrom] = useState("everyone"); // 'everyone' | 'people_i_follow'

  // 5. General mock states for remaining items
  const [followersPush, setFollowersPush] = useState(true);
  const [followersInApp, setFollowersInApp] = useState(true);
  const [followersFrom, setFollowersFrom] = useState("everyone");

  const [messagesPush, setMessagesPush] = useState(true);
  const [messagesInApp, setMessagesInApp] = useState(false);
  const [messagesFrom, setMessagesFrom] = useState("everyone");

  const [requestsPush, setRequestsPush] = useState(false);
  const [requestsInApp, setRequestsInApp] = useState(true);
  const [requestsFrom, setRequestsFrom] = useState("people_i_follow");

  const handleCloseModal = () => {
    setModalType(null);
  };

  const handleSaveModalSettings = () => {
    toast.success("Notification preferences updated!");
    handleCloseModal();
  };

  // --- SUB-VIEW: ACTIVITY FROM OTHERS (Image 4) ---
  if (subView === "activity") {
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
          <span className="text-[17px] md:text-[18px] font-semibold text-slate-800 tracking-tight">Notifications</span>
        </div>

        {/* Section title header */}
        <div className="flex items-start gap-4 mb-6">
          <BellRing className="w-5 h-5 text-slate-800 stroke-[2] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[14.5px] font-bold text-slate-800">Activity from others</h4>
            <p className="text-[11.5px] text-slate-400 mt-0.5">In-app, push, everyone</p>
          </div>
        </div>

        {/* Form options */}
        <div className="space-y-4 pt-2">
          <Checkbox 
            checked={activityPush} 
            label="Push notifications" 
            onChange={() => setActivityPush(!activityPush)} 
          />
          <Checkbox 
            checked={activityInApp} 
            label="In-app notifications" 
            onChange={() => setActivityInApp(!activityInApp)} 
          />
        </div>
      </div>
    );
  }

  // --- SUB-VIEW: ALLOW OTHERS TO BE NOTIFIED OF POSTS (Image 5) ---
  if (subView === "allow_posts") {
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
          <span className="text-[17px] md:text-[18px] font-semibold text-slate-800 tracking-tight">Notifications</span>
        </div>

        {/* Section title header */}
        <div className="flex items-start gap-4 mb-6">
          <Bell className="w-5 h-5 text-slate-800 stroke-[2] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[14.5px] font-bold text-slate-800">Activity others to be notified of your posts</h4>
            <p className="text-[11.5px] text-slate-400 mt-1 leading-relaxed">
              This feature allows users to receive notifications for your new posts and replies. Who do you want to enable this for ?
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-4 pt-2">
          <Checkbox 
            checked={notifyWho === "anyone"} 
            label="Anyone who follows me" 
            onChange={() => setNotifyWho("anyone")} 
          />
          <Checkbox 
            checked={notifyWho === "followers_i_follow"} 
            label="Only followers who i follow" 
            onChange={() => setNotifyWho("followers_i_follow")} 
          />
          <Checkbox 
            checked={notifyWho === "no_one"} 
            label="No one" 
            onChange={() => setNotifyWho("no_one")} 
          />
        </div>
      </div>
    );
  }

  // --- SUB-VIEW: MAIN NOTIFICATIONS LIST (Image 1) ---
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
        <span className="text-xl font-bold text-[#1e293b] tracking-tight">Notifications</span>
      </div>

      {/* Settings list */}
      <div className="space-y-1">
        
        {/* Allow others to be notified of your posts */}
        <button
          onClick={() => setSubView("allow_posts")}
          className="w-full flex items-start gap-4 py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50 text-left cursor-pointer"
        >
          <Bell className="w-5 h-5 text-slate-850 stroke-[2] shrink-0 mt-0.5" />
          <div className="flex-1 pr-6">
            <span className="text-[#1e293b] font-medium text-[15px] block leading-tight">Allow others to be notified of your posts</span>
            <span className="text-[11.5px] text-[#64748b] mt-1 block font-normal leading-relaxed">
              This feature allows users to receive notifications for your new posts and replies. Who do you want to enable this for?
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 stroke-[2] shrink-0 self-center" />
        </button>

        {/* Activity from others */}
        <button
          onClick={() => setSubView("activity")}
          className="w-full flex items-center gap-4 py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50 text-left cursor-pointer"
        >
          <BellRing className="w-5 h-5 text-slate-850 stroke-[2] shrink-0" />
          <div className="flex-1">
            <span className="text-[#1e293b] font-medium text-[15px] block leading-tight">Activity from others</span>
            <span className="text-[11.5px] text-[#94a3b8] mt-0.5 block font-normal">In-app, push, everyone</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 stroke-[2] shrink-0" />
        </button>

        {/* Likes */}
        <button
          onClick={() => setModalType("likes")}
          className="w-full flex items-center gap-4 py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50 text-left cursor-pointer"
        >
          <Heart className="w-5 h-5 text-slate-850 stroke-[2] shrink-0" />
          <div className="flex-1">
            <span className="text-[#1e293b] font-medium text-[15px] block leading-tight">Likes</span>
            <span className="text-[11.5px] text-[#94a3b8] mt-0.5 block font-normal">In-app, push, everyone</span>
          </div>
        </button>

        {/* Replies */}
        <button
          onClick={() => setModalType("replies")}
          className="w-full flex items-center gap-4 py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50 text-left cursor-pointer"
        >
          <MessageSquare className="w-5 h-5 text-slate-850 stroke-[2] shrink-0" />
          <div className="flex-1">
            <span className="text-[#1e293b] font-medium text-[15px] block leading-tight">Replies</span>
            <span className="text-[11.5px] text-[#94a3b8] mt-0.5 block font-normal">In-app, push, everyone</span>
          </div>
        </button>

        {/* New followers */}
        <button
          onClick={() => setModalType("followers")}
          className="w-full flex items-center gap-4 py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50 text-left cursor-pointer"
        >
          <UserPlus className="w-5 h-5 text-slate-850 stroke-[2] shrink-0" />
          <div className="flex-1">
            <span className="text-[#1e293b] font-medium text-[15px] block leading-tight">New followers</span>
            <span className="text-[11.5px] text-[#94a3b8] mt-0.5 block font-normal">In-app, push, everyone</span>
          </div>
        </button>

        {/* New messages */}
        <button
          onClick={() => setModalType("messages")}
          className="w-full flex items-center gap-4 py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50 text-left cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 text-slate-850 stroke-[2] shrink-0" />
          <div className="flex-1">
            <span className="text-[#1e293b] font-medium text-[15px] block leading-tight">New messages</span>
            <span className="text-[11.5px] text-[#94a3b8] mt-0.5 block font-normal">In-app, push, everyone</span>
          </div>
        </button>

        {/* New messages requests */}
        <button
          onClick={() => setModalType("message_requests")}
          className="w-full flex items-center gap-4 py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50 text-left cursor-pointer"
        >
          <Mail className="w-5 h-5 text-slate-850 stroke-[2] shrink-0" />
          <div className="flex-1">
            <span className="text-[#1e293b] font-medium text-[15px] block leading-tight">New messages requests</span>
            <span className="text-[11.5px] text-[#94a3b8] mt-0.5 block font-normal">In-app, push, everyone</span>
          </div>
        </button>

      </div>

      {/* --- POPUPS/MODALS (Image 2 & 3) --- */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 transition-all duration-300 animate-fade-in">
          <div className="bg-white rounded-[24px] max-w-[420px] w-full p-6 shadow-2xl border border-slate-100 relative transform transition-all">
            
            {/* Close button X */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition p-1.5 rounded-full hover:bg-slate-100"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* MODAL: Likes (Image 3) */}
            {modalType === "likes" && (
              <div>
                <div className="mb-5">
                  <h3 className="text-[20px] font-bold text-[#0f172a] tracking-tight">Likes</h3>
                  <p className="text-[13px] text-[#94a3b8] mt-0.5 font-normal">
                    In-app, push, everyone
                  </p>
                </div>

                <div className="space-y-4 mb-5 pt-1">
                  <Checkbox 
                    checked={likesPush} 
                    label="Push notifications" 
                    onChange={() => setLikesPush(!likesPush)} 
                  />
                  <Checkbox 
                    checked={likesInApp} 
                    label="In-app notifications" 
                    onChange={() => setLikesInApp(!likesInApp)} 
                  />
                </div>

                <div className="h-px bg-slate-100 my-4" />

                <div className="space-y-3 mb-6">
                  <label className="block text-[10.5px] font-bold text-[#005391] tracking-wider mb-2">
                    FROM
                  </label>
                  <RadioRow 
                    checked={likesFrom === "everyone"} 
                    label="Everyone" 
                    onClick={() => setLikesFrom("everyone")} 
                  />
                  <RadioRow 
                    checked={likesFrom === "people_i_follow"} 
                    label="People i follow" 
                    onClick={() => setLikesFrom("people_i_follow")} 
                  />
                </div>

                <button 
                  onClick={handleSaveModalSettings}
                  className="w-full bg-[#0096FF] hover:bg-[#0085f2] text-white rounded-2xl py-3.5 font-bold text-sm tracking-wide transition duration-150 shadow-xs cursor-pointer select-none"
                >
                  Done
                </button>
              </div>
            )}

            {/* MODAL: Replies (Image 2) */}
            {modalType === "replies" && (
              <div>
                <div className="mb-5">
                  <h3 className="text-[20px] font-bold text-[#0f172a] tracking-tight">Replies</h3>
                  <p className="text-[13px] text-[#94a3b8] mt-0.5 font-normal">
                    In-app, push, everyone
                  </p>
                </div>

                <div className="space-y-4 mb-5 pt-1">
                  <Checkbox 
                    checked={repliesPush} 
                    label="Push notifications" 
                    onChange={() => setRepliesPush(!repliesPush)} 
                  />
                  <Checkbox 
                    checked={repliesInApp} 
                    label="In-app notifications" 
                    onChange={() => setRepliesInApp(!repliesInApp)} 
                  />
                </div>

                <div className="h-px bg-slate-100 my-4" />

                <div className="space-y-3 mb-6">
                  <label className="block text-[10.5px] font-bold text-[#005391] tracking-wider mb-2">
                    FROM
                  </label>
                  <RadioRow 
                    checked={repliesFrom === "everyone"} 
                    label="Everyone" 
                    onClick={() => setRepliesFrom("everyone")} 
                  />
                  <RadioRow 
                    checked={repliesFrom === "people_i_follow"} 
                    label="People i follow" 
                    onClick={() => setRepliesFrom("people_i_follow")} 
                  />
                </div>

                <button 
                  onClick={handleSaveModalSettings}
                  className="w-full bg-[#0096FF] hover:bg-[#0085f2] text-white rounded-2xl py-3.5 font-bold text-sm tracking-wide transition duration-150 shadow-xs cursor-pointer select-none"
                >
                  Done
                </button>
              </div>
            )}

            {/* MODAL: New Followers */}
            {modalType === "followers" && (
              <div>
                <div className="mb-5">
                  <h3 className="text-[20px] font-bold text-[#0f172a] tracking-tight">New followers</h3>
                  <p className="text-[13px] text-[#94a3b8] mt-0.5 font-normal">
                    In-app, push, everyone
                  </p>
                </div>

                <div className="space-y-4 mb-5 pt-1">
                  <Checkbox 
                    checked={followersPush} 
                    label="Push notifications" 
                    onChange={() => setFollowersPush(!followersPush)} 
                  />
                  <Checkbox 
                    checked={followersInApp} 
                    label="In-app notifications" 
                    onChange={() => setFollowersInApp(!followersInApp)} 
                  />
                </div>

                <div className="h-px bg-slate-100 my-4" />

                <div className="space-y-3 mb-6">
                  <label className="block text-[10.5px] font-bold text-[#005391] tracking-wider mb-2">
                    FROM
                  </label>
                  <RadioRow 
                    checked={followersFrom === "everyone"} 
                    label="Everyone" 
                    onClick={() => setFollowersFrom("everyone")} 
                  />
                  <RadioRow 
                    checked={followersFrom === "people_i_follow"} 
                    label="People i follow" 
                    onClick={() => setFollowersFrom("people_i_follow")} 
                  />
                </div>

                <button 
                  onClick={handleSaveModalSettings}
                  className="w-full bg-[#0096FF] hover:bg-[#0085f2] text-white rounded-2xl py-3.5 font-bold text-sm tracking-wide transition duration-150 shadow-xs cursor-pointer select-none"
                >
                  Done
                </button>
              </div>
            )}

            {/* MODAL: New Messages */}
            {modalType === "messages" && (
              <div>
                <div className="mb-5">
                  <h3 className="text-[20px] font-bold text-[#0f172a] tracking-tight">New messages</h3>
                  <p className="text-[13px] text-[#94a3b8] mt-0.5 font-normal">
                    In-app, push, everyone
                  </p>
                </div>

                <div className="space-y-4 mb-5 pt-1">
                  <Checkbox 
                    checked={messagesPush} 
                    label="Push notifications" 
                    onChange={() => setMessagesPush(!messagesPush)} 
                  />
                  <Checkbox 
                    checked={messagesInApp} 
                    label="In-app notifications" 
                    onChange={() => setMessagesInApp(!messagesInApp)} 
                  />
                </div>

                <div className="h-px bg-slate-100 my-4" />

                <div className="space-y-3 mb-6">
                  <label className="block text-[10.5px] font-bold text-[#005391] tracking-wider mb-2">
                    FROM
                  </label>
                  <RadioRow 
                    checked={messagesFrom === "everyone"} 
                    label="Everyone" 
                    onClick={() => setMessagesFrom("everyone")} 
                  />
                  <RadioRow 
                    checked={messagesFrom === "people_i_follow"} 
                    label="People i follow" 
                    onClick={() => setMessagesFrom("people_i_follow")} 
                  />
                </div>

                <button 
                  onClick={handleSaveModalSettings}
                  className="w-full bg-[#0096FF] hover:bg-[#0085f2] text-white rounded-2xl py-3.5 font-bold text-sm tracking-wide transition duration-150 shadow-xs cursor-pointer select-none"
                >
                  Done
                </button>
              </div>
            )}

            {/* MODAL: New Message Requests */}
            {modalType === "message_requests" && (
              <div>
                <div className="mb-5">
                  <h3 className="text-[20px] font-bold text-[#0f172a] tracking-tight">New messages requests</h3>
                  <p className="text-[13px] text-[#94a3b8] mt-0.5 font-normal">
                    In-app, push, everyone
                  </p>
                </div>

                <div className="space-y-4 mb-5 pt-1">
                  <Checkbox 
                    checked={requestsPush} 
                    label="Push notifications" 
                    onChange={() => setRequestsPush(!requestsPush)} 
                  />
                  <Checkbox 
                    checked={requestsInApp} 
                    label="In-app notifications" 
                    onChange={() => setRequestsInApp(!requestsInApp)} 
                  />
                </div>

                <div className="h-px bg-slate-100 my-4" />

                <div className="space-y-3 mb-6">
                  <label className="block text-[10.5px] font-bold text-[#005391] tracking-wider mb-2">
                    FROM
                  </label>
                  <RadioRow 
                    checked={requestsFrom === "everyone"} 
                    label="Everyone" 
                    onClick={() => setRequestsFrom("everyone")} 
                  />
                  <RadioRow 
                    checked={requestsFrom === "people_i_follow"} 
                    label="People i follow" 
                    onClick={() => setRequestsFrom("people_i_follow")} 
                  />
                </div>

                <button 
                  onClick={handleSaveModalSettings}
                  className="w-full bg-[#0096FF] hover:bg-[#0085f2] text-white rounded-2xl py-3.5 font-bold text-sm tracking-wide transition duration-150 shadow-xs cursor-pointer select-none"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
