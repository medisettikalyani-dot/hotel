"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  format,
  addDays,
  differenceInCalendarDays,
  startOfToday,
  isBefore,
} from "date-fns";
import {
  MapPin,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Home,
  Building2,
  Users,
  BedDouble,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Layers,
  MessageSquare,
  Check,
  Share2,
  Star,
  Car,
  HeartPulse,
  UtensilsCrossed,
  Wifi,
  Maximize2,
  X,
  Minus,
  Plus,
  Info,
  CheckCheck,
  Stethoscope,
  Baby,
  Compass,
  Briefcase,
} from "lucide-react";
import {
  BranchItem,
  formatPrice,
  CONTACT_PHONE,
  WHATSAPP_CONFIG,
} from "@/lib/constants";
import { RoomDetail } from "@/lib/mock-rooms";
import { calculateFlatelPrice } from "@/lib/pricing";
import { cn } from "@/lib/utils";

interface BranchDetailViewProps {
  branch: BranchItem;
  properties: RoomDetail[];
}

export function BranchDetailView({ branch, properties }: BranchDetailViewProps) {
  const router = useRouter();

  // Selected flat state (defaults to first available flat)
  const [selectedRoomSlug, setSelectedRoomSlug] = React.useState<string>(
    properties[0]?.slug || "3bhk"
  );

  const selectedProperty = React.useMemo(() => {
    return properties.find((p) => p.slug === selectedRoomSlug) || properties[0];
  }, [properties, selectedRoomSlug]);

  // Client-safe Date selection state (initialized in useEffect to avoid SSR Date.now prerender errors)
  const [today, setToday] = React.useState<Date | null>(null);
  const [checkIn, setCheckIn] = React.useState<Date | null>(null);
  const [checkOut, setCheckOut] = React.useState<Date | null>(null);

  React.useEffect(() => {
    const t = startOfToday();
    setToday(t);
    setCheckIn(addDays(t, 1));
    setCheckOut(addDays(t, 3));
  }, []);

  // Guests state
  const [adults, setAdults] = React.useState<number>(selectedProperty?.baseAdults || 2);
  const [childrenCount, setChildrenCount] = React.useState<number>(0);

  // Synchronize base adults when selected property changes
  React.useEffect(() => {
    if (selectedProperty) {
      setAdults((prev) => Math.min(Math.max(prev, 1), selectedProperty.maxAdults));
    }
  }, [selectedProperty]);

  // Purpose state
  const [selectedPurpose, setSelectedPurpose] = React.useState<
    "medical" | "tourism" | "corporate" | "family"
  >("medical");

  // Gallery & Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = React.useState(0);

  // Active navigation section state
  const [activeSection, setActiveSection] = React.useState("overview");

  // Copy link feedback state
  const [copiedLink, setCopiedLink] = React.useState(false);

  // Branch hero and gallery image definition
  const branchImageSrc =
    branch.slug === "barkas-salala"
      ? "/images/branch-barkas-salala.jpg"
      : "/images/branch-moghal-pura.jpg";

  // Gallery items with authentic editorial designations and honest placeholders where genuine interior photos are updating
  const galleryPhotos = React.useMemo(() => {
    if (branch.slug === "barkas-salala") {
      return [
        {
          id: "photo-1",
          src: branchImageSrc,
          title: "Barkas Salala Serviced Residence — Living Salon",
          caption: "Architectural concept styling: Spacious family living area with natural lighting and city vista",
          category: "Living Lounge · Concept Preview",
          isPlaceholder: false,
        },
        {
          id: "photo-2",
          src: "/images/hero-apartment.jpg",
          title: "Furnished Living & Dining Area",
          caption: "Architectural style preview: Generous family seating, smart entertainment hub, and executive desk",
          category: "Lounge & Dining · Style Preview",
          isPlaceholder: false,
        },
        {
          id: "photo-3",
          title: "Private Master Bedroom Suite",
          caption: "Genuine flat interior photography in progress. Furnished with king bed, fresh linens & wardrobe",
          category: "Master Bedroom",
          isPlaceholder: true,
          inclusions: "King Bed · Premium Linens · Acoustic Glazing · Wardrobe",
        },
        {
          id: "photo-4",
          title: "Equipped Modular Kitchen",
          caption: "Genuine flat interior photography in progress. Includes double-door fridge, gas stove & RO purifier",
          category: "Modular Kitchen",
          isPlaceholder: true,
          inclusions: "Gas Stove · Refrigerator · RO Water Purifier · Cookware",
        },
        {
          id: "photo-5",
          title: "Private En-Suite Bathroom",
          caption: "Genuine flat interior photography in progress. 24/7 continuous hot water geyser & fresh toiletries",
          category: "En-Suite Bath",
          isPlaceholder: true,
          inclusions: "24/7 Hot Water Geyser · Water Softening · Fresh Toiletries",
        },
      ];
    }
    return [
      {
        id: "photo-1",
        src: branchImageSrc,
        title: "Moghal Pura Serviced Residence — Master Suite",
        caption: "Architectural concept styling: Classical Old City design with premium comfort",
        category: "Master Suite · Concept Preview",
        isPlaceholder: false,
      },
      {
        id: "photo-2",
        src: "/images/hero-apartment.jpg",
        title: "Central Living Lounge",
        caption: "Architectural style preview: Comfortable sofa seating, high-speed Wi-Fi, and smart TV",
        category: "Living Lounge · Style Preview",
        isPlaceholder: false,
      },
      {
        id: "photo-3",
        title: "Guest Bedroom Suite",
        caption: "Genuine flat interior photography in progress. Multi-bedroom layouts for family & medical stays",
        category: "Guest Bedroom",
        isPlaceholder: true,
        inclusions: "Comfort Bedding · Wardrobe Space · Dedicated AC",
      },
      {
        id: "photo-4",
        title: "Equipped Self-Cooking Kitchen",
        caption: "Genuine flat interior photography in progress. Full modular kitchen with piped gas & microwave",
        category: "Equipped Kitchen",
        isPlaceholder: true,
        inclusions: "Piped Gas Connection · Microwave · Refrigerator · Basic Staples",
      },
      {
        id: "photo-5",
        title: "Elevator Lobby & En-Suite Bath",
        caption: "Genuine flat interior photography in progress. 24/7 lift access & private sanitized bathrooms",
        category: "Lobby & Bath",
        isPlaceholder: true,
        inclusions: "Elevator Access · 24/7 Hot Water · Inverter Backup",
      },
    ];
  }, [branch.slug, branchImageSrc]);

  // Verified highlights per branch strictly based on PRD
  const branchHighlights =
    branch.slug === "barkas-salala"
      ? [
          { title: "Spacious Multi-Room Suites", desc: "Two expansive 3 BHK furnished residences accommodating up to 9 guests" },
          { title: "Modular Kitchen with Gas", desc: "Refrigerator, RO water purifier, microwave, and cooking essentials" },
          { title: "24/7 Power Backup & Lift", desc: "Inverter backup ensuring continuous lighting, fans, Wi-Fi & essential circuits" },
          { title: "Medical Hub Connectivity", desc: "Minutes from Owaisi Hospital, Apollo DRDO & Chandrayangutta medical centers" },
        ]
      : [
          { title: "Historic Old City Location", desc: "Prime address minutes away from Charminar, Laad Bazaar, and Chowmahalla Palace" },
          { title: "Versatile Residence Inventory", desc: "1 BHK, 2 BHK, and grand 4 BHK residences catering to 2 to 12 guests" },
          { title: "Alternate-Day Housekeeping", desc: "Complimentary sanitization, linen refresh, and trash clearing" },
          { title: "Equipped Self-Cooking Kitchen", desc: "Full kitchen with piped gas, cookware, refrigerator, and basic staples" },
        ];

  // Proximity details strictly verified per branch
  const proximityItems =
    branch.slug === "barkas-salala"
      ? [
          { name: "Owaisi Hospital & Research Centre", distance: "2.5 km", time: "8 mins drive", type: "hospital" },
          { name: "Apollo DRDO Hospital", distance: "3.2 km", time: "10 mins drive", type: "hospital" },
          { name: "Princess Durru Shehvar Children's Hospital", distance: "6.5 km", time: "18 mins drive", type: "hospital" },
          { name: "Rajiv Gandhi International Airport (HYD)", distance: "14 km", time: "22 mins drive", type: "transit" },
          { name: "Charminar & Historic Old City", distance: "7.0 km", time: "20 mins drive", type: "heritage" },
          { name: "Hyderabad Deccan Railway Station", distance: "11 km", time: "28 mins drive", type: "transit" },
        ]
      : [
          { name: "Charminar & Laad Bazaar", distance: "1.2 km", time: "5 mins walk/auto", type: "heritage" },
          { name: "Chowmahalla Palace", distance: "1.5 km", time: "6 mins auto", type: "heritage" },
          { name: "Princess Durru Shehvar Hospital", distance: "1.8 km", time: "7 mins drive", type: "hospital" },
          { name: "Osmania General Hospital", distance: "3.5 km", time: "12 mins drive", type: "hospital" },
          { name: "Hyderabad Deccan Railway Station (Nampally)", distance: "5.0 km", time: "15 mins drive", type: "transit" },
          { name: "Rajiv Gandhi International Airport (HYD)", distance: "18 km", time: "30 mins drive", type: "transit" },
        ];

  // Calculate nights
  const totalNights = React.useMemo(() => {
    if (checkIn && checkOut) {
      const diff = differenceInCalendarDays(checkOut, checkIn);
      return Math.max(1, diff);
    }
    return 2;
  }, [checkIn, checkOut]);

  // Real-time PRD Pricing Calculation
  const fareResult = React.useMemo(() => {
    if (!selectedProperty) return null;
    try {
      return calculateFlatelPrice({
        nights: totalNights,
        basePricePerNight: selectedProperty.basePricePerNight,
        baseAdults: selectedProperty.baseAdults,
        selectedAdults: adults,
        selectedKids: childrenCount,
        extraPersonFee: selectedProperty.extraPersonFeePerNight || 500,
        selectedPaidAddons: [],
      });
    } catch {
      return null;
    }
  }, [selectedProperty, totalNights, adults, childrenCount]);

  // Section observer for sticky navigation highlighting
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "flats", "facilities", "reviews", "location", "policies"];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation for Lightbox
  React.useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
      }
      if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) => (prev + 1) % galleryPhotos.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, galleryPhotos.length]);

  // Handle Share link click
  const handleShare = async () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        try {
          await navigator.share({
            title: `Flatel Hospitality - ${branch.name}`,
            text: `Explore furnished serviced flats at Flatel Hospitality ${branch.name}, Hyderabad.`,
            url: window.location.href,
          });
          return;
        } catch {
          // Fall back to copy
        }
      }
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Primary Reservation Proceed Action
  const handleProceedBooking = () => {
    if (!selectedProperty) return;

    const todayDate = today || startOfToday();
    const effectiveCheckIn = checkIn || addDays(todayDate, 1);
    const effectiveCheckOut = checkOut && isBefore(effectiveCheckIn, checkOut) ? checkOut : addDays(effectiveCheckIn, 2);

    const checkInStr = format(effectiveCheckIn, "yyyy-MM-dd");
    const checkOutStr = format(effectiveCheckOut, "yyyy-MM-dd");

    const queryParams = new URLSearchParams({
      property: selectedProperty.slug,
      roomId: selectedProperty.slug,
      branch: branch.slug,
      checkIn: checkInStr,
      checkOut: checkOutStr,
      adults: adults.toString(),
      kids: childrenCount.toString(),
      children: childrenCount.toString(),
      purpose: selectedPurpose,
    });

    router.push(`/checkout?${queryParams.toString()}`);
  };

  const whatsappInquiryUrl = WHATSAPP_CONFIG.getUrl(
    `Hello Flatel Hospitality, I am interested in booking a furnished residence at your ${branch.name} branch for ${totalNights} nights (${checkIn ? format(checkIn, "dd MMM") : "dates pending"} to ${checkOut ? format(checkOut, "dd MMM") : ""}). Could you please share live availability?`
  );

  return (
    <div className="w-full bg-[#FBF9F5] text-[#191A1E] font-sans pb-24 selection:bg-[#B89035]/20 selection:text-[#B89035]">
      {/* ======================================================== */}
      {/* 1. COMPACT BREADCRUMB BAR                                 */}
      {/* ======================================================== */}
      <nav
        aria-label="Breadcrumb"
        className="w-full bg-[#F5F2EB]/90 border-b border-[#EAE5DC] py-2.5 px-4 sm:px-6 lg:px-8 text-xs text-[#606470]"
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
            <Link
              href="/"
              className="hover:text-[#191A1E] transition-colors flex items-center gap-1 shrink-0 font-medium"
            >
              <Home className="h-3.5 w-3.5 text-[#B89035]" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-[#A0A4B0]" />
            <Link
              href="/#locations"
              className="hover:text-[#191A1E] transition-colors shrink-0 font-medium"
            >
              Our Locations
            </Link>
            <ChevronRight className="h-3 w-3 shrink-0 text-[#A0A4B0]" />
            <span className="text-[#191A1E] font-semibold truncate">
              {branch.name} Branch
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1E7E34]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Official Branch</span>
            </span>
          </div>
        </div>
      </nav>

      {/* ======================================================== */}
      {/* 2. RESTRAINED BRANCH TITLE & QUICK FACTS HEADER          */}
      {/* ======================================================== */}
      <header className="w-full bg-white border-b border-[#EAE5DC] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#B89035]" />
                <span className="text-[11px] font-sans font-semibold tracking-[0.16em] uppercase text-[#8C6D23]">
                  FLATEL SERVICED RESIDENCE
                </span>
                <span className="text-[11px] text-[#A0A4B0]">·</span>
                <span className="text-[11px] font-medium text-[#606470]">
                  Hyderabad, Telangana
                </span>
              </div>

              {/* Main Title */}
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#191A1E] leading-tight">
                {branch.name} Serviced Residences
              </h1>

              {/* Verified Location & Map Action */}
              <div className="mt-2.5 flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs sm:text-sm text-[#4A4D57]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#B89035] shrink-0" />
                  <span>{branch.address}</span>
                </div>

                {branch.googleMapsUrl && (
                  <a
                    href={branch.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#8C6D23] hover:text-[#5E4815] font-semibold underline underline-offset-4 transition-colors"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Quick Actions (Share, Save, WhatsApp) */}
            <div className="flex items-center gap-2.5 self-start lg:self-end shrink-0">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] hover:bg-[#F5F2EB] text-[#191A1E] text-xs font-medium transition-all shadow-2xs cursor-pointer"
                aria-label="Share this property"
              >
                {copiedLink ? (
                  <>
                    <CheckCheck className="w-3.5 h-3.5 text-[#1E7E34]" />
                    <span className="text-[#1E7E34] font-semibold">Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#606470]" />
                    <span>Share</span>
                  </>
                )}
              </button>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#D1E7DD] bg-[#E8F5E9] hover:bg-[#D4EDDA] text-[#1E7E34] text-xs font-semibold transition-all shadow-2xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>

          {/* Quick Metrics Ribbon (Homerent / Banyan Living inspired) */}
          <div className="mt-6 pt-5 border-t border-[#F0ECE4] grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 text-xs">
            <div className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-xl p-3">
              <span className="block text-[10.5px] uppercase tracking-wider text-[#737785] font-semibold">
                Available Flats
              </span>
              <span className="block font-heading text-base font-semibold text-[#191A1E] mt-0.5">
                {properties.length === 1 ? "1 Residence Type" : `${properties.length} Residence Types`}
              </span>
              <span className="text-[11px] text-[#8C6D23] font-medium">
                {properties.map((p) => p.type).join(", ")}
              </span>
            </div>

            <div className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-xl p-3">
              <span className="block text-[10.5px] uppercase tracking-wider text-[#737785] font-semibold">
                Max Capacity
              </span>
              <span className="block font-heading text-base font-semibold text-[#191A1E] mt-0.5">
                Up to {Math.max(...properties.map((p) => p.maxAdults))} Guests
              </span>
              <span className="text-[11px] text-[#1E7E34] font-medium">
                Kids 0–12 Stay Free
              </span>
            </div>

            <div className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-xl p-3">
              <span className="block text-[10.5px] uppercase tracking-wider text-[#737785] font-semibold">
                Check-In Window
              </span>
              <span className="block font-heading text-base font-semibold text-[#191A1E] mt-0.5">
                11:00 AM – 1:00 PM
              </span>
              <span className="text-[11px] text-[#737785]">
                Check-Out: 11:00 AM
              </span>
            </div>

            <div className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-xl p-3">
              <span className="block text-[10.5px] uppercase tracking-wider text-[#737785] font-semibold">
                Housekeeping
              </span>
              <span className="block font-heading text-base font-semibold text-[#191A1E] mt-0.5">
                Alternate Days
              </span>
              <span className="text-[11px] text-[#1E7E34] font-medium">
                Complimentary
              </span>
            </div>

            <div className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-xl p-3 col-span-2 sm:col-span-4 lg:col-span-1">
              <span className="block text-[10.5px] uppercase tracking-wider text-[#737785] font-semibold">
                Booking Policy
              </span>
              <span className="block font-heading text-base font-semibold text-[#191A1E] mt-0.5">
                20% Advance Hold
              </span>
              <span className="text-[11px] text-[#8C6D23] font-medium">
                Free 48h Cancellation
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 3. PHOTO GALLERY SHOWCASE (5-Slot Homerent / Banyan Grid) */}
      {/* ======================================================== */}
      <section
        className="w-full bg-[#FAF8F5] border-b border-[#EAE5DC] py-6 sm:py-8 px-4 sm:px-6 lg:px-8"
        aria-label="Property Photographs"
      >
        <div className="mx-auto max-w-7xl">
          {/* 5-Slot Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-[360px] sm:h-[440px] lg:h-[480px]">
            {/* Primary Large Image (Left - spans 7 cols on desktop) */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                setActivePhotoIndex(0);
                setIsLightboxOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActivePhotoIndex(0);
                  setIsLightboxOpen(true);
                }
              }}
              className="relative md:col-span-7 h-full rounded-2xl overflow-hidden cursor-pointer group border border-[#EAE5DC] bg-white shadow-sm"
              aria-label={`View enlarged photo: ${galleryPhotos[0].title}`}
            >
              <Image
                src={galleryPhotos[0].src || branchImageSrc}
                alt={galleryPhotos[0].title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-sans font-semibold tracking-wider uppercase text-[#E8DCB8] border border-white/10 mb-1.5">
                  {galleryPhotos[0].category}
                </span>
                <h2 className="font-heading text-lg sm:text-xl font-semibold leading-tight drop-shadow-md">
                  {galleryPhotos[0].title}
                </h2>
                <p className="text-xs text-white/80 line-clamp-1 mt-0.5 font-sans drop-shadow-sm">
                  {galleryPhotos[0].caption}
                </p>
              </div>

              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md text-[#191A1E] text-xs font-semibold shadow-md group-hover:bg-white transition-colors">
                  <Maximize2 className="w-3.5 h-3.5 text-[#B89035]" />
                  <span>View All Photos ({galleryPhotos.length})</span>
                </span>
              </div>
            </div>

            {/* 4 Supporting Thumbnails (Right - 2x2 grid, spans 5 cols on desktop) */}
            <div className="hidden md:grid md:col-span-5 grid-cols-2 gap-3 h-full">
              {galleryPhotos.slice(1, 5).map((photo, index) => (
                <div
                  key={photo.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    setActivePhotoIndex(index + 1);
                    setIsLightboxOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActivePhotoIndex(index + 1);
                      setIsLightboxOpen(true);
                    }
                  }}
                  className="relative h-full rounded-xl overflow-hidden cursor-pointer group border border-[#EAE5DC] bg-white shadow-2xs"
                  aria-label={`View enlarged photo: ${photo.title}`}
                >
                  {photo.isPlaceholder || !photo.src ? (
                    <div className="relative h-full w-full p-3.5 bg-gradient-to-br from-[#1E2026] to-[#121316] text-white flex flex-col justify-between overflow-hidden">
                      <div className="flex items-center justify-between gap-1">
                        <span className="inline-block px-2 py-0.5 rounded text-[9px] uppercase font-mono tracking-wider bg-[#B89035]/25 text-[#E8DCB8] border border-[#B89035]/30">
                          {photo.category}
                        </span>
                        <span className="text-[9px] text-[#A0A4B0] flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 text-[#B89035]" />
                          <span>Photo In Progress</span>
                        </span>
                      </div>
                      <div className="my-auto py-1">
                        <span className="block font-heading text-xs font-semibold leading-tight text-white line-clamp-1">
                          {photo.title}
                        </span>
                        <span className="block text-[10px] text-[#A0A4B0] line-clamp-2 mt-0.5">
                          {photo.caption}
                        </span>
                      </div>
                      {photo.inclusions && (
                        <div className="pt-1.5 border-t border-white/10 flex items-center gap-1 text-[9px] text-[#E8DCB8] truncate">
                          <Check className="w-2.5 h-2.5 text-[#1E7E34] shrink-0" />
                          <span className="truncate">{photo.inclusions}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      <Image
                        src={photo.src}
                        alt={photo.title}
                        fill
                        sizes="(max-width: 1200px) 25vw, 20vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-103"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                        <span className="block text-[10px] uppercase font-mono tracking-wider text-[#E8DCB8]">
                          {photo.category}
                        </span>
                        <span className="block font-heading text-xs font-semibold leading-tight mt-0.5 truncate drop-shadow-sm">
                          {photo.title}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Genuine Photography Notice & Disclaimer */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#737785]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89035] shrink-0" />
              <span>
                Authenticity Notice: Genuine flat interior photography is currently being updated by on-site management. All floor plans, amenities, and inventory are 100% verified below.
              </span>
            </span>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1E7E34] hover:underline"
            >
              <MessageSquare className="w-3 h-3" />
              <span>Request live video walkthrough on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. STICKY IN-PAGE SECTION NAVIGATION BAR                 */}
      {/* ======================================================== */}
      <nav
        aria-label="Section Navigation"
        className="sticky top-[70px] sm:top-[74px] z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#EAE5DC] shadow-xs"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar text-xs sm:text-sm font-medium">
            {[
              { id: "overview", label: "Overview" },
              { id: "flats", label: "Available Flats" },
              { id: "facilities", label: "Facilities & Inclusions" },
              { id: "reviews", label: "Guest Reviews" },
              { id: "location", label: "Location & Hospitals" },
              { id: "policies", label: "Policies & Standards" },
            ].map((tab) => {
              const isActive = activeSection === tab.id;
              return (
                <a
                  key={tab.id}
                  href={`#${tab.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(tab.id);
                    if (el) {
                      const offset = 140;
                      const bodyRect = document.body.getBoundingClientRect().top;
                      const elementRect = el.getBoundingClientRect().top;
                      const elementPosition = elementRect - bodyRect;
                      const offsetPosition = elementPosition - offset;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });
                      setActiveSection(tab.id);
                    }
                  }}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all shrink-0 text-xs sm:text-sm",
                    isActive
                      ? "bg-[#191A1E] text-white font-semibold shadow-xs"
                      : "text-[#606470] hover:text-[#191A1E] hover:bg-[#F5F2EB]"
                  )}
                >
                  {tab.label}
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ======================================================== */}
      {/* 5. BALANCED TWO-COLUMN DESKTOP LAYOUT                    */}
      {/* Left Column: Property Content (68%)                      */}
      {/* Right Column: Sticky Booking & Calculation Panel (32%)   */}
      {/* ======================================================== */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ==================================================== */}
          {/* LEFT COLUMN: MAIN CONTENT SECTIONS                   */}
          {/* ==================================================== */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-12">
            {/* -------------------------------------------------- */}
            {/* SECTION A: OVERVIEW & ARCHITECTURAL HIGHLIGHTS      */}
            {/* -------------------------------------------------- */}
            <section id="overview" className="scroll-mt-36 space-y-6">
              <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 sm:p-8 shadow-xs">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#8C6D23] mb-2">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>About This Property</span>
                </div>

                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#191A1E] tracking-tight">
                  Independent Comfort with Hotel Reliability
                </h2>

                <p className="mt-3.5 text-sm sm:text-base text-[#4A4D57] leading-relaxed">
                  {branch.slug === "barkas-salala"
                    ? "Flatel Hospitality at Barkas Salala provides generous multi-bedroom serviced residences situated in a tranquil neighborhood near Chandrayangutta. Thoughtfully designed for visiting families, hospital attendants, and extended stays, each suite delivers full residential privacy with equipped modular kitchens, high-speed connectivity, and dedicated on-site assistance."
                    : "Flatel Hospitality at Moghal Pura offers refined serviced residences in the historic heart of Old City Hyderabad. Located minutes from Charminar and vibrant cultural bazaars, our 1 BHK, 2 BHK, and 4 BHK residences provide tourists, executive visitors, and family groups an authentic urban base with professional housekeeping and 24/7 power backup."}
                </p>

                {/* Verified Highlights Grid */}
                <div className="mt-8 pt-6 border-t border-[#F0ECE4]">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#737785] mb-4">
                    Verified Branch Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {branchHighlights.map((hl, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#B89035] shrink-0 mt-0.5" />
                        <div>
                          <span className="block text-xs sm:text-sm font-semibold text-[#191A1E]">
                            {hl.title}
                          </span>
                          <span className="block text-xs text-[#606470] mt-0.5 leading-snug">
                            {hl.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------- */}
            {/* SECTION B: AVAILABLE FLATS IN THIS BRANCH          */}
            {/* -------------------------------------------------- */}
            <section id="flats" className="scroll-mt-36 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#8C6D23] mb-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Residences & Floor Plans</span>
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#191A1E] tracking-tight">
                  Available Residences at {branch.name}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#606470]">
                  Select any flat below to view details or calculate your reservation fare in the booking panel.
                </p>
              </div>

              {/* Cards List */}
              <div className="space-y-5">
                {properties.map((property) => {
                  const isSelected = selectedRoomSlug === property.slug;

                  return (
                    <article
                      key={property.id}
                      className={cn(
                        "rounded-2xl border transition-all duration-300 overflow-hidden bg-white shadow-xs flex flex-col sm:flex-row",
                        isSelected
                          ? "border-[#B89035] ring-1 ring-[#B89035]/30 shadow-md"
                          : "border-[#EAE5DC] hover:border-[#B89035]/60 hover:shadow-sm"
                      )}
                    >
                      {/* Left: Consistent Image Area */}
                      <div className="relative sm:w-56 md:w-64 h-48 sm:h-auto shrink-0 bg-[#F5F2EB] border-b sm:border-b-0 sm:border-r border-[#EAE5DC]">
                        <Image
                          src={branchImageSrc}
                          alt={property.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 280px"
                          className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-md bg-white/95 text-[#191A1E] font-heading font-semibold text-xs shadow-xs">
                            {property.type}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-black/65 text-white text-[10.5px] font-mono">
                            {property.totalUnits} {property.totalUnits === 1 ? "Unit" : "Units"}
                          </span>
                        </div>

                        {/* Bottom Tag */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-medium">
                          <span className="drop-shadow-sm">{branch.name}</span>
                          <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] text-[#E8DCB8] font-mono">
                            Concept Preview
                          </span>
                        </div>
                      </div>

                      {/* Right: Content Details */}
                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-heading text-lg sm:text-xl font-semibold text-[#191A1E]">
                                {property.title}
                              </h3>
                              <p className="mt-1 text-xs text-[#606470] line-clamp-2 leading-relaxed">
                                {property.shortDescription}
                              </p>
                            </div>
                          </div>

                          {/* Capacity Badge */}
                          <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#EAE5DC] text-xs text-[#4A4D57]">
                            <Users className="w-3.5 h-3.5 text-[#B89035] shrink-0" />
                            <span className="font-medium text-[#191A1E]">
                              {property.baseAdults} Base Adults
                            </span>
                            <span className="text-[#A0A4B0]">·</span>
                            <span>Up to {property.maxExtraGuests} extra allowed</span>
                            <span className="text-[#A0A4B0]">·</span>
                            <span className="text-[#1E7E34] font-medium">Kids 0–12 free</span>
                          </div>

                          {/* Key Specs Row */}
                          <div className="mt-3.5 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#606470]">
                            <span className="flex items-center gap-1.5">
                              <BedDouble className="w-3.5 h-3.5 text-[#B89035]" />
                              <span>{property.specs.bedrooms}</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <UtensilsCrossed className="w-3.5 h-3.5 text-[#B89035]" />
                              <span>{property.specs.kitchen}</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Wifi className="w-3.5 h-3.5 text-[#B89035]" />
                              <span>High-Speed Wi-Fi</span>
                            </span>
                          </div>
                        </div>

                        {/* Price & Action Footer */}
                        <div className="mt-5 pt-4 border-t border-[#F0ECE4] flex flex-wrap items-end justify-between gap-3">
                          <div>
                            <span className="text-[10.5px] uppercase tracking-wider text-[#737785] block font-medium">
                              Base Nightly Rate
                            </span>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="font-heading text-xl sm:text-2xl font-bold text-[#191A1E]">
                                ₹{property.basePricePerNight.toLocaleString("en-IN")}
                              </span>
                              <span className="text-xs text-[#606470]">/ night</span>
                            </div>
                            <span className="text-[11px] text-[#8C6D23] font-medium block mt-0.5">
                              20% advance hold fee: ₹{Math.round(property.basePricePerNight * 0.2).toLocaleString("en-IN")}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Link
                              href={`/rooms/${property.slug}`}
                              className="px-3.5 py-2 rounded-xl border border-[#EAE5DC] bg-white hover:bg-[#FAF8F5] text-[#191A1E] text-xs font-semibold transition-all shadow-2xs"
                            >
                              <span>View Details</span>
                            </Link>

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedRoomSlug(property.slug);
                                const panel = document.getElementById("booking-panel");
                                if (panel && window.innerWidth < 1024) {
                                  panel.scrollIntoView({ behavior: "smooth" });
                                }
                              }}
                              className={cn(
                                "px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer",
                                isSelected
                                  ? "bg-[#191A1E] text-white"
                                  : "bg-[#B89035] hover:bg-[#A37E28] text-white"
                              )}
                            >
                              {isSelected ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Selected</span>
                                </>
                              ) : (
                                <>
                                  <span>Select & Book</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* -------------------------------------------------- */}
            {/* SECTION C: FACILITIES & PURPOSE INCLUSIONS         */}
            {/* -------------------------------------------------- */}
            <section id="facilities" className="scroll-mt-36 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#8C6D23] mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Master Amenities</span>
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#191A1E] tracking-tight">
                  Facilities & Inclusions
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#606470]">
                  Every residence is fully furnished for comfort, healthcare recovery, and extended independent living.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 1. Essential Apartment Comforts */}
                <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EAE5DC] flex items-center justify-center text-[#B89035]">
                      <Home className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading text-base font-semibold text-[#191A1E]">
                      Essential Living Comforts
                    </h3>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#4A4D57]">
                    {[
                      "Air Conditioning in all bedrooms",
                      "High-Speed Wi-Fi for remote work & streaming",
                      "Smart TV with digital entertainment",
                      "Inverter Power Backup (24/7 continuous electricity)",
                      "Complimentary Alternate-Day Housekeeping",
                      "Elevator access & secure lobby entry",
                      "Sanitized premium linens, pillows & comforters",
                      "Wardrobe and dedicated luggage storage",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#1E7E34] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Kitchen & Self-Cooking Essentials */}
                <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EAE5DC] flex items-center justify-center text-[#B89035]">
                      <UtensilsCrossed className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading text-base font-semibold text-[#191A1E]">
                      Kitchen & Dining Setup
                    </h3>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#4A4D57]">
                    {[
                      "Gas stove with piped gas connection",
                      "Double-door refrigerator for fresh grocery storage",
                      "RO Water Purifier (safe drinking water included)",
                      "Microwave oven & electric kettle",
                      "Rice cooker & bread toaster",
                      "Full set of premium crockery, cutlery & cookware",
                      "Mixer & grinder for home-style meal prep",
                      "Complimentary kitchen staples (tea, sugar, salt, spices)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#1E7E34] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Medistay & Healthcare Care */}
                <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EAE5DC] flex items-center justify-center text-[#B89035]">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading text-base font-semibold text-[#191A1E]">
                      Medistay & Attendant Inclusions
                    </h3>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#4A4D57]">
                    {[
                      "Hospital & doctor appointment assistance",
                      "Hospital travel distance & transit guidance",
                      "24/7 Ambulance coordination (complimentary desk assist)",
                      "Pharmacy flat delivery coordination",
                      "Wheelchair & IV glucose stand upon request",
                      "Blood pressure (BP) monitor & Pulse oximeter",
                      "Deep sanitized housekeeping before arrival",
                      "First-aid kit & emergency assistance desk",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#1E7E34] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. Family & Long Stay Comforts */}
                <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#EAE5DC] flex items-center justify-center text-[#B89035]">
                      <Baby className="w-4 h-4" />
                    </div>
                    <h3 className="font-heading text-base font-semibold text-[#191A1E]">
                      Family & Vacation Comforts
                    </h3>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#4A4D57]">
                    {[
                      "Children aged 0–12 stay completely free",
                      "Infant baby cot & high chair upon request",
                      "Indoor board games (Chess, Carrom, Snakes & Ladders)",
                      "Front-load washing machine with complimentary detergent",
                      "Water-softening geysers (gentle on skin & hair)",
                      "Universal fast charging adapters",
                      "Luggage holding assistance on arrival / departure",
                      "24/7 on-site concierge team contact",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#1E7E34] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------- */}
            {/* SECTION D: HONEST GUEST REVIEWS (AUTHENTIC STATE)  */}
            {/* -------------------------------------------------- */}
            <section id="reviews" className="scroll-mt-36 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#8C6D23] mb-1.5">
                  <Star className="w-3.5 h-3.5" />
                  <span>Verified Reviews</span>
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#191A1E] tracking-tight">
                  Guest Reviews
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#606470]">
                  Authentic guest feedback from verified stays at Flatel {branch.name}.
                </p>
              </div>

              {/* Honest Empty State as required by PRD and instructions */}
              <div className="bg-white rounded-2xl border border-[#EAE5DC] p-8 sm:p-10 text-center shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-[#EAE5DC] flex items-center justify-center text-[#B89035] mx-auto mb-4">
                  <Star className="w-6 h-6" />
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-semibold text-[#191A1E]">
                  Be Among the First to Review {branch.name}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-[#606470] max-w-lg mx-auto leading-relaxed">
                  Reservations have recently opened for our serviced residences at {branch.name}. Every verified guest receives a post-checkout link to publish honest, unedited feedback.
                </p>

                {/* Trust Commitments */}
                <div className="mt-8 pt-6 border-t border-[#F0ECE4] grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]">
                    <span className="block text-xs font-semibold text-[#191A1E]">
                      100% Verified Guests
                    </span>
                    <span className="block text-[11px] text-[#606470] mt-1 leading-snug">
                      Reviews can only be submitted after check-in verification.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]">
                    <span className="block text-xs font-semibold text-[#191A1E]">
                      Unedited Feedback
                    </span>
                    <span className="block text-[11px] text-[#606470] mt-1 leading-snug">
                      Transparent guest ratings without artificial exaggeration.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]">
                    <span className="block text-xs font-semibold text-[#191A1E]">
                      Direct Owner Care
                    </span>
                    <span className="block text-[11px] text-[#606470] mt-1 leading-snug">
                      On-site team available 24/7 to guarantee stay satisfaction.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------- */}
            {/* SECTION E: LOCATION & MEDICAL CONNECTIVITY         */}
            {/* -------------------------------------------------- */}
            <section id="location" className="scroll-mt-36 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#8C6D23] mb-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Neighborhood & Vicinity</span>
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#191A1E] tracking-tight">
                  Location & Connectivity
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#606470]">
                  Convenient access to premier healthcare institutions, historic landmarks, and transportation hubs.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 sm:p-8 shadow-xs space-y-6">
                {/* Address Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC]">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-5 h-5 text-[#B89035] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-[#737785] font-semibold">
                        Verified Address
                      </span>
                      <span className="block text-sm font-semibold text-[#191A1E] mt-0.5">
                        {branch.address}
                      </span>
                    </div>
                  </div>

                  {branch.googleMapsUrl && (
                    <a
                      href={branch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#191A1E] text-white hover:bg-[#2C2E35] text-xs font-semibold transition-all shrink-0 self-start sm:self-center shadow-xs"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#B89035]" />
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3 text-white/70" />
                    </a>
                  )}
                </div>

                {/* Proximity Grid */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#737785] mb-3">
                    Proximity to Major Landmarks & Medical Centers
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {proximityItems.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-xl border border-[#EAE5DC] bg-[#FAF8F5]"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          {item.type === "hospital" && <HeartPulse className="w-4 h-4 text-[#C93B2B] shrink-0" />}
                          {item.type === "heritage" && <Compass className="w-4 h-4 text-[#8C6D23] shrink-0" />}
                          {item.type === "transit" && <Car className="w-4 h-4 text-[#606470] shrink-0" />}
                          <span className="text-xs font-medium text-[#191A1E] truncate">
                            {item.name}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="block text-xs font-semibold text-[#191A1E]">
                            {item.distance}
                          </span>
                          <span className="block text-[10.5px] text-[#737785]">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emergency note */}
                <div className="p-3.5 rounded-xl bg-[#FFF8E7] border border-[#F3E5AB] flex items-start gap-2.5 text-xs text-[#7A5B04]">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#B89035]" />
                  <span>
                    <strong>Medical coordination assistance:</strong> Our on-site hospitality desk assists visiting patients with appointment scheduling, hospital travel directions, and 24/7 ambulance coordination.
                  </span>
                </div>
              </div>
            </section>

            {/* -------------------------------------------------- */}
            {/* SECTION F: STAY POLICIES & STANDARDS               */}
            {/* -------------------------------------------------- */}
            <section id="policies" className="scroll-mt-36 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#8C6D23] mb-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Stay Standards</span>
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#191A1E] tracking-tight">
                  Guest Policies & Rules
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#606470]">
                  Clear and transparent operational standards to ensure comfort and security for all guests.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 sm:p-8 shadow-xs divide-y divide-[#F0ECE4]">
                <div className="pb-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="text-xs font-semibold text-[#191A1E]">
                    Check-In & Check-Out Timings
                  </span>
                  <div className="sm:col-span-2 text-xs text-[#4A4D57] leading-relaxed">
                    Check-in window: <strong>11:00 AM – 1:00 PM</strong> (flexible arrival coordination available). Standard check-out is <strong>11:00 AM sharp</strong> to enable thorough sanitization.
                  </div>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="text-xs font-semibold text-[#191A1E]">
                    20% Deposit & 80% Balance
                  </span>
                  <div className="sm:col-span-2 text-xs text-[#4A4D57] leading-relaxed">
                    A flat <strong>20% advance payment</strong> is collected securely online via payment gateway to block and guarantee your flat. The <strong>remaining 80% balance</strong> is settled upon check-in at the property desk via Cash or UPI QR Code.
                  </div>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="text-xs font-semibold text-[#191A1E]">
                    Cancellation & Refund Rule
                  </span>
                  <div className="sm:col-span-2 text-xs text-[#4A4D57] leading-relaxed">
                    <strong>100% full refund</strong> of the 20% advance if cancelled 48 hours or more prior to scheduled check-in. Cancellations made within 48 hours forfeit the advance reservation hold fee.
                  </div>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="text-xs font-semibold text-[#191A1E]">
                    Mandatory Guest Verification
                  </span>
                  <div className="sm:col-span-2 text-xs text-[#4A4D57] leading-relaxed">
                    Indian guests must present an <strong>original government photo identity card</strong> (Aadhaar, Voter ID, Driver&apos;s License, Passport). International travelers must present an <strong>original physical passport</strong> at check-in.
                  </div>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="text-xs font-semibold text-[#191A1E]">
                    Children Policy
                  </span>
                  <div className="sm:col-span-2 text-xs text-[#4A4D57] leading-relaxed">
                    Children aged <strong>0–12 years stay completely FREE</strong>. They count toward room safety capacity but never trigger extra person charges.
                  </div>
                </div>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="text-xs font-semibold text-[#191A1E]">
                    Housekeeping Schedule
                  </span>
                  <div className="sm:col-span-2 text-xs text-[#4A4D57] leading-relaxed">
                    Complimentary housekeeping is conducted on <strong>alternate days</strong> across all daily, weekly, and monthly stays.
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ==================================================== */}
          {/* RIGHT COLUMN: STICKY BOOKING & CALCULATION PANEL     */}
          {/* ==================================================== */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-28 space-y-6">
            <div
              id="booking-panel"
              className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-md space-y-6"
            >
              {/* Header: Nightly Rate & 20% Advance pill */}
              <div className="pb-5 border-b border-[#F0ECE4]">
                <span className="text-[11px] font-sans font-semibold tracking-wider uppercase text-[#8C6D23] block">
                  Reserve At This Branch
                </span>

                <div className="mt-1 flex items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-2xl sm:text-3xl font-bold text-[#191A1E]">
                      ₹{selectedProperty?.basePricePerNight.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-[#606470]">/ night</span>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#EAE5DC] text-[11px] font-medium text-[#8C6D23]">
                    20% Hold Fee
                  </span>
                </div>
              </div>

              {/* 1. Flat Selector Dropdown */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#737785] mb-1.5">
                  Select Residence Category
                </label>
                <select
                  value={selectedRoomSlug}
                  onChange={(e) => setSelectedRoomSlug(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-sm text-[#191A1E] font-medium focus:outline-none focus:ring-2 focus:ring-[#B89035]/50 transition-all cursor-pointer"
                >
                  {properties.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.title} (₹{p.basePricePerNight.toLocaleString("en-IN")} / night · {p.baseAdults} Adults)
                    </option>
                  ))}
                </select>
              </div>

              {/* 2. Date Selection (Check-In & Check-Out) */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737785] mb-1">
                    Check-In
                  </label>
                  <input
                    type="date"
                    min={today ? format(today, "yyyy-MM-dd") : undefined}
                    value={checkIn ? format(checkIn, "yyyy-MM-dd") : ""}
                    onChange={(e) => {
                      if (e.target.value) {
                        const newIn = new Date(e.target.value);
                        setCheckIn(newIn);
                        if (checkOut && !isBefore(newIn, checkOut)) {
                          setCheckOut(addDays(newIn, 1));
                        }
                      }
                    }}
                    className="w-full h-10 px-2.5 rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-xs font-medium text-[#191A1E] focus:outline-none focus:ring-1 focus:ring-[#B89035] cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737785] mb-1">
                    Check-Out
                  </label>
                  <input
                    type="date"
                    min={
                      checkIn
                        ? format(addDays(checkIn, 1), "yyyy-MM-dd")
                        : today
                        ? format(addDays(today, 1), "yyyy-MM-dd")
                        : undefined
                    }
                    value={checkOut ? format(checkOut, "yyyy-MM-dd") : ""}
                    onChange={(e) => {
                      if (e.target.value) {
                        const newOut = new Date(e.target.value);
                        if (checkIn && !isBefore(checkIn, newOut)) {
                          setCheckOut(addDays(checkIn, 1));
                        } else {
                          setCheckOut(newOut);
                        }
                      }
                    }}
                    className="w-full h-10 px-2.5 rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-xs font-medium text-[#191A1E] focus:outline-none focus:ring-1 focus:ring-[#B89035] cursor-pointer"
                  />
                </div>
              </div>

              {/* 3. Guests Counter */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-semibold text-[#191A1E]">Adult Guests</span>
                    <span className="text-[11px] text-[#737785]">
                      Base: {selectedProperty?.baseAdults} (Max: {selectedProperty?.maxAdults})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                      disabled={adults <= 1}
                      className="w-7 h-7 rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] flex items-center justify-center text-[#191A1E] disabled:opacity-40 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-[#191A1E]">{adults}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setAdults((prev) =>
                          selectedProperty ? Math.min(selectedProperty.maxAdults, prev + 1) : prev + 1
                        )
                      }
                      disabled={selectedProperty ? adults >= selectedProperty.maxAdults : false}
                      className="w-7 h-7 rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] flex items-center justify-center text-[#191A1E] disabled:opacity-40 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#F0ECE4]">
                  <div>
                    <span className="block text-xs font-semibold text-[#191A1E]">Children (0–12 yrs)</span>
                    <span className="text-[11px] text-[#1E7E34] font-medium">Free of charge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setChildrenCount((prev) => Math.max(0, prev - 1))}
                      disabled={childrenCount <= 0}
                      className="w-7 h-7 rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] flex items-center justify-center text-[#191A1E] disabled:opacity-40 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-[#191A1E]">{childrenCount}</span>
                    <button
                      type="button"
                      onClick={() => setChildrenCount((prev) => Math.min(4, prev + 1))}
                      disabled={childrenCount >= 4}
                      className="w-7 h-7 rounded-lg border border-[#EAE5DC] bg-[#FAF8F5] flex items-center justify-center text-[#191A1E] disabled:opacity-40 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. Purpose Selection */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#737785] mb-1.5">
                  Purpose of Stay
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "medical", label: "Medical Stay", icon: HeartPulse },
                    { id: "tourism", label: "Tourism & Leisure", icon: Compass },
                    { id: "corporate", label: "Work & Corporate", icon: Briefcase },
                    { id: "family", label: "Family Vacation", icon: Users },
                  ].map((p) => {
                    const isChecked = selectedPurpose === p.id;
                    const Icon = p.icon;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPurpose(p.id as typeof selectedPurpose)}
                        className={cn(
                          "flex items-center gap-1.5 p-2 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer",
                          isChecked
                            ? "border-[#B89035] bg-[#FAF8F5] text-[#191A1E] ring-1 ring-[#B89035]/30 font-semibold"
                            : "border-[#EAE5DC] bg-white text-[#606470] hover:bg-[#FAF8F5]"
                        )}
                      >
                        <Icon className={cn("w-3.5 h-3.5 shrink-0", isChecked ? "text-[#B89035]" : "text-[#A0A4B0]")} />
                        <span className="truncate">{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Live Fare Calculation Breakdown Box */}
              {fareResult && (
                <div className="rounded-xl bg-[#FAF8F5] border border-[#EAE5DC] p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#4A4D57]">
                    <span>
                      ₹{selectedProperty?.basePricePerNight.toLocaleString("en-IN")} × {totalNights} {totalNights === 1 ? "night" : "nights"}
                    </span>
                    <span className="font-medium text-[#191A1E]">
                      ₹{fareResult.standardBaseRent.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {fareResult.baseRentDiscount > 0 && (
                    <div className="flex items-center justify-between text-[#1E7E34] font-medium">
                      <span>Duration Discount ({Math.round(fareResult.discountRate * 100)}% off)</span>
                      <span>-₹{fareResult.baseRentDiscount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  {fareResult.extraGuestsTotal > 0 && (
                    <div className="flex items-center justify-between text-[#4A4D57]">
                      <span>
                        Extra Adult Fee ({fareResult.extraAdults} × ₹500 × {totalNights}N)
                      </span>
                      <span className="font-medium text-[#191A1E]">
                        ₹{fareResult.extraGuestsTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#EAE5DC] flex items-center justify-between font-bold text-[#191A1E] text-sm">
                    <span>Total Amount</span>
                    <span>₹{fareResult.grossTotal.toLocaleString("en-IN")}</span>
                  </div>

                  {/* Payment Split Highlight (20% Advance Online / 80% on Arrival) */}
                  <div className="mt-3 pt-3 border-t border-[#EAE5DC] space-y-1.5">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#FFF8E7] border border-[#F3E5AB]">
                      <div>
                        <span className="block font-semibold text-[#8C6D23] text-xs">
                          20% Advance Payable Now
                        </span>
                        <span className="block text-[10.5px] text-[#8C6D23]/80">
                          To securely block & hold dates
                        </span>
                      </div>
                      <span className="font-heading font-bold text-[#8C6D23] text-base">
                        ₹{fareResult.advancePayable.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between px-1 text-[11px] text-[#737785]">
                      <span>80% Remaining Balance on Arrival</span>
                      <span className="font-semibold text-[#191A1E]">
                        ₹{fareResult.balanceDueOnArrival.toLocaleString("en-IN")} (Cash / UPI)
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 6. Primary Action Button */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleProceedBooking}
                  className="w-full h-12 rounded-xl bg-[#191A1E] hover:bg-[#2C2E35] text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Reserve This Flat</span>
                  <ArrowRight className="w-4 h-4 text-[#B89035]" />
                </button>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-10 rounded-xl border border-[#D1E7DD] bg-[#E8F5E9] hover:bg-[#D4EDDA] text-[#1E7E34] font-semibold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Inquire via WhatsApp Desk</span>
                </a>
              </div>

              {/* Reassuring micro-trust notes */}
              <div className="pt-3 border-t border-[#F0ECE4] space-y-1.5 text-[11px] text-[#737785]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1E7E34] shrink-0" />
                  <span>Free cancellation up to 48 hours prior to check-in</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#1E7E34] shrink-0" />
                  <span>Complimentary housekeeping on alternate days</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#1E7E34] shrink-0" />
                  <span>Original Photo ID or Passport required at check-in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 6. MOBILE STICKY BOTTOM RESERVATION BAR                  */}
      {/* Displays pricing and jumps to booking panel on mobile    */}
      {/* ======================================================== */}
      <aside
        aria-label="Mobile reservation bar"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#EAE5DC] px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3"
      >
        <div>
          <span className="block text-[10.5px] uppercase tracking-wider text-[#737785]">
            Starting from
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-heading text-lg font-bold text-[#191A1E]">
              ₹{selectedProperty?.basePricePerNight.toLocaleString("en-IN")}
            </span>
            <span className="text-[11px] text-[#606470]">/ night</span>
          </div>
          <span className="text-[10px] text-[#8C6D23] font-medium block">
            20% advance hold fee
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            const panel = document.getElementById("booking-panel");
            if (panel) {
              panel.scrollIntoView({ behavior: "smooth" });
            } else {
              handleProceedBooking();
            }
          }}
          className="px-4 py-2.5 sm:px-5 rounded-xl bg-[#191A1E] text-white font-semibold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <span>Select Dates & Book</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#B89035] shrink-0" />
        </button>
      </aside>

      {/* ======================================================== */}
      {/* 7. FULLSCREEN PHOTO LIGHTBOX MODAL                       */}
      {/* ======================================================== */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 text-white animate-in fade-in duration-200"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#B89035] font-mono">
                {galleryPhotos[activePhotoIndex].category}
              </span>
              <h2 className="font-heading text-sm sm:text-base font-semibold truncate max-w-xs sm:max-w-md">
                {galleryPhotos[activePhotoIndex].title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-white/70">
                {activePhotoIndex + 1} / {galleryPhotos.length}
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Image or Honest Placeholder Card */}
          <div className="relative flex-1 max-w-5xl mx-auto w-full my-4 flex items-center justify-center">
            {galleryPhotos[activePhotoIndex].isPlaceholder || !galleryPhotos[activePhotoIndex].src ? (
              <div className="max-w-xl mx-auto w-full p-8 rounded-2xl bg-gradient-to-br from-[#1C1E24] to-[#121316] border border-[#2E3038] text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#B89035]/15 border border-[#B89035]/30 flex items-center justify-center text-[#B89035]">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <span className="inline-block px-2.5 py-1 rounded text-xs font-mono uppercase tracking-wider text-[#E8DCB8] bg-[#B89035]/20 border border-[#B89035]/40 mb-2">
                    {galleryPhotos[activePhotoIndex].category}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white">
                    {galleryPhotos[activePhotoIndex].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A0A4B0] max-w-md mx-auto mt-2">
                    {galleryPhotos[activePhotoIndex].caption}
                  </p>
                </div>
                {galleryPhotos[activePhotoIndex].inclusions && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-[#E8DCB8]">
                    <strong>Verified Inclusions:</strong> {galleryPhotos[activePhotoIndex].inclusions}
                  </div>
                )}
                <div className="pt-2">
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E7E34] hover:bg-[#155724] text-white text-xs font-semibold transition-all shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Request Live Video Walkthrough via WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <Image
                src={galleryPhotos[activePhotoIndex].src!}
                alt={galleryPhotos[activePhotoIndex].title}
                fill
                className="object-contain"
                sizes="90vw"
              />
            )}

            {/* Previous Photo Button */}
            <button
              type="button"
              onClick={() =>
                setActivePhotoIndex(
                  (prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Photo Button */}
            <button
              type="button"
              onClick={() =>
                setActivePhotoIndex((prev) => (prev + 1) % galleryPhotos.length)
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="max-w-xl mx-auto w-full flex items-center justify-center gap-2 overflow-x-auto py-2">
            {galleryPhotos.map((photo, i) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setActivePhotoIndex(i)}
                className={cn(
                  "relative w-14 h-10 rounded-md overflow-hidden shrink-0 border transition-all cursor-pointer flex items-center justify-center bg-[#1C1E24]",
                  i === activePhotoIndex
                    ? "border-[#B89035] ring-2 ring-[#B89035]/60"
                    : "border-white/20 opacity-60 hover:opacity-100"
                )}
              >
                {photo.isPlaceholder || !photo.src ? (
                  <span className="text-[9px] font-mono text-[#E8DCB8] text-center px-1 truncate">
                    {photo.category.slice(0, 8)}
                  </span>
                ) : (
                  <Image src={photo.src} alt={photo.title} fill className="object-cover" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
