'use client';

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const logo = "/assets/egrowth-logo.png";

export default function ComingSoon() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 29,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        clearInterval(timer);
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#060e17] overflow-hidden font-sans text-white px-4">
      {/* Inline styles for custom animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-scale-up {
          animation: scaleUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Dynamic Background Mesh Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#0096FF]/10 blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#FF9300]/10 blur-[120px] pointer-events-none animate-pulse duration-[6000ms]" />

      {/* Floating Animated Circles */}
      <div className="absolute top-1/4 left-10 w-3 h-3 rounded-full bg-[#0096FF] opacity-30 animate-bounce duration-3000 pointer-events-none" />
      <div className="absolute bottom-1/4 right-12 w-4 h-4 rounded-full bg-[#FF9300] opacity-20 animate-bounce duration-4000 pointer-events-none" />

      {/* Main Glassmorphic Card Container */}
      <div className="relative z-10 w-full max-w-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl text-center flex flex-col items-center">
        
        {/* Logo */}
        <div className="mb-6 animate-fade-in">
          <img src={logo} alt="eGrowth India" className="h-12 md:h-14 object-contain brightness-110" />
        </div>

        {/* Badge */}
        <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#0096FF]/10 text-[#0096FF] border border-[#0096FF]/20 mb-6 shadow-sm">
           Under Construction
        </span>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          Our Interactive Community <br />
          <span className="text-[#0096FF]">Is Coming Soon</span>
        </h1>
{/* 
        <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base leading-relaxed mb-8">
          We are building a premium workspace for ISO auditing, quality management, and professional growth. Get ready to connect, share resources, and excel together!
        </p> */}

   
        {/* Email Capture / Notification Form */}
      

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1 || "/")}
            className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors duration-200"
          >
            ← Go Back
          </button>
          <span className="text-gray-600">|</span>
          {/* <button
            onClick={() => navigate("/")}
            className="text-xs font-semibold text-gray-400 hover:text-white transition-colors duration-200"
          >
            Return Home
          </button> */}
        </div>
      </div>
    </div>
  );
}
