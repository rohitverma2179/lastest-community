'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Reputation, Icon } from '../components/portal/primitives';
import { registerUser, loginUser, verifyOTP, resendOTP, forgotPasswordUser, resetPasswordUser } from '../features/auth/user.thunk';
import api from '../utils/axios';
const bexexAd = "/assets/bexex_ad.png";
const swastixaAd = "/assets/swastixa-ad.jpg";
const logo = "/assets/egrowth-logo-white.png";

const TAGS = [
  'iso-9001',
  'iso-14001',
  'iso-45001',
  'iso-50001',
  'nebosh',
  'gri',
  'esrs',
  'brsr',
  'audit',
  'rca',
  'hazop',
  'six-sigma',
  'lopa',
  'scope-3',
  'Trainings', 'Audits', 'Implementation', 'Documentation', 'Certifications', 'Compliance', 'Risk Assessments', 'Awareness', 'Legal-Compliance', 'Root-Cause', 'Reports', 'Monitoring', 'Toolbox-Talks', 'Emergency-Prep', 'Corrective-Actions', 'Near-iss', 'Gap-Assessments', 'Management-Reviews', 'Continual-Improvement', 'Integrated-Systems', 'ISO-Standards', 'Inspections', 'Incident-Investigation', 'Permit-to-Work', 'Work-Instructions', 'Policies', 'Procedures', 'Checklists', 'Templates', 'Case-Studies', 'Best-Practices', 'Webinars', 'Workshops', 'Guidelines', 'Regulatory-Update', 'Job-Safety-Analysis', 'Preventive-Action', 'Performance-Metrics', 'Benchmarking', 'Carbon-Footprint', 'Waste-Management', 'Energy-Efficiency', 'Supplier-Audits', 'Mock-Drills', 'Competency-Mapping', 'Career-Guidance', 'Job-Openings', 'Success-Story', 'Discussion', 'Announcement'
];



const CATEGORY_ITEMS = [
  { id: 'quality', name: 'Quality', desc: 'ISO 9001, Quality Management & Audits', gradient: 'linear-gradient(135deg, #005391 0%, #0096FF 100%)', icon: '🎯' },
  { id: 'environment', name: 'Environment', desc: 'ISO 14001, Waste & Climate Compliance', gradient: 'linear-gradient(135deg, #047857 0%, #10B981 100%)', icon: '🌱' },
  { id: 'health', name: 'Health', desc: 'Occupational Health, Wellness & Medical Safety', gradient: 'linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)', icon: '🏥' },
  { id: 'safety', name: 'Safety', desc: 'ISO 45001, Hazard Analysis & Industrial Safety', gradient: 'linear-gradient(135deg, #DC2626 0%, #F87171 100%)', icon: '🛡️' },
  { id: 'Welfare', name: 'Welfare', desc: 'Employee Welfare, Ethics & Social Standards', gradient: 'linear-gradient(135deg, #D97706 0%, #FBBF24 100%)', icon: '🤝' },
  { id: 'energy', name: 'Energy', desc: 'ISO 50001, Energy Efficiency & Decarbonization', gradient: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)', icon: '⚡' },
  { id: 'eSG', name: 'ESG', desc: 'Environmental, Social & Governance Reporting', gradient: 'linear-gradient(135deg, #4F46E5 0%, #818CF8 100%)', icon: '📊' },
  { id: 'sustainability', name: 'Sustainability', desc: 'BRSR, GRI Standards & Carbon Footprint', gradient: 'linear-gradient(135deg, #0D9488 0%, #2DD4BF 100%)', icon: '🌍' },
];


export default function AuthPage({ mode: initialMode = 'signup', onLogin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/portal');
    }
  }, [isAuthenticated, navigate]);
  const [timer, setTimer] = useState(0);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);
  const [backendError, setBackendError] = useState("");
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [tagsSearch, setTagsSearch] = useState('');
  const [tagsDropdownOpen, setTagsDropdownOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const tagsDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (tagsDropdownRef.current && !tagsDropdownRef.current.contains(event.target)) {
        setTagsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+91',
    country: '',
    city: '',
    company: '',
    designation: '',
    experience: '',
    domains: [],
    interests: [],
    password: '',
    confirm: '',
    otp: '',
  });

  const set = (k, v) => {
    setData(d => ({ ...d, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }));
    if (backendError) setBackendError("");
  };

  const toggle = (k, v) => {
    setData(d => ({
      ...d,
      [k]: d[k].includes(v) ? d[k].filter(x => x !== v) : [...d[k], v],
    }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }));
    if (backendError) setBackendError("");
  };

  const validatePasswordRequirements = (pwd) => {
    if (!pwd) return "Password is required";
    if (pwd.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(pwd)) return "Password must contain at least one uppercase letter (A-Z)";
    if (!/[a-z]/.test(pwd)) return "Password must contain at least one lowercase letter (a-z)";
    if (!/[0-9]/.test(pwd)) return "Password must contain at least one number (0-9)";
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) return "Password must contain at least one special character (!@#$%^&*)";
    return null;
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!data.firstName.trim()) newErrors.firstName = "First name is required";
      if (!data.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!data.email.trim()) newErrors.email = "Email is required";
      else if (!data.email.includes('@') || !data.email.includes('.')) newErrors.email = "Invalid email format";
      // if (!data.phone.trim()) newErrors.phone = "Mobile number is required";
      // else if (data.phone.trim().length !== 10) newErrors.phone = "Mobile number must be exactly 10 digits";
      if (!data.country.trim()) newErrors.country = "Country is required";
      if (!data.city.trim()) newErrors.city = "City is required";
    } else if (currentStep === 2) {
      if (!data.company.trim()) newErrors.company = "Company is required";
      if (!data.designation.trim()) newErrors.designation = "Designation is required";
      if (!String(data.experience).trim()) newErrors.experience = "Experience is required";
    } else if (currentStep === 3) {
      // if (data.domains.length === 0) newErrors.domains = "Select at least one domain";
      // if (data.interests.length === 0) newErrors.interests = "Select at least one topic";
    } else if (currentStep === 4) {
      const pwdErr = validatePasswordRequirements(data.password);
      if (pwdErr) newErrors.password = pwdErr;

      if (!data.confirm) newErrors.confirm = "Confirm password is required";
      else if (data.password !== data.confirm) newErrors.confirm = "Passwords do not match";
      if (!agreed) newErrors.agreed = "You must agree to the terms";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLogin = () => {
    const newErrors = {};
    // if (!data.email.trim()) newErrors.email = "Email or Mobile Number is required";
    if (!data.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateVerify = () => {
    const newErrors = {};
    if (!data.otp.trim()) newErrors.otp = "OTP is required";
    else if (data.otp.length !== 6) newErrors.otp = "OTP must be 6 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForgotPassword = () => {
    const newErrors = {};
    if (!data.email.trim()) newErrors.email = "Registered Email is required";
    else if (!data.email.includes('@') || !data.email.includes('.')) newErrors.email = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateResetPassword = () => {
    const newErrors = {};
    if (!data.otp.trim()) newErrors.otp = "OTP code is required";
    else if (data.otp.length !== 6) newErrors.otp = "OTP must be 6 digits";

    const pwdErr = validatePasswordRequirements(data.password);
    if (pwdErr) newErrors.password = pwdErr;

    if (!data.confirm) newErrors.confirm = "Confirm password is required";
    else if (data.password !== data.confirm) newErrors.confirm = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = async () => {
    if (validateStep(step)) {
      if (step === 1) {
        setCheckingEmail(true);
        try {
          const res = await api.post('/auth/check-email', { email: data.email });
          if (res.data.exists) {
            setErrors(prev => ({ ...prev, email: "User already exists. Please sign in." }));
            setCheckingEmail(false);
            return;
          }
        } catch (e) {
          console.error("Failed to check email", e);
        }
        setCheckingEmail(false);
      }
      setStep(step + 1);
    }
  };

  const TOTAL = mode === 'signup' ? 4 : 1;

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleRegister = async () => {
    setBackendError("");
    if (!validateStep(4)) return;
    try {
      const fullPhone = `${data.countryCode}${data.phone}`;
      await dispatch(registerUser({ ...data, phone: fullPhone })).unwrap();
      setMode('verify');
    } catch (e) {
      setBackendError(typeof e === 'string' ? e : e?.message || "Registration failed");
    }
  };

  const handleLogin = async () => {
    setBackendError("");
    if (!validateLogin()) return;
    try {
      await dispatch(loginUser({ email: data.email, password: data.password })).unwrap();
      if (onLogin) {
        onLogin();
      } else {
        navigate("/portal");
      }
    } catch (e) {
      if (e?.isVerified === false) {
        setMode('verify');
      } else {
        setBackendError(typeof e === 'string' ? e : e?.message || "Login failed");
      }
    }
  };

  const handleDemoLogin = async (demoEmail = "demo@egrowth.com", demoPassword = "password123") => {
    setBackendError("");
    setErrors({});
    setData(d => ({ ...d, email: demoEmail, password: demoPassword }));
    try {
      await dispatch(loginUser({ email: demoEmail, password: demoPassword })).unwrap();
      if (onLogin) {
        onLogin();
      } else {
        navigate("/portal");
      }
    } catch (e) {
      if (e?.isVerified === false) {
        setMode('verify');
      } else {
        setBackendError(typeof e === 'string' ? e : e?.message || "Demo login failed");
      }
    }
  };

  const handleVerify = async () => {
    setBackendError("");
    if (!validateVerify()) return;
    try {
      await dispatch(verifyOTP({ email: data.email, otp: data.otp })).unwrap();
      if (onLogin) {
        onLogin();
      } else {
        navigate("/portal");
      }
    } catch (e) {
      setBackendError(typeof e === 'string' ? e : e?.message || "Verification failed");
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    if (timer > 0) return;
    try {
      await dispatch(resendOTP(data.email)).unwrap();
      setTimer(60);
    } catch (e) {
      console.error("Failed to resend OTP", e);
    }
  };

  const handleForgotPassword = async () => {
    setBackendError("");
    if (!validateForgotPassword()) return;
    try {
      await dispatch(forgotPasswordUser(data.email)).unwrap();
      setMode('reset-password');
      setTimer(60);
    } catch (e) {
      setBackendError(typeof e === 'string' ? e : e?.message || "Failed to send reset email");
    }
  };

  const handleResetPassword = async () => {
    setBackendError("");
    if (!validateResetPassword()) return;
    try {
      await dispatch(resetPasswordUser({ email: data.email, otp: data.otp, newPassword: data.password })).unwrap();
      setMode('login');
      setData(d => ({ ...d, password: '', confirm: '', otp: '' }));
      setErrors({});
    } catch (e) {
      setBackendError(typeof e === 'string' ? e : e?.message || "Password reset failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading || checkingEmail) return;

    if (mode === 'signup') {
      if (step < TOTAL) {
        handleNextStep();
      } else {
        handleRegister();
      }
    } else if (mode === 'login') {
      handleLogin();
    } else if (mode === 'forgot-password') {
      handleForgotPassword();
    } else if (mode === 'reset-password') {
      handleResetPassword();
    } else if (mode === 'verify') {
      handleVerify();
    }
  };

  const filteredTags = TAGS.filter(t =>
    t.toLowerCase().includes(tagsSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full auth-grid bg-[var(--bg)] legacy-styles-wrapper">

      {/* // <div
    //   className="min-h-screen  gap-[22px] bg-[var(--bg)]"
    //   style={{ gridTemplateColumns: "repeat(0, 1fr)" }}
    // > */}
      {/* LEFT — brand panel */}
      <div className="auth-brand-panel bg-gradient-to-br from-[var(--brand-900)] to-[var(--brand-400)] text-white p-12 flex flex-col relative overflow-hidden hidden md:flex w-full md:w-[68%] lg:w-[72%] xl:w-[74%] flex-1">
        {/* <div className="absolute -right-24 -top-24 w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,var(--amber-400),transparent_60%)] opacity-40 pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,var(--brand-300),transparent_60%)] opacity-18 pointer-events-none" /> */}

        <div className="flex items-center gap-2.5 mb-14 relative z-10">
          <img
            src={logo}
            alt="eGrowth Logo"
            className="h-6 w-auto object-contain"
          />
        </div>

        <div className="relative max-w-[480px]  z-10">
          <h1 className="text-[42px] text-white text-white-auth font-bold leading-[1.1] mb-4.5">
            The world's largest community of QEHS &amp; ESG professionals<span className='text-[#f18032]'>.</span>
          </h1>
          <p className="text-[16px] text-white/85 leading-relaxed">
            Free forever. No follow system. Just real practitioners sharing real knowledge — and
            earning <strong>Merit points</strong> along the way.
          </p>
        </div>

        <div className="flex-1" />

        <div className="auth-brand-stats grid gap-4.5 max-w-[480px] relative z-10">
          <BrandStat n="48K+" l="Members worldwide" />
          <BrandStat n="4,200+" l="Free resources" />
          <BrandStat n="186" l="Open jobs" />
          <BrandStat n="108" l="Free quizzes" />
        </div>

        <div className="mt-9 text-[12px] opacity-60 relative z-10">
          Powered by <span className='cursor-pointer text-[var(--brand-700)] ' onClick={() => window.open('https://www.bexexglobal.com', '_blank')}>
            BexexGlobal.com
          </span> · Built by practitioners, for practitioners.
        </div>
        <aside className="auth-ad-rail" aria-label="Sponsors">
          {/* <div className="sponsor-label">Official Sponsors</div> */}
          <div className="auth-ad-card">
            <div className="auth-ad-header">
              <span className="sponsored-text">Ad</span>
            </div>
            <img src={bexexAd} alt="Bexex sponsor advertisement" />
          </div>
          <div className="auth-ad-card">
            <div className="auth-ad-header">
              <span className="sponsored-text">Ad</span>
            </div>
            <img src={swastixaAd} alt="Swastixa Digital sponsor advertisement" />
          </div>
        </aside>
      </div>

      {/* RIGHT — form */}
      <div className="p-8 md:p-8 lg:p-10 xl:px-14 flex flex-col overflow-y-auto bg-[var(--bg)] w-full md:w-[32%] lg:w-[28%] xl:w-[26%] shrink-0">
        <div className="flex justify-end text-[13px] mb-8">
          {mode !== 'verify' && mode !== 'forgot-password' && mode !== 'reset-password' && (
            <span className="text-[var(--text-dim)]">
              {mode === 'signup' ? 'Already a member?' : 'New here?'}{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); setErrors({}); setBackendError(""); setMode(mode === 'signup' ? 'login' : 'signup'); }} className="text-[var(--brand-700)] hover:underline">
                {mode === 'signup' ? 'Sign in' : 'Create account'}
              </a>
            </span>
          )}
          {(mode === 'forgot-password' || mode === 'reset-password') && (
            <span className="text-[var(--text-dim)]">
              Remember password?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); setErrors({}); setBackendError(""); setMode('login'); }} className="text-[var(--brand-700)] hover:underline font-medium">
                Sign in
              </a>
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col">
          <h2 className="text-[26px] font-bold text-[var(--text)] mb-1.5">
            {mode === 'signup'
              ? step === 1
                ? 'Create your account'
                : step === 2
                  ? 'Tell us about you'
                  : step === 3
                    ? 'Your expertise'
                    : 'Almost done!'
              : mode === 'verify'
                ? 'Verify your identity'
                : mode === 'forgot-password'
                  ? 'Reset your password'
                  : mode === 'reset-password'
                    ? 'Set new password'
                    : 'Welcome back'}
          </h2>
          <p className="text-[14px] text-[var(--text-muted)] m-0 mb-7 leading-relaxed">
            {mode === 'signup'
              ? step === 1
                ? 'Free forever. No credit card. No spam.'
                : step === 2
                  ? 'Helps us recommend the right people, jobs, and resources.'
                  : step === 3
                    ? 'We auto-endorse skills based on your activity here.'
                    : 'Choose your password and join the community.'
              : mode === 'verify'
                ? 'Please enter the 6-digit OTP sent to your email or phone.'
                : mode === 'forgot-password'
                  ? 'Enter your registered email address to receive a 6-digit reset code via Gmail.'
                  : mode === 'reset-password'
                    ? 'Enter the 6-digit code sent to your email and your new password.'
                    : 'Sign in to keep your streak going and access your network.'}
          </p>

          {/* Stepper */}
          {mode === 'signup' && (
            <div className="flex gap-1.5 mb-8">
              {Array.from({ length: TOTAL }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-1 rounded-full transition-all duration-200 ${i + 1 <= step ? 'bg-[var(--brand-600)]' : 'bg-[var(--ink-150)]'
                    }`}
                />
              ))}
            </div>
          )}

          {/* Step content */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
            {mode === 'signup' && step === 1 && (
              <div className="flex flex-col gap-3.5">
                <div className="grid grid-cols-2 gap-8">
                  <Field label="First name" value={data.firstName} onChange={v => set('firstName', v)} error={errors.firstName} />
                  <Field label="Last name" value={data.lastName} onChange={v => set('lastName', v)} error={errors.lastName} />
                </div>
                <Field
                  label="Work email"
                  type="email"
                  value={data.email}
                  onChange={v => set('email', v)}
                  hint="We'll use this for sign-in."
                  error={errors.email}
                />
                {/* <PhoneField
                  label="Mobile number"
                  countryCode={data.countryCode}
                  onCountryCodeChange={v => set('countryCode', v)}
                  value={data.phone}
                  onChange={v => set('phone', v)}
                  hint="Useful for WhatsApp updates."
                  error={errors.phone}
                /> */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Field label="Country" value={data.country} onChange={v => set('country', v)} error={errors.country} />
                  <Field label="City" value={data.city} onChange={v => set('city', v)} error={errors.city} />
                </div>
              </div>
            )}

            {mode === 'signup' && step === 2 && (
              <div className="flex flex-col gap-3.5">
                <Field
                  label="Company / Organization"
                  value={data.company}
                  onChange={v => set('company', v)}
                  hint="Type 'Independent' if you're a consultant."
                  error={errors.company}
                />
                <Field
                  label="Designation / Title"
                  value={data.designation}
                  onChange={v => set('designation', v)}
                  error={errors.designation}
                />
                <Field
                  label="QHSE and ESG experience"
                  type="tel"
                  inputMode="numeric"
                  maxLength={3}
                  value={data.experience}
                  onChange={v => {
                    const onlyNums = v.replace(/\D/g, '').slice(0, 2);
                    set('experience', onlyNums);
                  }}
                  onKeyDown={e => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter'].includes(e.key) &&
                      !e.ctrlKey &&
                      !e.metaKey
                    ) {
                      e.preventDefault();
                    }
                  }}
                  suffix="years"
                  error={errors.experience}
                />
              </div>
            )}

            {mode === 'signup' && step === 3 && (
              <div>
                <div className="text-[13px] text-[var(--text)] mb-3 font-medium">
                  Pick Your Category{' '}
                  <span className="text-[var(--text-dim)] font-normal">(2-4 recommended)</span>
                </div>

                {/* Category Cards Grid (Slightly smaller medium 2-card per row layout) */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gap: '10px'
                  }}
                  className="mb-4"
                >
                  {CATEGORY_ITEMS.map(cat => {
                    const isSelected = data.domains.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggle('domains', cat.id)}
                        style={{
                          background: cat.gradient,
                        }}
                        className={`relative aspect-[1.5/1] rounded-xl p-3 flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-200 overflow-hidden select-none group ${isSelected
                          ? 'ring-3 ring-[#0096FF]/40 border border-white scale-[1.01] shadow-md'
                          : 'opacity-85 hover:opacity-100 hover:scale-[1.01] shadow-sm'
                          }`}
                      >
                        {/* Semi-dark background overlay when unselected for text contrast */}
                        <div
                          className={`absolute inset-0 transition-colors pointer-events-none ${isSelected ? 'bg-black/15' : 'bg-black/45 hover:bg-black/35'
                            }`}
                        />

                        {/* Top-Right Checkbox */}
                        <div className="relative z-10 w-full flex justify-end">
                          <div
                            className={`w-4.5 h-4.5 rounded-md flex items-center justify-center border transition-all duration-150 ${isSelected
                              ? 'bg-[#0096FF] border-[#0096FF] text-white shadow-xs'
                              : 'border-white/70 bg-black/25 text-transparent group-hover:border-white'
                              }`}
                          >
                            <svg className="w-3 h-3 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>

                        {/* Center Title */}
                        <div className="relative z-10 flex flex-col items-center justify-center my-auto px-1 text-center">
                          <h4 className="text-[14px] font-extrabold text-white-external tracking-wide drop-shadow-sm leading-tight">
                            {cat.name}
                          </h4>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {errors.domains && (
                  <div className="text-[11px] text-red-500 mb-3 font-medium">{errors.domains}</div>
                )}
              </div>
            )}

            {mode === 'signup' && step === 4 && (
              <div className="flex flex-col gap-3.5">
                <Field
                  label="Password"
                  type="password"
                  value={data.password}
                  onChange={v => set('password', v)}
                  hint="Must contain 8+ chars, uppercase, lowercase, number & special character."
                  error={errors.password}
                />
                <Field
                  label="Confirm password"
                  type="password"
                  value={data.confirm}
                  onChange={v => set('confirm', v)}
                  error={errors.confirm}
                  success={data.password && data.confirm && data.password === data.confirm}
                />

                {/* Welcome reward */}
                <div className="mt-2.5 p-4.5 bg-gradient-to-br from-[var(--brand-50)] to-[var(--amber-50)] rounded-[var(--r-md)] border border-[var(--brand-200)] flex items-center gap-3.5">
                  <div className="text-[32px]">🎁</div>
                  <div className="flex-1">
                    <div className="font-bold text-[14px] text-[var(--text)]">
                      You'll start with <Reputation points={100} />
                    </div>
                    <div className="text-[12px] text-[var(--text-muted)] mt-0.5">
                      Plus the Welcome badge, and a 7-day streak head-start.
                    </div>
                  </div>
                </div>

                <div>
                  <label className="flex gap-2.5 text-[13px] text-[var(--text-muted)] items-start mt-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => {
                        setAgreed(e.target.checked);
                        if (e.target.checked && errors.agreed) setErrors(err => ({ ...err, agreed: '' }));
                      }}
                      className="mt-1 shrink-0"
                    />
                    <span>
                      I agree to eGrowth's{' '}
                      <a href="/community-guidelines" target="_blank" rel="noopener noreferrer" className="text-[#0096FF]  hover:underline">
                        Community Guidelines
                      </a>{' '}
                      and{' '}
                      <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#0096FF] hover:underline">
                        Privacy Policy
                      </a>
                      . Knowledge shared here is CC-BY-SA by default.
                    </span>
                  </label>
                  {errors.agreed && <div className="text-[11px] text-red-500 mt-1 ml-6">{errors.agreed}</div>}
                </div>
                <label className="flex gap-2.5 text-[13px] text-[var(--text-muted)] items-start cursor-pointer">
                  <input type="checkbox" className="mt-1 shrink-0" />
                  <span>Send me weekly digest emails (best Q&amp;A + new free resources).</span>
                </label>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex flex-col gap-4">
                {/* Quick Demo Login Banner */}


                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-3 text-[11px] text-slate-400 font-medium uppercase tracking-wider">or sign in with email</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <Field
                  label="Email or Mobile Number"
                  type="text"
                  value={data.email}
                  onChange={v => set('email', v)}
                  error={errors.email}
                />

                <Field
                  label="Password"
                  type="password"
                  value={data.password}
                  onChange={v => set('password', v)}
                  error={errors.password}
                />
                <div className="flex items-center justify-between mt-1">
                  <label className="flex items-center gap-2 text-[13px] text-[var(--text-muted)] cursor-pointer">
                    <input type="checkbox" defaultChecked className="shrink-0" />
                    <span>Remember me</span>
                  </label>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setErrors({});
                      setBackendError("");
                      setMode('forgot-password');
                    }}
                    className="text-[13px] text-[#0096FF] hover:underline font-medium cursor-pointer"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
            )}

            {mode === 'forgot-password' && (
              <div className="flex flex-col gap-4">
                <Field
                  label="Registered Email Address"
                  type="text"
                  value={data.email}
                  onChange={v => set('email', v)}
                  hint="We will send a 6-digit verification code to your Gmail/email."
                  error={errors.email}
                />
                <div className="text-[13px] text-[var(--text-dim)] mt-1">
                  Remembered password?{' '}
                  <button
                    type="button"
                    onClick={() => { setErrors({}); setBackendError(""); setMode('login'); }}
                    className="text-[var(--brand-700)] hover:underline font-medium cursor-pointer"
                  >
                    Back to Sign in
                  </button>
                </div>
              </div>
            )}

            {mode === 'reset-password' && (
              <div className="flex flex-col gap-4">
                <div className="bg-[var(--brand-50)] text-[var(--brand-800)] p-4 rounded-[var(--r-md)] border border-[var(--brand-200)] text-[13px] mb-1">
                  We've sent a 6-digit reset code to <strong>{data.email}</strong>
                </div>
                <Field
                  label="6-Digit Reset Code (OTP)"
                  type="text"
                  value={data.otp}
                  onChange={v => set('otp', v)}
                  hint="Enter the 6-digit code sent to your email."
                  error={errors.otp}
                />
                <Field
                  label="New Password"
                  type="password"
                  value={data.password}
                  onChange={v => set('password', v)}
                  hint="Must contain 8+ chars, uppercase, lowercase, number & special character."
                  error={errors.password}
                />
                <Field
                  label="Confirm New Password"
                  type="password"
                  value={data.confirm}
                  onChange={v => set('confirm', v)}
                  error={errors.confirm}
                />
                <div className="text-[13px] text-[var(--text-dim)] mt-1 flex justify-between items-center">
                  <span>Didn't receive code?</span>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={timer > 0 || loading}
                    className={`font-medium ${timer > 0 ? 'text-[var(--text-muted)] cursor-not-allowed' : 'text-[var(--brand-700)] hover:underline cursor-pointer'}`}
                  >
                    {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
                  </button>
                </div>
              </div>
            )}

            {mode === 'verify' && (
              <div className="flex flex-col gap-4">
                <div className="bg-[var(--brand-50)] text-[var(--brand-800)] p-4 rounded-[var(--r-md)] border border-[var(--brand-200)] text-[13px] mb-2">
                  We've sent a 6-digit verification code to <strong>{data.email}</strong>
                </div>
                <Field
                  label="Verification Code (OTP)"
                  type="text"
                  value={data.otp}
                  onChange={v => set('otp', v)}
                  hint="Enter the 6-digit code to continue."
                  error={errors.otp}
                />
                <div className="text-[13px] text-[var(--text-dim)] mt-2">
                  Didn't receive the code?{' '}
                  <button
                    onClick={handleResend}
                    disabled={timer > 0 || loading}
                    className={`font-medium ${timer > 0 ? 'text-[var(--text-muted)] cursor-not-allowed' : 'text-[var(--brand-700)] hover:underline cursor-pointer'}`}
                  >
                    {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
                  </button>
                </div>
              </div>
            )}

            {backendError && (
              <div className="mt-5 p-3 rounded-[var(--r-md)] bg-red-50 border border-red-200 text-red-600 text-[13px] font-medium">
                {backendError}
              </div>
            )}

            {/* Buttons */}
            <div className="flex items-center gap-3 mt-auto pt-6">
              {step > 1 && mode === 'signup' && (
                <button
                  type="button"
                  className="btn btn-outline h-[46px] px-6 text-[14px] font-semibold cursor-pointer shrink-0 flex items-center justify-center"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </button>
              )}

              {mode === 'signup' && step < TOTAL && (
                <button
                  type="submit"
                  className="btn btn-primary h-[46px] px-6 text-[14px] font-semibold cursor-pointer flex items-center justify-center gap-1.5 ml-auto disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={checkingEmail}
                >
                  {checkingEmail ? 'Checking...' : (
                    <>Continue <Icon name="arrow" size={14} /></>
                  )}
                </button>
              )}

              {mode === 'signup' && step === TOTAL && (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary h-[46px] flex-1 text-[14px] font-semibold flex items-center justify-center disabled:opacity-70 cursor-pointer"
                >
                  {loading ? 'Processing...' : 'Join Community'}
                </button>
              )}

              {mode === 'login' && (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary h-[46px] w-full text-[14px] font-semibold flex items-center justify-center disabled:opacity-70 cursor-pointer"
                >
                  {loading ? 'Processing...' : 'Sign in to Community'}
                </button>
              )}

              {mode === 'forgot-password' && (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary h-[46px] w-full text-[14px] font-semibold flex items-center justify-center disabled:opacity-70 cursor-pointer"
                >
                  {loading ? 'Sending Code...' : 'Send Reset Code to Email'}
                </button>
              )}
              {mode === 'reset-password' && (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary h-[46px] w-full text-[14px] font-semibold flex items-center justify-center disabled:opacity-70 cursor-pointer"
                >
                  {loading ? 'Resetting Password...' : 'Reset Password & Sign In'}
                </button>
              )}
              {mode === 'verify' && (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary h-[46px] w-full text-[14px] font-semibold flex items-center justify-center disabled:opacity-70 cursor-pointer"
                >
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                </button>
              )}
            </div>
            {mode === 'login' && (
              <div className="p-3.5 mt-5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 mb-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] font-semibold text-[#0073c4] flex items-center gap-1.5">
                    Quick Demo Login
                  </span>
                  {/* <span className="text-[10px] bg-[#0096FF]/10 text-[#0096FF] font-semibold px-2 py-0.5 rounded-full border border-[#0096FF]/20">
                      1-Click Access
                    </span> */}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoLogin("demo@egrowth.com", "password123")}
                    disabled={loading}
                    className="py-2 px-3 rounded-lg bg-white border border-blue-200/80 text-[12px] font-semibold text-slate-700 hover:bg-[#0096FF] hover:text-white hover:border-[#0096FF] transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    Demo login
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoLogin("pushpender@egrowth.com", "password123")}
                    disabled={loading}
                    className="py-2 px-3 rounded-lg bg-white border border-blue-200/80 text-[12px] font-semibold text-slate-700 hover:bg-[#0096FF] hover:text-white hover:border-[#0096FF] transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    admin login
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* SSO */}

        </div>
      </div>
    </div>
  );
}

function SSOBtn({ label }) {
  return (
    <button className="btn btn-outline justify-center py-2 px-3 text-[13px] cursor-pointer">
      {label}
    </button>
  );
}

function BrandStat({ n, l }) {
  return (
    <div className="p-3.5 rounded-[var(--r-md)] bg-white/5 border border-white/10">
      <div className="mono text-[22px] font-bold text-white">{n}</div>
      <div className="text-[11px] opacity-70 uppercase tracking-wider mt-1">{l}</div>
    </div>
  );
}



function Field({ label, value, onChange, type = 'text', hint, suffix, error, success, maxLength, inputMode, onKeyDown }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = type === 'password';

  return (
    <div>
      <div className="text-[13px]   text-[var(--text)] mb-1.5">{label}</div>
      <div className="relative">

        <input
          type={isPassword && passwordVisible ? 'text' : type}
          inputMode={inputMode}
          maxLength={maxLength}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className={`w-full py-2.5 px-3.5 rounded-[var(--r-md)] border ${error
            ? 'border-red-500 focus:border-red-600'
            : success
              ? 'border-emerald-500 focus:border-emerald-600 bg-emerald-50/10'
              : 'border-[var(--border)] focus:border-[var(--brand-500)]'
            } bg-[var(--bg-raised)] text-[14px] text-[var(--text)] outline-none transition-all duration-150`}
          style={{ paddingRight: (isPassword || success) ? 44 : suffix ? 70 : 14 }}
        />
        {success ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-emerald-500 bg-emerald-50 w-6 h-6 rounded-full border border-emerald-200 shadow-2xs">
            <svg className="w-3.5 h-3.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : isPassword ? (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center text-[var(--text-dim)] hover:text-[var(--brand-700)]"
            onClick={() => setPasswordVisible(visible => !visible)}
            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
            aria-pressed={passwordVisible}
          >
            <Icon name={passwordVisible ? "eyeOff" : "eye"} size={18} />
          </button>
        ) : null}
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-[var(--text-dim)] font-medium">
            {suffix}
          </span>
        )}
      </div>
      {error && <div className="text-[11px] text-red-500 mt-1">{error}</div>}
      {!error && hint && <div className="text-[11px] text-[var(--text-dim)] mt-1">{hint}</div>}
    </div>
  );
}

// Bind to window for compatibility with non-migrated parts
// Window globals removed from AuthPage.jsx
