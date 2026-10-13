"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Phone,
  Mail,
  Lock,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  KeyRound,
  RotateCcw,
  UserPlus,
  LogIn,
} from "lucide-react";
import { useAuth, AuthMode } from "@/context/auth-context";

export function AuthModal() {
  const router = useRouter();
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalReason,
    authModalRedirect,
    authModalDefaultMode,
    signInWithEmail,
    signUpWithEmail,
    signInWithOtp,
    signUpWithOtp,
    verifyOtp,
    checkUserExists,
    loginAsDemoGuest,
    loginAsDemoAdmin,
  } = useAuth();

  // Primary Mode: "login" (Existing User) vs "signup" (Create Account)
  const [authMode, setAuthMode] = React.useState<AuthMode>("login");

  // Method: Phone OTP vs Email
  const [authMethod, setAuthMethod] = React.useState<"phone" | "email">("phone");

  // Phone Form States
  const [phone, setPhone] = React.useState("");
  const [phoneName, setPhoneName] = React.useState("");
  const [phoneEmail, setPhoneEmail] = React.useState("");
  const [otpSent, setOtpSent] = React.useState(false);
  const [otpCode, setOtpCode] = React.useState("");
  const [generatedOtpHint, setGeneratedOtpHint] = React.useState<string | null>(null);

  // Email Form States
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [emailPhone, setEmailPhone] = React.useState("");

  // Loading & Feedback
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  // Initialize or reset form whenever modal opens
  React.useEffect(() => {
    if (isAuthModalOpen) {
      setAuthMode(authModalDefaultMode || "login");
      setErrorMessage(null);
      setSuccessMessage(null);
      setOtpSent(false);
      setOtpCode("");
      setGeneratedOtpHint(null);
    }
  }, [isAuthModalOpen, authModalDefaultMode]);

  // Handle escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handlePostAuthSuccess = () => {
    if (authModalRedirect) {
      router.push(authModalRedirect);
    }
  };

  // -------------------------------------------------------------
  // PHONE FLOW: SEND OTP (Login vs Signup)
  // -------------------------------------------------------------
  const handleSendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      if (authMode === "signup") {
        if (!phoneName.trim() || phoneName.trim().length < 2) {
          setIsLoading(false);
          setErrorMessage("Please enter your full name (minimum 2 characters).");
          return;
        }

        const res = await signUpWithOtp(phone, phoneName, phoneEmail);
        setIsLoading(false);
        if (res.error) {
          setErrorMessage(res.error);
        } else {
          setOtpSent(true);
          setGeneratedOtpHint(res.mockOtp || "123456");
          setSuccessMessage(`Registration OTP sent to +91 ${phone.replace(/[^0-9]/g, "").slice(-10)}`);
        }
      } else {
        // Log In Mode
        const res = await signInWithOtp(phone);
        setIsLoading(false);
        if (res.error) {
          setErrorMessage(res.error);
        } else {
          setOtpSent(true);
          setGeneratedOtpHint(res.mockOtp || "123456");
          const existing = checkUserExists(phone);
          if (existing) {
            setSuccessMessage(`Welcome back, ${existing.fullName}! OTP sent to +91 ${phone.slice(-10)}`);
          } else {
            setSuccessMessage(`Log in OTP sent to +91 ${phone.slice(-10)}`);
          }
        }
      }
    } catch {
      setIsLoading(false);
      setErrorMessage("Unable to send verification code. Please try again.");
    }
  };

  // -------------------------------------------------------------
  // PHONE FLOW: VERIFY OTP
  // -------------------------------------------------------------
  const handleVerifyPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const nameToUse = authMode === "signup" ? phoneName : undefined;
    const emailToUse = authMode === "signup" ? phoneEmail : undefined;

    const res = await verifyOtp(phone, otpCode, nameToUse, emailToUse);
    setIsLoading(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      handlePostAuthSuccess();
    }
  };

  // -------------------------------------------------------------
  // EMAIL FLOW: LOG IN
  // -------------------------------------------------------------
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const res = await signInWithEmail(email, password);
    setIsLoading(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      handlePostAuthSuccess();
    }
  };

  // -------------------------------------------------------------
  // EMAIL FLOW: CREATE ACCOUNT (SIGN UP)
  // -------------------------------------------------------------
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    const res = await signUpWithEmail(email, password, fullName, emailPhone);
    setIsLoading(false);

    if (res.error) {
      setErrorMessage(res.error);
    } else {
      handlePostAuthSuccess();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-[#181A22] border border-[#2B2E38] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* Luxury Champagne Gold Header Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#C5A880] via-[#D4AF37] to-[#C5A880]" />

        {/* Close Modal Button */}
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-[#222530] transition-colors focus:outline-none cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-7">
          {/* Main Title & Brand */}
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#222530] border border-[#2E3038] text-[#D4AF37] mb-2.5 shadow-inner">
              {authMode === "signup" ? (
                <UserPlus className="w-5 h-5 text-[#D4AF37]" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
              )}
            </div>
            <h2
              id="auth-modal-title"
              className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight"
            >
              {authMode === "signup" ? "Create Your Account" : "Log In to Your Account"}
            </h2>
            <p className="text-xs text-[#A1A1AA] mt-1 max-w-xs mx-auto">
              {authMode === "signup"
                ? "New guest? Register for instant 20% advance reservations."
                : "Welcome back! Enter your details to view your bookings."}
            </p>
          </div>

          {/* Context Reason Notice (e.g. Compulsory Sign-In During Booking) */}
          {authModalReason && (
            <div className="mb-4 p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-xs text-[#F5F5F7] flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#D4AF37] block">
                  Reservation Requirement
                </span>
                <span className="text-[11px] text-[#A1A1AA] block mt-0.5">
                  {authModalReason}
                </span>
              </div>
            </div>
          )}

          {/* Error and Success Alerts */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ========================================================= */}
          {/* PRIMARY SWITCHER: [ LOG IN ] vs [ CREATE ACCOUNT ]        */}
          {/* ========================================================= */}
          <div className="grid grid-cols-2 p-1 bg-[#12141C] border border-[#2B2E38] rounded-xl mb-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setAuthMode("login");
                setErrorMessage(null);
                setSuccessMessage(null);
                setOtpSent(false);
              }}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg transition-all cursor-pointer ${
                authMode === "login"
                  ? "bg-[#D4AF37] text-[#121316] font-bold shadow-sm"
                  : "text-[#A1A1AA] hover:text-white"
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("signup");
                setErrorMessage(null);
                setSuccessMessage(null);
                setOtpSent(false);
              }}
              className={`flex items-center justify-center gap-2 py-2 rounded-lg transition-all cursor-pointer ${
                authMode === "signup"
                  ? "bg-[#D4AF37] text-[#121316] font-bold shadow-sm"
                  : "text-[#A1A1AA] hover:text-white"
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Create Account</span>
            </button>
          </div>

          {/* ========================================================= */}
          {/* SECONDARY METHOD TABS: [ PHONE OTP ] vs [ EMAIL ]         */}
          {/* ========================================================= */}
          <div className="flex items-center justify-center gap-5 text-xs mb-4 text-[#A1A1AA] border-b border-[#262835] pb-2">
            <button
              type="button"
              onClick={() => {
                setAuthMethod("phone");
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`pb-1 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                authMethod === "phone"
                  ? "text-[#D4AF37] border-b-2 border-[#D4AF37]"
                  : "hover:text-white"
              }`}
            >
              <Phone className="w-3 h-3" />
              <span>Mobile Phone (OTP)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMethod("email");
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={`pb-1 font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                authMethod === "email"
                  ? "text-[#D4AF37] border-b-2 border-[#D4AF37]"
                  : "hover:text-white"
              }`}
            >
              <Mail className="w-3 h-3" />
              <span>Email & Password</span>
            </button>
          </div>

          {/* ========================================================= */}
          {/* FLOW A: PHONE NUMBER AUTH (Login or Signup via OTP)       */}
          {/* ========================================================= */}
          {authMethod === "phone" && (
            <div>
              {!otpSent ? (
                <form onSubmit={handleSendPhoneOtp} className="space-y-3.5 text-xs">
                  {/* Signup only: Ask for Full Name */}
                  {authMode === "signup" && (
                    <div>
                      <label className="block text-[11px] font-medium text-[#A1A1AA] mb-1.5">
                        Your Full Name <span className="text-[#D4AF37]">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Mohammed Faizan"
                          value={phoneName}
                          onChange={(e) => setPhoneName(e.target.value)}
                          className="w-full bg-[#12141C] border border-[#2B2E38] rounded-xl pl-9 pr-3 py-2.5 text-white text-xs placeholder:text-[#52525B] focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* 10-Digit Mobile Input */}
                  <div>
                    <label className="block text-[11px] font-medium text-[#A1A1AA] mb-1.5">
                      10-Digit Mobile Number <span className="text-[#D4AF37]">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#D4AF37] font-semibold border-r border-[#2B2E38] pr-2">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="98490 12345"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                        className="w-full bg-[#12141C] border border-[#2B2E38] rounded-xl pl-14 pr-3 py-2.5 text-white font-mono text-sm placeholder:text-[#52525B] focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Signup only: Optional Email for receipts */}
                  {authMode === "signup" && (
                    <div>
                      <label className="block text-[11px] font-medium text-[#A1A1AA] mb-1.5">
                        Email Address <span className="text-[#71717A]">(Optional, for booking vouchers)</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                        <input
                          type="email"
                          placeholder="faizan.m@gmail.com"
                          value={phoneEmail}
                          onChange={(e) => setPhoneEmail(e.target.value)}
                          className="w-full bg-[#12141C] border border-[#2B2E38] rounded-xl pl-9 pr-3 py-2.5 text-white text-xs placeholder:text-[#52525B] focus:border-[#D4AF37] focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || phone.length < 10}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-bold text-xs transition-all shadow-md shadow-[#D4AF37]/20 disabled:opacity-50 cursor-pointer"
                  >
                    <span>
                      {isLoading
                        ? "Sending OTP..."
                        : authMode === "signup"
                        ? "Send OTP & Create Account"
                        : "Send Log In OTP"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                /* Step 2: Verify OTP */
                <form onSubmit={handleVerifyPhoneOtp} className="space-y-3.5 text-xs">
                  <div className="p-3 rounded-xl bg-[#1C1F28] border border-[#2E3038] text-[11px] text-[#A1A1AA] flex items-center justify-between">
                    <div>
                      <span>Dispatched to: </span>
                      <span className="font-mono font-bold text-white block mt-0.5">
                        +91 {phone.slice(-10)}
                      </span>
                    </div>
                    {generatedOtpHint && (
                      <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#D4AF37]/15 text-[#D4AF37] font-semibold border border-[#D4AF37]/30">
                        OTP: {generatedOtpHint}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#A1A1AA] mb-1.5">
                      Enter 6-Digit Verification Code
                    </label>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="Enter 6-digit code"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
                        className="w-full bg-[#12141C] border border-[#2B2E38] rounded-xl pl-9 pr-3 py-2.5 text-center font-mono text-base tracking-[0.3em] text-[#D4AF37] font-bold placeholder:text-[#52525B] focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[11px] text-[#A1A1AA] hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Change Mobile</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOtpCode(generatedOtpHint || "123456")}
                      className="text-[11px] text-[#D4AF37] hover:underline font-semibold cursor-pointer"
                    >
                      Auto-Fill OTP
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || otpCode.length < 4}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-bold text-xs transition-all shadow-md shadow-[#D4AF37]/20 disabled:opacity-50 cursor-pointer"
                  >
                    <span>
                      {isLoading
                        ? "Verifying..."
                        : authMode === "signup"
                        ? "Verify OTP & Complete Registration"
                        : "Verify OTP & Log In"}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* FLOW B: EMAIL & PASSWORD AUTH (Login or Signup)           */}
          {/* ========================================================= */}
          {authMethod === "email" && (
            <div>
              {authMode === "login" ? (
                /* Email Log In Form */
                <form onSubmit={handleEmailSignIn} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-medium text-[#A1A1AA] mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#12141C] border border-[#2B2E38] rounded-xl pl-9 pr-3 py-2 text-white text-xs placeholder:text-[#52525B] focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#A1A1AA] mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#71717A]" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#12141C] border border-[#2B2E38] rounded-xl pl-9 pr-3 py-2 text-white text-xs placeholder:text-[#52525B] focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-bold text-xs transition-all shadow-md shadow-[#D4AF37]/20 disabled:opacity-50 cursor-pointer"
                  >
                    <span>{isLoading ? "Signing in..." : "Log In to FLATEL"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                /* Email Create Account Form */
                <form onSubmit={handleEmailSignUp} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-medium text-[#A1A1AA] mb-1">
                      Full Name <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Ayesha Siddiqui"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#12141C] border border-[#2B2E38] rounded-xl px-3 py-2 text-white text-xs placeholder:text-[#52525B] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-[#A1A1AA] mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="98490 12345"
                        value={emailPhone}
                        onChange={(e) => setEmailPhone(e.target.value)}
                        className="w-full bg-[#12141C] border border-[#2B2E38] rounded-xl px-3 py-2 text-white text-xs placeholder:text-[#52525B] focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#A1A1AA] mb-1">
                        Email Address <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#12141C] border border-[#2B2E38] rounded-xl px-3 py-2 text-white text-xs placeholder:text-[#52525B] focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#A1A1AA] mb-1">
                      Set Password (Min 6 Characters) <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#12141C] border border-[#2B2E38] rounded-xl px-3 py-2 text-white text-xs placeholder:text-[#52525B] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-bold text-xs transition-all shadow-md shadow-[#D4AF37]/20 disabled:opacity-50 cursor-pointer"
                  >
                    <span>{isLoading ? "Creating Account..." : "Create Account & Continue"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* BOTTOM ALTERNATIVE TOGGLE LINK                            */}
          {/* ========================================================= */}
          <div className="mt-4 pt-3 border-t border-[#262835] text-center text-xs text-[#A1A1AA]">
            {authMode === "login" ? (
              <p>
                Don&apos;t have an account yet?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("signup");
                    setErrorMessage(null);
                    setSuccessMessage(null);
                    setOtpSent(false);
                  }}
                  className="text-[#D4AF37] font-semibold hover:underline ml-1 cursor-pointer"
                >
                  Create an Account
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setErrorMessage(null);
                    setSuccessMessage(null);
                    setOtpSent(false);
                  }}
                  className="text-[#D4AF37] font-semibold hover:underline ml-1 cursor-pointer"
                >
                  Log In here
                </button>
              </p>
            )}
          </div>

          {/* ========================================================= */}
          {/* INSTANT DEMO EVALUATION SHORTCUTS                         */}
          {/* ========================================================= */}
          <div className="mt-4 pt-3 border-t border-[#262835]/60">
            <span className="text-[10px] uppercase font-semibold text-[#71717A] tracking-wider block text-center mb-2">
              Instant One-Click Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  loginAsDemoGuest();
                  handlePostAuthSuccess();
                }}
                className="py-1.5 px-2 rounded-lg bg-[#222530] hover:bg-[#2A2E3B] text-[#A1A1AA] hover:text-white text-[11px] font-semibold border border-[#2E3038] transition-colors cursor-pointer"
              >
                Guest Demo (Faizan)
              </button>
              <button
                type="button"
                onClick={() => {
                  loginAsDemoAdmin();
                  handlePostAuthSuccess();
                }}
                className="py-1.5 px-2 rounded-lg bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] text-[11px] font-semibold border border-[#D4AF37]/30 transition-colors cursor-pointer"
              >
                Admin (reservation@flatel.in)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
