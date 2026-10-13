"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { BookingRecord } from "@/types/booking";
import { getRoomById } from "@/lib/mock-rooms";
import {
  CalendarCheck,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  User,
  Phone,
  Mail,
  Search,
  ExternalLink,
  Building,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  LogIn,
  UserPlus,
} from "lucide-react";

export default function MyBookingsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, openAuthModal } = useAuth();

  const [bookings, setBookings] = React.useState<BookingRecord[]>([]);
  const [loadingBookings, setLoadingBookings] = React.useState(false);
  const [lookupCode, setLookupCode] = React.useState("");
  const [lookupError, setLookupError] = React.useState<string | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  // Fetch guest's bookings whenever user is logged in
  React.useEffect(() => {
    if (!user) {
      setBookings([]);
      return;
    }

    const fetchBookings = async () => {
      setLoadingBookings(true);
      try {
        const query = new URLSearchParams();
        if (user.email) query.set("email", user.email);
        if (user.phone) query.set("phone", user.phone);

        const res = await fetch(`/api/bookings/my-bookings?${query.toString()}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        }
      } catch (err) {
        console.error("Error fetching guest reservations:", err);
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError(null);
    const cleaned = lookupCode.trim().toUpperCase();
    if (!cleaned) {
      setLookupError("Please enter a valid Booking Reference (e.g. FLT-84920).");
      return;
    }
    router.push(`/booking-confirmation/${cleaned}`);
  };

  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#121316] text-[#F5F5F7] flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-[#A1A1AA] font-mono tracking-wider">Loading guest account...</p>
        </div>
      </main>
    );
  }

  // Unauthenticated Guest View
  if (!user) {
    return (
      <main className="min-h-screen bg-[#121316] text-[#F5F5F7] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1E24] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono mb-4">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Guest Reservation Portal</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-normal text-[#F5F5F7] mb-3">
              My Reservations
            </h1>
            <p className="text-sm text-[#A1A1AA] max-w-lg mx-auto leading-relaxed">
              Sign in to manage your upcoming stays, view digital check-in vouchers, and access exclusive member privileges.
            </p>
          </div>

          {/* Authentication Prompt Card */}
          <div className="rounded-2xl border border-[#2E3038] bg-[#1C1E24] p-6 sm:p-8 shadow-2xl backdrop-blur-md mb-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center mx-auto mb-5">
              <User className="w-7 h-7" />
            </div>

            <h2 className="text-lg font-heading text-[#F5F5F7] font-medium mb-2">
              Log In or Create an Account
            </h2>
            <p className="text-xs text-[#A1A1AA] mb-6 max-w-sm mx-auto">
              Access your reservations with your registered Indian phone number (+91) or email, or create a new account in seconds.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => openAuthModal("Log in to access your reservation history and digital vouchers.", undefined, "login")}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-semibold text-xs transition-all shadow-lg cursor-pointer active:scale-[0.98]"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
              <button
                type="button"
                onClick={() => openAuthModal("Create an account to manage your stays and member rates.", undefined, "signup")}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 font-semibold text-xs transition-all cursor-pointer active:scale-[0.98]"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create Account</span>
              </button>
            </div>
          </div>

          {/* Alternative: Lookup with Booking Reference Code */}
          <div className="rounded-2xl border border-[#2E3038]/80 bg-[#17191E] p-6 text-center">
            <span className="text-[11px] font-mono text-[#D4AF37] uppercase tracking-wider block mb-1">
              Have a reservation code?
            </span>
            <p className="text-xs text-[#A1A1AA] mb-4">
              Look up any voucher directly using your Flatel reference code.
            </p>

            <form onSubmit={handleLookupSubmit} className="flex gap-2 max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={lookupCode}
                  onChange={(e) => setLookupCode(e.target.value)}
                  placeholder="e.g. FLT-84920"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#121316] border border-[#2E3038] text-sm text-[#F5F5F7] placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#252830] hover:bg-[#2E3038] text-[#F5F5F7] border border-[#2E3038] text-xs font-semibold cursor-pointer transition-colors"
              >
                Find Stay
              </button>
            </form>

            {lookupError && (
              <p className="text-xs text-rose-400 mt-2">{lookupError}</p>
            )}
          </div>
        </div>
      </main>
    );
  }

  // Authenticated Guest View
  return (
    <main className="min-h-screen bg-[#121316] text-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Guest Profile Banner */}
        <div className="rounded-2xl border border-[#2E3038] bg-[#1C1E24] p-6 sm:p-8 shadow-xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8C6D23] text-[#121316] flex items-center justify-center text-xl font-bold font-heading shadow-md shrink-0">
              {user.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-heading text-2xl font-normal text-[#F5F5F7]">
                  {user.fullName}
                </h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Guest
                </span>
              </div>
              <div className="flex items-center gap-4 mt-1 text-xs text-[#A1A1AA] flex-wrap">
                {user.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#D4AF37]" />
                    <span>{user.phone}</span>
                  </span>
                )}
                {user.email && !user.email.includes("@guest.flatel.in") && (
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-[#D4AF37]" />
                    <span>{user.email}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/#flats"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] text-xs font-semibold transition-all shadow-md"
            >
              <Building className="w-3.5 h-3.5" />
              <span>Book New Stay</span>
            </Link>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-heading text-xl text-[#F5F5F7] font-medium">
              Reservation History
            </h2>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              Access your digital vouchers, check-in instructions, and balance receipts.
            </p>
          </div>

          {/* Quick Lookup Input */}
          <form onSubmit={handleLookupSubmit} className="hidden sm:flex items-center gap-2">
            <input
              type="text"
              value={lookupCode}
              onChange={(e) => setLookupCode(e.target.value)}
              placeholder="Search code (e.g. FLT-84920)"
              className="px-3 py-1.5 rounded-lg bg-[#1C1E24] border border-[#2E3038] text-xs text-[#F5F5F7] placeholder-[#A1A1AA]/50 focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-[#252830] hover:bg-[#2E3038] text-[#F5F5F7] border border-[#2E3038]"
              title="Lookup reservation code"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Loading State */}
        {loadingBookings && (
          <div className="rounded-2xl border border-[#2E3038] bg-[#1C1E24] p-12 text-center">
            <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-[#A1A1AA] font-mono">Fetching your reservation records...</p>
          </div>
        )}

        {/* Empty State */}
        {!loadingBookings && bookings.length === 0 && (
          <div className="rounded-2xl border border-[#2E3038] bg-[#1C1E24] p-10 text-center shadow-lg">
            <div className="w-14 h-14 rounded-full bg-[#121316] border border-[#2E3038] text-[#A1A1AA] flex items-center justify-center mx-auto mb-4">
              <CalendarCheck className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="text-base font-medium text-[#F5F5F7] mb-1">
              No Active Reservations Found
            </h3>
            <p className="text-xs text-[#A1A1AA] max-w-md mx-auto mb-6 leading-relaxed">
              You do not have any bookings linked directly to your current session. Once you complete a booking on FLATEL, it will automatically appear here.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#flats"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-semibold text-xs transition-colors"
              >
                <span>Browse Apartments</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Bookings List */}
        {!loadingBookings && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((b) => {
              const room = getRoomById(b.unitId);
              const isConfirmed = b.paymentStatus === "advance_paid" || b.bookingStatus === "confirmed";

              return (
                <div
                  key={b.id}
                  className="rounded-2xl border border-[#2E3038] bg-[#1C1E24] p-5 sm:p-6 shadow-xl hover:border-[#D4AF37]/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2E3038] pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-sm font-bold text-[#D4AF37]">
                          {b.bookingCode || "FLT-PENDING"}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(b.bookingCode || b.id)}
                          className="text-[#A1A1AA] hover:text-[#F5F5F7] p-1 transition-colors"
                          title="Copy Booking Reference"
                        >
                          {copiedId === (b.bookingCode || b.id) ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            isConfirmed
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          }`}
                        >
                          {isConfirmed ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <AlertCircle className="w-3 h-3" />
                          )}
                          <span>{isConfirmed ? "Confirmed Stay" : "Pending Confirmation"}</span>
                        </span>
                      </div>
                      <h3 className="font-heading text-lg font-normal text-[#F5F5F7] mt-1">
                        {room ? room.title : `Flatel Unit (${b.unitId})`}
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA] block">
                        Advance Paid (20%)
                      </span>
                      <span className="font-mono text-base font-bold text-[#D4AF37]">
                        ₹{b.pricing.advancePayable.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-5">
                    <div className="p-3 rounded-xl bg-[#121316] border border-[#2E3038]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA] block mb-1">
                        Check-In
                      </span>
                      <div className="flex items-center gap-1.5 font-medium text-[#F5F5F7]">
                        <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{b.checkInDate}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#121316] border border-[#2E3038]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA] block mb-1">
                        Check-Out
                      </span>
                      <div className="flex items-center gap-1.5 font-medium text-[#F5F5F7]">
                        <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>{b.checkOutDate}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#121316] border border-[#2E3038]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA] block mb-1">
                        Duration & Guests
                      </span>
                      <span className="font-medium text-[#F5F5F7]">
                        {b.totalNights} Nights • {b.adultsCount} Adults
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#121316] border border-[#2E3038]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA] block mb-1">
                        Balance on Arrival (80%)
                      </span>
                      <span className="font-mono font-medium text-[#C5A880]">
                        ₹{b.pricing.balanceDueOnArrival.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#2E3038]">
                    <div className="text-[11px] text-[#A1A1AA]">
                      <span>Reserved under: </span>
                      <span className="text-[#F5F5F7] font-medium">{b.guest.fullName}</span>
                      {b.guest.phone && <span> ({b.guest.phone})</span>}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/booking-confirmation/${b.bookingCode || b.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-semibold text-xs transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Digital Voucher</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
