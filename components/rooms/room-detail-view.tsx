"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addDays, differenceInCalendarDays, format, isBefore, startOfToday } from "date-fns";
import {
  MapPin,
  Star,
  Users,
  BedDouble,
  Bath,
  UtensilsCrossed,
  Wifi,
  Wind,
  Zap,
  Droplets,
  ArrowUpDown,
  Car,
  Tv,
  ExternalLink,
  X,
  Check,
  CheckCircle2,
  Compass,
  ShieldCheck,
  FileText,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Stethoscope,
  Heart,
  Briefcase,
  Clock,
  AlertCircle,
  Info,
  ChevronRight,
} from "lucide-react";
import { RoomDetail, MOCK_ROOMS } from "@/lib/mock-rooms";
import { BRANCHES, getBranchBySlug, WHATSAPP_CONFIG } from "@/lib/constants";
import { RoomGallery } from "@/components/rooms/room-gallery";
import { BookingSidebar } from "@/components/rooms/booking-sidebar";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import {
  PURPOSE_CONFIGS,
  AMENITIES_BENTO,
  PurposeConfig,
  TailoredService,
  getAmenityIllustration,
  STAY_PURPOSE_ILLUSTRATIONS,
} from "./room-detail-data";

interface RoomDetailViewProps {
  room: RoomDetail | undefined;
  requestedId: string;
}

export function RoomDetailView({ room, requestedId }: RoomDetailViewProps) {
  const { user, openAuthModal } = useAuth();
  const router = useRouter();

  // Stay Purpose State (Allows "accommodation_only" or one of the 5 purposes)
  const [selectedPurposeId, setSelectedPurposeId] = React.useState<
    "medical" | "wedding" | "tourism" | "corporate" | "family" | "accommodation_only" | null
  >(null);
  const [selectedAddonIds, setSelectedAddonIds] = React.useState<string[]>([]);

  // Modals & Drawers
  const [amenitiesModalOpen, setAmenitiesModalOpen] = React.useState(false);
  const [serviceDiscoveryDrawerOpen, setServiceDiscoveryDrawerOpen] = React.useState(false);
  const [policiesModalOpen, setPoliciesModalOpen] = React.useState(false);
  const [showAllPaidServices, setShowAllPaidServices] = React.useState(false);
  const [showHeritageSights, setShowHeritageSights] = React.useState(false);

  // Controlled booking dates & guest count
  const [checkIn, setCheckIn] = React.useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = React.useState<Date | undefined>(undefined);
  const [adults, setAdults] = React.useState<number>(room?.baseAdults || 2);
  const [childrenCount, setChildrenCount] = React.useState<number>(0);
  const [selectedBranchSlug, setSelectedBranchSlug] = React.useState<string>(
    room?.branchSlug || "moghal-pura"
  );

  // Initialize dates, guests, purpose and addons safely from URL search params
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const sp = new URLSearchParams(window.location.search);
        const urlCheckIn = sp.get("checkIn");
        const urlCheckOut = sp.get("checkOut");
        const urlAdults = sp.get("adults");
        const urlKids = sp.get("kids") || sp.get("children");
        const urlPurpose = sp.get("purpose");
        const urlAddons = sp.get("addons");

        // 1. Dates
        let parsedIn: Date | undefined = undefined;
        let parsedOut: Date | undefined = undefined;

        if (urlCheckIn) {
          const d = new Date(urlCheckIn);
          if (!isNaN(d.getTime()) && !isBefore(d, startOfToday())) {
            parsedIn = d;
          }
        }
        if (urlCheckOut) {
          const d = new Date(urlCheckOut);
          if (!isNaN(d.getTime())) {
            parsedOut = d;
          }
        }

        if (parsedIn && parsedOut && isBefore(parsedIn, parsedOut)) {
          setCheckIn(parsedIn);
          setCheckOut(parsedOut);
        } else if (parsedIn) {
          setCheckIn(parsedIn);
          setCheckOut(addDays(parsedIn, 2));
        } else {
          setCheckIn(addDays(new Date(), 1));
          setCheckOut(addDays(new Date(), 3));
        }

        // 2. Guests
        if (urlAdults) {
          const a = parseInt(urlAdults, 10);
          if (!isNaN(a) && a >= 1) {
            setAdults(Math.min(a, room?.maxAdults || 8));
          }
        }

        if (urlKids) {
          const k = parseInt(urlKids, 10);
          if (!isNaN(k) && k >= 0) {
            const maxKids = room?.maxChildren ?? 10;
            setChildrenCount(Math.min(k, maxKids));
          }
        }

        // 3. Stay Purpose
        if (
          urlPurpose &&
          ["medical", "wedding", "tourism", "corporate", "family", "accommodation_only"].includes(urlPurpose)
        ) {
          setSelectedPurposeId(urlPurpose as typeof selectedPurposeId);
        } else {
          setSelectedPurposeId(null);
        }

        // 4. Addons
        if (urlAddons) {
          const ids = urlAddons.split(",").filter(Boolean);
          setSelectedAddonIds(ids);
        }
      } else {
        setCheckIn(addDays(new Date(), 1));
        setCheckOut(addDays(new Date(), 3));
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [room?.maxAdults, room?.maxChildren]);

  // Lock body scroll when modals or drawers are open
  React.useEffect(() => {
    if (amenitiesModalOpen || serviceDiscoveryDrawerOpen || policiesModalOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setAmenitiesModalOpen(false);
          setServiceDiscoveryDrawerOpen(false);
          setPoliciesModalOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [amenitiesModalOpen, serviceDiscoveryDrawerOpen, policiesModalOpen]);

  if (!room) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-24 text-center select-none">
        <h1 className="font-heading text-3xl font-semibold text-white">Residence Not Found</h1>
        <p className="text-sm text-[#A1A1AA] mt-2">
          The requested apartment ID &ldquo;{requestedId}&rdquo; was not found.
        </p>
        <Link
          href="/#flats"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#121316] font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore All Residences</span>
        </Link>
      </div>
    );
  }

  const branch = room.branchSlug ? getBranchBySlug(room.branchSlug) : undefined;
  const currentPurpose =
    selectedPurposeId && selectedPurposeId !== "accommodation_only"
      ? PURPOSE_CONFIGS.find((p) => p.id === selectedPurposeId) || null
      : null;

  const complimentaryServices = currentPurpose
    ? currentPurpose.services.filter((s) => s.type === "free")
    : [];
  const addonServices = currentPurpose
    ? currentPurpose.services.filter((s) => s.type === "addon")
    : [];

  const activePurposeLabel = React.useMemo(() => {
    switch (selectedPurposeId) {
      case "medical":
        return "Medistay — Hospital & Medical";
      case "wedding":
        return "Wedding Stay — Guests & Events";
      case "family":
        return "Family Vacation — Vacation & Long Stay";
      case "tourism":
        return "Wanderer — Heritage & Tourism";
      case "corporate":
        return "Corporate — Business & Executive";
      case "accommodation_only":
        return "Accommodation only";
      default:
        return "Not selected";
    }
  }, [selectedPurposeId]);

  // Filter other suites at this branch for the secondary comparison section
  const branchSuites = MOCK_ROOMS.filter(
    (r) => r.branchSlug === (selectedBranchSlug || branch?.slug || "moghal-pura")
  );

  const buildSuiteUrl = (suiteSlug: string) => {
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", format(checkIn, "yyyy-MM-dd"));
    if (checkOut) params.set("checkOut", format(checkOut, "yyyy-MM-dd"));
    if (adults) params.set("adults", adults.toString());
    if (childrenCount > 0) params.set("kids", childrenCount.toString());
    if (selectedPurposeId) params.set("purpose", selectedPurposeId);
    const qStr = params.toString();
    return `/properties/${suiteSlug}${qStr ? `?${qStr}` : ""}`;
  };

  const handleSelectBranch = (newBranchSlug: string) => {
    setSelectedBranchSlug(newBranchSlug);
    const targetRoom = MOCK_ROOMS.find((r) => r.branchSlug === newBranchSlug);
    if (targetRoom && targetRoom.slug !== room.slug) {
      router.push(`/rooms/${targetRoom.slug}`);
    }
  };

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleSkipPurpose = () => {
    setSelectedPurposeId("accommodation_only");
    setSelectedAddonIds([]);
  };

  const handleSelectPurposeAndOpenDrawer = (
    purposeId: "medical" | "wedding" | "tourism" | "corporate" | "family"
  ) => {
    setSelectedPurposeId(purposeId);
    setServiceDiscoveryDrawerOpen(true);
  };

  const scrollToPurpose = () => {
    const el = document.getElementById("stay-purpose-section");
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToBooking = () => {
    const el = document.getElementById("reservation-panel");
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const stayNights = React.useMemo(() => {
    if (checkIn && checkOut) {
      const diff = differenceInCalendarDays(checkOut, checkIn);
      return Math.max(1, diff);
    }
    return 2;
  }, [checkIn, checkOut]);

  // Selected-extras live subtotal for drawer and reservation sync
  const selectedAddonsTotal = React.useMemo(() => {
    return selectedAddonIds.reduce((sum, addonId) => {
      const srv = addonServices.find((s) => s.addonId === addonId);
      if (!srv || !srv.price) return sum;
      if (srv.priceUnit?.includes("night")) {
        return sum + srv.price * stayNights;
      }
      return sum + srv.price;
    }, 0);
  }, [selectedAddonIds, addonServices, stayNights]);

  // Medistay 3 structured meaningful groups (Vitals Kit, Concierge, Mobility)
  const medistayGroups = React.useMemo(() => {
    if (selectedPurposeId !== "medical") return null;

    const vitalsIds = ["med-09", "med-10", "med-11", "med-12"];
    const conciergeIds = ["med-01", "med-04", "med-02", "med-03", "med-05"];
    const mobilityIds = ["med-06", "med-07", "med-08", "med-13"];

    return [
      {
        id: "vitals",
        title: "In-Suite Medical & Vitals Kit",
        subtitle: "Sterilized clinical devices pre-stocked in your apartment",
        services: complimentaryServices.filter((s) => vitalsIds.includes(s.id)),
      },
      {
        id: "concierge",
        title: "Concierge & Hospital Liaison",
        subtitle: "24/7 logistical coordination with hospital desks & ambulances",
        services: complimentaryServices.filter((s) => conciergeIds.includes(s.id)),
      },
      {
        id: "mobility",
        title: "Mobility & Recovery Equipment",
        subtitle: "In-suite assistive setups and recovery massagers at ₹0 extra",
        services: complimentaryServices.filter((s) => mobilityIds.includes(s.id)),
      },
    ];
  }, [selectedPurposeId, complimentaryServices]);

  // Keyboard accessibility: close drawer on Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && serviceDiscoveryDrawerOpen) {
        setServiceDiscoveryDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [serviceDiscoveryDrawerOpen]);

  // 8 Verified Key Amenities with 3D Miniature Illustrations (AC, Wi-Fi, Kitchen, Washing Machine, Parking, Housekeeping, Power Backup, Elevator)
  const essentialAmenities = [
    {
      title: "Split Air Conditioning",
      desc: "Inverter AC in bedrooms",
      image: "/images/amenities/icon-air-conditioning.png",
    },
    {
      title: "High-Speed Fiber Wi-Fi",
      desc: "50+ Mbps dedicated broadband",
      image: "/images/amenities/icon-high-speed-wifi.png",
    },
    {
      title: "Private Modular Kitchen",
      desc: "Gas stove, fridge, RO water & cookware",
      image: "/images/amenities/icon-kitchen-dining.png",
    },
    {
      title: "Laundry Washing Machine",
      desc: "In-unit / on-demand laundry support",
      image: "/images/amenities/icon-laundry-washing.png",
    },
    {
      title: "Free Covered Parking",
      desc: "Dedicated on-premises secure parking",
      image: "/images/amenities/icon-parking.png",
    },
    {
      title: "Alternate-Day Housekeeping",
      desc: "Scheduled sanitization & fresh linens",
      image: "/images/amenities/icon-housekeeping.png",
    },
    {
      title: "100% Inverter Backup",
      desc: "Zero blackout guarantee for lights & appliances",
      image: "/images/amenities/icon-power-backup.png",
    },
    {
      title: "Passenger Elevator Lift",
      desc: "Step-free ramp access to your floor",
      image: "/images/amenities/icon-elevator.png",
    },
  ];

  // 4 Verified Landmarks
  const landmarks =
    branch?.slug === "barkas-salala"
      ? [
          { name: "Princess Durru Shehvar Hospital", dist: "1.5 km", time: "5 mins" },
          { name: "Owaisi Hospital & Research Centre", dist: "2.8 km", time: "8 mins" },
          { name: "Pahadi Shareef Markets", dist: "1.0 km", time: "3 mins" },
          { name: "Rajiv Gandhi Intl Airport (RGIA)", dist: "12 km", time: "20 mins" },
        ]
      : [
          { name: "Princess Esra Hospital (Deccan Medical)", dist: "800 m", time: "3 mins" },
          { name: "Historic Charminar & Laad Bazaar", dist: "1.0 km", time: "5 mins" },
          { name: "Owaisi Hospital & Research Centre", dist: "1.2 km", time: "5 mins" },
          { name: "Rajiv Gandhi Intl Airport (RGIA)", dist: "18 km", time: "30 mins" },
        ];

  return (
    <div className="relative w-full pb-32 sm:pb-24 text-[#F5F5F7] bg-[#121316] select-none min-h-screen">
      {/* ======================================================== */}
      {/* 1. TOP BREADCRUMB NAVIGATION                             */}
      {/* ======================================================== */}
      <nav
        aria-label="Breadcrumb"
        className="w-full border-b border-[#2E3038] bg-[#121316]/95 py-3 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between text-xs text-[#A1A1AA]">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 text-[#2E3038]" />
            <Link href="/#flats" className="hover:text-white transition-colors">
              Residences
            </Link>
            <ChevronRight className="h-3 w-3 text-[#2E3038]" />
            {branch && (
              <>
                <Link href={`/branches/${branch.slug}`} className="hover:text-white transition-colors">
                  {branch.name}
                </Link>
                <ChevronRight className="h-3 w-3 text-[#2E3038]" />
              </>
            )}
            <span className="text-white font-medium truncate max-w-[200px] sm:max-w-none">
              {room.title}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[11px]">
            <span className="text-[#C5A880] font-medium">20% Online Advance</span>
            <span>•</span>
            <span>80% Balance on Arrival</span>
          </div>
        </div>
      </nav>

      {/* ======================================================== */}
      {/* 2. MAIN CONTENT AREA                                     */}
      {/* ======================================================== */}
      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        {/* PROPERTY PHOTO GALLERY */}
        <RoomGallery images={room.gallery} roomTitle={room.title} />

        {/* SUBTLE 3-STEP BOOKING PROGRESSION */}
        <div className="w-full py-2.5 px-4 rounded-xl bg-[#161820]/90 border border-[#2E3038] flex items-center justify-between gap-3 overflow-x-auto text-xs">
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D4AF37] text-[#121316] font-bold text-[10px]">
              1
            </span>
            <span className="font-semibold text-white">1. Choose your flat</span>
            <span className="text-[10px] text-emerald-400 font-mono hidden sm:inline">
              ✓ Selected ({room.type})
            </span>
          </div>

          <ChevronRight className="w-3.5 h-3.5 text-[#52525B] shrink-0" />

          <button
            type="button"
            onClick={scrollToPurpose}
            className="flex items-center gap-2 group cursor-pointer text-left shrink-0"
          >
            <span
              className={cn(
                "flex items-center justify-center w-5 h-5 rounded-full font-bold text-[10px] transition-colors",
                selectedPurposeId && selectedPurposeId !== "accommodation_only"
                  ? "bg-[#D4AF37] text-[#121316]"
                  : selectedPurposeId === "accommodation_only"
                  ? "bg-emerald-500 text-white"
                  : "bg-white/10 text-white group-hover:bg-[#D4AF37]/20"
              )}
            >
              2
            </span>
            <span
              className={cn(
                "font-semibold transition-colors",
                selectedPurposeId ? "text-white" : "text-[#A1A1AA] group-hover:text-white"
              )}
            >
              2. Personalize your stay
            </span>
            <span className="text-[10px] text-[#A1A1AA] hidden md:inline">
              {selectedPurposeId && selectedPurposeId !== "accommodation_only"
                ? `(${activePurposeLabel.split(" — ")[0]})`
                : selectedPurposeId === "accommodation_only"
                ? "(Accommodation only)"
                : "(Optional)"}
            </span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-[#52525B] shrink-0" />

          <button
            type="button"
            onClick={scrollToBooking}
            className="flex items-center gap-2 group cursor-pointer text-left shrink-0"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/10 text-[#A1A1AA] group-hover:bg-[#D4AF37] group-hover:text-[#121316] font-bold text-[10px] transition-colors">
              3
            </span>
            <span className="font-semibold text-[#A1A1AA] group-hover:text-white transition-colors">
              3. Review and reserve
            </span>
            <span className="text-[10px] font-mono text-[#D4AF37] hidden sm:inline">
              20% Advance
            </span>
          </button>
        </div>

        {/* 2-COLUMN LUXURY ARCHITECTURE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ====================================================== */}
          {/* LEFT COLUMN: Property Details, Amenities, Personalize  */}
          {/* ====================================================== */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-10">
            {/* ── 1. PROPERTY HEADER & SPECS ── */}
            <section className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
                  FLATEL SERVICED RESIDENCE · {branch?.name?.toUpperCase() || "HYDERABAD"}
                </span>
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight mt-1">
                  {room.title}
                </h1>
              </div>

              {/* Verified Rating & Location Link */}
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#A1A1AA] flex-wrap">
                <div className="flex items-center gap-1.5 text-[#F5F5F7] font-semibold">
                  <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  <span>9.4</span>
                  <span className="text-[#A1A1AA] font-normal">(120+ verified reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-[#E4E4E7]">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{branch?.address || "Hyderabad"}</span>
                </div>
                {branch?.googleMapsUrl && (
                  <>
                    <span>•</span>
                    <a
                      href={branch.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#D4AF37] hover:underline font-semibold inline-flex items-center gap-1"
                    >
                      <span>Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </>
                )}
              </div>

              {/* Minimalist Specs Row */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 pt-1 text-xs sm:text-sm text-[#D4D4D8]">
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                  <span>Up to {room.maxAdults} Guests</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <BedDouble className="w-4 h-4 text-[#D4AF37]" />
                  <span>{room.specs.bedrooms}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Bath className="w-4 h-4 text-[#D4AF37]" />
                  <span>{room.specs.bathroom}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <UtensilsCrossed className="w-4 h-4 text-[#D4AF37]" />
                  <span>Modular Kitchen</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#D4AF37]" />
                  <span>100% Inverter Backup</span>
                </div>
              </div>

              {/* Nightly Price Banner for immediate understanding */}
              <div className="flex items-baseline gap-2 pt-2">
                <span className="font-heading text-2xl sm:text-3xl font-semibold text-white">
                  ₹{room.basePricePerNight.toLocaleString("en-IN")}
                </span>
                <span className="text-sm text-[#A1A1AA]">/ night</span>
                <span className="text-xs text-emerald-400 font-medium ml-2">
                  (Lock with 20% online advance deposit)
                </span>
              </div>

              {/* Short Readable Property Description */}
              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed pt-1 font-normal">
                {room.shortDescription}
              </p>
            </section>

            <hr className="border-[#2E3038]/70" />

            {/* ── 2. INCLUDED WITH YOUR FLAT ── */}
            <section className="space-y-4" aria-labelledby="amenities-heading">
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <div>
                  <h2 id="amenities-heading" className="font-heading text-xl sm:text-2xl font-semibold text-white">
                    Included with your flat
                  </h2>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">
                    Compulsory property inclusions in your accommodation price at no extra charge.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAmenitiesModalOpen(true)}
                  className="text-xs font-semibold text-[#D4AF37] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>View all amenities</span>
                  <span>→</span>
                </button>
              </div>

              {/* 8 Key Included Amenities with 3D Miniature Illustrations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {essentialAmenities.map((item) => {
                  return (
                    <div
                      key={item.title}
                      className="group flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-[#1C1E24] border border-[#2E3038] hover:border-[#D4AF37]/40 hover:bg-[#20232A] transition-all"
                    >
                      <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#121316] border border-[#2E3038] group-hover:border-[#D4AF37]/40 flex items-center justify-center shrink-0 overflow-hidden p-1 transition-colors">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="44px"
                          className="object-contain p-0.5 group-hover:scale-110 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] transition-transform duration-200"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xs sm:text-sm font-semibold text-white tracking-tight leading-snug truncate">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-[#A1A1AA] mt-0.5 leading-snug line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <hr className="border-[#2E3038]/70" />

            {/* ── 3. STAY-PURPOSE DISCOVERY & SERVICES (Step 2 of the Journey) ── */}
            <section id="stay-purpose-section" className="space-y-6" aria-labelledby="purpose-heading">
              <div className="flex items-start sm:items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                      Step 2 of 3 · Personalize Your Stay
                    </span>
                    <span className="text-[11px] text-[#A1A1AA]">• Optional</span>
                  </div>
                  <h2 id="purpose-heading" className="font-heading text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                    Make your stay work for you
                  </h2>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1 max-w-2xl leading-relaxed">
                    Tell us what brings you to Hyderabad so we can show you the most relevant guest services.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSkipPurpose}
                  className={cn(
                    "px-3.5 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all",
                    selectedPurposeId === "accommodation_only"
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                      : "bg-white/5 border-white/15 text-[#A1A1AA] hover:text-white hover:border-white/30"
                  )}
                >
                  {selectedPurposeId === "accommodation_only"
                    ? "✓ Accommodation only active"
                    : "Skip — accommodation only"}
                </button>
              </div>

              {/* 5 Visually Consistent, Comfortable Purpose Choices with 3D Illustrations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3.5 sm:gap-4">
                {[
                  {
                    id: "medical" as const,
                    title: "Medistay",
                    subtitle: "Hospital & Medical",
                    desc: "Doctor appointment liaison, hospital proximity mapping, mobility ramp setups & 24/7 ambulance coordination.",
                    badge: "14 Included Care Items",
                    image: STAY_PURPOSE_ILLUSTRATIONS.medical,
                  },
                  {
                    id: "wedding" as const,
                    title: "Wedding Stay",
                    subtitle: "Guests & Events",
                    desc: "Heavy garment steamers, bridal dressing mirrors, group block coordination & event banquet transfers.",
                    badge: "Group & Event Support",
                    image: STAY_PURPOSE_ILLUSTRATIONS.wedding,
                  },
                  {
                    id: "family" as const,
                    title: "Family Vacation",
                    subtitle: "Vacation & Long Stay",
                    desc: "Baby cot, modular kitchen with basic cooking staples, indoor board games, alternate-day cleaning & long-stay savings.",
                    badge: "Kitchen & Family Friendly",
                    image: STAY_PURPOSE_ILLUSTRATIONS.family,
                  },
                  {
                    id: "tourism" as const,
                    title: "Wanderer",
                    subtitle: "Heritage & Tourism",
                    desc: "Charminar & Old City monument itineraries, 24/7 dining recommendations, luggage support & airport transfer cabs.",
                    badge: "Old City Route Guide",
                    image: STAY_PURPOSE_ILLUSTRATIONS.tourism,
                  },
                  {
                    id: "corporate" as const,
                    title: "Corporate",
                    subtitle: "Business & Executive",
                    desc: "High-speed 50+ Mbps fiber Wi-Fi, ergonomic work desk, laptop table, automated GST tax receipts & quiet workspace.",
                    badge: "Work Desk & Fast Wi-Fi",
                    image: STAY_PURPOSE_ILLUSTRATIONS.corporate,
                  },
                ].map((item) => {
                  const isSelected = selectedPurposeId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectPurposeAndOpenDrawer(item.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSelectPurposeAndOpenDrawer(item.id);
                        }
                      }}
                      className={cn(
                        "group p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-4 relative",
                        isSelected
                          ? "bg-[#D4AF37]/10 border-[#D4AF37] ring-1 ring-[#D4AF37] shadow-lg shadow-[#D4AF37]/5"
                          : "bg-[#1C1E24] border-[#2E3038] hover:border-[#D4AF37]/40 hover:bg-[#20232A]"
                      )}
                    >
                      {/* Top 3D Illustration & Badge */}
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className={cn(
                            "relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl shrink-0 overflow-hidden transition-all duration-300 p-0.5",
                            isSelected
                              ? "bg-gradient-to-b from-[#D4AF37]/25 to-[#121316] border-2 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)] ring-1 ring-[#D4AF37]"
                              : "bg-[#121316] border border-[#2E3038] group-hover:border-[#D4AF37]/50 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                          )}
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="56px"
                            className="object-cover rounded-[10px] group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20 text-right">
                          {item.badge}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-heading text-base sm:text-lg font-bold text-white tracking-tight">
                            {item.title}
                          </h3>
                          {isSelected && (
                            <span className="flex items-center gap-1 text-[11px] font-semibold text-[#D4AF37]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>Active</span>
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-[#C5A880]">
                          {item.subtitle}
                        </p>
                        <p className="text-xs text-[#A1A1AA] leading-relaxed mt-1.5 line-clamp-3">
                          {item.desc}
                        </p>
                      </div>

                      {/* Action Button */}
                      <div className="pt-2.5 border-t border-[#2E3038]/60 flex items-center justify-between">
                        <span className="text-[11px] text-[#A1A1AA]">
                          {isSelected && selectedAddonIds.length > 0
                            ? `${selectedAddonIds.length} add-on(s) selected`
                            : "Complimentary & paid catalogue"}
                        </span>
                        <span
                          className={cn(
                            "text-xs font-bold inline-flex items-center gap-1 transition-colors",
                            isSelected
                              ? "text-[#D4AF37]"
                              : "text-[#F5F5F7] group-hover:text-[#D4AF37]"
                          )}
                        >
                          <span>
                            {isSelected
                              ? selectedAddonIds.length > 0
                                ? `Manage (${selectedAddonIds.length})`
                                : "Explore services"
                              : "Explore services"}
                          </span>
                          <span className="transition-transform group-hover:translate-x-0.5">→</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Connected Journey Status Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#161820] border border-[#2E3038] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {selectedPurposeId && selectedPurposeId !== "accommodation_only" && currentPurpose ? (
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-11 h-11 rounded-xl bg-[#121316] border border-[#D4AF37]/50 shrink-0 overflow-hidden shadow-sm">
                      <Image
                        src={
                          selectedPurposeId === "medical"
                            ? STAY_PURPOSE_ILLUSTRATIONS.medical
                            : selectedPurposeId === "wedding"
                            ? STAY_PURPOSE_ILLUSTRATIONS.wedding
                            : selectedPurposeId === "family"
                            ? STAY_PURPOSE_ILLUSTRATIONS.family
                            : selectedPurposeId === "tourism"
                            ? STAY_PURPOSE_ILLUSTRATIONS.tourism
                            : selectedPurposeId === "corporate"
                            ? STAY_PURPOSE_ILLUSTRATIONS.corporate
                            : STAY_PURPOSE_ILLUSTRATIONS.medical
                        }
                        alt={activePurposeLabel}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm font-semibold text-white">
                          {activePurposeLabel} Active
                        </span>
                        <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                          {selectedAddonIds.length > 0 ? `${selectedAddonIds.length} Paid Extras` : "Complimentary Services Active"}
                        </span>
                      </div>
                      <p className="text-xs text-[#A1A1AA]">
                        {selectedAddonIds.length > 0
                          ? `${selectedAddonIds.length} optional add-on(s) selected and reflected in booking total.`
                          : `Complimentary services included at ₹0 extra. Optional paid add-ons can be selected anytime.`}
                      </p>
                    </div>
                  </div>
                ) : selectedPurposeId === "accommodation_only" ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-semibold text-white">
                        Accommodation Only Confirmed
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Standard Stay
                      </span>
                    </div>
                    <p className="text-xs text-[#A1A1AA]">
                      You are booking the serviced residence without extra purpose packages. All flat amenities remain included.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-sm font-semibold">
                        Optional Step · Select a Purpose Above or Continue with Accommodation
                      </span>
                    </div>
                    <p className="text-xs text-[#A1A1AA]">
                      Choosing a purpose unlocks tailored complimentary assistance and optional add-ons.
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-3 shrink-0 flex-wrap">
                  {selectedPurposeId && selectedPurposeId !== "accommodation_only" ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setServiceDiscoveryDrawerOpen(true)}
                        className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <span>
                          {selectedAddonIds.length > 0
                            ? `Manage Services (${selectedAddonIds.length}) →`
                            : "Explore Services Catalogue →"}
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={handleSkipPurpose}
                        className="text-xs text-[#A1A1AA] hover:text-white underline cursor-pointer"
                      >
                        Switch to accommodation only
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={scrollToBooking}
                      className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-bold text-xs cursor-pointer transition-colors shadow-sm"
                    >
                      Continue to Reservation Panel →
                    </button>
                  )}
                </div>
              </div>
            </section>

            <hr className="border-[#2E3038]/70" />

            {/* ── 4. LOCATION & NEARBY PLACES ── */}
            <section className="space-y-4" aria-labelledby="location-heading">
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <div>
                  <h2 id="location-heading" className="font-heading text-xl sm:text-2xl font-semibold text-white">
                    Location &amp; Nearby Places
                  </h2>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">
                    Central Old City position with swift access to key hospitals and heritage sites.
                  </p>
                </div>
                {branch?.googleMapsUrl && (
                  <a
                    href={branch.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#D4AF37] hover:underline"
                  >
                    Open Google Maps Navigation →
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {landmarks.map((lm) => (
                  <div
                    key={lm.name}
                    className="p-3 rounded-xl bg-[#1C1E24] border border-[#2E3038] flex items-center justify-between"
                  >
                    <span className="text-white font-medium truncate pr-2">{lm.name}</span>
                    <span className="font-mono text-[#D4AF37] shrink-0">
                      {lm.dist} ({lm.time})
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-[#2E3038]/70" />

            {/* ── 5. POLICIES & HOUSE RULES ── */}
            <section className="space-y-4" aria-labelledby="policies-heading">
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <div>
                  <h2 id="policies-heading" className="font-heading text-xl sm:text-2xl font-semibold text-white">
                    Stay Policies &amp; House Rules
                  </h2>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">
                    Clear terms for stress-free booking and stay.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPoliciesModalOpen(true)}
                  className="text-xs font-semibold text-[#D4AF37] hover:underline cursor-pointer"
                >
                  View full cancellation policy →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#A1A1AA]">
                <div className="space-y-1">
                  <h3 className="text-white font-medium">Check-In &amp; Check-Out</h3>
                  <p className="text-[11px] leading-relaxed">
                    Check-in: 11:00 AM &ndash; 1:00 PM
                    <br />
                    Check-out: 11:00 AM sharp
                  </p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-white font-medium">Payment Split</h3>
                  <p className="text-[11px] leading-relaxed">
                    20% advance payable online
                    <br />
                    80% remaining balance on arrival
                  </p>
                </div>
                <div className="space-y-1">
                  <h3 className="text-white font-medium">Cancellation Terms</h3>
                  <p className="text-[11px] leading-relaxed">
                    100% advance refund up to 48 hrs before check-in. Non-refundable within 48 hrs.
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-[#2E3038]/70" />

            {/* ── 6. OTHER RESIDENCES AT THIS BRANCH ── */}
            <section className="space-y-4 pt-2" aria-labelledby="other-flats-heading">
              <div>
                <h2 id="other-flats-heading" className="font-heading text-xl sm:text-2xl font-semibold text-white">
                  Other Residences at {branch?.name || "This Location"}
                </h2>
                <p className="text-xs text-[#A1A1AA] mt-0.5">
                  Explore and compare other verified BHK configurations available at this branch.
                </p>
              </div>

              <div
                className={cn(
                  "grid gap-4 grid-cols-1 sm:grid-cols-2",
                  branchSuites.length >= 4
                    ? "lg:grid-cols-4"
                    : branchSuites.length === 3
                    ? "lg:grid-cols-3"
                    : "lg:grid-cols-2"
                )}
              >
                {branchSuites.map((s) => {
                  const isCurrent = s.id === room.id;
                  const suiteImage = s.gallery?.[0]?.url || "/images/flats/flat-1bhk-luxury.jpg";
                  return (
                    <div
                      key={s.id}
                      className={cn(
                        "group relative flex flex-col justify-between rounded-2xl bg-[#1C1E24] p-3 transition-all",
                        isCurrent
                          ? "border-2 border-[#D4AF37] shadow-lg shadow-[#D4AF37]/10"
                          : "border border-[#2E3038] hover:border-[#D4AF37]/60 hover:shadow-md"
                      )}
                    >
                      {/* Property Image & Badges */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#121316]">
                        <Image
                          src={suiteImage}
                          alt={s.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                        {/* Top-left: Small Elegant BHK Label */}
                        <div className="absolute top-2.5 left-2.5 z-10">
                          <span className="px-2 py-0.5 rounded-md bg-[#121316]/90 backdrop-blur-md border border-[#2E3038] text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] font-semibold">
                            {s.type}
                          </span>
                        </div>

                        {/* Top-right: Selected State Label if Currently Viewing */}
                        {isCurrent && (
                          <div className="absolute top-2.5 right-2.5 z-10">
                            <span className="px-2 py-0.5 rounded-md bg-[#D4AF37] text-[#121316] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                              Viewing
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content Info */}
                      <div className="pt-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-heading text-sm sm:text-base font-semibold text-[#F5F5F7] truncate group-hover:text-[#D4AF37] transition-colors">
                            {s.title}
                          </h3>

                          {/* Concise Guest Capacity Summary */}
                          <p className="text-[11px] text-[#A1A1AA] flex items-center gap-1.5 mt-1 truncate">
                            <Users className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                            <span>Up to {s.maxAdults} Guests • {s.specs.bedrooms}</span>
                          </p>
                        </div>

                        {/* Price & Action */}
                        <div className="mt-3">
                          <div className="pt-2 border-t border-[#2E3038]/70 flex items-baseline justify-between">
                            <div className="flex items-baseline gap-1">
                              <span className="font-heading text-base font-bold text-[#F5F5F7]">
                                ₹{s.basePricePerNight.toLocaleString("en-IN")}
                              </span>
                              <span className="text-[11px] text-[#A1A1AA]">/ night</span>
                            </div>
                            <span className="text-[10px] text-emerald-400 font-mono font-medium">
                              20% Advance
                            </span>
                          </div>

                          {/* View Residence Button */}
                          {isCurrent ? (
                            <div className="w-full mt-2.5 h-8.5 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold flex items-center justify-center select-none cursor-default">
                              <span>Current Residence</span>
                            </div>
                          ) : (
                            <Link
                              href={buildSuiteUrl(s.slug)}
                              className="w-full mt-2.5 h-8.5 rounded-lg bg-[#121316] hover:bg-[#D4AF37] border border-[#2E3038] hover:border-[#D4AF37] text-[#F5F5F7] hover:text-[#121316] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] group/btn cursor-pointer"
                            >
                              <span>View Residence</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* ====================================================== */}
          {/* RIGHT COLUMN: Sticky Booking Panel                     */}
          {/* ====================================================== */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 space-y-4">
            <div id="reservation-panel" className="w-full">
              <React.Suspense
                fallback={
                  <div className="h-[400px] w-full animate-pulse rounded-2xl border border-[#2E3038] bg-[#1C1E24]" />
                }
              >
                <BookingSidebar
                  room={room}
                  selectedPurposeId={selectedPurposeId}
                  selectedAddonIds={selectedAddonIds}
                  onSelectPurpose={(p) => setSelectedPurposeId(p)}
                  onToggleAddon={handleToggleAddon}
                  onOpenServiceDrawer={() => setServiceDiscoveryDrawerOpen(true)}
                  onScrollToPurpose={scrollToPurpose}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  adults={adults}
                  childrenCount={childrenCount}
                  onCheckInChange={setCheckIn}
                  onCheckOutChange={setCheckOut}
                  onAdultsChange={setAdults}
                  onChildrenChange={setChildrenCount}
                />
              </React.Suspense>
            </div>
          </div>
        </div>
      </main>

      {/* ======================================================== */}
      {/* MODAL 1: COMPLETE INCLUDED AMENITIES MODAL              */}
      {/* ======================================================== */}
      {amenitiesModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setAmenitiesModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#1C1E24] border border-[#2E3038] shadow-2xl text-[#F5F5F7] p-6 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#2E3038] pb-4">
              <div>
                <h3 className="font-heading text-xl font-bold text-white">
                  Included with your flat &mdash; All Verified Inclusions
                </h3>
                <p className="text-xs text-[#A1A1AA] mt-0.5">
                  Verified property inclusions for {room.title} ({branch?.name || "Hyderabad"}).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAmenitiesModalOpen(false)}
                className="h-8 w-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/15 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Informational Notice */}
            <div className="p-3 rounded-xl bg-white/5 border border-[#2E3038] text-xs text-[#A1A1AA] flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <p>
                Property amenities are compulsory inclusions in the accommodation price for the flats where they are provided. They are purely informational and not separately selectable or chargeable.
              </p>
            </div>

            {/* 6 Real Categories from AMENITIES_BENTO */}
            <div className="space-y-6">
              {AMENITIES_BENTO.map((cat) => {
                const catIllustration = getAmenityIllustration(cat.category);
                return (
                  <div key={cat.category} className="space-y-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-7 h-7 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 overflow-hidden p-0.5">
                        <Image
                          src={catIllustration}
                          alt={cat.category}
                          fill
                          sizes="28px"
                          className="object-contain"
                        />
                      </div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                        {cat.category}
                      </h4>
                    </div>
                    <p className="text-[11px] text-[#A1A1AA] italic">
                      {cat.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cat.items.map((it) => {
                        const itemIllustration = getAmenityIllustration(it.name);
                        return (
                          <div
                            key={it.name}
                            className="flex items-center gap-2.5 p-2 rounded-lg bg-[#121316] border border-[#2E3038] text-xs text-[#E4E4E7]"
                          >
                            <div className="relative w-6 h-6 rounded-md bg-[#1C1E24] border border-[#2E3038] flex items-center justify-center shrink-0 overflow-hidden p-0.5">
                              <Image
                                src={itemIllustration}
                                alt={it.name}
                                fill
                                sizes="24px"
                                className="object-contain"
                              />
                            </div>
                            <span className="truncate">{it.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-[#2E3038] pt-4 flex items-center justify-between text-xs">
              <span className="text-[#A1A1AA] font-mono">
                Included in base nightly rent &bull; ₹0 extra fee
              </span>
              <button
                type="button"
                onClick={() => setAmenitiesModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#121316] font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* DRAWER 2: DEDICATED MEDISTAY / SERVICE DISCOVERY DRAWER  */}
      {/* ======================================================== */}
      {serviceDiscoveryDrawerOpen && currentPurpose && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-heading"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setServiceDiscoveryDrawerOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl h-[95vh] sm:h-auto sm:max-h-[90vh] flex flex-col rounded-t-2xl sm:rounded-2xl bg-[#1C1E24] border border-[#2E3038] shadow-2xl text-[#F5F5F7] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── 1. DRAWER HEADER (Pinned) ── */}
            <div className="p-4 sm:p-6 border-b border-[#2E3038] shrink-0 bg-[#1C1E24] space-y-3 z-10">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="relative w-12 h-12 rounded-xl bg-[#121316] border border-[#D4AF37]/40 shrink-0 overflow-hidden shadow-md">
                    <Image
                      src={
                        selectedPurposeId === "medical"
                          ? STAY_PURPOSE_ILLUSTRATIONS.medical
                          : selectedPurposeId === "wedding"
                          ? STAY_PURPOSE_ILLUSTRATIONS.wedding
                          : selectedPurposeId === "family"
                          ? STAY_PURPOSE_ILLUSTRATIONS.family
                          : selectedPurposeId === "tourism"
                          ? STAY_PURPOSE_ILLUSTRATIONS.tourism
                          : selectedPurposeId === "corporate"
                          ? STAY_PURPOSE_ILLUSTRATIONS.corporate
                          : STAY_PURPOSE_ILLUSTRATIONS.medical
                      }
                      alt={currentPurpose.label}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3
                      id="drawer-heading"
                      className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight"
                    >
                      {selectedPurposeId === "medical"
                        ? "Medistay services"
                        : `${currentPurpose.label} services`}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] mt-0.5">
                      {selectedPurposeId === "medical"
                        ? "Hospital & medical support during your stay"
                        : currentPurpose.description}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setServiceDiscoveryDrawerOpen(false)}
                  className="h-8 w-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/15 cursor-pointer shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  aria-label="Close services drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Compact, Readable Medical Disclaimer */}
              {selectedPurposeId === "medical" && (
                <div className="p-3 rounded-xl bg-[#121316] border border-[#2E3038] flex items-start gap-2.5 text-xs text-[#A1A1AA] leading-relaxed">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white font-medium">Non-clinical assistance notice:</strong> Flatel Hospitality provides serviced residential accommodation, mobility setups, and concierge liaison. We do not provide clinical treatment or emergency medical diagnosis. Healthcare is delivered exclusively by licensed third-party hospitals and doctors.
                  </p>
                </div>
              )}

              {selectedPurposeId === "wedding" && (
                <div className="p-3 rounded-xl bg-[#121316] border border-[#2E3038] flex items-start gap-2.5 text-xs text-[#A1A1AA] leading-relaxed">
                  <Info className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white font-medium">Wedding Coordination Notice:</strong> In-suite heavy garment steamers, mirrors, and guest group check-in are arranged directly by Flatel. Large event venue bookings and decorators require third-party liaison.
                  </p>
                </div>
              )}
            </div>

            {/* ── 2. SCROLLABLE SERVICES AREA ── */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 sm:space-y-7 overscroll-contain">
              {/* ── 2A. COMPLIMENTARY SERVICES (Included With Your Stay) ── */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#2E3038] text-xs flex-wrap gap-2">
                  <div>
                    <h4 className="font-heading text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Included with your stay</span>
                    </h4>
                    <p className="text-[11px] text-[#A1A1AA] mt-0.5">
                      Verified care inclusions provided with your flat at no additional charge.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 shrink-0 font-medium">
                    Complimentary · ₹0 extra
                  </span>
                </div>

                {/* Structured Groups for Medistay */}
                {medistayGroups ? (
                  <div className="space-y-5">
                    {medistayGroups.map((group) => (
                      <div key={group.id} className="space-y-2.5">
                        <div className="flex items-baseline justify-between gap-2">
                          <h5 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                            {group.title}
                          </h5>
                          <span className="text-[10px] text-[#A1A1AA]">
                            {group.subtitle}
                          </span>
                        </div>

                        <div className="space-y-2">
                          {group.services.map((srv) => {
                            const Icon = srv.icon || Stethoscope;
                            return (
                              <div
                                key={srv.id}
                                className="p-3 sm:p-3.5 rounded-xl bg-[#121316] border border-[#2E3038] hover:border-[#2E3038]/90 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4"
                              >
                                <div className="flex items-start gap-3 min-w-0 flex-1">
                                  <div className="w-8 h-8 rounded-lg bg-[#1C1E24] border border-[#2E3038] flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h6 className="font-semibold text-white text-xs sm:text-sm">
                                      {srv.title}
                                    </h6>
                                    <p className="text-[11px] text-[#A1A1AA] mt-0.5 leading-snug">
                                      {srv.shortDesc}
                                    </p>
                                    {srv.eligibilityNote && (
                                      <p className="text-[10px] text-[#C5A880]/90 mt-1 leading-snug flex items-start gap-1">
                                        <Info className="w-3 h-3 text-[#C5A880] shrink-0 mt-0.5" />
                                        <span>Condition: {srv.eligibilityNote}</span>
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="shrink-0 flex items-center justify-end">
                                  {srv.isRequestBased ? (
                                    <span className="text-[10px] font-mono font-medium text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                                      On arrival request · ₹0
                                    </span>
                                  ) : (
                                    <span className="text-[10px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                      Included in flat · ₹0
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Standard List for other purposes */
                  <div className="space-y-2">
                    {complimentaryServices.map((srv) => {
                      const Icon = srv.icon || Check;
                      return (
                        <div
                          key={srv.id}
                          className="p-3 sm:p-3.5 rounded-xl bg-[#121316] border border-[#2E3038] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4"
                        >
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            <div className="w-8 h-8 rounded-lg bg-[#1C1E24] border border-[#2E3038] flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h6 className="font-semibold text-white text-xs sm:text-sm">
                                {srv.title}
                              </h6>
                              <p className="text-[11px] text-[#A1A1AA] mt-0.5 leading-snug">
                                {srv.shortDesc}
                              </p>
                              {srv.eligibilityNote && (
                                <p className="text-[10px] text-[#C5A880] mt-1 leading-snug flex items-start gap-1">
                                  <Info className="w-3 h-3 text-[#C5A880] shrink-0 mt-0.5" />
                                  <span>{srv.eligibilityNote}</span>
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="shrink-0 flex items-center justify-end">
                            {srv.isRequestBased ? (
                              <span className="text-[10px] font-mono font-medium text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                                On arrival request · ₹0
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                Included in flat · ₹0
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Curated Heritage Route Guide preview for Wanderer */}
                {selectedPurposeId === "tourism" && (
                  <div className="mt-3 p-3.5 rounded-xl bg-[#161820] border border-[#2E3038]/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white font-medium flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Curated Heritage Sights Nearby (Included Route Guide)</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowHeritageSights((prev) => !prev)}
                        className="text-[11px] text-[#D4AF37] hover:underline cursor-pointer"
                      >
                        {showHeritageSights ? "Hide monuments ↑" : "View 4 key monuments ↓"}
                      </button>
                    </div>
                    {showHeritageSights && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#2E3038]/60 text-xs">
                        {[
                          { name: "Historic Charminar & Laad Bazaar", dist: "1.0 km (5 mins)" },
                          { name: "Chowmahalla Palace", dist: "1.5 km (6 mins)" },
                          { name: "Golconda Fort & Light Show", dist: "8.5 km (25 mins)" },
                          { name: "Salar Jung Museum", dist: "2.0 km (8 mins)" },
                        ].map((site) => (
                          <div key={site.name} className="p-2 rounded-lg bg-[#121316] border border-[#2E3038] flex items-center justify-between">
                            <span className="text-[#F5F5F7] truncate">{site.name}</span>
                            <span className="text-[10px] font-mono text-[#D4AF37] shrink-0 ml-1">{site.dist}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ── 2B. OPTIONAL PAID SERVICES ── */}
              {addonServices.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-[#2E3038]">
                  <div className="flex items-center justify-between pb-2 border-b border-[#2E3038] text-xs flex-wrap gap-2">
                    <div>
                      <h4 className="font-heading text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        <span>Optional paid services</span>
                      </h4>
                      <p className="text-[11px] text-[#A1A1AA] mt-0.5">
                        Only pay for what you choose. Never added without your explicit consent.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-0.5 rounded border border-[#D4AF37]/20 shrink-0 font-medium">
                      Verified master pricing
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {addonServices.map((srv) => {
                      const isChecked = srv.addonId ? selectedAddonIds.includes(srv.addonId) : false;
                      const priceLabel = srv.price
                        ? `₹${srv.price.toLocaleString("en-IN")}${srv.priceUnit ? ` ${srv.priceUnit}` : ""}`
                        : srv.badge;
                      const Icon = srv.icon || Sparkles;

                      return (
                        <div
                          key={srv.id}
                          className={cn(
                            "p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3.5",
                            isChecked
                              ? "bg-[#D4AF37]/10 border-[#D4AF37] ring-1 ring-[#D4AF37]/40 shadow-xs"
                              : "bg-[#121316] border-[#2E3038] hover:border-[#D4AF37]/30"
                          )}
                        >
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            <div
                              className={cn(
                                "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                                isChecked
                                  ? "bg-[#D4AF37] text-[#121316]"
                                  : "bg-[#1C1E24] border border-[#2E3038] text-[#D4AF37]"
                              )}
                            >
                              <Icon className="w-4.5 h-4.5" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h5 className="font-semibold text-white text-xs sm:text-sm tracking-tight">
                                  {srv.title}
                                </h5>
                                {srv.requiresConfirmation && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#C5A880] bg-[#C5A880]/10 px-2 py-0.5 rounded border border-[#C5A880]/20">
                                    <Clock className="w-3 h-3" />
                                    <span>Requires confirmation</span>
                                  </span>
                                )}
                              </div>

                              <p className="text-xs text-[#A1A1AA] mt-0.5 leading-relaxed">
                                {srv.shortDesc}
                              </p>

                              {srv.requiresConfirmation && (
                                <p className="text-[11px] text-[#A1A1AA]/80 mt-1">
                                  Liaison with licensed medical partners; confirmed after booking.
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-3.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#2E3038]/60">
                            <div className="text-left sm:text-right">
                              <span className="font-heading text-sm sm:text-base font-bold text-[#D4AF37] font-mono block">
                                {priceLabel}
                              </span>
                              <span className="text-[10px] text-[#A1A1AA] block">
                                {srv.priceUnit?.includes("night")
                                  ? `₹${((srv.price || 0) * stayNights).toLocaleString("en-IN")} for ${stayNights}N`
                                  : "Fixed service fee"}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => srv.addonId && handleToggleAddon(srv.addonId)}
                              className={cn(
                                "px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer shrink-0 transition-all active:scale-[0.98]",
                                isChecked
                                  ? "bg-[#D4AF37] text-[#121316] font-bold shadow-xs hover:bg-[#C5A880]"
                                  : "bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/30"
                              )}
                              aria-label={isChecked ? `Remove ${srv.title}` : `Add ${srv.title}`}
                            >
                              {isChecked ? "Added ✓ (Remove)" : "+ Add"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* ── 3. CONNECTED BOOKING FOOTER (Pinned) ── */}
            <div className="p-4 sm:p-5 border-t border-[#2E3038] shrink-0 bg-[#161820] flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-20">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-[#A1A1AA]">Selected optional extras:</span>
                  <span className="text-base sm:text-lg font-bold font-mono text-[#D4AF37]">
                    ₹{selectedAddonsTotal.toLocaleString("en-IN")}
                  </span>
                  {selectedAddonIds.length > 0 ? (
                    <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                      {selectedAddonIds.length} item{selectedAddonIds.length > 1 ? "s" : ""} added
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      ₹0 Extra
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#A1A1AA]">
                  {selectedAddonIds.length > 0
                    ? "Included in total booking cost · Recalculates 20% advance & 80% arrival balance"
                    : "Complimentary care items included at ₹0 extra charge"}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap justify-between sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    handleSkipPurpose();
                    setServiceDiscoveryDrawerOpen(false);
                  }}
                  className="text-xs text-[#A1A1AA] hover:text-white underline cursor-pointer px-2 py-1.5 transition-colors"
                >
                  Continue with accommodation only
                </button>
                <button
                  type="button"
                  onClick={() => setServiceDiscoveryDrawerOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-bold text-xs cursor-pointer shadow-md transition-all active:scale-[0.98]"
                >
                  Save services &amp; return to booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: FULL POLICIES MODAL                            */}
      {/* ======================================================== */}
      {policiesModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setPoliciesModalOpen(false)}
        >
          <div
            className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#1C1E24] border border-[#2E3038] shadow-2xl text-[#F5F5F7] p-6 space-y-5 text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#2E3038] pb-3">
              <h3 className="font-heading text-lg font-bold text-white">
                FLATEL Stay &amp; Cancellation Policies
              </h3>
              <button
                type="button"
                onClick={() => setPoliciesModalOpen(false)}
                className="h-7 w-7 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/15 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-[#A1A1AA] leading-relaxed">
              <div>
                <strong className="text-white block font-semibold mb-1">Advance Payment &amp; Balance</strong>
                <p>
                  Reservations are secured with a 20% online advance deposit. The remaining 80% balance
                  is strictly payable at check-in by Cash or UPI.
                </p>
              </div>

              <div>
                <strong className="text-white block font-semibold mb-1">Cancellation &amp; Refunds</strong>
                <p>
                  • Free Cancellation (100% Refund of 20% advance deposit): If cancelled 48 hours or more prior to check-in (11:00 AM).
                  <br />
                  • Non-Refundable: Cancellations made within 48 hours of check-in forfeit the 20% advance deposit (date reservation hold fee).
                </p>
              </div>

              <div>
                <strong className="text-white block font-semibold mb-1">Mandatory Photo Identification</strong>
                <p>
                  Original government-issued photo ID (Aadhaar / Driving License / Voter ID) is required
                  for all domestic adults. International guests must present an original passport.
                </p>
              </div>
            </div>

            <div className="border-t border-[#2E3038] pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setPoliciesModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#121316] font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
