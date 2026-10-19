import express from "express";
import {
  register,
  login,
  verifyOTP,
  resendOTP,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
  me,
  logout,
  checkEmail,
  updateProfile,
  requestEmailCode,
  updateEmail,
  requestUpdatePhoneCode,
  updatePhone,
  requestPasswordCode,
  requestPhonePasswordCode,
  changePassword,
  deleteAccount,
  getUserById
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import {
  validate,
  registerSchema,
  loginSchema,
  verifyOTPSchema,
  resendOTPSchema
} from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/verify-otp", validate(verifyOTPSchema), verifyOTP);
router.post("/resend-otp", validate(resendOTPSchema), resendOTP);

// Forgot Password Flow
router.post("/forgot-password", validate(resendOTPSchema), forgotPassword);
router.post("/verify-reset-otp", validate(verifyOTPSchema), verifyResetOTP);
router.post("/reset-password", resetPassword);

router.post("/logout", logout);
router.get("/me", protect, me);
router.get("/user/:id", getUserById);
router.post("/check-email", checkEmail);
router.put("/update-profile", protect, updateProfile);

// Account Settings Operations
router.post("/request-email-code", protect, requestEmailCode);
router.put("/update-email", protect, updateEmail);
router.post("/request-update-phone-code", protect, requestUpdatePhoneCode);
router.put("/update-phone", protect, updatePhone);
router.post("/request-password-code", protect, requestPasswordCode);
router.post("/request-phone-code", protect, requestPhonePasswordCode);
router.post("/change-password", protect, changePassword);
router.delete("/delete-account", protect, deleteAccount);



export default router;
