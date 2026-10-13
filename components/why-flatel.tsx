"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Maximize2,
  UtensilsCrossed,
  Shirt,
  Sparkles,
  HeartPulse,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  Clock,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function WhyFlatel() {
  return (
    <section
      id="why-flatel"
      className="relative w-full bg-[#121316] text-[#F5F5F7] py-20 sm:py-24 lg:py-28 border-t border-[#262835] select-none overflow-hidden"
      aria-labelledby="advantage-heading"
    >
      {/* Luxury Ambient Radial Glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        {/* ========================================================== */}
        {/* ASYMMETRICAL 3-COLUMN BENTO MOSAIC (EXACT REFERENCE MATCH) */}
        {/* ========================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* -------------------------------------------------------- */}
          {/* COLUMN 1 (LEFT — 4 COLS): HEADER TEXT + BOTTOM PHOTO     */}
          {/* -------------------------------------------------------- */}
          <div className="md:col-span-4 flex flex-col justify-between gap-6">
            {/* Top Text Header Block */}
            <div className="pr-0 md:pr-4 pt-2">
              <div className="flex items-center justify-start gap-3 sm:gap-4 mb-3">
                <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/80" />
                <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#D4AF37] uppercase">
                  THE FLATEL ADVANTAGE
                </span>
                <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/80" />
              </div>

              <h2
                id="advantage-heading"
                className="font-heading text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold tracking-tight text-white leading-[1.18]"
              >
                The Comfort of a Flat.{" "}
                <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#F5D061] via-[#E6C687] to-[#D4AF37] block mt-1">
                  The Service of a Hotel.
                </span>
              </h2>

              <p className="mt-3.5 text-xs sm:text-[13px] text-[#9CA3AF] font-sans font-normal leading-relaxed">
                Why squeeze into a tiny 200 sqft hotel room when you can enjoy full apartment independence, private cooking, and hotel-level reliability?
              </p>
            </div>

            {/* Bottom Card: Spacious Living Lounge */}
            <div className="rounded-3xl overflow-hidden relative min-h-[260px] sm:min-h-[290px] md:min-h-[300px] border border-[#D4AF37]/35 hover:border-[#D4AF37] shadow-xl group transition-all duration-300">
              <Image
                src="/images/hero-apartment.jpg"
                alt="Spacious Flatel Apartment Living Hall"
                fill
                quality={95}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none" />

              {/* Tag at Bottom */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col items-start z-10">
                <span className="text-[10px] font-mono tracking-wider uppercase text-[#D4AF37] font-semibold">
                  3X MORE SPACE VS HOTELS
                </span>
                <span className="font-heading font-bold text-base sm:text-lg text-white mt-0.5 drop-shadow-md">
                  Spacious Family Living Hall
                </span>
                <span className="text-[11px] text-white/80 mt-0.5">
                  Separate master bedrooms, lounge & dining area
                </span>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------- */}
          {/* COLUMN 2 (MIDDLE — 4 COLS): TWO STACKED PHOTO CARDS      */}
          {/* -------------------------------------------------------- */}
          <div className="md:col-span-4 flex flex-col gap-5 lg:gap-6 justify-between">
            {/* Top Card: Modular Kitchen */}
            <div className="rounded-3xl overflow-hidden relative min-h-[240px] sm:min-h-[270px] md:h-1/2 border border-[#D4AF37]/35 hover:border-[#D4AF37] shadow-xl group transition-all duration-300">
              <Image
                src="/images/amenity-kitchen-luxury.jpg"
                alt="Flatel Private Modular Kitchen"
                fill
                quality={95}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none" />

              {/* Tag at Bottom */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col items-start z-10">
                <span className="text-[10px] font-mono tracking-wider uppercase text-[#D4AF37] font-semibold">
                  CULINARY INDEPENDENCE
                </span>
                <span className="font-heading font-bold text-base sm:text-lg text-white mt-0.5 drop-shadow-md">
                  Private Modular Kitchen
                </span>
                <span className="text-[11px] text-white/80 mt-0.5">
                  Piped gas, fridge, RO water & cookware included
                </span>
              </div>
            </div>

            {/* Bottom Card: Sanitized Master Bedroom */}
            <div className="rounded-3xl overflow-hidden relative min-h-[240px] sm:min-h-[270px] md:h-1/2 border border-[#D4AF37]/35 hover:border-[#D4AF37] shadow-xl group transition-all duration-300">
              <Image
                src="/images/amenities-bedroom-bg.jpg"
                alt="Sanitized Flatel Master Suite"
                fill
                quality={95}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none" />

              {/* Tag at Bottom */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col items-start z-10">
                <span className="text-[10px] font-mono tracking-wider uppercase text-[#D4AF37] font-semibold">
                  HOTEL-GRADE COMFORT
                </span>
                <span className="font-heading font-bold text-base sm:text-lg text-white mt-0.5 drop-shadow-md">
                  Deep Sanitized Suites
                </span>
                <span className="text-[11px] text-white/80 mt-0.5">
                  Alternate-day housekeeping & fresh linen replacement
                </span>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------- */}
          {/* COLUMN 3 (RIGHT — 4 COLS): TALL CARD + PILL CTA BUTTON   */}
          {/* -------------------------------------------------------- */}
          <div className="md:col-span-4 flex flex-col justify-between gap-5 lg:gap-6">
            {/* Top Tall Card: Full Serviced Residence */}
            <div className="rounded-3xl overflow-hidden relative flex-1 min-h-[360px] sm:min-h-[420px] border border-[#D4AF37]/35 hover:border-[#D4AF37] shadow-xl group transition-all duration-300">
              <Image
                src="/images/hero-luxury-hyderabad.jpg"
                alt="Flatel Luxury Serviced Residence Hyderabad"
                fill
                quality={95}
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10 pointer-events-none" />

              {/* Tag at Bottom */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 flex flex-col items-start z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#121316] text-[10px] font-extrabold uppercase shadow-sm mb-2">
                  ONLY 20% DEPOSIT
                </span>
                <span className="font-heading font-bold text-lg sm:text-xl text-white drop-shadow-md">
                  Serviced Residences in Hyderabad
                </span>
                <span className="text-xs text-white/85 mt-1 leading-relaxed">
                  Reserve with just a 20% advance deposit. Pay the remaining 80% on arrival via UPI or Cash with free 48h cancellation.
                </span>
              </div>
            </div>

            {/* Bottom Pill CTA Button (Matching Reference) */}
            <Link
              href="/#flats"
              className="w-full py-4 px-6 rounded-full border border-[#D4AF37]/45 hover:border-[#D4AF37] bg-[#161822] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#121316] font-bold text-xs sm:text-sm tracking-wider uppercase text-center transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/25 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explore Available Serviced Flats</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
