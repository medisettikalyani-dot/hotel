"use client";

import * as React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Download,
  MapPin,
  ExternalLink,
  MessageSquare,
  Calendar,
  Users,
  CreditCard,
  Building,
  Clock,
  ShieldCheck,
  Phone,
  Home,
  AlertCircle,
  Sparkles,
  Info,
} from "lucide-react";
import { BookingRecord } from "@/types/booking";
import { getRoomById } from "@/lib/mock-rooms";
import { getBranchBySlug, BRAND_NAME, CONTACT_PHONE, CONTACT_EMAIL, WHATSAPP_CONFIG } from "@/lib/constants";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BookingConfirmationViewProps {
  bookingId: string;
}

export function BookingConfirmationView({ bookingId }: BookingConfirmationViewProps) {
  const [booking, setBooking] = React.useState<BookingRecord | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = React.useState(false);

  React.useEffect(() => {
    async function loadBooking() {
      try {
        const res = await fetch(`/api/bookings/${bookingId}`);
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Booking record not found.");
        }
        setBooking(data.booking);
      } catch (err: any) {
        setError(err.message || "Failed to load booking details.");
      } finally {
        setIsLoading(false);
      }
    }
    loadBooking();
  }, [bookingId]);

  const handleDownloadPdf = async () => {
    if (!booking) return;
    setIsDownloadingPdf(true);
    try {
      const response = await fetch(`/api/bookings/${booking.bookingCode}/voucher`);
      if (!response.ok) {
        throw new Error("Failed to download PDF voucher.");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `FLATEL-VOUCHER-${booking.bookingCode}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      alert("Error generating PDF voucher. Please try again.");
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 text-center text-[#F5F5F7]">
        <div className="w-10 h-10 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-medium">Retrieving Booking Confirmation...</h2>
        <p className="mt-2 text-xs text-[#A1A1AA]">Validating digital reservation credentials.</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center text-[#F5F5F7]">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-semibold">Booking Record Not Found</h1>
        <p className="mt-2 text-xs sm:text-sm text-[#A1A1AA] max-w-md mx-auto">
          We could not locate a booking matching code &ldquo;{bookingId}&rdquo;. Please verify your booking reference or contact our concierge hotline.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-[#2E3038] text-[#F5F5F7] text-xs h-10 px-4 rounded-xl"
            )}
          >
            <Home className="w-4 h-4 mr-2 text-[#D4AF37]" />
            <span>Return to Homepage</span>
          </Link>
          <a
            href={`tel:${CONTACT_PHONE.replace(/[^0-9+]/g, "")}`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-[#D4AF37] text-[#121316] font-semibold text-xs h-10 px-4 rounded-xl"
            )}
          >
            <Phone className="w-4 h-4 mr-2" />
            <span>Concierge Hotline</span>
          </a>
        </div>
      </div>
    );
  }

  const room = getRoomById(booking.unitId);
  const branch = room?.branchSlug ? getBranchBySlug(room.branchSlug) : undefined;
  const branchName = branch ? branch.name : "Hyderabad";
  const branchAddress = branch
    ? branch.address
    : "Barkas Salala / Moghal Pura, Hyderabad, Telangana";
  const googleMapsUrl = branch?.googleMapsUrl;

  // WhatsApp Concierge message string
  const cleanPhone = booking.guest.phone.replace(/[^0-9]/g, "");
  const whatsappSummaryMessage = `Hello ${booking.guest.fullName}, here is your FLATEL Hospitality booking confirmation for ${room ? room.title : booking.unitId} (Booking ID: ${booking.bookingCode}) from ${booking.checkInDate} to ${booking.checkOutDate} (${booking.totalNights} nights). 20% advance of ₹${booking.pricing.advancePayable.toLocaleString("en-IN")} is paid. Remaining balance ₹${booking.pricing.balanceDueOnArrival.toLocaleString("en-IN")} is due on arrival. View voucher: ${typeof window !== "undefined" ? window.location.href : ""}`;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappSummaryMessage)}`;

  return (
    <div className="w-full min-h-screen bg-[#121316] text-[#F5F5F7] pb-24 selection:bg-[#D4AF37]/20 selection:text-[#D4AF37]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* Top Success Banner */}
        <div className="rounded-3xl border border-[#D4AF37]/40 bg-[#1C1E24] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#2E3038]">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center shrink-0 shadow-lg">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#121316] border border-[#2E3038] text-[10px] font-sans font-semibold text-[#D4AF37] uppercase tracking-wider mb-1.5">
                  RESERVATION CONFIRMED
                </div>
                <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-[#F5F5F7]">
                  Thank You, {booking.guest.fullName}!
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-[#A1A1AA]">
                  Your booking at Flatel Hospitality is secured. A 20% advance has been verified.
                </p>
              </div>
            </div>

            {/* Booking Code Card */}
            <div className="sm:text-right shrink-0 p-3 sm:p-0 rounded-xl bg-[#121316] sm:bg-transparent border sm:border-0 border-[#2E3038]">
              <span className="text-[10px] uppercase tracking-wider text-[#A1A1AA] block font-mono">
                Booking Reference
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#D4AF37] tracking-tight">
                {booking.bookingCode}
              </span>
              <span className="block text-[11px] text-[#A1A1AA] mt-0.5">
                Status: <strong className="text-[#F5F5F7] uppercase">{booking.bookingStatus}</strong>
              </span>
            </div>
          </div>

          {/* Action Buttons: PDF Download, Google Maps, WhatsApp */}
          <div className="pt-6 flex flex-wrap items-center gap-3">
            {/* Download PDF Voucher */}
            <Button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloadingPdf}
              className="bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-semibold text-xs sm:text-sm h-11 px-5 rounded-xl gap-2 shadow-lg cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloadingPdf ? "Generating PDF..." : "Download PDF Voucher"}</span>
            </Button>

            {/* Open Google Maps */}
            {googleMapsUrl && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "border-[#2E3038] bg-[#121316] hover:bg-[#252830] text-[#F5F5F7] hover:border-[#D4AF37]/50 text-xs sm:text-sm h-11 px-4 rounded-xl gap-2"
                )}
              >
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#A1A1AA]" />
              </a>
            )}

            {/* WhatsApp Confirmation Link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-[#2E3038] bg-[#121316] hover:bg-[#252830] text-[#F5F5F7] hover:border-[#D4AF37]/50 text-xs sm:text-sm h-11 px-4 rounded-xl gap-2"
              )}
            >
              <MessageSquare className="w-4 h-4 text-[#D4AF37]" />
              <span>Send to WhatsApp</span>
            </a>
          </div>

          {/* WhatsApp Delivery Status Notice */}
          <div className="mt-4 pt-4 border-t border-[#2E3038]/60 text-xs text-[#A1A1AA] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              {booking.notificationStatus === "sent" ? (
                <span className="text-emerald-400 font-medium">
                  Automated WhatsApp confirmation voucher was delivered to {booking.guest.phone}.
                </span>
              ) : (
                <span>
                  <strong className="text-[#F5F5F7]">WhatsApp Voucher Status:</strong> Official automated Cloud API webhook requires active WhatsApp Business Account credentials (WHATSAPP_API_TOKEN). You can instantly dispatch and archive this confirmed voucher directly to your WhatsApp or our concierge team using the <strong className="text-[#C5A880]">&ldquo;Send to WhatsApp&rdquo;</strong> button above.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 2-Column Details Breakdown */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Property, Stay Schedule, House Rules */}
          <div className="lg:col-span-7 space-y-6">
            {/* Reserved Property Summary */}
            <div className="rounded-2xl border border-[#2E3038] bg-[#1C1E24] p-5 sm:p-6 space-y-4">
              <h2 className="font-heading text-lg font-semibold text-[#F5F5F7] border-b border-[#2E3038] pb-3">
                Reserved Residence Details
              </h2>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-sans font-semibold tracking-wider uppercase text-[#D4AF37] px-2 py-0.5 rounded bg-[#121316] border border-[#2E3038]">
                    {room ? room.type : "Residence"}
                  </span>
                  <span className="text-[11px] text-[#C5A880] font-medium">
                    {branchName} Branch
                  </span>
                </div>
                <h3 className="font-heading text-xl font-semibold text-[#F5F5F7] mt-1.5">
                  {room ? room.title : booking.unitId.toUpperCase()}
                </h3>
                <p className="text-xs text-[#A1A1AA] flex items-start gap-1.5 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{branchAddress}</span>
                </p>
              </div>

              {/* Housekeeping Badge */}
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Complimentary Housekeeping Provided on Alternate Days</span>
              </div>

              {/* Stay Schedule Box */}
              <div className="rounded-xl bg-[#121316] border border-[#2E3038] p-4 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A1A1AA] block">
                    Check-In (11 AM–1 PM)
                  </span>
                  <span className="font-mono text-sm font-semibold text-[#F5F5F7] mt-1 block">
                    {booking.checkInDate}
                  </span>
                  <span className="text-[11px] text-[#C5A880]">Window: 11:00 AM – 1:00 PM</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A1A1AA] block">
                    Check-Out (11 AM sharp)
                  </span>
                  <span className="font-mono text-sm font-semibold text-[#F5F5F7] mt-1 block">
                    {booking.checkOutDate}
                  </span>
                  <span className="text-[11px] text-[#C5A880]">Strictly 11:00 AM sharp</span>
                </div>
              </div>

              {/* Occupancy, Duration & Purpose */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1 border-t border-[#2E3038]/60 mt-2">
                <div className="flex items-center gap-2 text-[#A1A1AA]">
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                  <span>
                    {booking.adultsCount} Adults {booking.kidsCount > 0 ? `· ${booking.kidsCount} Kids` : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#A1A1AA]">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>{booking.totalNights} Nights Duration</span>
                </div>
                <div className="flex items-center gap-2 text-[#A1A1AA]">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span className="truncate">
                    {booking.stayPurpose === "accommodation_only"
                      ? "Standard Accommodation"
                      : booking.stayPurpose === "medical"
                      ? "Medistay (Medical)"
                      : booking.stayPurpose === "wedding"
                      ? "Wedding Stay"
                      : booking.stayPurpose === "family"
                      ? "Family Vacation"
                      : booking.stayPurpose === "tourism"
                      ? "Wanderer (Tourism)"
                      : "Corporate Stay"}
                  </span>
                </div>
              </div>

              {/* Selected Services Pill List if any */}
              {booking.selectedAddons && booking.selectedAddons.length > 0 && (
                <div className="pt-2 border-t border-[#2E3038]/60">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA] block mb-1.5 font-semibold">
                    Included Selected Services ({booking.selectedAddons.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {booking.selectedAddons.map((addon) => (
                      <span
                        key={addon.id}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#121316] border border-[#2E3038] text-[11px] text-[#F5F5F7]"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                        <span>{addon.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mandatory Guidelines & ID Requirements */}
            <div className="rounded-2xl border border-[#2E3038] bg-[#1C1E24] p-5 sm:p-6 space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
                <ShieldCheck className="w-4 h-4" />
                <span>Guest Guidelines & Arrival Policy</span>
              </div>
              <ul className="space-y-2 text-xs text-[#A1A1AA] leading-relaxed list-disc list-inside">
                <li>
                  <strong>Mandatory Photo ID:</strong> Domestic guests must present an original government-issued photo ID for each adult (Aadhaar / Driving License / Voter ID). International guests must present an original physical passport and valid official visa.
                </li>
                <li>
                  <strong>Check-in Timing:</strong> Front desk check-in operates from 11:00 AM to 1:00 PM. Check-out is strictly 11:00 AM sharp.
                </li>
                <li>
                  <strong>Children:</strong> Children aged 0–12 stay free of accommodation charge and count toward safety capacity.
                </li>
                <li>
                  <strong>Cancellation Policy:</strong> The 20% advance booking deposit is fully refundable if cancellation occurs at least 48 hours prior to check-in. Non-refundable within 48 hours.
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: Payment Breakdown & Balance Due */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#2E3038] bg-[#1C1E24] p-5 sm:p-6 space-y-5 shadow-xl">
              <h2 className="font-heading text-lg font-semibold text-[#F5F5F7] border-b border-[#2E3038] pb-3">
                Payment Breakdown
              </h2>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-[#A1A1AA]">
                  <span>
                    Base Rent ({booking.totalNights}N @ ₹{room?.basePricePerNight.toLocaleString("en-IN")})
                  </span>
                  <span className="text-[#F5F5F7] font-mono">
                    ₹{booking.pricing.standardBaseRent.toLocaleString("en-IN")}
                  </span>
                </div>

                {booking.pricing.baseRentDiscount > 0 && (
                  <div className="flex justify-between text-[#C5A880]">
                    <span>Duration Discount ({Math.round(booking.pricing.discountRate * 100)}%)</span>
                    <span className="font-mono">
                      -₹{booking.pricing.baseRentDiscount.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                {booking.pricing.extraGuestsTotal > 0 && (
                  <div className="flex justify-between text-[#A1A1AA]">
                    <span>
                      Extra Adult Fee ({booking.extraGuestsCount} adults @ ₹500/night)
                    </span>
                    <span className="text-[#F5F5F7] font-mono">
                      ₹{booking.pricing.extraGuestsTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                {booking.pricing.addonsTotal > 0 && (
                  <div className="flex justify-between text-[#A1A1AA]">
                    <span>Selected Paid Add-ons</span>
                    <span className="text-[#F5F5F7] font-mono">
                      ₹{booking.pricing.addonsTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t border-[#2E3038] flex justify-between items-baseline font-semibold text-sm text-[#F5F5F7]">
                  <span>Gross Total</span>
                  <span className="font-heading text-lg font-bold text-[#D4AF37]">
                    ₹{booking.pricing.grossTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* 20% Advance Online Deposit: Verified & Paid */}
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
                    <CreditCard className="w-4 h-4" />
                    <span>20% Advance Paid Online</span>
                  </div>
                  <span className="font-heading text-base font-bold text-[#F5F5F7]">
                    ₹{booking.pricing.advancePayable.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="text-[11px] text-emerald-300/80 flex items-center justify-between pt-1 border-t border-emerald-500/20">
                  <span>Receipt Ref:</span>
                  <span className="font-mono">{booking.gatewayPaymentId || "DIRECT-GATEWAY-TXN"}</span>
                </div>
              </div>

              {/* 80% Remaining Balance Due at Property */}
              <div className="rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-[#D4AF37]">
                    <Building className="w-4 h-4" />
                    <span>80% Balance Due on Arrival</span>
                  </div>
                  <span className="font-mono text-base font-bold text-[#F5F5F7]">
                    ₹{booking.pricing.balanceDueOnArrival.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-[11px] text-[#A1A1AA] pt-1 border-t border-[#2E3038]">
                  Payable upon check-in at front desk by Cash or UPI.
                </p>
              </div>

              {/* Concierge Hotline */}
              <div className="pt-2 text-center text-xs text-[#A1A1AA]">
                <p>Need assistance or early arrival request?</p>
                <a
                  href={`tel:${CONTACT_PHONE.replace(/[^0-9+]/g, "")}`}
                  className="font-medium text-[#D4AF37] hover:underline mt-1 inline-block"
                >
                  Call {CONTACT_PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
