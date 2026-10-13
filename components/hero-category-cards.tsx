"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HeartPulse,
  Compass,
  Briefcase,
  Users,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  SlidersHorizontal,
  Layers,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface CategoryCardItem {
  id: string;
  title: string;
  shortLabel: string;
  tagline: string;
  imageUrl: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  // Light pastel palette (Image 2 boutique style)
  pastelBg: string;
  pastelBorder: string;
  pastelText: string;
  pastelPillBg: string;
  pastelPillText: string;
  // Dark luxury jewel palette (FLATEL theme style)
  darkBg: string;
  darkBorder: string;
  darkGlow: string;
  darkText: string;
  darkPillBg: string;
}

export const CATEGORY_CARDS: CategoryCardItem[] = [
  {
    id: "medistay",
    title: "Medistay Healthcare",
    shortLabel: "Medistay Care",
    tagline: "Patient Attendants & Recovery",
    imageUrl: "/images/experiences/medistay-suite.jpg",
    href: "/#flats?purpose=medical",
    icon: HeartPulse,
    // Soft Sage / Mint Green (like Card 1 in Image 2)
    pastelBg: "bg-[#EAF4EF]",
    pastelBorder: "border-[#C5E1D1]",
    pastelText: "text-[#1C4630]",
    pastelPillBg: "bg-white/95 text-[#1C4630] border-[#C5E1D1]/60",
    pastelPillText: "text-[#1C4630]",
    // Dark luxury forest emerald
    darkBg: "bg-[#13241C]",
    darkBorder: "border-[#225239]/60",
    darkGlow: "group-hover:shadow-[0_12px_32px_rgba(34,197,94,0.18)]",
    darkText: "text-emerald-300",
    darkPillBg: "bg-[#182C22] text-emerald-200 border-[#225239]/80",
  },
  {
    id: "tourism",
    title: "Heritage & Tourism",
    shortLabel: "Heritage Stays",
    tagline: "Near Charminar & Old City",
    imageUrl: "/images/branch-moghal-pura.jpg",
    href: "/branches/moghal-pura",
    icon: Compass,
    // Soft Rose / Blush Pink (like Card 2 in Image 2)
    pastelBg: "bg-[#FCECEE]",
    pastelBorder: "border-[#F5CCD2]",
    pastelText: "text-[#6E2A34]",
    pastelPillBg: "bg-white/95 text-[#6E2A34] border-[#F5CCD2]/60",
    pastelPillText: "text-[#6E2A34]",
    // Dark luxury terracotta rose
    darkBg: "bg-[#29171A]",
    darkBorder: "border-[#522930]/60",
    darkGlow: "group-hover:shadow-[0_12px_32px_rgba(244,63,94,0.18)]",
    darkText: "text-rose-300",
    darkPillBg: "bg-[#331D21] text-rose-200 border-[#522930]/80",
  },
  {
    id: "corporate",
    title: "Corporate Executive",
    shortLabel: "Corporate Suites",
    tagline: "Wi-Fi & Dedicated Desk",
    imageUrl: "/images/experiences/desk-cand1.jpg",
    href: "/#flats?purpose=corporate",
    icon: Briefcase,
    // Soft Sky Blue (like Card 5 in Image 2)
    pastelBg: "bg-[#EAF3FA]",
    pastelBorder: "border-[#C8DFEE]",
    pastelText: "text-[#204569]",
    pastelPillBg: "bg-white/95 text-[#204569] border-[#C8DFEE]/60",
    pastelPillText: "text-[#204569]",
    // Dark luxury sapphire navy
    darkBg: "bg-[#131F2E]",
    darkBorder: "border-[#223A57]/60",
    darkGlow: "group-hover:shadow-[0_12px_32px_rgba(59,130,246,0.18)]",
    darkText: "text-sky-300",
    darkPillBg: "bg-[#192A3E] text-sky-200 border-[#223A57]/80",
  },
  {
    id: "family",
    title: "Family & Long Stay",
    shortLabel: "Family Suites",
    tagline: "Spacious Multi-Bedroom",
    imageUrl: "/images/flats/flat-3bhk-luxury.jpg",
    href: "/#flats?purpose=family",
    icon: Users,
    // Soft Lilac / Lavender (like Card 4 in Image 2)
    pastelBg: "bg-[#F3EEF9]",
    pastelBorder: "border-[#DFD4F0]",
    pastelText: "text-[#4A3267]",
    pastelPillBg: "bg-white/95 text-[#4A3267] border-[#DFD4F0]/60",
    pastelPillText: "text-[#4A3267]",
    // Dark luxury royal amethyst
    darkBg: "bg-[#23172E]",
    darkBorder: "border-[#4A2E63]/60",
    darkGlow: "group-hover:shadow-[0_12px_32px_rgba(168,85,247,0.18)]",
    darkText: "text-purple-300",
    darkPillBg: "bg-[#2D1E3B] text-purple-200 border-[#4A2E63]/80",
  },
  {
    id: "1bhk",
    title: "1 BHK Cozy Flats",
    shortLabel: "1 BHK Furnished",
    tagline: "Couple & Solo Executive",
    imageUrl: "/images/flats/flat-1bhk-luxury.jpg",
    href: "/#flats?flatType=1bhk",
    icon: Sparkles,
    // Warm Ivory / Peach Sand (like Card 3 in Image 2)
    pastelBg: "bg-[#FDF3E7]",
    pastelBorder: "border-[#F6DFC4]",
    pastelText: "text-[#69431E]",
    pastelPillBg: "bg-white/95 text-[#69431E] border-[#F6DFC4]/60",
    pastelPillText: "text-[#69431E]",
    // Dark luxury warm champagne gold
    darkBg: "bg-[#251F14]",
    darkBorder: "border-[#524122]/60",
    darkGlow: "group-hover:shadow-[0_12px_32px_rgba(234,179,8,0.18)]",
    darkText: "text-amber-300",
    darkPillBg: "bg-[#302717] text-amber-200 border-[#524122]/80",
  },
  {
    id: "2bhk",
    title: "2 BHK Family Living",
    shortLabel: "2 BHK Furnished",
    tagline: "Living Room & Modular Kitchen",
    imageUrl: "/images/flats/flat-2bhk-luxury.jpg",
    href: "/#flats?flatType=2bhk",
    icon: Sparkles,
    // Warm Wheat / Honey (like Card 6 in Image 2)
    pastelBg: "bg-[#FAF1E6]",
    pastelBorder: "border-[#EEDABE]",
    pastelText: "text-[#5F3E1F]",
    pastelPillBg: "bg-white/95 text-[#5F3E1F] border-[#EEDABE]/60",
    pastelPillText: "text-[#5F3E1F]",
    // Dark luxury warm bronze espresso
    darkBg: "bg-[#271B15]",
    darkBorder: "border-[#533423]/60",
    darkGlow: "group-hover:shadow-[0_12px_32px_rgba(249,115,22,0.18)]",
    darkText: "text-orange-300",
    darkPillBg: "bg-[#33231B] text-orange-200 border-[#533423]/80",
  },
  {
    id: "3bhk-4bhk",
    title: "3 & 4 BHK Luxury",
    shortLabel: "3 & 4 BHK Suites",
    tagline: "Celebration & Group Stays",
    imageUrl: "/images/flats/flat-4bhk-luxury.jpg",
    href: "/#flats?flatType=3bhk",
    icon: Sparkles,
    // Fresh Mint / Eucalyptus (like Card 7 in Image 2)
    pastelBg: "bg-[#EAF4F2]",
    pastelBorder: "border-[#C6E2DC]",
    pastelText: "text-[#1E4842]",
    pastelPillBg: "bg-white/95 text-[#1E4842] border-[#C6E2DC]/60",
    pastelPillText: "text-[#1E4842]",
    // Dark luxury deep teal jade
    darkBg: "bg-[#132323]",
    darkBorder: "border-[#214343]/60",
    darkGlow: "group-hover:shadow-[0_12px_32px_rgba(20,184,166,0.18)]",
    darkText: "text-teal-300",
    darkPillBg: "bg-[#192E2E] text-teal-200 border-[#214343]/80",
  },
];

interface HeroCategoryCardsProps {
  className?: string;
  defaultMode?: "pastel" | "luxury";
}

export function HeroCategoryCards({
  className,
  defaultMode = "pastel",
}: HeroCategoryCardsProps) {
  const [styleMode, setStyleMode] = React.useState<"pastel" | "luxury">(defaultMode);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  // Check scroll position to toggle navigation arrows
  const checkScroll = React.useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const atStart = el.scrollLeft <= 5;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
    setCanScrollLeft(!atStart);
    setCanScrollRight(!atEnd);
  }, []);

  React.useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -340 : 340;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div
      className={cn("w-full select-none", className)}
      aria-label="FLATEL Curated Stays & Categories"
    >
      {/* Top Header Row with Title, Style Mode Toggle & Arrow Controls */}
      <div className="flex items-center justify-between gap-4 mb-4 sm:mb-5 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-4 rounded-full bg-[#E5B54F]" />
          <h2 className="text-sm sm:text-base font-heading font-semibold text-white tracking-wide">
            Explore Stays & Collections
          </h2>
          <span className="hidden sm:inline-block text-[11px] font-sans font-medium px-2 py-0.5 rounded-full bg-white/10 text-[#C5C7D0]">
            7 Categories
          </span>
        </div>

        {/* Right Controls: Style Theme Switcher + Scroll Arrows */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Aesthetic Toggle: Boutique Pastel (Image 2) vs Dark Luxury */}
          <div
            className="flex items-center p-0.5 rounded-full bg-[#181A22] border border-[#2D303D] text-[11px]"
            title="Toggle Visual Theme (Image 2 Pastel style vs Luxury Dark)"
          >
            <button
              type="button"
              onClick={() => setStyleMode("pastel")}
              className={cn(
                "px-2.5 py-1 rounded-full font-medium transition-all duration-200",
                styleMode === "pastel"
                  ? "bg-white text-[#121316] shadow-xs font-semibold"
                  : "text-[#A1A1AA] hover:text-white"
              )}
            >
              Pastel
            </button>
            <button
              type="button"
              onClick={() => setStyleMode("luxury")}
              className={cn(
                "px-2.5 py-1 rounded-full font-medium transition-all duration-200",
                styleMode === "luxury"
                  ? "bg-[#D4AF37] text-[#121316] shadow-xs font-semibold"
                  : "text-[#A1A1AA] hover:text-white"
              )}
            >
              Luxury
            </button>
          </div>

          {/* Navigation Arrows for smooth scrolling */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                "w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200",
                canScrollLeft
                  ? "border-white/20 bg-[#1A1D26] text-white hover:border-[#D4AF37] hover:text-[#D4AF37] hover:scale-105 active:scale-95"
                  : "border-white/5 bg-[#14161E]/50 text-white/30 cursor-not-allowed"
              )}
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={cn(
                "w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200",
                canScrollRight
                  ? "border-white/20 bg-[#1A1D26] text-white hover:border-[#D4AF37] hover:text-[#D4AF37] hover:scale-105 active:scale-95"
                  : "border-white/5 bg-[#14161E]/50 text-white/30 cursor-not-allowed"
              )}
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrollable Container (Matching Image 2 Layout) */}
      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-3 sm:gap-3.5 overflow-x-auto pb-2 pt-1 scrollbar-none snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CATEGORY_CARDS.map((card) => {
            const Icon = card.icon;
            const isPastel = styleMode === "pastel";

            return (
              <Link
                key={card.id}
                href={card.href}
                className={cn(
                  "group relative flex-none w-[138px] sm:w-[152px] md:w-[164px] lg:w-[calc(100%/7-11px)]",
                  "flex flex-col justify-between rounded-2xl transition-all duration-300 snap-start",
                  "hover:-translate-y-1.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#D4AF37]",
                  isPastel
                    ? cn(
                        card.pastelBg,
                        "border shadow-sm hover:shadow-xl",
                        card.pastelBorder
                      )
                    : cn(
                        card.darkBg,
                        "border border-white/10 hover:border-[#D4AF37]/70 shadow-md",
                        card.darkBorder,
                        card.darkGlow
                      )
                )}
              >
                {/* Framed Image Container with Inner Matting & Rounded Corners (Like Image 2) */}
                <div className="p-2 sm:p-2.5 pb-1">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#121316]/10 shadow-xs">
                    <Image
                      src={card.imageUrl}
                      alt={card.title}
                      fill
                      className="object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                      sizes="(max-width: 640px) 140px, (max-width: 1024px) 160px, 180px"
                    />

                    {/* Subtle top subtle icon pill */}
                    <div className="absolute top-1.5 left-1.5 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                      <span
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-md shadow-xs border text-[11px]",
                          isPastel
                            ? "bg-white/80 border-white/60 text-[#1C4630]"
                            : "bg-[#121316]/80 border-white/20 text-[#D4AF37]"
                        )}
                      >
                        <Icon className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Label Bar with Category Title & Right Chevron (Exact Image 2 Structure) */}
                <div className="p-2 sm:p-2.5 pt-0">
                  <div
                    className={cn(
                      "w-full py-1.5 sm:py-2 px-2.5 rounded-xl border flex items-center justify-between gap-1 text-center transition-all duration-200",
                      isPastel
                        ? cn(
                            card.pastelPillBg,
                            "group-hover:bg-white group-hover:shadow-sm"
                          )
                        : cn(
                            card.darkPillBg,
                            "group-hover:bg-[#1E232E] group-hover:border-[#D4AF37]/50"
                          )
                    )}
                  >
                    <span
                      className={cn(
                        "text-[11.5px] sm:text-xs font-semibold tracking-tight truncate leading-tight",
                        isPastel ? card.pastelPillText : card.darkText
                      )}
                    >
                      {card.shortLabel}
                    </span>
                    <span
                      className={cn(
                        "text-xs transition-transform duration-200 group-hover:translate-x-1 shrink-0 font-bold",
                        isPastel ? card.pastelText : "text-[#D4AF37]"
                      )}
                      aria-hidden="true"
                    >
                      ›
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
