"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  CreditCard,
  Building,
  Calendar as CalendarIcon,
  Users,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle2,
  Lock,
  ArrowLeft,
  ChevronRight,
  Info,
  Phone,
  Sparkles,
  User,
} from "lucide-react";
import { getRoomById, PURPOSE_PACKAGES, ALL_MASTER_ADDONS } from "@/lib/mock-rooms";
import { getBranchBySlug, BRAND_NAME, CONTACT_PHONE } from "@/lib/constants";
import { calculateFlatelPrice, FareCalculationResult } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";

export function CheckoutView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, openAuthModal } = useAuth();

  // Extract URL parameters (support both canonical and alias parameters)
  const propertySlug = searchParams.get("property") || searchParams.get("roomId") || "1bhk";
  const checkInParam = searchParams.get("checkIn") || "";
  const checkOutParam = searchParams.get("checkOut") || "";
  const adultsParam = parseInt(searchParams.get("adults") || "2", 10);
  const kidsParam = parseInt(searchParams.get("kids") || searchParams.get("children") || "0", 10);
  const rawPurpose = searchParams.get("purpose");
  const purposeParam:
    | "medical"
    | "wedding"
    | "tourism"
    | "corporate"
    | "family"
    | "accommodation_only" =
    rawPurpose && ["medical", "wedding", "tourism", "corporate", "family"].includes(rawPurpose)
      ? (rawPurpose as "medical" | "wedding" | "tourism" | "corporate" | "family")
      : "accommodation_only";
  const addonsParam = searchParams.get("addons") || "";

  const room = getRoomById(propertySlug);
  const branch = room?.branchSlug ? getBranchBySlug(room.branchSlug) : undefined;

  // Dynamic add-ons state (allows removing/editing optional services without leaving checkout)
  const [activeAddonIds, setActiveAddonIds] = React.useState<string[]>(() => {
    if (!addonsParam) return [];
    return addonsParam.split(",").filter(Boolean);
  });

  const handleRemoveAddon = (idToRemove: string) => {
    setActiveAddonIds((prev) => prev.filter((id) => id !== idToRemove));
  };

  // Form State
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [specialRequests, setSpecialRequests] = React.useState("");
  const [isInternational, setIsInternational] = React.useState(false);
  const [agreeTerms, setAgreeTerms] = React.useState(true);

  // Automatically populate verified guest details when authenticated
  React.useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        if (!fullName && user.fullName) setFullName(user.fullName);
        if (!email && user.email && !user.email.includes("@guest.flatel.in")) setEmail(user.email);
        if (!phone && user.phone) setPhone(user.phone);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [user, fullName, email, phone]);

  // Validation errors
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  // Sandbox / Test Payment Modal State
  const [sandboxModalOpen, setSandboxModalOpen] = React.useState(false);
  const [pendingBookingId, setPendingBookingId] = React.useState<string | null>(null);
  const [pendingOrderId, setPendingOrderId] = React.useState<string | null>(null);
  const [advanceAmount, setAdvanceAmount] = React.useState<number>(0);

  // Dates and night calculation
  const { nights, checkInDateStr, checkOutDateStr, areDatesValid } = React.useMemo(() => {
    if (!checkInParam || !checkOutParam) {
      return {
        nights: 2,
        checkInDateStr: "",
        checkOutDateStr: "",
        areDatesValid: false,
      };
    }
    const dIn = new Date(checkInParam);
    const dOut = new Date(checkOutParam);
    if (isNaN(dIn.getTime()) || isNaN(dOut.getTime()) || dOut <= dIn) {
      return {
        nights: 2,
        checkInDateStr: "",
        checkOutDateStr: "",
        areDatesValid: false,
      };
    }
    const diff = Math.round((dOut.getTime() - dIn.getTime()) / (24 * 3600 * 1000));
    return {
      nights: Math.max(1, diff),
      checkInDateStr: checkInParam,
      checkOutDateStr: checkOutParam,
      areDatesValid: true,
    };
  }, [checkInParam, checkOutParam]);

  // Edit URL to navigate back preserving parameters
  const editUrl = React.useMemo(() => {
    const params = new URLSearchParams();
    if (checkInDateStr) params.set("checkIn", checkInDateStr);
    if (checkOutDateStr) params.set("checkOut", checkOutDateStr);
    params.set("adults", adultsParam.toString());
    if (kidsParam > 0) params.set("kids", kidsParam.toString());
    if (purposeParam && purposeParam !== "accommodation_only") {
      params.set("purpose", purposeParam);
    }
    if (activeAddonIds.length > 0) params.set("addons", activeAddonIds.join(","));
    return `/properties/${room?.slug || propertySlug}?${params.toString()}`;
  }, [checkInDateStr, checkOutDateStr, adultsParam, kidsParam, purposeParam, activeAddonIds, room?.slug, propertySlug]);

  // Pricing Calculation
  // Add-ons list
  const allAvailableAddons = React.useMemo(() => ALL_MASTER_ADDONS, []);
  const selectedAddonList = React.useMemo(() => {
    if (activeAddonIds.length === 0) return [];
    return activeAddonIds.map((id) => {
      const match = allAvailableAddons.find((a) => a.id === id);
      if (match && typeof match.price === "number") {
        return {
          id: match.id,
          name: match.name,
          price: match.price,
          pricingType: match.pricingType === "per_night" ? ("per_night" as const) : ("per_booking" as const),
        };
      }
      return { id, name: id, price: 0, pricingType: "flat" as const };
    });
  }, [activeAddonIds, allAvailableAddons]);

  const fareResult: FareCalculationResult = React.useMemo(() => {
    if (!room) {
      return {
        nights: 1,
        standardBaseRent: 0,
        discountRate: 0,
        baseRentDiscount: 0,
        baseRent: 0,
        extraAdults: 0,
        extraGuestsTotal: 0,
        addonsTotal: 0,
        grossTotal: 0,
        advancePayable: 0,
        balanceDueOnArrival: 0,
      };
    }

    return calculateFlatelPrice({
      nights,
      basePricePerNight: room.basePricePerNight,
      baseAdults: room.baseAdults,
      selectedAdults: adultsParam,
      selectedKids: kidsParam,
      extraPersonFee: room.extraPersonFeePerNight,
      selectedPaidAddons: selectedAddonList.filter((a) => a.price > 0),
    });
  }, [room, nights, adultsParam, kidsParam, selectedAddonList]);

  // Validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      newErrors.fullName = "Please enter your full name (at least 3 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Clean phone validation (Indian 10-digit or valid international format)
    const cleanPhone = phone.replace(/[^0-9+]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = "Please enter a valid 10-digit mobile number for WhatsApp updates.";
    }

    if (!agreeTerms) {
      newErrors.terms = "You must accept the reservation and cancellation policy.";
    }

    if (!areDatesValid) {
      newErrors.dates = "Please select valid check-in and check-out dates.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission: Create booking intent & initiate payment
  const handleProceedToPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Compulsory Authentication Check
    if (!user) {
      openAuthModal("Sign-in is compulsory to confirm your reservation and receive your digital voucher.");
      return;
    }

    if (!validateForm()) return;
    if (!room) return;

    setIsSubmitting(true);

    try {
      // 1. Create Booking Intent on Server
      const res = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unitId: room.slug,
          checkInDate: checkInDateStr,
          checkOutDate: checkOutDateStr,
          adultsCount: adultsParam,
          kidsCount: kidsParam,
          stayPurpose: purposeParam,
          selectedAddons: selectedAddonList.map((a) => ({
            id: a.id,
            name: a.name,
            price: a.price,
            pricingType: a.pricingType,
          })),
          guest: {
            fullName,
            email,
            phone,
            specialRequests,
            isInternational,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create booking reservation.");
      }

      setPendingBookingId(data.bookingId);
      setPendingOrderId(data.orderId);
      setAdvanceAmount(data.advancePayable);

      // Check if test mode or live Razorpay
      if (data.isTestMode) {
        // Open transparent sandbox test payment modal
        setSandboxModalOpen(true);
      } else {
        // Live Razorpay Integration
        const options = {
          key: data.keyId,
          amount: data.advancePayable * 100,
          currency: "INR",
          name: BRAND_NAME,
          description: `20% Advance Booking Deposit for ${room.title}`,
          order_id: data.orderId,
          prefill: {
            name: fullName,
            email: email,
            contact: phone,
          },
          theme: {
            color: "#D4AF37",
          },
          handler: async function (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature?: string }) {
            await handleVerifyPayment(
              data.bookingId,
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
              false
            );
          },
        };

        // Check if Razorpay script loaded
        const win = window as unknown as { Razorpay?: new (opts: Record<string, unknown>) => { open: () => void } };
        if (typeof win.Razorpay !== "undefined") {
          const rzp = new win.Razorpay(options);
          rzp.open();
        } else {
          // If script not in window, open sandbox modal as fallback
          setSandboxModalOpen(true);
        }
      }
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Payment Verification Handler
  const handleVerifyPayment = async (
    bookingId: string,
    orderId: string,
    paymentId: string,
    signature?: string,
    isSandbox = false
  ) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/bookings/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookingId,
          orderId,
          paymentId,
          signature,
          isSandbox,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Payment verification failed.");
      }

      // Redirect to confirmed digital voucher page
      router.push(data.redirectUrl);
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Failed to confirm payment.");
      setIsSubmitting(false);
    }
  };

  if (!room) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center text-[#F5F5F7]">
        <h1 className="text-2xl font-semibold">Property Not Found</h1>
        <p className="mt-2 text-sm text-[#A1A1AA]">
          Please return to our flats listing to select a verified residence.
        </p>
        <Link
          href="/#flats"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#121316] font-semibold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>View Residences</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#121316] text-[#F5F5F7] pb-24 selection:bg-[#D4AF37]/20 selection:text-[#D4AF37]">
      {/* 1. BREADCRUMB */}
      <nav
        aria-label="Breadcrumb"
        className="w-full border-b border-[#2E3038] bg-[#121316]/95 py-3 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl flex items-center gap-2 text-xs text-[#A1A1AA]">
          <Link href="/" className="hover:text-[#F5F5F7] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-[#2E3038]" />
          <Link href={`/properties/${room.slug}`} className="hover:text-[#F5F5F7] transition-colors truncate">
            {room.title}
          </Link>
          <ChevronRight className="h-3 w-3 text-[#2E3038]" />
          <span className="text-[#F5F5F7] font-medium">Secure Checkout</span>
        </div>
      </nav>

      {/* 2. 3-STEP PROGRESS INDICATOR */}
      <div className="w-full border-b border-[#2E3038]/60 bg-[#121316]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between max-w-lg mx-auto text-xs">
            <Link
              href={editUrl}
              className="flex items-center gap-2 group cursor-pointer"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                ✓
              </span>
              <span className="text-[#A1A1AA] group-hover:text-[#F5F5F7] transition-colors font-medium">
                1. Flat & Dates
              </span>
            </Link>
            <span className="text-[#2E3038]">→</span>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#121316] flex items-center justify-center text-[10px] font-bold">
                2
              </span>
              <span className="text-[#D4AF37] font-semibold">
                2. Review & Details
              </span>
            </div>
            <span className="text-[#2E3038]">→</span>
            <div className="flex items-center gap-2 opacity-50">
              <span className="w-5 h-5 rounded-full bg-[#1C1E24] border border-[#2E3038] text-[#A1A1AA] flex items-center justify-center text-[10px] font-bold">
                3
              </span>
              <span className="text-[#A1A1AA]">
                3. Confirmation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Checkout Container */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        {/* Page Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1E24] border border-[#2E3038] mb-2.5">
            <Lock className="w-3 h-3 text-[#D4AF37]" />
            <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider text-[#C5A880] uppercase">
              256-BIT ENCRYPTED BOOKING
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold text-[#F5F5F7] tracking-tight">
            Confirm Your Reservation
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-[#A1A1AA]">
            Review your stay details, provide guest credentials, and secure your flat with a 20% advance deposit.
          </p>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ======================================================== */}
          {/* LEFT COLUMN: Guest Information & Compliance Notice        */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 space-y-6">
            {/* MANDATORY GOVERNMENT ID NOTICE */}
            <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#1C1E24] p-4 sm:p-5 flex items-start gap-3.5 shadow-lg">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs sm:text-[13px] leading-relaxed">
                <span className="font-semibold text-[#F5F5F7] block">
                  Mandatory Photo Identification Requirement
                </span>
                <p className="text-[#A1A1AA]">
                  Domestic guests must present an original government-issued photo ID for each adult (Aadhaar / Driving License / Voter ID). International guests must present an original physical passport or valid official international travel document.
                </p>
              </div>
            </div>

            {/* Server Error Alert */}
            {serverError && (
              <div className="rounded-2xl border border-rose-500/50 bg-rose-500/10 p-4 text-xs sm:text-sm text-rose-300 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-semibold block">Booking Error</span>
                  <p className="mt-0.5 text-rose-200">{serverError}</p>
                </div>
              </div>
            )}

            {/* Guest Form */}
            <form onSubmit={handleProceedToPayment} className="rounded-2xl border border-[#2E3038] bg-[#1C1E24] p-5 sm:p-7 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2E3038] pb-3.5">
                <h2 className="font-heading text-lg sm:text-xl font-semibold text-[#F5F5F7]">
                  Guest Contact Details
                </h2>
                {!user ? (
                  <button
                    type="button"
                    onClick={() => openAuthModal("Sign in to auto-fill verified contact details.")}
                    className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:underline font-semibold"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Sign In to Auto-Fill</span>
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Guest: {user.fullName.split(" ")[0]}</span>
                  </div>
                )}
              </div>

              {/* Compulsory Sign-In Banner if Not Authenticated */}
              {!user && (
                <div className="p-3.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-[#D4AF37] block">Guest Account Required</span>
                    <span className="text-[11px] text-[#A1A1AA] block mt-0.5">
                      Sign in with phone OTP or email to finalize reservation.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openAuthModal("Sign in to complete your reservation.")}
                    className="px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-bold text-xs shrink-0 cursor-pointer"
                  >
                    Sign In Now
                  </button>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-1.5">
                  Full Guest Name <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                  }}
                  placeholder="e.g. Mohammed Farooq"
                  className={cn(
                    "w-full h-11 px-3.5 rounded-xl bg-[#121316] border text-sm text-[#F5F5F7] placeholder-[#A1A1AA]/50 focus:outline-none focus:ring-1 transition-colors",
                    errors.fullName
                      ? "border-rose-500 focus:ring-rose-500"
                      : "border-[#2E3038] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                  )}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-rose-400">{errors.fullName}</p>
                )}
              </div>

              {/* Contact Grid: Phone + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* WhatsApp Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-1.5">
                    WhatsApp Phone Number <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                    placeholder="+91 98765 43210"
                    className={cn(
                      "w-full h-11 px-3.5 rounded-xl bg-[#121316] border text-sm text-[#F5F5F7] placeholder-[#A1A1AA]/50 focus:outline-none focus:ring-1 transition-colors font-mono",
                      errors.phone
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-[#2E3038] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                    )}
                  />
                  {errors.phone ? (
                    <p className="mt-1 text-xs text-rose-400">{errors.phone}</p>
                  ) : (
                    <p className="mt-1 text-[11px] text-[#A1A1AA]/70">Digital voucher will be dispatched here.</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-1.5">
                    Email Address <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    placeholder="guest@example.com"
                    className={cn(
                      "w-full h-11 px-3.5 rounded-xl bg-[#121316] border text-sm text-[#F5F5F7] placeholder-[#A1A1AA]/50 focus:outline-none focus:ring-1 transition-colors",
                      errors.email
                        ? "border-rose-500 focus:ring-rose-500"
                        : "border-[#2E3038] focus:border-[#D4AF37] focus:ring-[#D4AF37]"
                    )}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-400">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* International Guest Checkbox */}
              <div className="pt-2 border-t border-[#2E3038]">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isInternational}
                    onChange={(e) => setIsInternational(e.target.checked)}
                    className="w-4 h-4 rounded border-[#2E3038] bg-[#121316] text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  <span className="text-xs text-[#A1A1AA]">
                    I am an International Guest (Original physical passport & visa required at check-in)
                  </span>
                </label>
              </div>

              {/* Special Requests */}
              <div className="pt-2 border-t border-[#2E3038]">
                <label htmlFor="specialRequests" className="block text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] mb-1.5">
                  Special Requests / Arrival Notes (Optional)
                </label>
                <textarea
                  id="specialRequests"
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Expected arrival time around 12:30 PM, elderly patient requiring wheelchair assistance"
                  className="w-full p-3 rounded-xl bg-[#121316] border border-[#2E3038] text-sm text-[#F5F5F7] placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors resize-none"
                />
              </div>

              {/* Mandatory Guest Verification Notice (PRD Section 2.5 & 7.4) */}
              <div className="pt-3 border-t border-[#2E3038]">
                <div className="p-3.5 rounded-xl bg-[#121316] border border-[#2E3038] space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>Mandatory Photo Identification at Check-In</span>
                  </div>
                  <p className="text-[#A1A1AA] leading-relaxed pl-6">
                    • <strong>Domestic / Indian Guests:</strong> Mandatory original government photo identity document per adult (e.g., Aadhaar, Driver&apos;s License, Voter ID, or Passport).
                  </p>
                  <p className="text-[#A1A1AA] leading-relaxed pl-6">
                    • <strong>International Guests:</strong> Mandatory original physical Passport or valid official international travel document.
                  </p>
                </div>
              </div>

              {/* Cancellation Terms Agreement */}
              <div className="pt-3 border-t border-[#2E3038] space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 rounded border-[#2E3038] bg-[#121316] text-[#D4AF37] focus:ring-[#D4AF37] mt-0.5"
                  />
                  <span className="text-xs text-[#A1A1AA] leading-relaxed">
                    I acknowledge that the <strong>20% advance booking deposit</strong> is fully refundable if cancelled at least 48 hours prior to check-in, and non-refundable within 48 hours. The remaining <strong>80% balance</strong> is payable at the property upon arrival.
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-xs text-rose-400">{errors.terms}</p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-13 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-semibold text-sm sm:text-base tracking-wide transition-all shadow-xl active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? "Processing Reservation..."
                      : `Pay 20% Advance · ₹${fareResult.advancePayable.toLocaleString("en-IN")}`}
                  </span>
                </Button>
                <p className="mt-2 text-center text-[11px] text-[#A1A1AA]/70">
                  Remaining ₹{fareResult.balanceDueOnArrival.toLocaleString("en-IN")} (80%) payable at check-in by Cash or UPI.
                </p>
              </div>
            </form>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Reservation Summary & Pricing Split        */}
          {/* (Shown first on mobile for immediate context, sidebar on desktop) */}
          {/* ======================================================== */}
          <div className="order-first lg:order-last lg:col-span-5 space-y-5">
            <div className="rounded-2xl border border-[#2E3038] bg-[#1C1E24] p-5 sm:p-6 space-y-5 shadow-xl">
              <h2 className="font-heading text-lg font-semibold text-[#F5F5F7] border-b border-[#2E3038] pb-3">
                Booking Summary
              </h2>

              {/* Property & Branch */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-sans font-semibold tracking-wider uppercase text-[#D4AF37] px-2 py-0.5 rounded bg-[#121316] border border-[#2E3038]">
                    {room.type}
                  </span>
                  {branch && (
                    <span className="text-[10px] text-[#C5A880] font-medium">
                      {branch.name} Branch
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-xl font-semibold text-[#F5F5F7] pt-1">
                  {room.title}
                </h3>
                {branch && (
                  <p className="text-xs text-[#A1A1AA] flex items-start gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </p>
                )}
              </div>

              {/* Schedule Info */}
              <div className="rounded-xl bg-[#121316] border border-[#2E3038] p-3.5 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A1A1AA] block">
                    Check-In (11 AM–1 PM)
                  </span>
                  <span className="font-medium text-[#F5F5F7] mt-0.5 block">
                    {checkInDateStr || "Not selected"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A1A1AA] block">
                    Check-Out (11 AM sharp)
                  </span>
                  <span className="font-medium text-[#F5F5F7] mt-0.5 block">
                    {checkOutDateStr || "Not selected"}
                  </span>
                </div>
              </div>

              {/* Duration & Occupancy */}
              <div className="flex items-center justify-between text-xs text-[#A1A1AA] pt-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{nights} {nights === 1 ? "Night" : "Nights"} Duration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>
                    {adultsParam} Adults {kidsParam > 0 ? `· ${kidsParam} Kids` : ""}
                  </span>
                </div>
              </div>

              {/* Edit Dates / Guests Action */}
              <div className="flex items-center justify-end pt-0.5">
                <Link
                  href={editUrl}
                  className="text-[11px] text-[#D4AF37] hover:underline font-medium inline-flex items-center gap-1"
                >
                  <span>Edit dates, guests or flat</span>
                  <span>→</span>
                </Link>
              </div>

              {/* Stay Purpose / Accommodation Only Summary */}
              <div className="pt-2 border-t border-[#2E3038] flex items-center justify-between text-xs">
                <span className="text-[#A1A1AA]">Stay Focus</span>
                <span className="font-medium text-[#C5A880]">
                  {purposeParam === "accommodation_only"
                    ? "Standard Accommodation"
                    : purposeParam === "medical"
                    ? "Medistay (Hospital & Medical)"
                    : purposeParam === "wedding"
                    ? "Wedding Stay (Guests & Events)"
                    : purposeParam === "family"
                    ? "Family Vacation & Long Stay"
                    : purposeParam === "tourism"
                    ? "Wanderer (Heritage & Tourism)"
                    : "Corporate & Executive Stay"}
                </span>
              </div>

              {/* Itemized Optional Services with Quick Remove */}
              {selectedAddonList.length > 0 && (
                <div className="pt-3 border-t border-[#2E3038] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#F5F5F7]">
                      Selected Services ({selectedAddonList.length})
                    </span>
                    <Link href={editUrl} className="text-[11px] text-[#D4AF37] hover:underline">
                      + Modify
                    </Link>
                  </div>
                  <div className="space-y-1.5">
                    {selectedAddonList.map((addon) => {
                      const addonPriceCalc =
                        addon.pricingType === "per_night" ? addon.price * nights : addon.price;
                      return (
                        <div
                          key={addon.id}
                          className="flex items-center justify-between text-xs bg-[#121316] border border-[#2E3038] rounded-lg px-2.5 py-1.5"
                        >
                          <div className="flex-1 min-w-0 pr-2">
                            <span className="text-[#F5F5F7] block truncate">{addon.name}</span>
                            <span className="text-[10px] text-[#A1A1AA]">
                              ₹{addon.price.toLocaleString("en-IN")}
                              {addon.pricingType === "per_night" ? `/night (${nights}N)` : " (flat)"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[#F5F5F7] font-mono text-xs">
                              ₹{addonPriceCalc.toLocaleString("en-IN")}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveAddon(addon.id)}
                              className="text-[#A1A1AA] hover:text-rose-400 p-1 transition-colors text-xs font-bold cursor-pointer"
                              title={`Remove ${addon.name}`}
                              aria-label={`Remove ${addon.name}`}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Fare Breakdown */}
              <div className="pt-3 border-t border-[#2E3038] space-y-2 text-xs">
                {/* Standard Base Rent */}
                <div className="flex justify-between text-[#A1A1AA]">
                  <span>
                    Base Rent ({nights}N @ ₹{room.basePricePerNight.toLocaleString("en-IN")})
                  </span>
                  <span className="text-[#F5F5F7] font-mono">
                    ₹{fareResult.standardBaseRent.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Duration Discount if applicable */}
                {fareResult.baseRentDiscount > 0 && (
                  <div className="flex justify-between text-[#C5A880]">
                    <span>Duration Discount ({Math.round(fareResult.discountRate * 100)}%)</span>
                    <span className="font-mono">
                      -₹{fareResult.baseRentDiscount.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                {/* Extra Adult Charges */}
                {fareResult.extraGuestsTotal > 0 && (
                  <div className="flex justify-between text-[#A1A1AA]">
                    <span>
                      Extra Adult Fee ({fareResult.extraAdults} adults @ ₹500/night)
                    </span>
                    <span className="text-[#F5F5F7] font-mono">
                      ₹{fareResult.extraGuestsTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                {/* Add-on charges */}
                {fareResult.addonsTotal > 0 && (
                  <div className="flex justify-between text-[#A1A1AA]">
                    <span>Selected Paid Add-ons</span>
                    <span className="text-[#F5F5F7] font-mono">
                      ₹{fareResult.addonsTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                {/* Gross Total */}
                <div className="pt-2 border-t border-[#2E3038] flex justify-between items-baseline font-semibold text-sm text-[#F5F5F7]">
                  <span>Gross Total</span>
                  <span className="font-heading text-lg font-bold text-[#D4AF37]">
                    ₹{fareResult.grossTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* 20% / 80% Payment Split Banner */}
              <div className="rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/10 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-[#D4AF37]">
                    <CreditCard className="w-4 h-4" />
                    <span>20% Advance Online Deposit</span>
                  </div>
                  <span className="font-heading text-base font-bold text-[#F5F5F7]">
                    ₹{fareResult.advancePayable.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#2E3038] flex items-center justify-between text-xs text-[#A1A1AA]">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5" />
                    <span>80% Balance Due on Arrival</span>
                  </div>
                  <span className="font-mono font-medium text-[#F5F5F7]">
                    ₹{fareResult.balanceDueOnArrival.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* What Happens Next */}
              <div className="pt-3 border-t border-[#2E3038] space-y-2 text-xs">
                <span className="font-semibold text-[#F5F5F7] block">What Happens Next</span>
                <ul className="space-y-1.5 text-[11px] text-[#A1A1AA] leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D4AF37] font-bold">1.</span>
                    <span>Pay 20% advance securely online via UPI, Cards, or Netbanking.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D4AF37] font-bold">2.</span>
                    <span>Instant digital booking voucher dispatched to your WhatsApp and Email.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#D4AF37] font-bold">3.</span>
                    <span>Present government photo ID at check-in (11 AM–1 PM) and settle remaining 80% balance.</span>
                  </li>
                </ul>
              </div>

              {/* Housekeeping Note */}
              <div className="flex items-center gap-2 text-[11px] text-[#A1A1AA] pt-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Complimentary housekeeping provided on alternate days.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. TEST / SANDBOX ADVANCE PAYMENT MODAL                   */}
      {/* ======================================================== */}
      {sandboxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-[#2E3038] bg-[#1C1E24] p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[10px] font-semibold text-[#D4AF37] mb-2 uppercase">
                  Razorpay Sandbox / Test Mode
                </div>
                <h3 className="font-heading text-xl font-semibold text-[#F5F5F7]">
                  Verify 20% Advance Deposit
                </h3>
              </div>
            </div>

            <div className="rounded-xl bg-[#121316] border border-[#2E3038] p-4 space-y-2 text-xs">
              <div className="flex justify-between text-[#A1A1AA]">
                <span>Payable Advance (20%)</span>
                <span className="font-mono font-bold text-[#F5F5F7] text-sm">
                  ₹{advanceAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-[#A1A1AA]">
                <span>Balance Due at Property (80%)</span>
                <span className="font-mono text-[#C5A880]">
                  ₹{fareResult.balanceDueOnArrival.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-[#A1A1AA]">
                <span>Booking Reference</span>
                <span className="font-mono text-[#D4AF37]">{pendingBookingId?.slice(0, 8)}...</span>
              </div>
            </div>

            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Live Razorpay merchant credentials can be added to your environment to accept real UPI and cards. In test mode, you can safely verify the end-to-end confirmation and PDF voucher workflow below.
            </p>

            {/* Modal Actions */}
            <div className="space-y-2.5 pt-2">
              <Button
                type="button"
                onClick={() => {
                  if (pendingBookingId) {
                    handleVerifyPayment(
                      pendingBookingId,
                      pendingOrderId || `order_test_${Date.now()}`,
                      `pay_sandbox_${Date.now()}`,
                      undefined,
                      true
                    );
                  }
                }}
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-semibold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer"
              >
                <span>
                  {isSubmitting ? "Verifying..." : "Simulate Successful Advance Payment"}
                </span>
              </Button>

              <button
                type="button"
                onClick={async () => {
                  if (pendingBookingId) {
                    setIsSubmitting(true);
                    try {
                      await fetch("/api/bookings/verify-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          bookingId: pendingBookingId,
                          paymentFailed: true,
                          reason: "Simulated payment failure (bank declined / invalid OTP)",
                        }),
                      });
                    } catch (e) {
                      // ignore
                    } finally {
                      setIsSubmitting(false);
                      setSandboxModalOpen(false);
                      setServerError("Payment was declined or failed. The reservation has NOT been confirmed and inventory remains unblocked.");
                    }
                  }
                }}
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 text-xs font-medium transition-colors cursor-pointer"
              >
                Simulate Payment Failure (Test Negative Case)
              </button>

              <button
                type="button"
                onClick={() => {
                  setSandboxModalOpen(false);
                  setServerError("Payment was cancelled by the guest. Your dates remain unreserved.");
                }}
                className="w-full py-1 text-xs text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors"
              >
                Cancel / Return to Form
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
