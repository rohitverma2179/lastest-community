import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Pencil, Lock, Cake, Trash2, ChevronRight, ArrowLeft, X, Calendar, Eye, EyeOff, Check, KeyRound } from "lucide-react";
import toast from "react-hot-toast";
import {
  requestEmailCodeUser,
  updateEmailUser,
  requestUpdatePhoneCodeUser,
  updatePhoneUser,
  requestPasswordCodeUser,
  requestPhoneCodeUser,
  changePasswordUser,
  updateProfileSettings,
  deleteAccountUser
} from "../../features/auth/user.thunk";

export default function AccountTab({ onBack }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Dialog / Modal states
  const [modalType, setModalType] = useState(null); // 'email' | 'phone' | 'password' | 'birthday' | 'delete' | null
  
  // Email modal flow stage
  const [emailStage, setEmailStage] = useState("input_email"); // 'input_email' | 'confirm_code'

  // Phone modal flow stage
  const [phoneStage, setPhoneStage] = useState("input_phone"); // 'input_phone' | 'confirm_code'

  // Password modal flow stage
  const [passwordStage, setPasswordStage] = useState("request_code"); // 'request_code' | 'confirm_code' | 'phone_input' | 'phone_verify'
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [newEmail, setNewEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [newPhoneInput, setNewPhoneInput] = useState(user?.phone || "+91");
  const [phoneOtpCode, setPhoneOtpCode] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || "+91");
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [birthday, setBirthday] = useState(user?.birthday || "22/08/2000");
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const emailVal = user?.email || "swastixawebdesign@gmail.com";
  const phoneVal = user?.phone || "Not provided";

  useEffect(() => {
    if (user?.birthday) {
      setBirthday(user.birthday);
    }
    if (user?.phone) {
      setPhoneNumber(user.phone);
      setNewPhoneInput(user.phone);
    }
  }, [user]);

  const handleCloseModal = () => {
    setModalType(null);
    setEmailStage("input_email");
    setPhoneStage("input_phone");
    setPasswordStage("request_code");
    setNewEmail("");
    setEmailCode("");
    setPhoneOtpCode("");
    setNewPhoneInput(user?.phone || "+91");
    setConfirmationCode("");
    setPhoneVerificationCode("");
    setPhoneNumber(user?.phone || "+91");
    setNewPassword("");
    setShowPassword(false);
    setDeleteConfirmText("");
  };

  // Auth password validation rules matching registerSchema & AuthPage
  const validatePasswordRequirements = (pwd) => {
    if (!pwd) return "Password is required";
    if (pwd.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(pwd)) return "Password must contain at least one uppercase letter (A-Z)";
    if (!/[a-z]/.test(pwd)) return "Password must contain at least one lowercase letter (a-z)";
    if (!/[0-9]/.test(pwd)) return "Password must contain at least one number (0-9)";
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) return "Password must contain at least one special character (!@#$%^&*)";
    return null;
  };

  const handleRequestEmailCode = async (e) => {
    e.preventDefault();
    if (!newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      return toast.error("Please enter a valid email address");
    }
    if (newEmail.toLowerCase() === emailVal.toLowerCase()) {
      return toast.error("New email must be different from current email");
    }

    setLoading(true);
    try {
      await dispatch(requestEmailCodeUser(newEmail)).unwrap();
      setEmailStage("confirm_code");
    } catch (err) {
      console.error("Failed to request email verification code:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailAndSubmit = async (e) => {
    e.preventDefault();
    if (!emailCode || !emailCode.trim()) {
      return toast.error("Please enter the verification code");
    }

    setLoading(true);
    try {
      await dispatch(updateEmailUser({ newEmail, code: emailCode.trim() })).unwrap();
      handleCloseModal();
    } catch (err) {
      console.error("Failed to verify and update email:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestUpdatePhoneCode = async (e) => {
    if (e) e.preventDefault();
    if (!newPhoneInput || newPhoneInput.trim().length < 8) {
      return toast.error("Please enter a valid phone number");
    }
    if (user?.phone && newPhoneInput.trim() === user.phone) {
      return toast.error("New phone number must be different from current phone number");
    }

    setLoading(true);
    try {
      await dispatch(requestUpdatePhoneCodeUser(newPhoneInput.trim())).unwrap();
      setPhoneStage("confirm_code");
    } catch (err) {
      console.error("Failed to request phone update code:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhoneAndSubmit = async (e) => {
    e.preventDefault();
    if (!phoneOtpCode || !phoneOtpCode.trim()) {
      return toast.error("Please enter the SMS verification code");
    }

    setLoading(true);
    try {
      await dispatch(updatePhoneUser({
        newPhone: newPhoneInput.trim(),
        code: phoneOtpCode.trim()
      })).unwrap();
      handleCloseModal();
    } catch (err) {
      console.error("Failed to verify and update phone:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordRequestCode = async () => {
    setLoading(true);
    try {
      await dispatch(requestPasswordCodeUser()).unwrap();
      setPasswordStage("confirm_code");
    } catch (err) {
      console.error("Failed to request password code:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestPhoneCode = async (e) => {
    if (e) e.preventDefault();
    if (!phoneNumber || phoneNumber.trim().length < 8) {
      return toast.error("Please enter a valid phone number");
    }

    setLoading(true);
    try {
      await dispatch(requestPhoneCodeUser(phoneNumber.trim())).unwrap();
      setPasswordStage("phone_verify");
    } catch (err) {
      console.error("Failed to request phone SMS code:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordStage === "confirm_code" && !confirmationCode) {
      return toast.error("Please enter the confirmation code");
    }

    const pwdErr = validatePasswordRequirements(newPassword);
    if (pwdErr) {
      return toast.error(pwdErr);
    }
    
    setLoading(true);
    try {
      await dispatch(changePasswordUser({
        newPassword,
        confirmationCode
      })).unwrap();
      handleCloseModal();
    } catch (err) {
      console.error("Failed to change password:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePhonePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!phoneVerificationCode || !phoneVerificationCode.trim()) {
      return toast.error("Please enter the SMS verification code");
    }

    const pwdErr = validatePasswordRequirements(newPassword);
    if (pwdErr) {
      return toast.error(pwdErr);
    }

    setLoading(true);
    try {
      await dispatch(changePasswordUser({
        newPassword,
        phoneNumber: phoneNumber.trim(),
        phoneCode: phoneVerificationCode.trim()
      })).unwrap();
      handleCloseModal();
    } catch (err) {
      console.error("Failed to change password via phone:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBirthday = async (e) => {
    e.preventDefault();
    if (!birthday.trim()) {
      return toast.error("Please enter a birthday");
    }

    setLoading(true);
    try {
      await dispatch(updateProfileSettings({ birthday })).unwrap();
      handleCloseModal();
    } catch (err) {
      console.error("Failed to update birthday:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (deleteConfirmText !== "DELETE") {
      return toast.error("Please type DELETE to confirm");
    }

    setLoading(true);
    try {
      await dispatch(deleteAccountUser()).unwrap();
      handleCloseModal();
      navigate("/login");
    } catch (err) {
      console.error("Failed to delete account:", err);
    } finally {
      setLoading(false);
    }
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
        <span className="text-xl font-bold text-[#1e293b] tracking-tight">Account</span>
      </div>

      {/* List of Account settings */}
      <div className="space-y-1">
        {/* Email Row */}
        <div className="flex items-center justify-between py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50">
          <div className="flex items-center gap-4">
            <Mail className="w-5 h-5 text-slate-800 stroke-[2]" />
            <span className="text-[#1e293b] font-medium text-[15px]">Email</span>
          </div>
          <span className="text-[#94a3b8] text-[15px] font-normal tracking-wide">{emailVal}</span>
        </div>

        {/* Update Email Row */}
        <button
          onClick={() => {
            setEmailStage("input_email");
            setModalType("email");
          }}
          className="w-full flex items-center justify-between py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50 text-left cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <Pencil className="w-5 h-5 text-slate-800 stroke-[2]" />
            <span className="text-[#1e293b] font-medium text-[15px]">Update email</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 stroke-[2]" />
        </button>

        {/* Phone Row */}
        <div className="flex items-center justify-between py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50">
          <div className="flex items-center gap-4">
            <Phone className="w-5 h-5 text-slate-800 stroke-[2]" />
            <span className="text-[#1e293b] font-medium text-[15px]">Phone</span>
          </div>
          <span className="text-[#94a3b8] text-[15px] font-normal tracking-wide">{phoneVal}</span>
        </div>

        {/* Update Phone Row */}
        <button
          onClick={() => {
            setPhoneStage("input_phone");
            setNewPhoneInput(user?.phone || "+91");
            setModalType("phone");
          }}
          className="w-full flex items-center justify-between py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50 text-left cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <Pencil className="w-5 h-5 text-slate-800 stroke-[2]" />
            <span className="text-[#1e293b] font-medium text-[15px]">Update phone number</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 stroke-[2]" />
        </button>

        {/* Password Row */}
        <button
          onClick={() => setModalType("password")}
          className="w-full flex items-center justify-between py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50 text-left cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <Lock className="w-5 h-5 text-slate-800 stroke-[2]" />
            <span className="text-[#1e293b] font-medium text-[15px]">Password</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 stroke-[2]" />
        </button>

        {/* Birthday Row */}
        <div className="flex items-center justify-between py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50">
          <div className="flex items-center gap-4">
            <Cake className="w-5 h-5 text-slate-800 stroke-[2]" />
            <span className="text-[#1e293b] font-medium text-[15px]">Birthday</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#94a3b8] text-[15px] font-normal tracking-wide">
              {user?.birthday || birthday}
            </span>
            <button
              onClick={() => setModalType("birthday")}
              className="text-[#94a3b8] hover:text-[#0096FF] text-[15px] font-medium transition-colors py-0.5 px-2 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Delete Account Row */}
        <button
          onClick={() => setModalType("delete")}
          className="w-full flex items-center justify-between py-4 px-1 rounded-xl transition duration-150 hover:bg-slate-50/50 text-left cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <Trash2 className="w-5 h-5 text-red-500 stroke-[2]" />
            <span className="text-red-500 font-medium text-[15px]">Delete account</span>
          </div>
          <ChevronRight className="w-5 h-5 text-red-500 stroke-[2]" />
        </button>
      </div>

      {/* --- POPUPS/MODALS --- */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 transition-all duration-300">
          <div className="bg-white rounded-[24px] max-w-[430px] w-full p-6 md:p-7 shadow-2xl border border-slate-100 relative transform transition-all">
            
            {/* Close Button X */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* MODAL: Update Email (with 2-Stage OTP Verification) */}
            {modalType === "email" && (
              <div>
                {/* Stage 1: Enter New Email */}
                {emailStage === "input_email" && (
                  <form onSubmit={handleRequestEmailCode}>
                    <div className="mb-5">
                      <h3 className="text-[22px] font-bold text-[#0f172a] tracking-tight">Update email</h3>
                      <p className="text-[13px] text-[#64748b] mt-1 font-normal leading-relaxed">
                        Enter your new email address. We will send you a 6-digit code to verify your new email.
                      </p>
                    </div>

                    <div className="mb-6">
                      <label className="block text-[10.5px] font-bold text-[#005391] tracking-wider mb-2">
                        NEW EMAIL ADDRESS
                      </label>
                      <div className="flex items-center gap-3 bg-[#f8f9fa] rounded-2xl px-4 py-3.5 w-full border border-transparent focus-within:border-blue-200 focus-within:bg-white transition duration-150">
                        <Mail className="w-[18px] h-[18px] text-[#0096FF] stroke-[2]" />
                        <input
                          type="email"
                          required
                          placeholder="newemail@example.com"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          className="bg-transparent border-none outline-none w-full text-slate-800 placeholder-slate-400 text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[#0096FF] hover:bg-[#0085f2] disabled:opacity-70 text-white rounded-2xl py-3.5 font-bold text-sm tracking-wide transition duration-150 shadow-xs cursor-pointer select-none"
                      >
                        {loading ? "Sending verification code..." : "Send Verification Code"}
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
                )}

                {/* Stage 2: Verify Code & Update Email */}
                {emailStage === "confirm_code" && (
                  <form onSubmit={handleVerifyEmailAndSubmit}>
                    <div className="mb-5">
                      <h3 className="text-[22px] font-bold text-[#0f172a] tracking-tight">Verify your new email</h3>
                      <p className="text-[13px] text-[#64748b] mt-1 font-normal leading-relaxed">
                        We sent a 6-digit confirmation code to <strong className="text-slate-800">{newEmail}</strong>.
                      </p>
                    </div>

                    <div className="mb-6 space-y-4">
                      <div>
                        <label className="block text-[10.5px] font-bold text-[#005391] tracking-wider mb-2">
                          6-DIGIT VERIFICATION CODE
                        </label>
                        <div className="flex items-center gap-3 bg-[#f8f9fa] rounded-2xl px-4 py-3.5 w-full border border-transparent focus-within:border-blue-200 focus-within:bg-white transition duration-150">
                          <KeyRound className="w-[18px] h-[18px] text-[#0096FF] stroke-[2]" />
                          <input
                            type="text"
                            required
                            placeholder="123456"
                            maxLength={6}
                            value={emailCode}
                            onChange={(e) => setEmailCode(e.target.value)}
                            className="bg-transparent border-none outline-none w-full text-slate-800 placeholder-slate-350 text-[15px] font-semibold tracking-widest"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[#0096FF] hover:bg-[#0085f2] disabled:opacity-70 text-white rounded-2xl py-3.5 font-bold text-sm tracking-wide transition duration-150 shadow-xs cursor-pointer select-none"
                      >
                        {loading ? "Verifying..." : "Verify & Update Email"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="w-full bg-white border border-slate-200 text-[#0f172a] hover:bg-slate-50 rounded-2xl py-3.5 font-bold text-sm transition duration-150 shadow-xs cursor-pointer select-none"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[12px] px-1">
                      <button
                        type="button"
                        onClick={handleRequestEmailCode}
                        disabled={loading}
                        className="text-[#0096FF] hover:text-[#0085f2] font-semibold transition cursor-pointer"
                      >
                        Resend code
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEmailCode("");
                          setEmailStage("input_email");
                        }}
                        className="text-slate-500 hover:text-slate-800 font-medium transition cursor-pointer"
                      >
                        Change email address
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* MODAL: Update Phone (with 2-Stage SMS OTP Verification) */}
            {modalType === "phone" && (
              <div>
                {/* Stage 1: Phone Input Stage */}
                {phoneStage === "input_phone" && (
                  <form onSubmit={handleRequestUpdatePhoneCode}>
                    <div className="mb-5">
                      <h3 className="text-[22px] font-bold text-[#0f172a] tracking-tight">Update phone number</h3>
                      <p className="text-[13px] text-[#64748b] mt-1 font-normal leading-relaxed">
                        Enter your mobile phone number. We will send you an SMS verification code to verify this number.
                      </p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-[10.5px] font-bold text-[#005391] tracking-wider mb-2">
                          PHONE NUMBER
                        </label>
                        <div className="bg-[#f8f9fa] rounded-2xl px-4 py-3.5 w-full border border-transparent focus-within:border-blue-200 focus-within:bg-white transition duration-150">
                          <input
                            type="text"
                            required
                            placeholder="+91 XXXXX XXXXX"
                            value={newPhoneInput}
                            onChange={(e) => setNewPhoneInput(e.target.value)}
                            className="bg-transparent border-none outline-none w-full text-slate-800 placeholder-slate-350 text-[14px] font-semibold tracking-wider"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0096FF] hover:bg-[#0085f2] disabled:opacity-70 text-white rounded-2xl py-3.5 font-bold text-sm tracking-wide transition duration-150 shadow-xs cursor-pointer select-none"
                      >
                        {loading ? "Sending SMS code..." : "Send Verification Code"}
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
                )}

                {/* Stage 2: Phone OTP Confirmation Stage */}
                {phoneStage === "confirm_code" && (
                  <form onSubmit={handleVerifyPhoneAndSubmit}>
                    <div className="mb-5">
                      <h3 className="text-[22px] font-bold text-[#0f172a] tracking-tight">Verify phone number</h3>
                      <p className="text-[13px] text-[#64748b] mt-1 font-normal leading-relaxed">
                        We sent a 6-digit SMS verification code to <strong className="text-slate-800">{newPhoneInput}</strong>.
                      </p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-[10.5px] font-bold text-[#005391] tracking-wider mb-2">
                          6-DIGIT VERIFICATION CODE
                        </label>
                        <div className="flex items-center gap-3 bg-[#f8f9fa] rounded-2xl px-4 py-3.5 w-full border border-transparent focus-within:border-blue-200 focus-within:bg-white transition duration-150">
                          <KeyRound className="w-[18px] h-[18px] text-[#0096FF] stroke-[2]" />
                          <input
                            type="text"
                            required
                            placeholder="123456"
                            maxLength={6}
                            value={phoneOtpCode}
                            onChange={(e) => setPhoneOtpCode(e.target.value)}
                            className="bg-transparent border-none outline-none w-full text-slate-800 placeholder-slate-350 text-[15px] font-semibold tracking-widest"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0096FF] hover:bg-[#0085f2] disabled:opacity-70 text-white rounded-2xl py-3.5 font-bold text-sm tracking-wide transition duration-150 shadow-xs cursor-pointer select-none"
                      >
                        {loading ? "Verifying..." : "Verify & Update Phone"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="w-full bg-white border border-slate-200 text-[#0f172a] hover:bg-slate-50 rounded-2xl py-3.5 font-bold text-sm transition duration-150 shadow-xs cursor-pointer select-none"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[12px] px-1">
                      <button
                        type="button"
                        onClick={() => {
                          setPhoneOtpCode("");
                          setPhoneStage("input_phone");
                        }}
                        className="text-[#0096FF] hover:text-[#0085f2] font-semibold transition cursor-pointer"
                      >
                        Change phone number
                      </button>
                      <button
                        type="button"
                        onClick={handleRequestUpdatePhoneCode}
                        disabled={loading}
                        className="text-slate-500 hover:text-slate-700 font-medium transition cursor-pointer"
                      >
                        Resend code
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* MODAL: Birthday */}
            {modalType === "birthday" && (
              <form onSubmit={handleUpdateBirthday}>
                <div className="mb-5">
                  <h3 className="text-[22px] font-bold text-[#0f172a] tracking-tight">My birthday</h3>
                  <p className="text-[13px] text-[#64748b] mt-1 font-normal leading-relaxed">
                    This information is private and is not shared with other users.
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between gap-3 bg-[#f8f9fa] rounded-2xl px-4 py-3.5 w-full border border-transparent focus-within:border-blue-200 focus-within:bg-white transition duration-150 relative">
                    <div className="flex items-center gap-3 w-full">
                      <Calendar className="w-[18px] h-[18px] text-[#0096FF] stroke-[2]" />
                      <input
                        type="text"
                        required
                        placeholder="DD/MM/YYYY"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        className="bg-transparent border-none outline-none w-full text-slate-850 placeholder-slate-400 text-sm font-semibold tracking-wide"
                      />
                    </div>
                    <Calendar className="w-[18px] h-[18px] text-gray-400 stroke-[1.8] pointer-events-none" />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#0096FF] hover:bg-[#0085f2] disabled:opacity-70 text-white rounded-2xl py-3.5 font-bold text-sm tracking-wide transition duration-150 shadow-xs cursor-pointer select-none"
                >
                  {loading ? "Saving..." : "Done"}
                </button>
              </form>
            )}

            {/* MODAL: Password */}
            {modalType === "password" && (
              <div>
                <div className="mb-5">
                  <h3 className="text-[22px] font-bold text-[#0f172a] tracking-tight">Change your password</h3>
                  <p className="text-[13px] text-[#64748b] mt-1.5 font-normal leading-relaxed">
                    If you want to change your password, we will send you a code to verify that is your account.
                  </p>
                </div>

                {/* Stage 1: Request Code Screen */}
                {passwordStage === "request_code" && (
                  <div className="space-y-3">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handlePasswordRequestCode}
                      className="w-full bg-[#0096FF] hover:bg-[#0085f2] disabled:opacity-70 text-white rounded-2xl py-3.5 font-bold text-sm tracking-wide transition duration-150 shadow-xs cursor-pointer select-none"
                    >
                      {loading ? "Sending code..." : "Request code"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPasswordStage("confirm_code")}
                      className="w-full bg-white border border-slate-200 text-[#0f172a] hover:bg-slate-50 rounded-2xl py-3.5 font-bold text-sm transition duration-150 shadow-xs cursor-pointer select-none"
                    >
                      Already have a code?
                    </button>
                  </div>
                )}

                {/* Stage 2: Code Verification Screen */}
                {passwordStage === "confirm_code" && (
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="space-y-4 mb-5">
                      <div>
                        <label className="block text-[10.5px] font-bold text-[#005391] tracking-wider mb-2">
                          CONFIRMATION CODE
                        </label>
                        <div className="bg-[#f8f9fa] rounded-2xl px-4 py-3.5 w-full border border-transparent focus-within:border-blue-200 focus-within:bg-white transition duration-150">
                          <input
                            type="text"
                            required
                            placeholder="6-digit code"
                            value={confirmationCode}
                            onChange={(e) => setConfirmationCode(e.target.value)}
                            className="bg-transparent border-none outline-none w-full text-slate-800 placeholder-slate-350 text-[14px] font-semibold tracking-widest"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10.5px] font-bold text-[#005391] tracking-wider mb-2">
                          NEW PASSWORD
                        </label>
                        <div className="flex items-center justify-between bg-[#f8f9fa] rounded-2xl px-4 py-3.5 w-full border border-transparent focus-within:border-blue-200 focus-within:bg-white transition duration-150">
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="At least 8 characters"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="bg-transparent border-none outline-none w-full text-slate-800 placeholder-slate-350 text-[14px] font-medium"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-slate-400 hover:text-slate-600 transition p-0.5 cursor-pointer"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4 stroke-[2]" /> : <Eye className="w-4 h-4 stroke-[2]" />}
                          </button>
                        </div>
                      </div>

                      {/* Live Password Requirements Checklist (matching auth validation) */}
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100/90 space-y-1.5">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Password Requirements
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                          <div className={`flex items-center gap-1.5 transition-colors ${newPassword.length >= 8 ? "text-emerald-600 font-semibold" : "text-slate-400"}`}>
                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors ${newPassword.length >= 8 ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"}`}>
                              ✓
                            </div>
                            <span>8+ characters</span>
                          </div>
                          <div className={`flex items-center gap-1.5 transition-colors ${/[A-Z]/.test(newPassword) ? "text-emerald-600 font-semibold" : "text-slate-400"}`}>
                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors ${/[A-Z]/.test(newPassword) ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"}`}>
                              ✓
                            </div>
                            <span>Uppercase (A-Z)</span>
                          </div>
                          <div className={`flex items-center gap-1.5 transition-colors ${/[a-z]/.test(newPassword) ? "text-emerald-600 font-semibold" : "text-slate-400"}`}>
                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors ${/[a-z]/.test(newPassword) ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"}`}>
                              ✓
                            </div>
                            <span>Lowercase (a-z)</span>
                          </div>
                          <div className={`flex items-center gap-1.5 transition-colors ${/[0-9]/.test(newPassword) ? "text-emerald-600 font-semibold" : "text-slate-400"}`}>
                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors ${/[0-9]/.test(newPassword) ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"}`}>
                              ✓
                            </div>
                            <span>Number (0-9)</span>
                          </div>
                          <div className={`flex items-center gap-1.5 col-span-2 transition-colors ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword) ? "text-emerald-600 font-semibold" : "text-slate-400"}`}>
                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword) ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"}`}>
                              ✓
                            </div>
                            <span>Special character (!@#$%^&*)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0096FF] hover:bg-[#0085f2] disabled:opacity-70 text-white rounded-2xl py-3.5 font-bold text-sm tracking-wide transition duration-150 shadow-xs cursor-pointer select-none"
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

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setPasswordStage("phone_input")}
                        className="text-[12px] text-[#0096FF] hover:text-[#0085f2] font-semibold transition cursor-pointer"
                      >
                        Enter your phone number and set a new password
                      </button>
                    </div>
                  </form>
                )}

                {/* Stage 3: Phone Number Input Stage */}
                {passwordStage === "phone_input" && (
                  <form onSubmit={handleRequestPhoneCode}>
                    <div className="mb-5">
                      <h3 className="text-[22px] font-bold text-[#0f172a] tracking-tight">Password with phone</h3>
                      <p className="text-[13px] text-[#64748b] mt-1 font-normal leading-relaxed">
                        Enter your mobile number. We will send you an SMS verification code to reset your password.
                      </p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-[10.5px] font-bold text-[#005391] tracking-wider mb-2">
                          PHONE NUMBER
                        </label>
                        <div className="bg-[#f8f9fa] rounded-2xl px-4 py-3.5 w-full border border-transparent focus-within:border-blue-200 focus-within:bg-white transition duration-150">
                          <input
                            type="text"
                            required
                            placeholder="+91 XXXXX XXXXX"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="bg-transparent border-none outline-none w-full text-slate-800 placeholder-slate-350 text-[14px] font-semibold tracking-wider"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0096FF] hover:bg-[#0085f2] disabled:opacity-70 text-white rounded-2xl py-3.5 font-bold text-sm tracking-wide transition duration-150 shadow-xs cursor-pointer select-none"
                      >
                        {loading ? "Sending SMS code..." : "Send SMS Verification Code"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="w-full bg-white border border-slate-200 text-[#0f172a] hover:bg-slate-50 rounded-2xl py-3.5 font-bold text-sm transition duration-150 shadow-xs cursor-pointer select-none"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setPasswordStage("request_code")}
                        className="text-[12px] text-[#0096FF] hover:text-[#0085f2] font-semibold transition cursor-pointer"
                      >
                        Back to email verification
                      </button>
                    </div>
                  </form>
                )}

                {/* Stage 4: Phone OTP Verification & Password Reset */}
                {passwordStage === "phone_verify" && (
                  <form onSubmit={handlePhonePasswordSubmit}>
                    <div className="mb-5">
                      <h3 className="text-[22px] font-bold text-[#0f172a] tracking-tight">Verify phone & reset password</h3>
                      <p className="text-[13px] text-[#64748b] mt-1 font-normal leading-relaxed">
                        We sent a 6-digit SMS verification code to <strong className="text-slate-800">{phoneNumber}</strong>.
                      </p>
                    </div>

                    <div className="space-y-4 mb-5">
                      <div>
                        <label className="block text-[10.5px] font-bold text-[#005391] tracking-wider mb-2">
                          6-DIGIT SMS VERIFICATION CODE
                        </label>
                        <div className="flex items-center gap-3 bg-[#f8f9fa] rounded-2xl px-4 py-3.5 w-full border border-transparent focus-within:border-blue-200 focus-within:bg-white transition duration-150">
                          <KeyRound className="w-[18px] h-[18px] text-[#0096FF] stroke-[2]" />
                          <input
                            type="text"
                            required
                            placeholder="123456"
                            maxLength={6}
                            value={phoneVerificationCode}
                            onChange={(e) => setPhoneVerificationCode(e.target.value)}
                            className="bg-transparent border-none outline-none w-full text-slate-800 placeholder-slate-350 text-[15px] font-semibold tracking-widest"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10.5px] font-bold text-[#005391] tracking-wider mb-2">
                          NEW PASSWORD
                        </label>
                        <div className="flex items-center justify-between bg-[#f8f9fa] rounded-2xl px-4 py-3.5 w-full border border-transparent focus-within:border-blue-200 focus-within:bg-white transition duration-150">
                          <input
                            type={showPassword ? "text" : "password"}
                            required
                            placeholder="At least 8 characters"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="bg-transparent border-none outline-none w-full text-slate-800 placeholder-slate-350 text-[14px] font-medium"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-slate-400 hover:text-slate-600 transition p-0.5 cursor-pointer"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4 stroke-[2]" /> : <Eye className="w-4 h-4 stroke-[2]" />}
                          </button>
                        </div>
                      </div>

                      {/* Live Password Requirements Checklist (matching auth validation) */}
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100/90 space-y-1.5">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          Password Requirements
                        </div>
                        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                          <div className={`flex items-center gap-1.5 transition-colors ${newPassword.length >= 8 ? "text-emerald-600 font-semibold" : "text-slate-400"}`}>
                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors ${newPassword.length >= 8 ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"}`}>
                              ✓
                            </div>
                            <span>8+ characters</span>
                          </div>
                          <div className={`flex items-center gap-1.5 transition-colors ${/[A-Z]/.test(newPassword) ? "text-emerald-600 font-semibold" : "text-slate-400"}`}>
                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors ${/[A-Z]/.test(newPassword) ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"}`}>
                              ✓
                            </div>
                            <span>Uppercase (A-Z)</span>
                          </div>
                          <div className={`flex items-center gap-1.5 transition-colors ${/[a-z]/.test(newPassword) ? "text-emerald-600 font-semibold" : "text-slate-400"}`}>
                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors ${/[a-z]/.test(newPassword) ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"}`}>
                              ✓
                            </div>
                            <span>Lowercase (a-z)</span>
                          </div>
                          <div className={`flex items-center gap-1.5 transition-colors ${/[0-9]/.test(newPassword) ? "text-emerald-600 font-semibold" : "text-slate-400"}`}>
                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors ${/[0-9]/.test(newPassword) ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"}`}>
                              ✓
                            </div>
                            <span>Number (0-9)</span>
                          </div>
                          <div className={`flex items-center gap-1.5 col-span-2 transition-colors ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword) ? "text-emerald-600 font-semibold" : "text-slate-400"}`}>
                            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold transition-colors ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword) ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-400"}`}>
                              ✓
                            </div>
                            <span>Special character (!@#$%^&*)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0096FF] hover:bg-[#0085f2] disabled:opacity-70 text-white rounded-2xl py-3.5 font-bold text-sm tracking-wide transition duration-150 shadow-xs cursor-pointer select-none"
                      >
                        {loading ? "Verifying & Updating..." : "Change Password"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="w-full bg-white border border-slate-200 text-[#0f172a] hover:bg-slate-50 rounded-2xl py-3.5 font-bold text-sm transition duration-150 shadow-xs cursor-pointer select-none"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[12px] px-1">
                      <button
                        type="button"
                        onClick={handleRequestPhoneCode}
                        disabled={loading}
                        className="text-[#0096FF] hover:text-[#0085f2] font-semibold transition cursor-pointer"
                      >
                        Resend SMS code
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPhoneVerificationCode("");
                          setPasswordStage("phone_input");
                        }}
                        className="text-slate-500 hover:text-slate-800 font-medium transition cursor-pointer"
                      >
                        Change phone number
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* MODAL: Delete Account */}
            {modalType === "delete" && (
              <form onSubmit={handleDeleteAccount}>
                <div className="mb-5">
                  <h3 className="text-[22px] font-bold text-red-600 tracking-tight">Delete Account</h3>
                  <p className="text-[13px] text-[#64748b] mt-1.5 font-normal leading-relaxed">
                    This action is <strong>permanent</strong> and cannot be undone. All your posts, profile details, and network connections will be permanently wiped out.
                  </p>
                </div>

                <div className="mb-6">
                  <label className="block text-[10.5px] font-bold text-red-600 tracking-wider mb-2">
                    TYPE "DELETE" TO CONFIRM
                  </label>
                  <div className="bg-[#f8f9fa] rounded-2xl px-4 py-3.5 w-full border border-red-200">
                    <input
                      type="text"
                      required
                      placeholder="DELETE"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      className="bg-transparent border-none outline-none w-full text-slate-800 placeholder-slate-350 text-[14px] font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-70 text-white rounded-2xl py-3.5 font-bold text-sm tracking-wide transition duration-150 shadow-xs cursor-pointer select-none"
                  >
                    {loading ? "Deleting..." : "Permanently Delete"}
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
            )}

          </div>
        </div>
      )}
    </div>
  );
}

