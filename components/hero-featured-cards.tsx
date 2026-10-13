"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// =========================================================================
// 4 CLEAN, MINIMAL STAY PURPOSE CARDS
// Inspired by Image 2: Simple, compact cards with framed imagery and clean bottom labels.
// No heavy badges, no paragraph clutter, just pure luxury and visual clarity.
// =========================================================================

export const FEATURED_PURPOSES = [
  {
    id: "medistay",
    title: "Medistay Healthcare",
    imageUrl: "/images/experiences/medistay-luxury-suite.jpg",
    href: "/#healthcare",
  },
  {
    id: "tourism",
    title: "Heritage & Tourism",
    imageUrl: "/images/branch-moghal-pura.jpg",
    href: "/#flats?purpose=tourism",
  },
  {
    id: "wedding",
    title: "Family & Wedding Stay",
    imageUrl: "/images/flats/flat-3bhk-luxury.jpg",
    href: "/#flats?purpose=wedding",
  },
  {
    id: "corporate",
    title: "Corporate Executive",
    imageUrl: "/images/experiences/corporate-luxury-desk.jpg",
    href: "/#flats?purpose=corporate",
  },
];

interface HeroFeaturedCardsProps {
  className?: string;
}

export function HeroFeaturedCards({ className }: HeroFeaturedCardsProps) {
  return (
    <div
      className={cn("w-full select-none max-w-4xl mx-auto", className)}
      aria-label="FLATEL Stay Categories"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {FEATURED_PURPOSES.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            onClick={() => {
              if (typeof window !== "undefined") {
                const hash = card.href.replace("/", "");
                window.location.hash = hash;
                window.dispatchEvent(new HashChangeEvent("hashchange"));
              }
            }}
            className={cn(
              "group relative flex flex-col justify-between rounded-2xl overflow-hidden",
              "bg-[#161821] border border-[#D4AF37]/20",
              "hover:border-[#D4AF37] hover:shadow-[0_12px_28px_rgba(212,175,55,0.18)]",
              "hover:-translate-y-1 transition-all duration-300",
              "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            )}
          >
            {/* Framed Image Container with subtle inner padding (matching Image 2) */}
            <div className="p-2 sm:p-2.5 pb-1">
              <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#0D0F14]">
                <Image
                  src={card.imageUrl}
                  alt={card.title}
                  fill
                  className="object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  priority
                />
                {/* Subtle soft dark gradient overlay for depth */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Bottom Label Pill (Simple, clean, exactly like Image 2) */}
            <div className="p-2 sm:p-2.5 pt-1">
              <div
                className={cn(
                  "w-full py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-xl",
                  "bg-[#101218] border border-white/5",
                  "group-hover:bg-[#1A1D27] group-hover:border-[#D4AF37]/40",
                  "flex items-center justify-between gap-1.5 transition-all duration-200"
                )}
              >
                <span className="text-xs sm:text-[13px] font-medium text-white group-hover:text-[#E5B54F] transition-colors truncate">
                  {card.title}
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
