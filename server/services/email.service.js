import nodemailer from "nodemailer";
import { EMAIL_USER, APP_PASSWORD } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL/TLS
  auth: {
    user: EMAIL_USER,
    pass: APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendOTP = async (to, otp) => {
  console.log(`[EMAIL SERVICE] 🔑 OTP Generated for ${to}: ${otp}`);

  const mailOptions = {
    from: `"eGrowth India" <${EMAIL_USER}>`,
    to,
    subject: "Your eGrowth India Verification Code",
    html: `
      <div style="font-family: sans-serif; max-w-lg mx-auto p-4">
        <h2>Verify Your Email</h2>
        <p>Your verification code is: <strong>${otp}</strong></p>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[EMAIL SERVICE] Email sent successfully to ${to}`);
  } catch (error) {
    console.error("[EMAIL SERVICE] SMTP Authentication Error:", error.message);
    console.log(`[DEV FALLBACK] 🔑 Use this OTP to verify ${to}: ${otp}`);
    
    // Allow development authentication to proceed even if SMTP fails
    if (process.env.NODE_ENV !== "production") {
      return;
    }
    throw error;
  }
};
