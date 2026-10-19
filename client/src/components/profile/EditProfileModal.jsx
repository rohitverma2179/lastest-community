import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Camera, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { updateProfileSettings } from "../../features/auth/user.thunk";

/**
 * Compresses an image file using HTML5 canvas before uploading
 * Converts high-res photos into lightweight, high-quality base64 strings
 */
const compressImageFile = (file, maxWidth = 1920, maxHeight = 1080, quality = 0.88) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

/**
 * EditProfileModal Component
 * Matches user design screenshot exactly:
 * - Top header bar: Cancel (left blue link), Edit profile (center title), Save (right action button)
 * - Cover banner with camera icon badge in bottom-right
 * - Overlapping avatar with camera icon badge in bottom-right
 * - NAME input field
 * - TITLE / DESIGNATION input field
 * - COMPANY input field
 * - LOCATION (CITY & COUNTRY) input fields
 * - DESCRIPTION textarea field
 */
export default function EditProfileModal({ isOpen, onClose, user }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [isProcessingCover, setIsProcessingCover] = useState(false);
  const [isProcessingAvatar, setIsProcessingAvatar] = useState(false);

  // Fallback visual display images
  const defaultAvatar =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&h=300&q=80";
  const defaultCover =
    "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1600&h=500&q=80";

  // Sync state when modal opens or user prop changes
  useEffect(() => {
    if (isOpen) {
      const initialName =
        user?.name ||
        (user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "");
      const initialDesignation = user?.designation || user?.role || "";
      const initialCompany = user?.company || "";
      const initialCity = user?.city || "";
      const initialCountry = user?.country || "";
      const initialBio = user?.bio || user?.description || "";
      const initialAvatar = user?.avatar || "";
      const initialCover = user?.coverPhoto || "";

      setName(initialName);
      setDesignation(initialDesignation);
      setCompany(initialCompany);
      setCity(initialCity);
      setCountry(initialCountry);
      setBio(initialBio);
      setAvatarPreview(initialAvatar);
      setCoverPreview(initialCover);
      setIsChanged(false);
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleAvatarFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPG, JPEG, WEBP)");
      return;
    }

    try {
      setIsProcessingAvatar(true);
      const compressedDataUrl = await compressImageFile(file, 600, 600, 0.9);
      setAvatarPreview(compressedDataUrl);
      setIsChanged(true);
      toast.success("Avatar selected! Click Save to update.");
    } catch (err) {
      console.error("Avatar compression error:", err);
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
        setIsChanged(true);
      };
      reader.readAsDataURL(file);
    } finally {
      setIsProcessingAvatar(false);
      if (e.target) e.target.value = "";
    }
  };

  const handleCoverFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPG, JPEG, WEBP)");
      return;
    }

    try {
      setIsProcessingCover(true);
      const compressedDataUrl = await compressImageFile(file, 1920, 1080, 0.88);
      setCoverPreview(compressedDataUrl);
      setIsChanged(true);
      toast.success("Cover photo selected! Click Save to update.");
    } catch (err) {
      console.error("Cover compression error:", err);
      const reader = new FileReader();
      reader.onload = () => {
        setCoverPreview(reader.result);
        setIsChanged(true);
      };
      reader.readAsDataURL(file);
    } finally {
      setIsProcessingCover(false);
      if (e.target) e.target.value = "";
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: name.trim(),
        designation: designation.trim(),
        company: company.trim(),
        city: city.trim(),
        country: country.trim(),
        bio: bio.trim(),
      };

      if (avatarPreview) {
        payload.avatar = avatarPreview;
      }
      if (coverPreview) {
        payload.coverPhoto = coverPreview;
      }

      const result = await dispatch(updateProfileSettings(payload)).unwrap();
      if (result) {
        onClose();
      }
    } catch (err) {
      console.error("Failed to save profile:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden z-10 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* 1. Header Navigation Bar */}
        <div className="px-5 sm:px-6 py-2 flex items-center justify-between border-b border-slate-100 bg-[#fbfcfd]">
          {/* Cancel Button (Left, Blue Text) */}
          <button
            type="button"
            onClick={onClose}
            className="text-[#0096FF] hover:text-[#0080db] font-semibold text-sm sm:text-[15px] transition cursor-pointer select-none active:scale-95"
          >
            Cancel
          </button>

          {/* Title (Center) */}
          <h2 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight select-none">
            Edit profile
          </h2>

          {/* Save Button (Right, Active Blue or Inactive Slate) */}
          <button
            type="button"
            onClick={handleSave}
            disabled={loading || isProcessingCover || isProcessingAvatar}
            className={`font-semibold text-sm sm:text-[15px] transition cursor-pointer select-none flex items-center gap-1.5 active:scale-95 ${
              (isChanged || avatarPreview || coverPreview) && !loading
                ? "text-[#0096FF] hover:text-[#0080db] font-bold"
                : "text-slate-400 hover:text-slate-500"
            }`}
          >
            {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Save</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 scrollbar-hide">
          {/* 2. Cover Banner Photo */}
          <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-gradient-to-r from-[#1e3c72] via-[#2a5298] to-[#0096FF] select-none">
            <img
              src={coverPreview || user?.coverPhoto || defaultCover}
              alt="Cover preview"
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

            {/* Camera Icon Badge for Cover Photo (Bottom-Right) */}
            <label
              htmlFor="cover-photo-file-input"
              className="absolute bottom-3 right-3 sm:bottom-3.5 sm:right-3.5 w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition shadow-md cursor-pointer select-none active:scale-95 z-20"
              title="Change cover photo"
              aria-label="Change cover photo"
            >
              {isProcessingCover ? (  
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Camera className="w-4 h-4 stroke-[2.2]" />
              )}
              <input
                id="cover-photo-file-input"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleCoverFile}
                disabled={isProcessingCover}
              />
            </label>
          </div>

          {/* 3. Avatar Section (Overlapping bottom-left) */}
          <div className="px-5 sm:px-6 relative z-10 flex items-end justify-between -mt-11 sm:-mt-12 mb-5">
            <div className="relative">
              {/* Circular Avatar */}
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border-4 border-white bg-slate-100 shadow-md overflow-hidden shrink-0 select-none">
                <img
                  src={avatarPreview || user?.avatar || defaultAvatar}
                  alt={name || "Avatar preview"}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Camera Icon Badge for Avatar (Bottom-Right of Avatar Circle) */}
              <label
                htmlFor="avatar-photo-file-input"
                className="absolute -bottom-1 -right-1 sm:bottom-0 sm:right-0 w-6.5 h-6.5 sm:w-7 sm:h-7 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition shadow-md border-2 border-white cursor-pointer select-none active:scale-95 z-20"
                title="Change profile avatar"
                aria-label="Change profile avatar"
              >
                {isProcessingAvatar ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
                )}
                <input
                  id="avatar-photo-file-input"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleAvatarFile}
                  disabled={isProcessingAvatar}
                />
              </label>
            </div>
          </div>

          {/* 4. Form Fields */}
          <div className="px-5 sm:px-6 pb-6 sm:pb-7 space-y-4 sm:space-y-4.5">
            {/* NAME Field */}
            <div>
              <label className="block text-[11px] sm:text-xs font-black tracking-widest text-[#10375C] uppercase mb-1.5">
                NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setIsChanged(true);
                }}
                placeholder="e.g. Rohit Verma"
                className="w-full bg-[#f4f4f2] hover:bg-[#ededeb] focus:bg-white text-slate-800 placeholder-slate-400 text-sm sm:text-[14.5px] px-4 py-3.5 rounded-2xl border border-transparent focus:border-[#0096FF]/30 outline-none focus:ring-2 focus:ring-[#0096FF]/20 transition-all duration-150"
              />
            </div>

            {/* TITLE / DESIGNATION Field */}
            <div>
              <label className="block text-[11px] sm:text-xs font-black tracking-widest text-[#10375C] uppercase mb-1.5">
                TITLE / DESIGNATION
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => {
                  setDesignation(e.target.value);
                  setIsChanged(true);
                }}
                placeholder="e.g. ISO 50001 Lead"
                className="w-full bg-[#f4f4f2] hover:bg-[#ededeb] focus:bg-white text-slate-800 placeholder-slate-400 text-sm sm:text-[14.5px] px-4 py-3.5 rounded-2xl border border-transparent focus:border-[#0096FF]/30 outline-none focus:ring-2 focus:ring-[#0096FF]/20 transition-all duration-150"
              />
            </div>

            {/* COMPANY Field */}
            <div>
              <label className="block text-[11px] sm:text-xs font-black tracking-widest text-[#10375C] uppercase mb-1.5">
                COMPANY
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  setIsChanged(true);
                }}
                placeholder="e.g. Hindustan Unilever"
                className="w-full bg-[#f4f4f2] hover:bg-[#ededeb] focus:bg-white text-slate-800 placeholder-slate-400 text-sm sm:text-[14.5px] px-4 py-3.5 rounded-2xl border border-transparent focus:border-[#0096FF]/30 outline-none focus:ring-2 focus:ring-[#0096FF]/20 transition-all duration-150"
              />
            </div>

            {/* LOCATION: City & Country (2 Columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-[11px] sm:text-xs font-black tracking-widest text-[#10375C] uppercase mb-1.5">
                  CITY
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setIsChanged(true);
                  }}
                  placeholder="e.g. Gurugram"
                  className="w-full bg-[#f4f4f2] hover:bg-[#ededeb] focus:bg-white text-slate-800 placeholder-slate-400 text-sm sm:text-[14.5px] px-4 py-3.5 rounded-2xl border border-transparent focus:border-[#0096FF]/30 outline-none focus:ring-2 focus:ring-[#0096FF]/20 transition-all duration-150"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-black tracking-widest text-[#10375C] uppercase mb-1.5">
                  COUNTRY
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setIsChanged(true);
                  }}
                  placeholder="e.g. India"
                  className="w-full bg-[#f4f4f2] hover:bg-[#ededeb] focus:bg-white text-slate-800 placeholder-slate-400 text-sm sm:text-[14.5px] px-4 py-3.5 rounded-2xl border border-transparent focus:border-[#0096FF]/30 outline-none focus:ring-2 focus:ring-[#0096FF]/20 transition-all duration-150"
                />
              </div>
            </div>

            {/* DESCRIPTION / BIO Field */}
            <div>
              <label className="block text-[11px] sm:text-xs font-black tracking-widest text-[#10375C] uppercase mb-1.5">
                DESCRIPTION
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                  setIsChanged(true);
                }}
                placeholder="Add detail, standard/clause, sector, and what you've already tried..."
                className="w-full bg-[#f4f4f2] hover:bg-[#ededeb] focus:bg-white text-slate-800 placeholder-slate-400 text-sm sm:text-[14.5px] px-4 py-3.5 rounded-2xl border border-transparent focus:border-[#0096FF]/30 outline-none focus:ring-2 focus:ring-[#0096FF]/20 transition-all duration-150 resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
