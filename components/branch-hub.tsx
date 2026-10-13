"use client";

import * as React from "react";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  Plane,
  Landmark,
  Compass,
  Navigation,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BRANCHES } from "@/lib/constants";

export interface BranchHubItem {
  id: string;
  name: string;
  slug: string;
  locationLabel: string;
  verifiedAddress: string;
  description: string;
  imageUrl: string;
  inventorySummary: string;
  startingPrice: string;
  googleMapsUrl: string;
  highlights: string[];
}

export interface BranchMapLocation {
  id: "moghal-pura" | "barkas-salala";
  code: string;
  name: string;
  slug: string;
  tagline: string;
  badge: string;
  verifiedAddress: string;
  description: string;
  coordinates: [number, number]; // [Latitude, Longitude]
  startingPrice: string;
  startingPriceNote: string;
  inventorySummary: string;
  imageUrl: string;
  googleMapsUrl: string;
  status: string;
  landmarks: Array<{ name: string; dist: string; time: string }>;
  flats: Array<{ name: string; type: string; rate: string; slug: string }>;
}

const BRANCHES_MAP_DATA: Record<"moghal-pura" | "barkas-salala", BranchMapLocation> = {
  "moghal-pura": {
    id: "moghal-pura",
    code: "BRANCH 01",
    name: "Moghal Pura",
    slug: "moghal-pura",
    tagline: "Historic Old City & Charminar Quarter",
    badge: "HERITAGE, CULTURE & HEALTHCARE",
    verifiedAddress: "Moghal Pura, Near Charminar, Hyderabad, Telangana",
    description:
      "Steps from Charminar and Laad Bazaar. Private 1, 2, and 4 BHK residences with modular kitchens, daily housekeeping, and quiet courtyard tranquility.",
    coordinates: [17.3570, 78.4815],
    startingPrice: "₹2,000",
    startingPriceNote: "20% advance to reserve",
    inventorySummary: "1, 2 & 4 BHK Luxury Residences",
    imageUrl: "/images/branch-moghal-pura.jpg",
    googleMapsUrl: "https://maps.google.com/?q=Moghalpura+Charminar+Hyderabad",
    status: "Active & Accepting Guests",
    landmarks: [
      { name: "Historic Charminar & Laad Bazaar", dist: "800 m", time: "3 mins" },
      { name: "Princess Esra Hospital (Deccan Medical)", dist: "800 m", time: "3 mins" },
      { name: "Chowmahalla Palace", dist: "1.5 km", time: "5 mins" },
      { name: "Salar Jung Museum", dist: "2.0 km", time: "8 mins" },
    ],
    flats: [
      { name: "1 BHK Deluxe Suite", type: "1 BHK", rate: "₹2,000/night", slug: "1bhk" },
      { name: "2 BHK Family Apartment", type: "2 BHK", rate: "₹2,500/night", slug: "2bhk" },
      { name: "4 BHK Grand Presidential", type: "4 BHK", rate: "₹4,000/night", slug: "4bhk" },
    ],
  },
  "barkas-salala": {
    id: "barkas-salala",
    code: "BRANCH 02",
    name: "Barkas Salala",
    slug: "barkas-salala",
    tagline: "Airport Expressway & Medical Hub Corridor",
    badge: "AIRPORT CORRIDOR & MEDICAL ACCESS",
    verifiedAddress: "Barkas Salala, Near Chandrayangutta, Hyderabad, Telangana",
    description:
      "Direct expressway access to Rajiv Gandhi International Airport and healthcare centers. Grand 3 BHK residences ideal for families and medical attendants.",
    coordinates: [17.3185, 78.4905],
    startingPrice: "₹3,000",
    startingPriceNote: "20% advance to reserve",
    inventorySummary: "Two 3 BHK Luxury Residences",
    imageUrl: "/images/branch-barkas-salala.jpg",
    googleMapsUrl: "https://maps.google.com/?q=Barkas+Salala+Hyderabad",
    status: "Active & Accepting Guests",
    landmarks: [
      { name: "Princess Durru Shehvar Hospital", dist: "1.5 km", time: "5 mins" },
      { name: "Owaisi Hospital & Research Centre", dist: "2.8 km", time: "8 mins" },
      { name: "Pahadi Shareef Heritage Markets", dist: "1.0 km", time: "3 mins" },
      { name: "Rajiv Gandhi Intl Airport (RGIA)", dist: "12 km", time: "20 mins" },
    ],
    flats: [
      { name: "3 BHK Royal Suite (Unit 1)", type: "3 BHK", rate: "₹3,000/night", slug: "3bhk" },
      { name: "3 BHK Imperial Residence (Unit 2)", type: "3 BHK", rate: "₹3,000/night", slug: "3bhk" },
    ],
  },
};

interface BranchHubProps {
  className?: string;
}

export function BranchHub({ className }: BranchHubProps) {
  const [activeBranchId, setActiveBranchId] = React.useState<"moghal-pura" | "barkas-salala">("moghal-pura");
  const [isMapReady, setIsMapReady] = React.useState(false);
  const [isTileLoading, setIsTileLoading] = React.useState(true);
  const [hasTileError, setHasTileError] = React.useState(false);

  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const mapInstanceRef = React.useRef<any>(null);
  const markersRef = React.useRef<Record<string, any>>({});

  const currentBranch = BRANCHES_MAP_DATA[activeBranchId];

  // Helper to generate the custom gold Flatel flag pin HTML for Leaflet
  const createMarkerHtml = (branchId: "moghal-pura" | "barkas-salala", isActive: boolean) => {
    const branch = BRANCHES_MAP_DATA[branchId];
    return `
      <div class="relative flatel-marker-pin flex flex-col items-center cursor-pointer select-none" style="transform: translate(-10px, -42px);">
        <!-- Active Beacon Glow Pulse -->
        ${
          isActive
            ? `<div class="absolute -bottom-1 -left-2 w-8 h-8 rounded-full bg-[#D4AF37]/30 border border-[#D4AF37]/90 animate-ping pointer-events-none"></div>
               <div class="absolute -bottom-0.5 -left-1.5 w-7 h-7 rounded-full bg-[#D4AF37]/40 blur-xs pointer-events-none"></div>`
            : ""
        }

        <!-- Custom FLATEL Gold Flag Silhouette Pin -->
        <svg width="40" height="48" viewBox="0 0 40 48" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 4px 10px rgba(0,0,0,0.85));">
          <!-- Top Finial Orb -->
          <circle cx="10" cy="6" r="3.2" fill="${isActive ? "#FFF0B8" : "#D4AF37"}" stroke="${isActive ? "#FFFFFF" : "#FFE79A"}" stroke-width="1.2"/>
          
          <!-- Flagpole -->
          <line x1="10" y1="6" x2="10" y2="44" stroke="${isActive ? "#FFF0B8" : "#D4AF37"}" stroke-width="2.5" stroke-linecap="round"/>
          
          <!-- Base Ground Shadow Point -->
          <ellipse cx="10" cy="45" rx="5" ry="2.2" fill="rgba(0,0,0,0.7)"/>
          
          <!-- Swallowtail Pennant Flag with Gold Gradient -->
          <path d="M11 8H36L30 17.5L36 27H11V8Z" fill="url(#flagGoldGrad_${branchId})" stroke="${isActive ? "#FFF4C2" : "#D4AF37"}" stroke-width="1.2"/>
          
          <!-- 'F' Monogram Crest -->
          <text x="21" y="20.5" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#121316" text-anchor="middle" letter-spacing="0.5">F</text>
          
          <defs>
            <linearGradient id="flagGoldGrad_${branchId}" x1="11" y1="8" x2="36" y2="27" gradientUnits="userSpaceOnUse">
              <stop stop-color="${isActive ? "#FFE79A" : "#F5D061"}"/>
              <stop offset="0.5" stop-color="${isActive ? "#F5D061" : "#D4AF37"}"/>
              <stop offset="1" stop-color="${isActive ? "#C5A880" : "#A57F18"}"/>
            </linearGradient>
          </defs>
        </svg>

        <!-- Compact Label Tooltip -->
        <div class="mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold font-mono tracking-wider shadow-xl transition-all ${
          isActive
            ? "bg-[#1C1E24] text-[#D4AF37] border border-[#D4AF37] scale-105"
            : "bg-[#121316]/90 text-[#F5F5F7] border border-[#2E3038] opacity-90"
        }">
          ${branch.name}
        </div>
      </div>
    `;
  };

  // Initialize Leaflet Map on Mount (Client-Only, Zero SSR window errors)
  React.useEffect(() => {
    let isMounted = true;

    if (!mapContainerRef.current) return;

    // Dynamically load Leaflet safely to guarantee 100% Next.js App Router SSR compatibility
    import("leaflet").then((L) => {
      if (!isMounted || !mapContainerRef.current || mapInstanceRef.current) return;

      const moghalCoords = BRANCHES_MAP_DATA["moghal-pura"].coordinates;
      const barkasCoords = BRANCHES_MAP_DATA["barkas-salala"].coordinates;

      // Fit bounds tightly around the two real branches with balanced padding
      const initialCenter: [number, number] = [17.3378, 78.4860];
      const initialZoom = 13;

      const map = L.map(mapContainerRef.current, {
        center: initialCenter,
        zoom: initialZoom,
        minZoom: 11,
        maxZoom: 18,
        scrollWheelZoom: false, // Prevents scroll-jacking on desktop/mobile
        zoomControl: false, // We customize position to topright so it never collides with overlays
      });

      mapInstanceRef.current = map;

      // Place Zoom controls at top-right to keep bottom and left overlays uncluttered
      L.control.zoom({ position: "topright" }).addTo(map);

      // OpenStreetMap standard tile provider with custom luxury dark filter
      // (100% Free, Zero API Keys Required, No Repeated Watermarks, High Precision Street Map)
      const tileLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
        className: "flatel-dark-tiles",
      }).addTo(map);

      tileLayer.on("loading", () => setIsTileLoading(true));
      tileLayer.on("load", () => {
        setIsTileLoading(false);
        setHasTileError(false);
      });
      tileLayer.on("tileerror", () => {
        setIsTileLoading(false);
        setHasTileError(true);
      });

      // Fit bounds to precisely frame both branches
      map.fitBounds([moghalCoords, barkasCoords], {
        padding: [60, 60],
        maxZoom: 13.5,
      });

      // Create Markers for both verified branches
      const branchKeys: Array<"moghal-pura" | "barkas-salala"> = ["moghal-pura", "barkas-salala"];

      branchKeys.forEach((key) => {
        const data = BRANCHES_MAP_DATA[key];
        const isCurrent = key === activeBranchId;

        const icon = L.divIcon({
          className: isCurrent ? "flatel-marker-active" : "",
          html: createMarkerHtml(key, isCurrent),
          iconSize: [40, 48],
          iconAnchor: [10, 44],
        });

        const marker = L.marker(data.coordinates, { icon, title: `Flatel ${data.name}` }).addTo(map);

        marker.on("click", () => {
          setActiveBranchId(key);
          map.flyTo(data.coordinates, 13.8, { duration: 1.0 });
        });

        markersRef.current[key] = marker;
      });

      setIsMapReady(true);
      setIsTileLoading(false);
    });

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current = {};
      }
    };
  }, []);

  // Update marker icons and pan map smoothly whenever activeBranchId changes
  React.useEffect(() => {
    if (!mapInstanceRef.current || !isMapReady) return;

    import("leaflet").then((L) => {
      const branchKeys: Array<"moghal-pura" | "barkas-salala"> = ["moghal-pura", "barkas-salala"];

      branchKeys.forEach((key) => {
        const marker = markersRef.current[key];
        if (marker) {
          const isCurrent = key === activeBranchId;
          const newIcon = L.divIcon({
            className: isCurrent ? "flatel-marker-active" : "",
            html: createMarkerHtml(key, isCurrent),
            iconSize: [40, 48],
            iconAnchor: [10, 44],
          });
          marker.setIcon(newIcon);
        }
      });

      const target = BRANCHES_MAP_DATA[activeBranchId];
      if (target && mapInstanceRef.current) {
        mapInstanceRef.current.flyTo(target.coordinates, 13.8, { duration: 1.0 });
      }
    });
  }, [activeBranchId, isMapReady]);

  const handleSelectBranch = (id: "moghal-pura" | "barkas-salala") => {
    setActiveBranchId(id);
    const target = BRANCHES_MAP_DATA[id];
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(target.coordinates, 13.8, { duration: 1.0 });
    }
  };

  return (
    <section
      id="locations"
      className={cn(
        "relative w-full bg-[#121316] py-16 sm:py-20 lg:py-24 border-t border-[#262835] select-none overflow-hidden",
        className
      )}
      aria-labelledby="branch-hub-heading"
    >
      {/* Anchor alias for #branches navigation */}
      <span id="branches" className="absolute -top-24 pointer-events-none" aria-hidden="true" />

      {/* Subtle Ambient Lighting Glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10 relative z-10 space-y-8 sm:space-y-10">
        
        {/* ========================================================= */}
        {/* 1. SECTION INTRODUCTION & VERIFIED STATISTICS              */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-2">
          {/* Left: Heading & Descriptive Copy */}
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[11px] font-sans font-bold tracking-[0.25em] text-[#D4AF37] uppercase">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>ROOTED IN HYDERABAD</span>
            </div>

            <h2
              id="branch-hub-heading"
              className="font-heading text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-white leading-[1.18]"
            >
              Find your{" "}
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#F5D061] via-[#E6C687] to-[#D4AF37]">
                nearest Flatel
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#A1A1AA] font-sans leading-relaxed">
              Explore FLATEL locations across Hyderabad and discover comfortable flats to stay near the places that matter to you.
            </p>
          </div>

          {/* Right: Data-Backed Statistics */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 shrink-0 w-full sm:w-auto">
            <div className="p-2.5 sm:p-4 rounded-xl bg-[#1C1E24] border border-[#2E3038] text-center min-w-0 sm:min-w-[110px] space-y-0.5 shadow-md">
              <span className="font-heading text-lg sm:text-2xl font-bold font-mono text-[#D4AF37] block">
                {BRANCHES.length}
              </span>
              <span className="text-[9.5px] sm:text-[11px] font-sans font-bold tracking-wider text-[#A1A1AA] uppercase block truncate">
                BRANCHES
              </span>
            </div>

            <div className="p-2.5 sm:p-4 rounded-xl bg-[#1C1E24] border border-[#2E3038] text-center min-w-0 sm:min-w-[110px] space-y-0.5 shadow-md">
              <span className="font-heading text-lg sm:text-2xl font-bold font-mono text-[#D4AF37] block">
                5
              </span>
              <span className="text-[9.5px] sm:text-[11px] font-sans font-bold tracking-wider text-[#A1A1AA] uppercase block truncate">
                RESIDENCES
              </span>
            </div>

            <div className="p-2.5 sm:p-4 rounded-xl bg-[#1C1E24] border border-[#2E3038] text-center min-w-0 sm:min-w-[110px] space-y-0.5 shadow-md">
              <span className="font-heading text-lg sm:text-2xl font-bold font-mono text-[#D4AF37] block">
                24×7
              </span>
              <span className="text-[9.5px] sm:text-[11px] font-sans font-bold tracking-wider text-[#A1A1AA] uppercase block truncate">
                CONCIERGE
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. THE INTERACTIVE HYDERABAD MAP CONTAINER                 */}
        {/* ========================================================= */}
        <div className="relative rounded-2xl lg:rounded-3xl border border-[#2E3038] bg-[#1C1E24] overflow-hidden shadow-2xl">
          
          {/* Real Leaflet Map Surface */}
          <div
            ref={mapContainerRef}
            className="w-full h-[400px] sm:h-[460px] md:h-[520px] lg:h-[560px] bg-[#121316] z-0"
            aria-label="Interactive Map of Flatel Branches in Hyderabad"
          />

          {/* Restrained Loading State Indicator */}
          {isTileLoading && (
            <div className="absolute inset-0 bg-[#121316]/70 backdrop-blur-xs flex items-center justify-center pointer-events-none z-10 transition-opacity">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1C1E24] border border-[#2E3038] text-xs text-[#D4AF37]">
                <Loader2 className="w-4 h-4 animate-spin text-[#D4AF37]" />
                <span className="text-[#F5F5F7] font-medium">Loading Hyderabad Map…</span>
              </div>
            </div>
          )}

          {/* Useful Offline / Tile Error Fallback Banner */}
          {hasTileError && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-md w-full px-4 z-20 pointer-events-auto">
              <div className="p-3 rounded-xl bg-[#1C1E24]/95 border border-amber-500/40 text-xs text-[#A1A1AA] flex items-center gap-2.5 shadow-xl">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <p className="text-[11px] leading-snug">
                  Network tile connectivity limited. Direct branch details &amp; verified Google Maps directions remain fully active below.
                </p>
              </div>
            </div>
          )}

          {/* ── Overlay 1: Top-Left "Hyderabad Network" Badge ── */}
          <div className="absolute top-4 left-4 z-20 pointer-events-auto">
            <div className="p-3 sm:p-3.5 rounded-xl bg-[#1C1E24]/95 backdrop-blur-md border border-[#2E3038] shadow-xl space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
                  HYDERABAD NETWORK
                </span>
              </div>
              <h3 className="font-heading text-xs sm:text-sm font-bold text-white tracking-tight">
                {BRANCHES.length} Flatel Branches
              </h3>
              <p className="text-[11px] text-[#A1A1AA]">
                Select a marker to explore.
              </p>
            </div>
          </div>

          {/* ── Overlay 2: Desktop Selected Branch Floating Card (Bottom-Right, non-obtrusive) ── */}
          <div className="hidden md:block absolute bottom-5 right-5 max-w-[360px] w-full z-20 pointer-events-auto">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#1C1E24]/95 backdrop-blur-md border border-[#2E3038] shadow-2xl space-y-3.5 text-[#F5F5F7]">
              
              {/* Branch Title & Verified Status */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#D4AF37] font-bold">
                      {currentBranch.code}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                      {currentBranch.status}
                    </span>
                  </div>
                  <h4 className="font-heading text-lg font-bold text-white tracking-tight">
                    {currentBranch.name}
                  </h4>
                  <p className="text-xs text-[#A1A1AA] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span className="truncate max-w-[200px]">{currentBranch.verifiedAddress}</span>
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-bold font-mono text-[#D4AF37] block">
                    from {currentBranch.startingPrice}
                  </span>
                  <span className="text-[10px] text-[#A1A1AA] block">
                    / night
                  </span>
                </div>
              </div>

              {/* Suites & Verified Proximity Highlights */}
              <div className="pt-2 border-t border-[#2E3038]/60 space-y-1.5 text-xs text-[#A1A1AA]">
                <div className="flex items-center justify-between text-[11px] text-[#D1D5DB] font-medium">
                  <span>Inventory:</span>
                  <span className="font-mono text-[#D4AF37]">{currentBranch.inventorySummary}</span>
                </div>
                {currentBranch.landmarks.slice(0, 2).map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-[11px]">
                    <span className="truncate max-w-[210px] text-[#A1A1AA]">{item.name}</span>
                    <span className="font-mono text-[#C5A880] shrink-0">{item.dist} ({item.time})</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 pt-1">
                <Link
                  href={`/branches/${currentBranch.slug}`}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-bold text-xs text-center transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Flats</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={currentBranch.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3.5 rounded-xl bg-[#121316] hover:bg-black text-[#A1A1AA] hover:text-white border border-[#2E3038] text-xs transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                  title="Open verified location in Google Maps"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Directions</span>
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* ── Overlay 3: Mobile Selected Branch Card (Docked Cleanly Below Map for Full Touch Safety) ── */}
        <div className="block md:hidden p-4 rounded-xl bg-[#1C1E24] border border-[#2E3038] shadow-lg space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#D4AF37] font-bold">
                  {currentBranch.code}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                  {currentBranch.status}
                </span>
              </div>
              <h4 className="font-heading text-base font-bold text-white tracking-tight">
                {currentBranch.name}
              </h4>
              <p className="text-xs text-[#A1A1AA] flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
                <span>{currentBranch.verifiedAddress}</span>
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-sm font-bold font-mono text-[#D4AF37] block">
                from {currentBranch.startingPrice}
              </span>
              <span className="text-[10px] text-[#A1A1AA] block">
                / night
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link
              href={`/branches/${currentBranch.slug}`}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#D4AF37] text-[#121316] font-bold text-xs text-center transition-colors flex items-center justify-center gap-1"
            >
              <span>Explore Flats</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={currentBranch.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3.5 rounded-xl bg-[#121316] text-[#A1A1AA] border border-[#2E3038] text-xs transition-colors flex items-center gap-1"
            >
              <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Directions</span>
            </a>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. HORIZONTAL BRANCH SELECTOR CHIPS                        */}
        {/* ========================================================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-[#A1A1AA]">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#D4AF37]">
              Select Branch Location
            </span>
            <span className="text-[11px]">
              Tap any location to focus on map
            </span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
            {(["moghal-pura", "barkas-salala"] as const).map((branchId) => {
              const branch = BRANCHES_MAP_DATA[branchId];
              const isSelected = activeBranchId === branchId;
              const Icon = branchId === "moghal-pura" ? Landmark : Plane;

              return (
                <button
                  key={branchId}
                  type="button"
                  onClick={() => handleSelectBranch(branchId)}
                  className={cn(
                    "p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer shrink-0 min-w-[260px] sm:min-w-[300px] flex items-center justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]",
                    isSelected
                      ? "bg-[#D4AF37]/10 border-[#D4AF37] ring-1 ring-[#D4AF37]/40 shadow-lg"
                      : "bg-[#1C1E24] border-[#2E3038] hover:border-[#D4AF37]/40 hover:bg-[#20232A]"
                  )}
                  aria-pressed={isSelected}
                  aria-label={`Select branch ${branch.name}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={cn(
                        "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                        isSelected
                          ? "bg-[#D4AF37] text-[#121316]"
                          : "bg-[#121316] text-[#D4AF37] border border-[#2E3038]"
                      )}
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-heading text-xs sm:text-sm font-bold text-white truncate">
                          {branch.name}
                        </h4>
                        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20 shrink-0 font-medium">
                          Active
                        </span>
                      </div>
                      <p className="text-[11px] text-[#A1A1AA] truncate mt-0.5">
                        {branchId === "moghal-pura" ? "Near Charminar" : "Near Chandrayangutta"}
                      </p>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "text-xs font-mono font-bold shrink-0 transition-colors",
                      isSelected ? "text-[#D4AF37]" : "text-[#71717A]"
                    )}
                  >
                    from {branch.startingPrice}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
