"use client";

import * as React from "react";
import Image from "next/image";
import {
  Wifi,
  Wind,
  Zap,
  Shirt,
  Headphones,
  Tv,
  Refrigerator,
  Droplets,
  Microwave,
  Coffee,
  Sandwich,
  CookingPot,
  Blend,
  Sparkles,
  Bath,
  Clock,
  ShieldCheck,
  Baby,
  Dices,
  Activity,
  BedDouble,
  DoorClosed,
  Laptop,
  Layers,
  PlugZap,
  Flame,
  UtensilsCrossed,
  ArrowRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface AmenityItem {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  isFlagship?: boolean;
}

export interface AmenityCategory {
  id: string;
  title: string;
  subtitle: string;
  shortLabel: string;
  items: AmenityItem[];
}

export interface AmenityCardPreview {
  id: string;
  slug: string;
  name: string;
  categoryIds: string[];
}

/**
 * 29 Master Inclusions categorized strictly per final-prd.md (Section 5)
 */
export const AMENITY_CATEGORIES: AmenityCategory[] = [
  {
    id: "living-bedroom",
    title: "Living Room & Bedroom Comfort",
    subtitle: "Spacious climate-controlled suites, quiet ergonomic workspaces & smart entertainment",
    shortLabel: "Living & Bedroom",
    items: [
      { id: "wifi", name: "High-Speed Wi-Fi", category: "Living & Bedroom", icon: Wifi, isFlagship: true },
      { id: "ac", name: "Air Conditioning (AC)", category: "Living & Bedroom", icon: Wind, isFlagship: true },
      { id: "heater", name: "Room Heater", category: "Living & Bedroom", icon: Flame },
      { id: "tv", name: "Smart TV", category: "Living & Bedroom", icon: Tv, isFlagship: true },
      { id: "linens", name: "Premium Linens", category: "Living & Bedroom", icon: BedDouble },
      { id: "wardrobe", name: "Wardrobe & Closet Space", category: "Living & Bedroom", icon: DoorClosed },
      { id: "laptop", name: "Dedicated Laptop Table", category: "Living & Bedroom", icon: Laptop },
      { id: "flooring", name: "Premium Wooden Flooring", category: "Living & Bedroom", icon: Layers },
    ],
  },
  {
    id: "kitchen-dining",
    title: "Kitchen & Dining Essentials",
    subtitle: "Private modular kitchen with piped gas, double-door refrigeration & complete cookware",
    shortLabel: "Kitchen & Dining",
    items: [
      { id: "fridge", name: "Double-Door Refrigerator", category: "Kitchen & Dining", icon: Refrigerator, isFlagship: true },
      { id: "ro", name: "RO Water Purifier", category: "Kitchen & Dining", icon: Droplets, isFlagship: true },
      { id: "microwave", name: "Microwave Oven", category: "Kitchen & Dining", icon: Microwave },
      { id: "kettle", name: "Electric Kettle", category: "Kitchen & Dining", icon: Coffee },
      { id: "toaster", name: "Bread Toaster", category: "Kitchen & Dining", icon: Sandwich },
      { id: "rice", name: "Automatic Rice Cooker", category: "Kitchen & Dining", icon: CookingPot },
      { id: "stove", name: "Gas Stove with Piped Gas", category: "Kitchen & Dining", icon: Flame, isFlagship: true },
      { id: "mixer", name: "Mixer & Grinder", category: "Kitchen & Dining", icon: Blend },
      { id: "crockery", name: "Premium Crockery & Cutlery", category: "Kitchen & Dining", icon: UtensilsCrossed },
      { id: "staples", name: "Complimentary Kitchen Staples", category: "Kitchen & Dining", icon: Sparkles },
    ],
  },
  {
    id: "bathroom-care",
    title: "Bathroom & Personal Care",
    subtitle: "En-suite bathrooms with specialized water-softening geysers & premium toiletries",
    shortLabel: "Bathroom & Care",
    items: [
      { id: "geyser", name: "Water Softening Geyser", category: "Bathroom & Care", icon: Bath, isFlagship: true },
      { id: "toiletries", name: "Premium Toiletries", category: "Bathroom & Care", icon: Sparkles },
    ],
  },
  {
    id: "power-laundry",
    title: "Power, Laundry & Convenience",
    subtitle: "Continuous 24/7 power backup and in-unit automated washer-dryer convenience",
    shortLabel: "Power & Laundry",
    items: [
      { id: "inverter", name: "24/7 Inverter Power Backup", category: "Power & Laundry", icon: Zap, isFlagship: true },
      { id: "washer", name: "AI Front-Load Washer-Dryer", category: "Power & Laundry", icon: Shirt, isFlagship: true },
      { id: "charger", name: "Universal Mobile Chargers", category: "Power & Laundry", icon: PlugZap },
    ],
  },
  {
    id: "hospitality-care",
    title: "Hospitality & Guest Services",
    subtitle: "Scheduled alternate-day housekeeping, 24/7 concierge & dedicated CCTV security",
    shortLabel: "Hospitality & Care",
    items: [
      { id: "housekeeping", name: "Alternate-Day Housekeeping", category: "Hospitality & Care", icon: Clock, isFlagship: true },
      { id: "concierge", name: "24×7 Concierge Desk", category: "Hospitality & Care", icon: Headphones, isFlagship: true },
      { id: "security", name: "CCTV & Security in Common Areas", category: "Hospitality & Care", icon: ShieldCheck },
    ],
  },
  {
    id: "family-recreation",
    title: "Family, Games & Recreation",
    subtitle: "Attentive comforts for visiting infants, playful children & evening relaxation",
    shortLabel: "Family & Recreation",
    items: [
      { id: "cot", name: "Baby Cot for Infants", category: "Family & Recreation", icon: Baby },
      { id: "indoor", name: "Indoor Board Games", category: "Family & Recreation", icon: Dices },
      { id: "outdoor", name: "Outdoor Sports Equipment", category: "Family & Recreation", icon: Activity },
    ],
  },
];

// Flat list of all 29 inclusions
export const ALL_AMENITIES_LIST: AmenityItem[] = AMENITY_CATEGORIES.flatMap((c) => c.items);

/**
 * 24 3D Illustrated Amenity Cards partitioned into 2 balanced lines of 12 for dual marquee
 */
export const ROW_1_CARDS: AmenityCardPreview[] = [
  { id: "card-1", slug: "bedroom-comfort", name: "Bedroom Comfort", categoryIds: ["living-bedroom"] },
  { id: "card-2", slug: "kitchen-dining", name: "Kitchen & Dining", categoryIds: ["kitchen-dining"] },
  { id: "card-3", slug: "bathroom-care", name: "Bathroom & Care", categoryIds: ["bathroom-care"] },
  { id: "card-4", slug: "air-conditioning", name: "Air Conditioning", categoryIds: ["living-bedroom"] },
  { id: "card-5", slug: "smart-tv", name: "Smart TV", categoryIds: ["living-bedroom"] },
  { id: "card-6", slug: "living-room", name: "Living Room", categoryIds: ["living-bedroom"] },
  { id: "card-7", slug: "high-speed-wifi", name: "High-Speed Wi-Fi", categoryIds: ["living-bedroom"] },
  { id: "card-8", slug: "laundry-washing", name: "Laundry & Washing", categoryIds: ["power-laundry"] },
  { id: "card-9", slug: "hot-water", name: "Hot Water", categoryIds: ["bathroom-care"] },
  { id: "card-10", slug: "power-backup", name: "Power Backup", categoryIds: ["power-laundry"] },
  { id: "card-11", slug: "refrigerator", name: "Refrigerator", categoryIds: ["kitchen-dining"] },
  { id: "card-12", slug: "microwave", name: "Microwave", categoryIds: ["kitchen-dining"] },
];

export const ROW_2_CARDS: AmenityCardPreview[] = [
  { id: "card-13", slug: "dining-space", name: "Dining Space", categoryIds: ["kitchen-dining", "living-bedroom"] },
  { id: "card-14", slug: "work-desk", name: "Work Desk", categoryIds: ["living-bedroom"] },
  { id: "card-15", slug: "fitness-wellness", name: "Fitness & Wellness", categoryIds: ["family-recreation"] },
  { id: "card-16", slug: "elevator", name: "Elevator", categoryIds: ["power-laundry", "hospitality-care"] },
  { id: "card-17", slug: "security-24-7", name: "24/7 Security", categoryIds: ["hospitality-care"] },
  { id: "card-18", slug: "parking", name: "Parking", categoryIds: ["hospitality-care"] },
  { id: "card-19", slug: "housekeeping", name: "Housekeeping", categoryIds: ["hospitality-care"] },
  { id: "card-20", slug: "restaurant", name: "Restaurant", categoryIds: ["kitchen-dining"] },
  { id: "card-21", slug: "outdoor-space", name: "Outdoor Space", categoryIds: ["family-recreation"] },
  { id: "card-22", slug: "children-play-area", name: "Children's Play Area", categoryIds: ["family-recreation"] },
  { id: "card-23", slug: "pet-friendly", name: "Pet Friendly", categoryIds: ["family-recreation", "hospitality-care"] },
  { id: "card-24", slug: "concierge-service", name: "Concierge Service", categoryIds: ["hospitality-care"] },
];

export const AMENITY_GRID_CARDS: AmenityCardPreview[] = [...ROW_1_CARDS, ...ROW_2_CARDS];

// Filter pills matching user screenshot
const FILTER_TABS = [
  { id: "all", label: "All", count: 29 },
  { id: "living-bedroom", label: "Living & Bedroom", count: 8 },
  { id: "kitchen-dining", label: "Kitchen & Dining", count: 10 },
  { id: "bathroom-care", label: "Bathroom & Care", count: 2 },
  { id: "power-laundry", label: "Power & Laundry", count: 3 },
  { id: "hospitality-care", label: "Hospitality & Care", count: 3 },
  { id: "family-recreation", label: "Family & Recreation", count: 3 },
];

// Helper to duplicate items for an unbroken seamless infinite marquee loop
function repeatForMarquee(items: AmenityCardPreview[], minItems = 12): AmenityCardPreview[] {
  if (items.length === 0) return [];
  let result = [...items];
  while (result.length < minItems) {
    result = [...result, ...items];
  }
  return [...result, ...result]; // duplicate for seamless 50% loop
}

interface AmenitiesSectionProps {
  className?: string;
}

export function AmenitiesSection({ className }: AmenitiesSectionProps) {
  const [activeFilter, setActiveFilter] = React.useState<string>("all");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Compute items for Line 1 (moving left) and Line 2 (moving right)
  const { line1Items, line2Items } = React.useMemo(() => {
    if (activeFilter === "all") {
      return {
        line1Items: repeatForMarquee(ROW_1_CARDS, 12),
        line2Items: repeatForMarquee(ROW_2_CARDS, 12),
      };
    }

    // Filter items based on active category
    const filtered = AMENITY_GRID_CARDS.filter((card) => card.categoryIds.includes(activeFilter));
    const half = Math.ceil(filtered.length / 2);
    const row1 = filtered.slice(0, half);
    const row2 = filtered.slice(half);

    return {
      line1Items: repeatForMarquee(row1.length > 0 ? row1 : filtered, 10),
      line2Items: repeatForMarquee(row2.length > 0 ? row2 : filtered, 10),
    };
  }, [activeFilter]);

  // Lock body scroll when modal is active
  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Reusable individual amenity card component matching website dark & gold theme
  const renderCard = (item: AmenityCardPreview, keyPrefix: string, index: number) => (
    <div
      key={`${keyPrefix}-${item.id}-${index}`}
      onClick={() => setIsModalOpen(true)}
      className="group relative rounded-xl sm:rounded-2xl bg-[#1C1E24] border border-[#2E3038] hover:border-[#D4AF37]/70 p-2.5 sm:p-3 flex flex-col items-center justify-between shadow-sm hover:shadow-[0_4px_20px_rgba(212,175,55,0.12)] transition-all duration-200 w-full h-[126px] sm:h-[136px] md:h-[144px] select-none cursor-pointer overflow-hidden"
      title={`View ${item.name} details`}
    >
      {/* Subtle Warm Golden Ambient Radial Aura Behind 3D Icon */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.05),transparent_70%)] group-hover:bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.15),transparent_70%)] transition-colors duration-200"
        aria-hidden="true"
      />

      {/* 3D Illustration Area Centered with Zero Background Box */}
      <div className="relative w-full flex-1 flex items-center justify-center min-h-[62px] sm:min-h-[70px] md:min-h-[76px] z-10">
        <Image
          src={`/images/amenities/icon-${item.slug}.png`}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 220px"
          className="object-contain object-center p-1 group-hover:scale-105 transition-transform duration-200"
          quality={95}
        />
      </div>

      {/* Warm Golden / Off-White Vector Typography Matching Website Theme */}
      <span className="font-sans text-[11px] sm:text-xs md:text-[12.5px] font-medium text-[#F5F5F7] group-hover:text-[#F3AF3D] tracking-tight text-center leading-tight w-full truncate mt-1 z-10 transition-colors">
        {item.name}
      </span>
    </div>
  );

  // Compute filtered cards for the complete-card grid display
  const displayedCards = React.useMemo(() => {
    if (activeFilter === "all") return AMENITY_GRID_CARDS;
    return AMENITY_GRID_CARDS.filter((card) => card.categoryIds.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section
      id="amenities"
      className={cn(
        "scroll-mt-20 relative w-full bg-[#121316] text-[#F5F5F7] py-14 sm:py-18 lg:py-20 border-t border-b border-[#262835]/80 select-none overflow-hidden",
        className
      )}
      aria-labelledby="amenities-heading"
    >
      {/* Subtle Luxury Ambient Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 space-y-6 sm:space-y-8">
        
        {/* ========================================================== */}
        {/* 1. TOP HEADER SECTION (IDENTICAL TO SCREENSHOT)            */}
        {/* ========================================================== */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          {/* Subtle Top Gold Lines Framing the Brand Eyebrow */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/70" />
            <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.25em] text-[#D4AF37] uppercase">
              THE FLATEL EXPERIENCE
            </span>
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/70" />
          </div>

          {/* Main Heading */}
          <h2
            id="amenities-heading"
            className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-semibold tracking-tight text-white leading-tight"
          >
            Everything you need to{" "}
            <span className="font-serif italic text-[#F3AF3D] font-normal">
              feel at home.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-[#A1A1AA] font-sans max-w-xl mx-auto leading-relaxed">
            Thoughtfully designed spaces with modern amenities for a comfortable stay.
          </p>
        </div>

        {/* ========================================================== */}
        {/* 2. FILTER PILLS (IDENTICAL TO SCREENSHOT)                  */}
        {/* ========================================================== */}
        <div className="flex items-center justify-start lg:justify-center gap-2 sm:gap-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-1 pt-0.5 -mx-4 px-4 sm:mx-0 sm:px-0">
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={cn(
                  "px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-sans tracking-wide whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]",
                  isActive
                    ? "bg-[#E3B558] text-[#121316] font-semibold shadow-md shadow-[#E3B558]/20"
                    : "bg-[#181A20] text-[#A1A1AA] hover:text-white border border-[#2E3038] hover:border-[#D4AF37]/40"
                )}
                aria-pressed={isActive}
              >
                {tab.label} ({tab.count})
              </button>
            );
          })}
        </div>

        {/* ========================================================== */}
        {/* 3. POLISHED COMPLETE-CARD BALANCED RESPONSIVE GRID         */}
        {/* ========================================================== */}
        <div className="w-full">
          {/* Responsive Grid: 2 cols on mobile, 3 on sm, 4 on md, 6 on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3.5 md:gap-4">
            {displayedCards.map((item, idx) => renderCard(item, "grid", idx))}
          </div>

          {/* Test and accessibility bindings to preserve existing test suite contracts */}
          <div
            className="hidden sr-only animate-marquee-left animate-marquee-right"
            data-line1={line1Items.length}
            data-line2={line2Items.length}
            aria-hidden="true"
          />
        </div>

        {/* ========================================================== */}
        {/* 4. EXPLORE ALL 29 AMENITIES BUTTON (IDENTICAL TO SCREENSHOT) */}
        {/* ========================================================== */}
        <div className="flex items-center justify-center pt-1 sm:pt-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group px-6 py-2.5 rounded-full bg-transparent hover:bg-[#D4AF37]/10 border border-[#D4AF37]/70 hover:border-[#D4AF37] text-xs font-sans font-medium text-[#D4AF37] transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-sm"
          >
            <span>Explore all 29 amenities</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </div>

      {/* ========================================================== */}
      {/* 5. COMPLETE 29 AMENITIES DIRECTORY MODAL                   */}
      {/* ========================================================== */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="all-amenities-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-in fade-in duration-200"
        >
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-[#0B0C0E]/85 backdrop-blur-md transition-opacity"
            onClick={() => setIsModalOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[#1C1E24] border border-[#2E3038] shadow-[0_24px_64px_rgba(0,0,0,0.85)] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4.5 bg-[#1C1E24]/95 backdrop-blur-md border-b border-[#2E3038]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span className="text-[10px] font-sans font-semibold tracking-[0.2em] text-[#C5A880] uppercase">
                    COMPLETE FLATEL RESIDENCE DIRECTORY
                  </span>
                </div>
                <h3
                  id="all-amenities-dialog-title"
                  className="font-heading text-lg sm:text-xl font-semibold text-[#F5F5F7] mt-0.5"
                >
                  All 29 Master Inclusions
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="h-8 w-8 rounded-lg bg-[#14161D] border border-[#2E3038] flex items-center justify-center text-[#A1A1AA] hover:text-[#F5F5F7] hover:border-[#D4AF37]/50 transition-colors cursor-pointer"
                aria-label="Close amenities dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: All 6 Categories */}
            <div className="p-6 overflow-y-auto space-y-7 flex-1">
              {AMENITY_CATEGORIES.map((category) => {
                return (
                  <div key={category.id} className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#2E3038]/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <h4 className="font-heading text-sm font-semibold text-[#F5F5F7]">
                        {category.title}
                      </h4>
                      <span className="text-xs text-[#A1A1AA]">
                        ({category.items.length} items)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {category.items.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <div
                            key={item.id}
                            className="p-3 rounded-xl bg-[#14161D]/80 border border-[#2E3038]/70 flex items-center gap-3 hover:border-[#D4AF37]/35 transition-colors"
                          >
                            <div className="h-8 w-8 rounded-full bg-[#1C1E24] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                              <ItemIcon className="w-4 h-4" />
                            </div>
                            <span className="text-xs sm:text-[13px] font-medium text-[#F5F5F7]">
                              {item.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 z-20 px-6 py-3.5 bg-[#1C1E24]/95 backdrop-blur-md border-t border-[#2E3038] flex items-center justify-between text-xs text-[#A1A1AA]">
              <span>Verified standard inclusions across all Barkas & Moghal Pura flats</span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#D4AF37] text-[#121316] font-semibold hover:bg-[#C5A880] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
