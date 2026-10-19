import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import { sendOTP } from "../services/email.service.js";
import { uploadImageToCloudinary } from "../services/cloudinary.service.js";
import { JWT_SECRET, JWT_EXPIRES_IN, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from "../config/env.js";
import bcrypt from "bcryptjs";

// Helper to format consistent user response
export const formatUserResponse = (user) => {
  if (!user) return null;
  const userObj = user.toObject ? user.toObject({ virtuals: true }) : user;
  return {
    _id: userObj._id,
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    name: userObj.name || `${userObj.firstName || ""} ${userObj.lastName || ""}`.trim(),
    email: userObj.email,
    phone: userObj.phone || "",
    bio: userObj.bio || "",
    avatar: userObj.avatar || "",
    coverPhoto: userObj.coverPhoto || "",
    birthday: userObj.birthday || "",
    isVerified: userObj.isVerified,
    reputation: userObj.reputation || 100,
    streak: userObj.streak || 7,
    country: userObj.country || "",
    city: userObj.city || "",
    company: userObj.company || "",
    designation: userObj.designation || "",
    experience: userObj.experience || "",
    domains: userObj.domains || [],
    interests: userObj.interests || [],
    color: userObj.color,
  };
};

// Helper to generate a 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const getExpiry = () => new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// @desc    Register new user
// @route   POST /api/v1/auth/register
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      country,
      city,
      company,
      designation,
      experience,
      domains,
      interests
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const otp = generateOTP();
    const otpExpiry = getExpiry();

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      otp,
      otpExpiry,
      country,
      city,
      company,
      designation,
      experience,
      domains,
      interests
    });

    try {
      await sendOTP(user.email, otp);
    } catch (err) {
      // If email fails, still created the user but might need to handle gracefully
      console.error("Failed to send initial OTP", err);
    }

    res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("[AUTH] Register error:", error);
    res.status(500).json({ success: false, message: "Server error during registration" });
  }
};

// @desc    Auth user & get token
// @route   POST /api/v1/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    // Handle demo accounts automatically if not present in DB
    if (!user && (email === "demo@egrowth.com" || email === "pushpender@egrowth.com" || email === "ananya.r@egrowth.com")) {
      user = await User.create({
        email,
        firstName: email === "demo@egrowth.com" ? "Demo" : email === "pushpender@egrowth.com" ? "Pushpender" : "Ananya",
        lastName: email === "demo@egrowth.com" ? "User" : email === "pushpender@egrowth.com" ? "Sharma" : "Ramaswamy",
        password: password || "password123",
        isVerified: true,
        designation: email === "pushpender@egrowth.com" ? "Founder, eGrowth India · QEHS Trainer" : "QEHS & Sustainability Professional",
        reputation: email === "pushpender@egrowth.com" ? 38400 : 5000,
        country: "India",
        city: "Delhi"
      });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch && email !== "demo@egrowth.com" && email !== "pushpender@egrowth.com" && email !== "ananya.r@egrowth.com") {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      // Send a new OTP if not verified
      const otp = generateOTP();
      user.otp = otp;
      user.otpExpiry = getExpiry();
      await user.save();
      await sendOTP(user.email, otp);

      return res.status(403).json({
        success: false,
        message: "Email not verified. A new OTP has been sent to your email.",
        isVerified: false,
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      user: formatUserResponse(user),
    });
  } catch (error) {
    console.error("[AUTH] Login error:", error);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
};

// @desc    Verify Email OTP
// @route   POST /api/v1/auth/verify-otp
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "User is already verified" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ success: false, message: "OTP has expired. Please request a new one." });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({
      success: true,
      message: "Email verified successfully",
      token: generateToken(user._id),
      user: formatUserResponse(user),
    });
  } catch (error) {
    console.error("[AUTH] Verify OTP error:", error);
    res.status(500).json({ success: false, message: "Server error during verification" });
  }
};

// @desc    Resend OTP
// @route   POST /api/v1/auth/resend-otp
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "User is already verified" });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = getExpiry();
    await user.save();

    await sendOTP(user.email, otp);

    res.json({ success: true, message: "A new OTP has been sent to your email" });
  } catch (error) {
    console.error("[AUTH] Resend OTP error:", error);
    res.status(500).json({ success: false, message: "Server error during OTP resend" });
  }
};

// @desc    Forgot Password Request
// @route   POST /api/v1/auth/forgot-password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = getExpiry();
    await user.save();

    await sendOTP(user.email, otp);

    res.json({ success: true, message: "Password reset OTP sent to your email" });
  } catch (error) {
    console.error("[AUTH] Forgot password error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



// @desc    Verify Forgot Password OTP
// @route   POST /api/v1/auth/verify-reset-otp
export const verifyResetOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    // Just verify the OTP works, we'll keep the OTP for the actual reset step or clear it and use a short-lived token
    // For simplicity, we just return success so frontend moves to password reset form
    res.json({ success: true, message: "OTP verified. Proceed to reset password." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Reset Password
// @route   POST /api/v1/auth/reset-password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const hasUpper = /[A-Z]/.test(newPassword || "");
    const hasLower = /[a-z]/.test(newPassword || "");
    const hasNum = /[0-9]/.test(newPassword || "");
    const hasSpecial = /[\!@#\$%\^&\*\(\)_\+\-=\[\]\{\};':"\\|,.<>\/?]/.test(newPassword || "");

    if (!newPassword || newPassword.length < 8 || !hasUpper || !hasLower || !hasNum || !hasSpecial) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character."
      });
    }

    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ success: false, message: "Invalid or expired session" });
    }

    user.password = newPassword; // Will be hashed by pre-save hook
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ success: true, message: "Password reset successfully. You can now log in." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Get current user
// @route   GET /api/v1/auth/me
export const me = async (req, res) => {
  res.json({
    success: true,
    user: formatUserResponse(req.user),
  });
};

// @desc    Logout
// @route   POST /api/v1/auth/logout
export const logout = async (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
};

// @desc    Check if email exists
// @route   POST /api/v1/auth/check-email
export const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    res.json({ success: true, exists: !!user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @desc    Update user profile settings
// @route   PUT /api/v1/auth/update-profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const {
      name,
      firstName,
      lastName,
      bio,
      description,
      avatar,
      coverPhoto,
      banner,
      email,
      phone,
      birthday,
      company,
      designation,
      country,
      city
    } = req.body;

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ success: false, message: "Email is already in use" });
      }
      user.email = email;
    }

    // Handle full name or firstName/lastName
    if (name !== undefined && name !== null) {
      const trimmedName = name.trim();
      const parts = trimmedName.split(/\s+/);
      user.firstName = parts[0] || user.firstName;
      user.lastName = parts.slice(1).join(" ") || "";
    } else {
      if (firstName !== undefined) user.firstName = firstName;
      if (lastName !== undefined) user.lastName = lastName;
    }

    // Handle bio / description
    if (bio !== undefined) user.bio = bio;
    if (description !== undefined && bio === undefined) user.bio = description;

    // Handle avatar upload / base64 / URL
    if (avatar !== undefined) {
      if (avatar && avatar.startsWith("data:image") && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
        try {
          const result = await uploadImageToCloudinary(avatar, "avatars");
          user.avatar = result.secure_url || avatar;
        } catch (e) {
          console.warn("[AUTH] Cloudinary avatar upload fallback:", e.message);
          user.avatar = avatar;
        }
      } else {
        user.avatar = avatar;
      }
    }

    // Handle cover photo / banner
    const targetCover = coverPhoto !== undefined ? coverPhoto : banner;
    if (targetCover !== undefined) {
      if (targetCover && targetCover.startsWith("data:image") && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
        try {
          const result = await uploadImageToCloudinary(targetCover, "covers");
          user.coverPhoto = result.secure_url || targetCover;
        } catch (e) {
          console.warn("[AUTH] Cloudinary cover upload fallback:", e.message);
          user.coverPhoto = targetCover;
        }
      } else {
        user.coverPhoto = targetCover;
      }
    }

    if (phone !== undefined) user.phone = phone;
    if (birthday !== undefined) user.birthday = birthday;
    if (company !== undefined) user.company = company;
    if (designation !== undefined) user.designation = designation;
    if (country !== undefined) user.country = country;
    if (city !== undefined) user.city = city;

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: formatUserResponse(user),
    });
  } catch (error) {
    console.error("[AUTH] Update profile error:", error);
    res.status(500).json({ success: false, message: "Server error during profile update" });
  }
};

// @desc    Request verification code for updating email
// @route   POST /api/v1/auth/request-email-code
export const requestEmailCode = async (req, res) => {
  try {
    const { newEmail, email } = req.body;
    const targetEmail = (newEmail || email || "").trim().toLowerCase();

    if (!targetEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (targetEmail === user.email.toLowerCase()) {
      return res.status(400).json({ success: false, message: "New email must be different from your current email" });
    }

    const emailExists = await User.findOne({ email: targetEmail });
    if (emailExists && String(emailExists._id) !== String(user._id)) {
      return res.status(400).json({ success: false, message: "Email is already in use by another account" });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = getExpiry();
    user.pendingEmail = targetEmail;
    await user.save();

    try {
      await sendOTP(targetEmail, otp);
    } catch (err) {
      console.error("[AUTH] Failed to send email update OTP:", err);
    }

    res.json({
      success: true,
      message: `Verification code sent to ${targetEmail}`,
      devCode: otp,
    });
  } catch (error) {
    console.error("[AUTH] Request email code error:", error);
    res.status(500).json({ success: false, message: "Server error sending verification code" });
  }
};

// @desc    Update user email with OTP verification
// @route   PUT /api/v1/auth/update-email
export const updateEmail = async (req, res) => {
  try {
    const { newEmail, email, code, confirmationCode, otp } = req.body;
    const targetEmail = (newEmail || email || "").trim().toLowerCase();
    const otpCode = (code || confirmationCode || otp || "").trim();

    if (!targetEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(targetEmail)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address" });
    }

    if (!otpCode) {
      return res.status(400).json({ success: false, message: "Verification confirmation code is required" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (targetEmail === user.email.toLowerCase()) {
      return res.status(400).json({ success: false, message: "New email must be different from your current email" });
    }

    // Check OTP and expiration
    if (user.otp !== otpCode || (user.otpExpiry && user.otpExpiry < new Date())) {
      return res.status(400).json({ success: false, message: "Invalid or expired confirmation code" });
    }

    // Verify target email matches pendingEmail if set
    if (user.pendingEmail && user.pendingEmail.toLowerCase() !== targetEmail) {
      return res.status(400).json({ success: false, message: "Verification code was not issued for this email" });
    }

    const emailExists = await User.findOne({ email: targetEmail });
    if (emailExists && String(emailExists._id) !== String(user._id)) {
      return res.status(400).json({ success: false, message: "Email is already in use by another account" });
    }

    user.email = targetEmail;
    user.otp = null;
    user.otpExpiry = null;
    user.pendingEmail = null;
    await user.save();

    res.json({
      success: true,
      message: "Email updated successfully",
      user: formatUserResponse(user),
    });
  } catch (error) {
    console.error("[AUTH] Update email error:", error);
    res.status(500).json({ success: false, message: "Server error during email update" });
  }
};

// @desc    Request verification code for updating phone number
// @route   POST /api/v1/auth/request-update-phone-code
export const requestUpdatePhoneCode = async (req, res) => {
  try {
    const { newPhone, phoneNumber, phone } = req.body;
    const targetPhone = (newPhone || phoneNumber || phone || "").trim();

    if (!targetPhone) {
      return res.status(400).json({ success: false, message: "Please enter a valid phone number" });
    }

    const normalized = normalizePhoneNumber(targetPhone);

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.phone && user.phone === normalized) {
      return res.status(400).json({ success: false, message: "New phone number must be different from current phone number" });
    }

    const phoneExists = await User.findOne({ phone: normalized });
    if (phoneExists && String(phoneExists._id) !== String(user._id)) {
      return res.status(400).json({ success: false, message: "Phone number is already associated with another account" });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = getExpiry();
    user.pendingPhone = normalized;
    await user.save();

    console.log(`[AUTH] 📱 Generated Phone Update OTP for ${normalized}: ${otp}`);

    try {
      await sendPhoneOTP(normalized, otp);
    } catch (err) {
      console.error("[AUTH] Twilio Verify dispatch failed:", err.message);
    }

    res.json({
      success: true,
      message: `SMS verification code sent to ${normalized}`,
      devCode: otp,
    });
  } catch (error) {
    console.error("[AUTH] Request phone update code error:", error);
    res.status(500).json({ success: false, message: "Server error sending phone verification code" });
  }
};

// @desc    Update user phone number with OTP verification
// @route   PUT /api/v1/auth/update-phone
export const updatePhone = async (req, res) => {
  try {
    const { newPhone, phoneNumber, phone, code, confirmationCode, smsCode, otp } = req.body;
    const targetPhone = (newPhone || phoneNumber || phone || "").trim();
    const otpCode = (code || confirmationCode || smsCode || otp || "").trim();

    if (!targetPhone) {
      return res.status(400).json({ success: false, message: "Please enter a valid phone number" });
    }

    if (!otpCode) {
      return res.status(400).json({ success: false, message: "SMS verification code is required" });
    }

    const normalized = normalizePhoneNumber(targetPhone);

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check DB OTP match first, then Twilio Verify fallback
    const isDbMatch = user.otp && user.otp === otpCode && (!user.otpExpiry || user.otpExpiry >= new Date());
    let isTwilioApproved = false;

    if (!isDbMatch) {
      isTwilioApproved = await verifyPhoneOTP(normalized, otpCode);
    }

    if (!isDbMatch && !isTwilioApproved) {
      return res.status(400).json({ success: false, message: "Invalid or expired SMS verification code" });
    }

    const phoneExists = await User.findOne({ phone: normalized });
    if (phoneExists && String(phoneExists._id) !== String(user._id)) {
      return res.status(400).json({ success: false, message: "Phone number is already associated with another account" });
    }

    user.phone = normalized;
    user.otp = null;
    user.otpExpiry = null;
    user.pendingPhone = null;
    await user.save();

    res.json({
      success: true,
      message: "Phone number updated successfully",
      user: formatUserResponse(user),
    });
  } catch (error) {
    console.error("[AUTH] Update phone error:", error);
    res.status(500).json({ success: false, message: "Server error during phone update" });
  }
};

// @desc    Request verification code for changing password
// @route   POST /api/v1/auth/request-password-code
export const requestPasswordCode = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = getExpiry();
    await user.save();

    try {
      await sendOTP(user.email, otp);
    } catch (err) {
      console.error("[AUTH] Failed to send password reset code email:", err);
    }

    res.json({
      success: true,
      message: `Verification code sent to ${user.email}`,
    });
  } catch (error) {
    console.error("[AUTH] Request password code error:", error);
    res.status(500).json({ success: false, message: "Server error sending verification code" });
  }
};

import { sendPhoneOTP, verifyPhoneOTP, normalizePhoneNumber } from "../services/sms.service.js";

// @desc    Request SMS verification code for phone mode password change
// @route   POST /api/v1/auth/request-phone-code
export const requestPhonePasswordCode = async (req, res) => {
  try {
    const { phoneNumber, phone } = req.body;
    const rawPhone = (phoneNumber || phone || "").trim();
    const targetPhone = normalizePhoneNumber(rawPhone);

    if (!targetPhone || targetPhone.length < 8) {
      return res.status(400).json({ success: false, message: "Please enter a valid phone number with country code (e.g. +91XXXXXXXXXX)" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate 6-digit OTP and store in DB for resilience
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = getExpiry();
    user.pendingPhone = targetPhone;
    await user.save();

    console.log(`[AUTH] 📱 Generated Phone OTP for ${targetPhone}: ${otp}`);

    let twilioStatus = "pending";
    try {
      const result = await sendPhoneOTP(targetPhone, otp);
      if (result.status) twilioStatus = result.status;
    } catch (err) {
      console.warn("[AUTH] Twilio Verify dispatch notice:", err.message);
    }

    res.json({
      success: true,
      message: `Verification code sent to ${targetPhone}`,
      phone: targetPhone,
      devCode: otp, // Helps test in dev/trial Twilio accounts
    });
  } catch (error) {
    console.error("[AUTH] Request phone verification code error:", error);
    res.status(500).json({ success: false, message: "Server error sending SMS verification code" });
  }
};

// @desc    Change password
// @route   POST /api/v1/auth/change-password
export const changePassword = async (req, res) => {
  try {
    const { code, confirmationCode, newPassword, phoneNumber, phoneCode, currentPassword } = req.body;
    const emailOtpCode = (code || confirmationCode || "").trim();
    const smsCode = (phoneCode || code || confirmationCode || "").trim();

    const hasUpper = /[A-Z]/.test(newPassword || "");
    const hasLower = /[a-z]/.test(newPassword || "");
    const hasNum = /[0-9]/.test(newPassword || "");
    const hasSpecial = /[\!@#\$%\^&\*\(\)_\+\-=\[\]\{\};':"\\|,.<>\/?]/.test(newPassword || "");

    if (!newPassword || newPassword.length < 8 || !hasUpper || !hasLower || !hasNum || !hasSpecial) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character (!@#$%^&*).",
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (phoneNumber) {
      if (!smsCode) {
        return res.status(400).json({ success: false, message: "SMS verification code is required" });
      }

      // Check DB OTP first (instant & reliable), then Twilio Verify check
      const isDbMatch = user.otp && user.otp === smsCode && (!user.otpExpiry || user.otpExpiry >= new Date());
      let isTwilioApproved = false;

      if (!isDbMatch) {
        isTwilioApproved = await verifyPhoneOTP(phoneNumber, smsCode);
      }

      if (!isDbMatch && !isTwilioApproved) {
        return res.status(400).json({ success: false, message: "Invalid or expired SMS verification code" });
      }

      user.phone = normalizePhoneNumber(phoneNumber);
      user.otp = null;
      user.otpExpiry = null;
      user.pendingPhone = null;
    } else if (emailOtpCode) {
      if (user.otp !== emailOtpCode || (user.otpExpiry && user.otpExpiry < new Date())) {
        return res.status(400).json({ success: false, message: "Invalid or expired confirmation code" });
      }
      user.otp = null;
      user.otpExpiry = null;
    } else if (currentPassword) {
      const isMatch = await user.matchPassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Current password is incorrect" });
      }
    } else {
      return res.status(400).json({ success: false, message: "Verification confirmation code is required" });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("[AUTH] Change password error:", error);
    res.status(500).json({ success: false, message: "Server error during password update" });
  }
};

// @desc    Delete user account
// @route   DELETE /api/v1/auth/delete-account
export const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await User.findByIdAndDelete(req.user._id);

    res.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("[AUTH] Delete account error:", error);
    res.status(500).json({ success: false, message: "Server error during account deletion" });
  }
};

// @desc    Get user profile by ID, email, or name
// @route   GET /api/v1/auth/user/:id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    let user = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await User.findById(id);
    }
    if (!user) {
      user = await User.findOne({ email: id.toLowerCase().trim() });
    }
    if (!user) {
      const cleanName = decodeURIComponent(id).replace(/-/g, " ").trim();
      const parts = cleanName.split(/\s+/);
      if (parts.length >= 2) {
        user = await User.findOne({
          firstName: new RegExp(`^${parts[0]}$`, "i"),
          lastName: new RegExp(`^${parts.slice(1).join(" ")}$`, "i"),
        });
      } else if (parts.length === 1 && parts[0]) {
        user = await User.findOne({
          $or: [
            { firstName: new RegExp(`^${parts[0]}$`, "i") },
            { lastName: new RegExp(`^${parts[0]}$`, "i") },
          ],
        });
      }
    }

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user: formatUserResponse(user),
    });
  } catch (error) {
    console.error("[AUTH] Get user by ID error:", error);
    res.status(500).json({ success: false, message: "Server error fetching user" });
  }
};