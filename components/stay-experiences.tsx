"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HeartPulse,
  Compass,
  Briefcase,
  Home,
  Heart,
  CookingPot,
  Ambulance,
  Clock,
  ShieldCheck,
  Wifi,
  Laptop,
  Zap,
  Users,
  Sparkles,
  ArrowRight,
  Info,
  Landmark,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface StayExperienceSpec {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface StayExperienceItem {
  id: string;
  title: string;
  tag: string;
  tagIcon: React.ComponentType<{ className?: string }>;
  highlight: string;
  subtitle: string;
  imageUrl: string;
  specs: StayExperienceSpec[];
}

const STAY_EXPERIENCES: StayExperienceItem[] = [
  {
    id: "medical",
    title: "Medistay",
    tag: "Care Support",
    tagIcon: HeartPulse,
    highlight: "14 Inclusions",
    subtitle: "Patient & attendant recovery suites",
    imageUrl: "/images/experiences/medistay-suite.jpg",
    specs: [
      { label: "Doctor Assist", icon: HeartPulse },
      { label: "Diet Kitchen", icon: CookingPot },
      { label: "24/7 Transit", icon: Ambulance },
    ],
  },
  {
    id: "tourism",
    title: "Wanderer",
    tag: "Heritage",
    tagIcon: Compass,
    highlight: "Old City",
    subtitle: "Near Charminar & Chowmahalla Palace",
    imageUrl: "/images/experiences/wanderer-charminar.jpg",
    specs: [
      { label: "Historic Vicinity", icon: Landmark },
      { label: "Flex Check-in", icon: Clock },
      { label: "Verified Safety", icon: ShieldCheck },
    ],
  },
  {
    id: "corporate",
    title: "Corporate & Executive Stay",
    tag: "Work & Executive",
    tagIcon: Briefcase,
    highlight: "Fiber Wi-Fi",
    subtitle: "Dedicated work desk, silent zone & GST invoice",
    imageUrl: "/images/experiences/desk-cand1.jpg",
    specs: [
      { label: "Fiber Wi-Fi", icon: Wifi },
      { label: "Work Desk", icon: Laptop },
      { label: "Power Backup", icon: Zap },
    ],
  },
  {
    id: "family",
    title: "Family & Long Stay",
    tag: "Spacious Suites",
    tagIcon: Home,
    highlight: "Up to 25% Off",
    subtitle: "Multi-bedroom flats with full modular kitchen",
    imageUrl: "/images/flats/flat-3bhk-luxury.jpg",
    specs: [
      { label: "Up to 12 Guests", icon: Users },
      { label: "Modular Kitchen", icon: CookingPot },
      { label: "Alternate Clean", icon: Sparkles },
    ],
  },
];

interface StayExperiencesProps {
  className?: string;
}

export function StayExperiences({ className }: StayExperiencesProps) {
  const [favorites, setFavorites] = React.useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="experiences"
      className={cn(
        "relative w-full bg-[#121316] text-[#F5F5F7] py-16 sm:py-20 lg:py-24 border-t border-[#2E3038] select-none",
        className
      )}
      aria-labelledby="experiences-heading"
    >
      {/* Subtle Ambient Lighting */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(212,175,55,0.025),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold tracking-[0.2em] text-[#C5A880] uppercase">
                STAYS DESIGNED AROUND YOU
              </span>
            </div>

            {/* Heading */}
            <h2
              id="experiences-heading"
              className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-semibold tracking-tight text-[#F5F5F7] leading-tight text-balance"
            >
              A stay tailored to your <span className="text-[#D4AF37]">journey.</span>
            </h2>

            {/* Supporting Text */}
            <p className="mt-3 text-xs sm:text-sm md:text-base text-[#A1A1AA] font-sans font-normal leading-relaxed text-balance">
              Whether visiting Hyderabad for medical care, heritage tourism, executive business, or family holidays, our serviced residences provide the right atmosphere and support.
            </p>
          </div>

          <Link
            href="/#flats"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#F5F5F7] hover:text-[#D4AF37] transition-colors whitespace-nowrap group shrink-0"
          >
            <span>Explore All Stays</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4-Card Responsive Grid: Clean, Spacious, Minimal Design */}
        <div className="mt-10 sm:mt-12 lg:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STAY_EXPERIENCES.map((exp) => {
            const TagIcon = exp.tagIcon;
            const isFav = !!favorites[exp.id];

            return (
              <Link
                key={exp.id}
                href="/#flats"
                className="group relative flex flex-col justify-between h-full rounded-3xl bg-[#1C1E24] border border-[#2E3038] overflow-hidden transition-all duration-300 hover:border-[#D4AF37]/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.65)] hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] block"
                aria-labelledby={`exp-title-${exp.id}`}
              >
                {/* Visual Image Header (4:3 Aspect Ratio) */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#14161D]">
                  <Image
                    src={exp.imageUrl}
                    alt={exp.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Top-Left Floating Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white px-3 py-1.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/10 shadow-sm">
                      <TagIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{exp.tag}</span>
                    </span>
                  </div>

                  {/* Top-Right Floating Heart Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(exp.id, e)}
                    className="absolute top-3.5 right-3.5 z-10 h-8.5 w-8.5 rounded-full bg-white/95 hover:bg-white text-neutral-800 shadow-md flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer focus:outline-none"
                    aria-label={`Save ${exp.title} to favorites`}
                  >
                    <Heart
                      className={cn(
                        "w-4 h-4 transition-colors",
                        isFav ? "fill-[#D4AF37] text-[#D4AF37]" : "text-neutral-700"
                      )}
                    />
                  </button>
                </div>

                {/* Card Content Body: Exactly 3 Breathable Rows */}
                <div className="p-5 sm:p-5.5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Row 1: Title (Left) & Highlight (Right) on Same Baseline */}
                    <div className="flex items-baseline justify-between gap-2">
                      <h3
                        id={`exp-title-${exp.id}`}
                        className="font-heading text-lg font-semibold text-[#F5F5F7] tracking-tight group-hover:text-[#D4AF37] transition-colors leading-snug truncate"
                      >
                        {exp.title}
                      </h3>
                      <div className="text-right shrink-0">
                        <span className="font-heading text-xs font-semibold text-[#D4AF37] bg-[#14161D] px-2 py-0.5 rounded-md border border-[#2E3038]">
                          {exp.highlight}
                        </span>
                      </div>
                    </div>

                    {/* Row 2: Subtitle matching Reference Location line */}
                    <p className="mt-1.5 text-xs text-[#A1A1AA] font-sans truncate">
                      {exp.subtitle}
                    </p>
                  </div>

                  {/* Row 3: 3 Specs with Outline Icons */}
                  <div className="mt-5 pt-0 flex items-center justify-between text-xs text-[#A1A1AA]">
                    {exp.specs.map((spec) => {
                      const SpecIcon = spec.icon;
                      return (
                        <div key={spec.label} className="flex items-center gap-1.5">
                          <SpecIcon className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                          <span className="font-medium text-[#F5F5F7]/90 leading-none">
                            {spec.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Experience Policy Footnote */}
        <div className="mt-10 sm:mt-12 rounded-2xl bg-[#1C1E24]/70 border border-[#2E3038] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-xs text-[#A1A1AA] shadow-sm">
          <div className="h-8 w-8 rounded-xl bg-[#121316] border border-[#2E3038] flex items-center justify-center text-[#D4AF37] shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <div className="flex-1 text-[11.5px] sm:text-xs leading-relaxed text-[#A1A1AA]">
            <strong className="text-[#F5F5F7] font-medium">Included Standard Across All Experiences:</strong> Complimentary housekeeping on alternate days, high-speed Wi-Fi, 100% power backup, and 24/7 guest assistance desk. Medical equipment setup and airport/hospital transit assistance can be coordinated with our front desk prior to check-in.
          </div>
        </div>
      </div>
    </section>
  );
}
