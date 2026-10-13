"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BookingSearch } from "@/components/hero/booking-search";
import { HeroFeaturedCards } from "@/components/hero-featured-cards";

interface HeroSectionProps {
  /** Optional custom hero background image URL (e.g. from Cloudflare R2) */
  customImageUrl?: string;
}

export function HeroSection({ customImageUrl }: HeroSectionProps) {
  const heroImageSrc = customImageUrl || "/images/hero-apartment.jpg";

  return (
    <section
      className="relative z-20 w-full bg-[#121316] overflow-visible select-none"
      aria-label="FLATEL Hospitality — Find Your Place to Stay"
    >
      {/* ======================================================== */}
      {/* 1. CINEMATIC LUXURY APARTMENT BACKGROUND & OVERLAYS      */}
      {/* ======================================================== */}
      <div className="relative w-full min-h-[460px] sm:min-h-[560px] lg:min-h-[620px] flex flex-col justify-between">
        {/* Background Image Container with deliberate mobile crop */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <Image
            src={heroImageSrc}
            alt="FLATEL Hospitality Serviced Apartments in Hyderabad"
            fill
            priority
            className="object-cover object-[center_32%] sm:object-center scale-[1.01] transition-transform duration-1000"
            sizes="100vw"
          />

          {/* Top Vignette: Seamless gradient merge with sticky header */}
          <div
            className="absolute inset-x-0 top-0 h-28 sm:h-40 bg-gradient-to-b from-[#121316] via-[#121316]/80 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Left Contrast Gradient: Guarantees readability for left-aligned headline */}
          <div
            className="absolute inset-y-0 left-0 w-full lg:w-[65%] bg-gradient-to-r from-[#121316]/95 via-[#121316]/75 sm:via-[#121316]/60 to-[#121316]/30 sm:to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Overall Soft Ambient Overlay */}
          <div
            className="absolute inset-0 bg-[#121316]/30 pointer-events-none"
            aria-hidden="true"
          />

          {/* Bottom Fade: Seamless blend into floating search bar and page surface */}
          <div
            className="absolute inset-x-0 bottom-0 h-32 sm:h-48 bg-gradient-to-t from-[#121316] via-[#121316]/90 to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* ======================================================== */}
        {/* 2. LEFT-ALIGNED HERO EDITORIAL (Purpose-Built for Mobile) */}
        {/* ======================================================== */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 sm:pt-14 lg:pt-20 pb-3 sm:pb-8">
          <div className="max-w-2xl text-left animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out">
            {/* Small Luxury Eyebrow Text & Golden Horizontal Accent */}
            <div className="flex items-center gap-2 mb-2 sm:mb-4">
              <div
                className="w-7 sm:w-12 h-1 bg-[#D4AF37] rounded-full shadow-xs shrink-0"
                aria-hidden="true"
              />
              <span className="text-[10.5px] sm:text-xs font-sans font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
                SERVICED RESIDENCES · HYDERABAD
              </span>
            </div>

            {/* Headline with Elegant Mobile Proportion */}
            <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[58px] font-bold tracking-tight text-white leading-[1.15] sm:leading-[1.12]">
              Find Your Place to Stay
            </h1>

            {/* Subtitle Matching Concept Mockup */}
            <p className="mt-2 sm:mt-4 text-xs sm:text-base md:text-lg text-[#C5C7D0] font-sans font-normal leading-relaxed max-w-xl text-balance drop-shadow-sm">
              Comfortable furnished flats for medical visits, business trips, family holidays, and longer stays.
            </p>

            {/* Explore Flats CTA Button: Shown on sm+ screens, hidden on small mobile to keep search interface above the fold */}
            <div className="mt-5 sm:mt-7 hidden sm:block">
              <Link
                href="/#flats"
                className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#E5B54F] hover:bg-[#D4A33B] text-[#121316] font-sans font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-lg shadow-[#E5B54F]/20 active:scale-[0.98] group"
              >
                <span>Explore Flats</span>
                <ArrowRight className="w-4 h-4 text-[#121316] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Integrated Booking Search Bar */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 mt-auto pt-2 sm:pt-6">
          <BookingSearch />
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. UNDER THE HERO: 4 PURPOSE CARDS ("SAME TO SAME")     */}
      {/* Medistay | Wanderer | Work & Stay | Family & Long Stay   */}
      {/* ======================================================== */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-6 sm:pt-8 pb-12 sm:pb-16">
        <HeroFeaturedCards />
      </div>
    </section>
  );
}

