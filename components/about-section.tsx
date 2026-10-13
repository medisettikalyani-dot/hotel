"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

interface AboutSectionProps {
  className?: string;
}

export function AboutSection({ className }: AboutSectionProps) {
  return (
    <section
      id="about"
      className={cn(
        "scroll-mt-20 relative w-full bg-[#121316] text-[#F5F5F7] py-20 sm:py-24 lg:py-28 border-t border-[#2E3038] select-none overflow-hidden",
        className
      )}
      aria-labelledby="about-heading"
    >
      {/* Luxury Subtle Radial Ambient Glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/4 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10">
        {/* Symmetrical Gold Horizontal Line Header */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-10 sm:mb-14">
          <div className="h-[1px] w-12 sm:w-20 md:w-28 bg-gradient-to-r from-transparent to-[#D4AF37]/80" />
          <span className="text-xs sm:text-[13px] font-sans font-bold tracking-[0.25em] text-[#D4AF37] uppercase">
            ABOUT FLATEL HOSPITALITY
          </span>
          <div className="h-[1px] w-12 sm:w-20 md:w-28 bg-gradient-to-l from-transparent to-[#D4AF37]/80" />
        </div>

        {/* ========================================================== */}
        {/* 2-COLUMN LUXURY EDITORIAL (MATCHING USER REFERENCE DESIGN) */}
        {/* ========================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">
          {/* -------------------------------------------------------- */}
          {/* LEFT COLUMN: EDITORIAL, STORY, METRICS & MAP CTA (6 COLS)*/}
          {/* -------------------------------------------------------- */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-7">
            {/* 1. Small Top Category Tagline */}
            <div>
              <span className="text-[11px] font-sans font-semibold tracking-[0.22em] text-[#C5A880] uppercase">
                HOSPITALITY REDEFINED &amp; SERVICED LIVING
              </span>

              {/* 2. Main Headline in Editorial Serif with Italic Accent */}
              <h2
                id="about-heading"
                className="font-heading text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-normal tracking-tight text-[#F5F5F7] leading-[1.18] mt-3"
              >
                Where Apartment Freedom
                <br />
                <span className="font-serif italic text-[#C5A880]">
                  Whispers Softly to Modern Luxury
                </span>
              </h2>
            </div>

            {/* 3. Two Story Narrative Paragraphs */}
            <div className="space-y-4 text-xs sm:text-[13.5px] text-[#A1A1AA] font-sans leading-relaxed">
              <p>
                Conceived to eliminate the chronic dilemma travelers face in Hyderabad: paying exorbitant rates for cramped 200 sq.ft. hotel rooms with no kitchen or privacy, or enduring unmanaged residential rentals with questionable hygiene and zero guest support.
              </p>
              <p>
                Here, across Barkas Salala and Moghal Pura, every flat is an expansive, fully furnished sanctuary. In place of rigid hotel corridors, enjoy the quiet comfort of your private modular kitchen, the gentle relief of alternate-day housekeeping, and the attentive reassurance of 24/7 concierge care.
              </p>
            </div>

            {/* 4. Three Metrics with Subtle Top Separator */}
            <div className="pt-6 border-t border-[#2E3038] grid grid-cols-3 gap-4">
              <div>
                <div className="font-serif text-2xl sm:text-3xl text-[#F5F5F7] tracking-tight">
                  100%
                </div>
                <div className="text-[10px] font-sans font-semibold tracking-[0.16em] uppercase text-[#C5A880] mt-1">
                  Private Kitchens
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl text-[#F5F5F7] tracking-tight">
                  2
                </div>
                <div className="text-[10px] font-sans font-semibold tracking-[0.16em] uppercase text-[#C5A880] mt-1">
                  Prime Branches
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl sm:text-3xl text-[#F5F5F7] tracking-tight">
                  24/7
                </div>
                <div className="text-[10px] font-sans font-semibold tracking-[0.16em] uppercase text-[#C5A880] mt-1">
                  Concierge Care
                </div>
              </div>
            </div>

            {/* 5. Gold Button: "SHOWED IN MAP" / EXPLORE BRANCHES */}
            <div className="pt-2">
              <Link
                href="/#locations"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#C5A880] hover:bg-[#D4AF37] text-[#121316] font-mono text-xs uppercase font-bold tracking-wider transition-all duration-200 shadow-md shadow-[#C5A880]/20 active:scale-[0.98] cursor-pointer"
              >
                <MapPin className="w-4 h-4 stroke-[2]" />
                <span>Showed in Map</span>
              </Link>
            </div>
          </div>

          {/* -------------------------------------------------------- */}
          {/* RIGHT COLUMN: LUXURY PHOTO + FLOATING QUOTE (6 COLS)     */}
          {/* -------------------------------------------------------- */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0 pb-10 sm:pb-12 lg:pb-8">
            {/* Framed Architectural / Bedroom Photograph */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[14/10] rounded-2xl overflow-hidden border border-[#2E3038] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <Image
                src="/images/amenities-bedroom-bg.jpg"
                alt="Flatel Luxury Serviced Residence Suite in Hyderabad"
                fill
                priority
                quality={95}
                className="object-cover object-center scale-[1.02] hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Subtle Vignette Gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"
                aria-hidden="true"
              />

              {/* Location Tag at Top-Right of Image (matching reference "MEDINA, MARRAKECH") */}
              <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-sm bg-black/60 backdrop-blur-md border border-white/10 text-[9.5px] font-mono tracking-[0.18em] uppercase text-[#E5E7EB]">
                BARKAS &amp; MOGHAL PURA, HYDERABAD
              </div>
            </div>

            {/* Overlapping Floating Quote Card at Bottom-Left of Photo */}
            <div className="absolute -bottom-2 left-2.5 sm:-bottom-4 sm:left-6 md:-bottom-6 md:left-8 max-w-[calc(100%-1.25rem)] sm:max-w-[320px] rounded-xl bg-[#1C1E24]/95 backdrop-blur-md border border-[#C5A880]/40 p-3.5 sm:p-5 shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-20 transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-1.5 text-[#C5A880] mb-1.5">
                <Star className="w-3.5 h-3.5 fill-[#C5A880]" />
                <span className="text-[10px] font-sans font-bold tracking-[0.16em] uppercase">
                  FOUNDER&apos;S PLEDGE
                </span>
              </div>

              <p className="font-serif italic text-xs sm:text-[13px] text-[#F5F5F7] leading-snug">
                &ldquo;An authentic sanctuary of absolute comfort, home-cooked food, and hotel-grade peace.&rdquo;
              </p>

              <div className="mt-2 text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider">
                — OSAMA, MANAGING DIRECTOR
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
