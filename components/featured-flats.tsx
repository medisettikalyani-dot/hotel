"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  BedDouble,
  ArrowRight,
  MapPin,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice, getBranchBySlug } from "@/lib/constants";
import { MOCK_ROOMS } from "@/lib/mock-rooms";

interface FeaturedFlatsProps {
  className?: string;
}

// Flat photography mapping (Curated high-res hero photos)
const FLAT_IMAGES: Record<string, string> = {
  "1bhk": "/images/flats/flat-1bhk-luxury.jpg",
  "2bhk": "/images/flats/flat-2bhk-luxury.jpg",
  "3bhk": "/images/flats/flat-3bhk-luxury.jpg",
  "4bhk": "/images/flats/flat-4bhk-luxury.jpg",
};

// Distinct flat titles and concise specifications
const FLAT_CONFIG: Record<
  string,
  {
    title: string;
    capacity: string;
    bedSpec: string;
  }
> = {
  "1bhk": {
    title: "1 BHK Deluxe Suite",
    capacity: "Up to 4 Guests",
    bedSpec: "1 Master Bedroom",
  },
  "2bhk": {
    title: "2 BHK Family Residence",
    capacity: "Up to 6 Guests",
    bedSpec: "2 Master Bedrooms",
  },
  "3bhk": {
    title: "3 BHK Grand Residence",
    capacity: "Up to 9 Guests",
    bedSpec: "3 Master Bedrooms",
  },
  "4bhk": {
    title: "4 BHK Royal Penthouse",
    capacity: "Up to 12 Guests",
    bedSpec: "4 Master Bedrooms",
  },
};

export function FeaturedFlats({ className }: FeaturedFlatsProps) {
  const [rooms, setRooms] = React.useState(MOCK_ROOMS);
  // Filters
  const [filterType, setFilterType] = React.useState<string>("all");
  const [filterBranch, setFilterBranch] = React.useState<string>("all");
  const [activePurpose, setActivePurpose] = React.useState<string | null>(null);

  // Dynamic fetch from live database API
  React.useEffect(() => {
    fetch("/api/inventory")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.units && data.units.length > 0) {
          setRooms(data.units);
        }
      })
      .catch(() => {});
  }, []);

  // Sync with URL query parameters on mount & navigation
  React.useEffect(() => {
    const handleUrlParams = () => {
      if (typeof window === "undefined") return;

      let purpose = new URLSearchParams(window.location.search).get("purpose");
      let branch = new URLSearchParams(window.location.search).get("branch");
      let flatType = new URLSearchParams(window.location.search).get("flatType");

      if (window.location.hash.includes("?")) {
        const hashQuery = window.location.hash.split("?")[1];
        const hashParams = new URLSearchParams(hashQuery);
        if (!purpose) purpose = hashParams.get("purpose");
        if (!branch) branch = hashParams.get("branch");
        if (!flatType) flatType = hashParams.get("flatType");
      }

      if (purpose) setActivePurpose(purpose);
      if (branch === "barkas-salala" || branch === "moghal-pura") setFilterBranch(branch);
      if (flatType) {
        setFilterType(flatType);
      }
    };

    handleUrlParams();
    window.addEventListener("popstate", handleUrlParams);
    window.addEventListener("hashchange", handleUrlParams);
    return () => {
      window.removeEventListener("popstate", handleUrlParams);
      window.removeEventListener("hashchange", handleUrlParams);
    };
  }, []);

  // Filtered rooms list
  const filteredRooms = React.useMemo(() => {
    return rooms.filter((room) => {
      if (filterBranch !== "all" && room.branchSlug !== filterBranch) return false;
      if (filterType !== "all" && room.slug !== filterType) return false;
      return true;
    });
  }, [rooms, filterBranch, filterType]);


  return (
    <section
      id="flats"
      className={cn(
        "relative w-full bg-[#121316] text-[#F5F5F7] py-14 sm:py-18 lg:py-20 border-t border-[#262835] scroll-mt-16 sm:scroll-mt-20",
        className
      )}
      aria-labelledby="featured-flats-heading"
    >
      <div id="properties" className="sr-only" aria-hidden="true" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* ========================================================== */}
        {/* SECTION HEADER: States inclusions ONCE; zero card clutter  */}
        {/* ========================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-[11px] font-sans font-bold tracking-[0.25em] text-[#D4AF37] uppercase">
            HANDPICKED RESIDENCES
          </span>
          <h2
            id="featured-flats-heading"
            className="mt-1.5 font-heading text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white"
          >
            Serviced Flats in <span className="text-[#D4AF37]">Hyderabad</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#A1A1AA] max-w-lg mx-auto">
            Private modular kitchen, split AC, high-speed Wi-Fi &amp; daily housekeeping included. Lock dates with 20% advance.
          </p>

          {/* Active Purpose Filter Pill */}
          {activePurpose && (
            <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-xs text-[#E5B54F] animate-in fade-in duration-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-semibold capitalize">{activePurpose} Stay Curated</span>
              <button
                type="button"
                onClick={() => setActivePurpose(null)}
                className="ml-1 text-white/70 hover:text-white underline text-[11px] cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}

          {/* Clean, Non-wrapping Filter Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-4 sm:mt-5 max-w-full">
            {/* Flat Size Segmented Control */}
            <div className="inline-flex items-center p-1 rounded-full bg-[#181A22] border border-white/10 shadow-xs max-w-full overflow-x-auto no-scrollbar">
              {[
                { id: "all", label: "All (4)" },
                { id: "1bhk", label: "1 BHK" },
                { id: "2bhk", label: "2 BHK" },
                { id: "3bhk", label: "3 BHK" },
                { id: "4bhk", label: "4 BHK" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterType(tab.id as typeof filterType)}
                  className={cn(
                    "px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap",
                    filterType === tab.id
                      ? "bg-[#D4AF37] text-[#121316] font-bold shadow-xs"
                      : "text-[#A1A1AA] hover:text-white"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Branch Location Segmented Control */}
            <div className="inline-flex items-center p-1 rounded-full bg-[#181A22] border border-white/10 shadow-xs max-w-full overflow-x-auto no-scrollbar">
              {[
                { id: "all", label: "All Branches" },
                { id: "moghal-pura", label: "Moghal Pura" },
                { id: "barkas-salala", label: "Barkas Salala" },
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setFilterBranch(b.id as typeof filterBranch)}
                  className={cn(
                    "px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap",
                    filterBranch === b.id
                      ? "bg-white/15 text-white font-semibold"
                      : "text-[#8E909B] hover:text-white"
                  )}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* 4 CARDS: DIRECT LINKS TO DEDICATED APARTMENT VIEW          */}
        {/* ========================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredRooms.map((room) => {
            const branch = room.branchSlug ? getBranchBySlug(room.branchSlug) : undefined;
            const imageUrl = FLAT_IMAGES[room.slug] || "/images/flats/flat-1bhk-luxury.jpg";
            const cfg = FLAT_CONFIG[room.slug] || {
              title: room.title,
              capacity: `Up to ${room.maxAdults} Guests`,
              bedSpec: room.specs.bedrooms,
            };

            return (
              <Link
                key={room.id}
                href={activePurpose ? `/properties/${room.slug}?purpose=${activePurpose}` : `/properties/${room.slug}`}
                className="group relative flex flex-col justify-between rounded-2xl overflow-hidden bg-[#161822] border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-[0_16px_36px_rgba(212,175,55,0.18)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Photo Top Container: Clean with only single Branch Location Tag */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#0E1015]">
                  <Image
                    src={imageUrl}
                    alt={cfg.title}
                    fill
                    className="object-cover object-center group-hover:scale-106 transition-transform duration-600 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Single Clean Location Badge */}
                  {branch && (
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-white px-2.5 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/10 shadow-xs">
                        <MapPin className="w-2.5 h-2.5 text-[#D4AF37]" />
                        <span>{branch.name}</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body: Distinct Titles & Clean Specs */}
                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    {/* Distinct Flat Title */}
                    <h3 className="font-heading text-base font-bold text-white tracking-tight group-hover:text-[#D4AF37] transition-colors">
                      {cfg.title}
                    </h3>

                    {/* Clean Capacity & Bedroom Spec without trailing dots */}
                    <p className="text-xs text-[#A1A1AA] mt-1">
                      {cfg.capacity} · {cfg.bedSpec}
                    </p>
                  </div>

                  {/* Pricing & Single Direct Action */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-heading text-lg font-bold text-[#D4AF37]">
                          {formatPrice(room.basePricePerNight)}
                        </span>
                        <span className="text-[11px] text-[#8E909B]">/ night</span>
                      </div>
                      <span className="text-[10px] text-[#A1A1AA] block">Lock with 20% advance</span>
                    </div>

                    {/* Single Crisp Button */}
                    <span className="px-3.5 py-1.5 rounded-lg bg-[#D4AF37] group-hover:bg-[#E5B54F] text-[#121316] font-bold text-xs tracking-wide transition-all inline-flex items-center gap-1 shadow-xs">
                      <span>View &amp; Book</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
