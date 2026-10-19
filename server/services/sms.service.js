import twilio from "twilio";
import {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_VERIFY_SERVICE_SID,
  NODE_ENV
} from "../config/env.js";

let twilioClient = null;
if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) {
  try {
    twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  } catch (err) {
    console.error("[SMS SERVICE] Failed to initialize Twilio client:", err.message);
  }
}

/**
 * Normalizes phone number into E.164 format (e.g. +919876543210)
 */
export const normalizePhoneNumber = (phone) => {
  if (!phone) return "";
  let clean = phone.replace(/[^\d+]/g, "");
  if (!clean.startsWith("+")) {
    if (clean.length === 10) {
      clean = "+91" + clean;
    } else {
      clean = "+" + clean;
    }
  }
  return clean;
};

/**
 * Sends OTP via Twilio Verify Service to phone number
 */
export const sendPhoneOTP = async (phoneNumber, customOtp = null) => {
  const formatted = normalizePhoneNumber(phoneNumber);
  console.log(`[SMS SERVICE] 📱 Sending OTP to phone: ${formatted}`);

  if (!twilioClient) {
    console.warn("[SMS SERVICE] Twilio client not initialized.");
    return { success: false, mode: "unconfigured", phone: formatted };
  }

  // 1. Try Twilio Verify Service if Service SID is provided
  if (TWILIO_VERIFY_SERVICE_SID) {
    try {
      const verification = await twilioClient.verify.v2
        .services(TWILIO_VERIFY_SERVICE_SID)
        .verifications.create({ to: formatted, channel: "sms" });

      console.log(`[SMS SERVICE] Twilio Verify status: ${verification.status}`);
      return { success: true, status: verification.status, phone: formatted, mode: "twilio_verify" };
    } catch (error) {
      console.error("[SMS SERVICE] Twilio Verify Service Error:", error.message);
      // Fall through to try standard SMS or throw
      if (NODE_ENV === "production") {
        throw error;
      }
    }
  }

  return { success: true, mode: "fallback", phone: formatted };
};

/**
 * Checks verification code against Twilio Verify Service
 */
export const verifyPhoneOTP = async (phoneNumber, code) => {
  const formatted = normalizePhoneNumber(phoneNumber);
  console.log(`[SMS SERVICE] 🔍 Verifying Twilio code for phone: ${formatted}`);

  if (!twilioClient || !TWILIO_VERIFY_SERVICE_SID) {
    return false;
  }

  try {
    const check = await twilioClient.verify.v2
      .services(TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: formatted, code: String(code).trim() });

    console.log(`[SMS SERVICE] Twilio verification check status: ${check.status}`);
    return check.status === "approved";
  } catch (error) {
    console.error("[SMS SERVICE] Twilio Verification Check Error:", error.message);
    return false;
  }
};
