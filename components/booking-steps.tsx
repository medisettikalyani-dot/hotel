"use client";

import * as React from "react";
import Link from "next/link";
import {
  Compass,
  CreditCard,
  ShieldCheck,
  Smartphone,
  Wallet,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 6 Signature steps & process perks matching the user reference layout
 */
const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    label: "01. CHOOSE SUITE",
    sub: "1–4 BHK in Hyderabad",
    icon: Compass,
  },
  {
    step: "02",
    label: "02. 20% DEPOSIT",
    sub: "Pay via UPI QR / Cards",
    icon: CreditCard,
  },
  {
    step: "perk1",
    label: "FREE 48H CANCEL",
    sub: "100% Refund Guarantee",
    icon: ShieldCheck,
  },
  {
    step: "perk2",
    label: "WHATSAPP CHECK-IN",
    sub: "Contactless Key Link",
    icon: Smartphone,
  },
  {
    step: "perk3",
    label: "80% ON ARRIVAL",
    sub: "Cash or UPI at Desk",
    icon: Wallet,
  },
  {
    step: "03",
    label: "03. UNPACK & RELAX",
    sub: "Daily / Alt Housekeeping",
    icon: Sparkles,
  },
];

export function BookingSteps({ className }: { className?: string }) {
  return (
    <section
      id="how-it-works"
      className={cn(
        "relative w-full bg-[#0E0F12] text-[#F5F5F7] py-16 sm:py-20 lg:py-24 border-t border-b border-[#262835]/80 select-none overflow-hidden",
        className
      )}
      aria-labelledby="how-it-works-heading"
    >
      {/* Luxury Radial Ambient Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================== */}
        {/* 1. TOP HEADER WITH HORIZONTAL GOLD LINES (REFERENCE STYLE)  */}
        {/* ========================================================== */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-14">
          <div className="h-[1px] w-12 sm:w-24 md:w-36 bg-gradient-to-r from-transparent to-[#D4AF37]/70" />
          <h2
            id="how-it-works-heading"
            className="text-xs sm:text-sm md:text-base font-sans font-bold tracking-[0.28em] text-[#D4AF37] uppercase text-center"
          >
            HOW IT WORKS
          </h2>
          <div className="h-[1px] w-12 sm:w-24 md:w-36 bg-gradient-to-l from-transparent to-[#D4AF37]/70" />
        </div>

        {/* ========================================================== */}
        {/* 2. SIX CIRCULAR GOLD OUTLINE ICONS (EXACT REFERENCE ROW)    */}
        {/* ========================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-start justify-items-center mb-14 sm:mb-16">
          {HOW_IT_WORKS_STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex flex-col items-center text-center group cursor-default"
              >
                {/* Circular Gold Badge */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#D4AF37]/60 bg-[#14151C] flex items-center justify-center text-[#D4AF37] shadow-lg shadow-[#D4AF37]/10 transition-all duration-300 group-hover:scale-110 group-hover:border-[#D4AF37] group-hover:shadow-[#D4AF37]/25 group-hover:bg-[#1A1C24]">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.75]" />
                </div>

                {/* Step Label */}
                <span className="text-[11px] sm:text-xs font-sans font-bold text-[#E5E7EB] tracking-wider uppercase mt-3.5 leading-snug group-hover:text-[#F5D061] transition-colors">
                  {item.label}
                </span>
                <span className="text-[10px] text-[#9CA3AF] mt-0.5 font-normal">
                  {item.sub}
                </span>
              </div>
            );
          })}
        </div>

        {/* ========================================================== */}
        {/* 3. GOLD BORDER CARD: SELECT. RESERVE. RELAX. (REFERENCE)   */}
        {/* ========================================================== */}
        <div className="rounded-3xl border border-[#D4AF37]/60 bg-gradient-to-r from-[#14151C] via-[#161823] to-[#14151C] p-7 sm:p-9 lg:p-11 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Shimmer */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_60%)]"
            aria-hidden="true"
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-10 relative z-10">
            {/* -------------------------------------------------------- */}
            {/* LEFT: SELECT. RESERVE. RELAX. (EXACT REFERENCE TYPOGRAPHY)*/}
            {/* -------------------------------------------------------- */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left shrink-0">
              <span className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#E6C687] tracking-[0.06em] leading-tight">
                SELECT.
              </span>
              <span className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#E6C687] tracking-[0.06em] leading-tight">
                RESERVE.
              </span>
              <span className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#E6C687] tracking-[0.06em] leading-tight">
                RELAX.
              </span>
            </div>

            {/* VERTICAL DIVIDER LINE (DESKTOP) */}
            <div
              className="hidden md:block w-[1px] h-32 bg-[#D4AF37]/35 self-center shrink-0"
              aria-hidden="true"
            />

            {/* -------------------------------------------------------- */}
            {/* MIDDLE: 3 SIMPLE STEPS TO BOOK                           */}
            {/* -------------------------------------------------------- */}
            <div className="flex-1 w-full max-w-lg">
              <div className="text-xs sm:text-sm font-mono font-bold text-[#D4AF37] tracking-[0.2em] uppercase mb-4">
                BOOK IN 3 SIMPLE STEPS
              </div>

              {/* 3 Steps List with Circular Gold Checkmarks */}
              <div className="space-y-3.5 text-xs sm:text-sm text-[#F3F4F6] font-medium">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>
                    <strong className="text-[#F5D061]">1. Select Your Residence:</strong> Browse 1 to 4 BHK suites with verified photos
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>
                    <strong className="text-[#F5D061]">2. Reserve with 20% Deposit:</strong> Pay only 20% advance via UPI QR or Card
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>
                    <strong className="text-[#F5D061]">3. Arrive & Settle Balance:</strong> Contactless check-in; pay 80% balance at desk
                  </span>
                </div>
              </div>

              {/* Bottom Quick Booking Reassurance & Action */}
              <div className="mt-5 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-[#A1A1AA] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Free Cancellation up to 48 hours prior</span>
                </span>

                <Link
                  href="/#flats"
                  className="text-xs font-bold text-[#D4AF37] hover:text-[#F5D061] inline-flex items-center gap-1 transition-colors group cursor-pointer"
                >
                  <span>Explore Available Flats</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* -------------------------------------------------------- */}
            {/* RIGHT: ELEGANT GOLD BOTANICAL LEAF BRANCH (EXACT MATCH)   */}
            {/* -------------------------------------------------------- */}
            <div className="hidden lg:flex items-center justify-center shrink-0 pr-2">
              <svg
                viewBox="0 0 160 210"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-32 h-44 xl:w-36 xl:h-48 text-[#D4AF37] opacity-85 select-none pointer-events-none drop-shadow-[0_2px_12px_rgba(212,175,55,0.15)]"
                aria-hidden="true"
              >
                {/* Main Curved Botanical Stem */}
                <path
                  d="M 80 205 Q 82 115 118 12"
                  stroke="url(#leafGoldStroke)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Bottom Left Leaf */}
                <path
                  d="M 83 175 C 50 160 48 135 78 140 C 85 150 86 165 83 175 Z"
                  stroke="url(#leafGoldStroke)"
                  strokeWidth="1.5"
                  fill="url(#leafGoldFill)"
                />
                <path d="M 78 144 Q 65 155 83 170" stroke="url(#leafGoldStroke)" strokeWidth="1" />

                {/* Lower Right Leaf */}
                <path
                  d="M 86 145 C 122 130 120 105 92 112 C 86 122 85 136 86 145 Z"
                  stroke="url(#leafGoldStroke)"
                  strokeWidth="1.5"
                  fill="url(#leafGoldFill)"
                />
                <path d="M 92 114 Q 107 125 86 140" stroke="url(#leafGoldStroke)" strokeWidth="1" />

                {/* Mid Left Leaf */}
                <path
                  d="M 92 112 C 58 98 60 72 88 80 C 94 90 93 103 92 112 Z"
                  stroke="url(#leafGoldStroke)"
                  strokeWidth="1.5"
                  fill="url(#leafGoldFill)"
                />
                <path d="M 88 82 Q 74 93 92 107" stroke="url(#leafGoldStroke)" strokeWidth="1" />

                {/* Upper Right Leaf */}
                <path
                  d="M 100 80 C 134 68 132 44 106 52 C 100 62 99 72 100 80 Z"
                  stroke="url(#leafGoldStroke)"
                  strokeWidth="1.5"
                  fill="url(#leafGoldFill)"
                />
                <path d="M 106 54 Q 120 63 100 75" stroke="url(#leafGoldStroke)" strokeWidth="1" />

                {/* Upper Left Leaf */}
                <path
                  d="M 106 50 C 80 38 82 18 102 24 C 107 32 107 42 106 50 Z"
                  stroke="url(#leafGoldStroke)"
                  strokeWidth="1.5"
                  fill="url(#leafGoldFill)"
                />

                {/* Apex Top Bud Leaf */}
                <path
                  d="M 118 15 C 114 2 128 0 124 16 Z"
                  stroke="url(#leafGoldStroke)"
                  strokeWidth="1.5"
                  fill="url(#leafGoldFill)"
                />

                <defs>
                  <linearGradient id="leafGoldStroke" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F5D061" />
                    <stop offset="60%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#A88120" />
                  </linearGradient>
                  <linearGradient id="leafGoldFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
