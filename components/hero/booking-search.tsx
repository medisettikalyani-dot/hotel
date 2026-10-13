"use client";

import * as React from "react";
import { format, differenceInDays } from "date-fns";
import {
  MapPin,
  Calendar as CalendarIcon,
  Users,
  LayoutGrid,
  Star,
  Search,
  AlertCircle,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BranchSelector, type BranchFilter } from "./branch-selector";
import { DateRangePicker } from "./date-range-picker";
import { GuestSelector } from "./guest-selector";
import { FlatTypeSelector, type FlatTypeFilter } from "./flat-type-selector";
import { StayPurposeSelector, type StayPurposeId, STAY_PURPOSES } from "./stay-purpose-selector";
import { AvailabilityModal } from "./availability-modal";

export interface BookingSearchProps {
  initialBranch?: BranchFilter | null;
  className?: string;
}

export function BookingSearch({ initialBranch = null, className }: BookingSearchProps = {}) {
  // 1. Branch Selector State
  const [selectedBranch, setSelectedBranch] = React.useState<BranchFilter | null>(initialBranch);

  // 2. Dates State
  const [checkIn, setCheckIn] = React.useState<Date | null>(null);
  const [checkOut, setCheckOut] = React.useState<Date | null>(null);

  // 3. Guests State
  const [hasSelectedGuests, setHasSelectedGuests] = React.useState(false);
  const [adults, setAdults] = React.useState(2);
  const [childrenCount, setChildrenCount] = React.useState(0);

  // 4. Flat Type State
  const [selectedFlatType, setSelectedFlatType] = React.useState<FlatTypeFilter | null>(null);

  // 5. Stay Purpose State
  const [selectedPurpose, setSelectedPurpose] = React.useState<StayPurposeId | null>(null);

  // 6. Popover Control: 'branch' | 'calendar' | 'guests' | 'flatType' | 'purpose' | null
  const [activePopover, setActivePopover] = React.useState<
    "branch" | "calendar" | "guests" | "flatType" | "purpose" | null
  >(null);
  const [calendarTargetField, setCalendarTargetField] = React.useState<
    "checkIn" | "checkOut"
  >("checkIn");

  // Read URL query parameters if present
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const search = window.location.search;
      if (search) {
        const params = new URLSearchParams(search);
        const b = params.get("branch");
        if (b === "all" || b === "barkas-salala" || b === "moghal-pura") {
          setSelectedBranch(b);
        } else if (initialBranch) {
          setSelectedBranch(initialBranch);
        }
        const ft = params.get("flatType");
        if (ft && ["any", "1bhk", "2bhk", "3bhk", "4bhk", "5bhk"].includes(ft)) {
          setSelectedFlatType(ft as FlatTypeFilter);
        }
        const p = params.get("purpose");
        if (p && ["medical", "tourism", "corporate", "family", "all"].includes(p)) {
          setSelectedPurpose(p as StayPurposeId);
        }
      } else if (initialBranch) {
        setSelectedBranch(initialBranch);
      }
    }
  }, [initialBranch]);

  // Validation & Inline Message State
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [errorField, setErrorField] = React.useState<
    "branch" | "checkIn" | "checkOut" | "guests" | "flatType" | "purpose" | null
  >(null);

  // Search Results Modal State
  const [isAvailabilityOpen, setIsAvailabilityOpen] = React.useState(false);

  // Container reference for desktop click-outside dismissal
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActivePopover(null);
      }
    };

    if (activePopover) {
      const timer = setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 50);

      return () => {
        clearTimeout(timer);
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [activePopover]);

  // Handle ESC key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActivePopover(null);
        setErrorMessage(null);
      }
    };
    if (activePopover) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePopover]);

  // Derived display helpers
  const nightsCount =
    checkIn && checkOut ? Math.max(0, differenceInDays(checkOut, checkIn)) : 0;

  const branchDisplay = React.useMemo(() => {
    if (selectedBranch === "barkas-salala") return "Barkas Salala";
    if (selectedBranch === "moghal-pura") return "Moghal Pura";
    return "All Branches";
  }, [selectedBranch]);

  const dateRangeDisplay = React.useMemo(() => {
    if (checkIn && checkOut) {
      return `${format(checkIn, "d MMM")} – ${format(checkOut, "d MMM")}`;
    }
    if (checkIn) {
      return `${format(checkIn, "d MMM")} – Check-out`;
    }
    return "Select dates";
  }, [checkIn, checkOut]);

  const checkInDisplay = checkIn ? format(checkIn, "EEE, d MMM") : "Check-in";
  const checkOutDisplay = checkOut ? format(checkOut, "EEE, d MMM") : "Check-out";

  const guestsDisplay = React.useMemo(() => {
    if (!hasSelectedGuests) return "2 Adults, 0 Children";
    const adultStr = `${adults} ${adults === 1 ? "Adult" : "Adults"}`;
    const childStr = `${childrenCount} ${childrenCount === 1 ? "Child" : "Children"}`;
    return `${adultStr}, ${childStr}`;
  }, [hasSelectedGuests, adults, childrenCount]);

  const flatTypeDisplay = React.useMemo(() => {
    if (!selectedFlatType || selectedFlatType === "any") return "All Types";
    if (selectedFlatType === "1bhk") return "1 BHK Flat";
    if (selectedFlatType === "2bhk") return "2 BHK Flat";
    if (selectedFlatType === "3bhk") return "3 BHK Flat";
    if (selectedFlatType === "4bhk") return "4 BHK Flat";
    if (selectedFlatType === "5bhk") return "5 BHK Flat";
    return "All Types";
  }, [selectedFlatType]);

  const purposeDisplay = React.useMemo(() => {
    if (!selectedPurpose || selectedPurpose === "all") return "Select purpose";
    const found = STAY_PURPOSES.find((p) => p.id === selectedPurpose);
    return found ? found.title : "Select purpose";
  }, [selectedPurpose]);

  // Handlers for Opening Popovers
  const handleOpenBranch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setErrorMessage(null);
    setErrorField(null);
    setActivePopover((prev) => (prev === "branch" ? null : "branch"));
  };

  const handleOpenCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    setErrorMessage(null);
    setErrorField(null);
    setCalendarTargetField(checkIn && !checkOut ? "checkOut" : "checkIn");
    setActivePopover((prev) => (prev === "calendar" ? null : "calendar"));
  };

  const handleOpenGuests = (e: React.MouseEvent) => {
    e.stopPropagation();
    setErrorMessage(null);
    setErrorField(null);
    setActivePopover((prev) => (prev === "guests" ? null : "guests"));
  };

  const handleOpenFlatType = (e: React.MouseEvent) => {
    e.stopPropagation();
    setErrorMessage(null);
    setErrorField(null);
    setActivePopover((prev) => (prev === "flatType" ? null : "flatType"));
  };

  const handleOpenPurpose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setErrorMessage(null);
    setErrorField(null);
    setActivePopover((prev) => (prev === "purpose" ? null : "purpose"));
  };

  const handleDateSelectRange = (inDate: Date | null, outDate: Date | null) => {
    setCheckIn(inDate);
    setCheckOut(outDate);
    setErrorMessage(null);
    setErrorField(null);
  };

  // Form Submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (checkIn && !checkOut) {
      setErrorMessage("Please select your check-out date.");
      setErrorField("checkOut");
      setCalendarTargetField("checkOut");
      setActivePopover("calendar");
      return;
    }

    if (checkIn && checkOut && differenceInDays(checkOut, checkIn) < 1) {
      setErrorMessage("Check-out date must be after check-in.");
      setErrorField("checkOut");
      setCalendarTargetField("checkOut");
      setActivePopover("calendar");
      return;
    }

    setErrorMessage(null);
    setErrorField(null);
    setActivePopover(null);
    setIsAvailabilityOpen(true);
  };

  return (
    <>
      <div ref={containerRef} className={cn("relative w-full max-w-6xl mx-auto z-40", className)}>
        {/* Inline Validation Banner */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-3 px-4 py-2.5 rounded-xl bg-[#1C1E24] border border-[#D4AF37] text-[#F5F5F7] text-xs font-sans flex items-center justify-between shadow-lg animate-in fade-in duration-150"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-[#A1A1AA] hover:text-[#F5F5F7] p-1 cursor-pointer"
              aria-label="Dismiss error"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Airbnb-inspired Booking Bar */}
        <form
          id="booking-search-bar"
          onSubmit={handleSearchSubmit}
          className={cn(
            "w-full rounded-2xl bg-[#14161E]/95 backdrop-blur-xl border border-[#2B2E38] shadow-[0_20px_50px_rgba(0,0,0,0.7)]",
            "p-2 sm:p-2.5 transition-all duration-200"
          )}
          aria-label="FLATEL Furnished Flat Booking and Search Bar"
        >
          {/* Desktop Flex Layout (lg:flex) / Mobile & Tablet 2-Column Responsive Grid (grid-cols-2 lg:flex) */}
          <div className="grid grid-cols-2 lg:flex lg:items-center gap-2 lg:gap-0">
            {/* 1. BRANCH SELECTOR (Full width on mobile, flex-1 on desktop) */}
            <div className="col-span-2 lg:col-span-1 lg:flex-1 relative min-w-0">
              <button
                type="button"
                id="hero-branch-selector-button"
                onClick={handleOpenBranch}
                className={cn(
                  "w-full h-full min-h-[50px] lg:min-h-[64px] px-3.5 sm:px-4 py-2 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer group",
                  "bg-[#1A1D26]/80 border border-[#2E3038] lg:bg-transparent lg:border-transparent hover:border-[#D4AF37]/50 lg:hover:bg-[#252830]/70",
                  "focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]",
                  activePopover === "branch" && "bg-[#121316] ring-1 ring-[#D4AF37] border-[#D4AF37]"
                )}
                aria-label={`Branch: ${branchDisplay}`}
                aria-expanded={activePopover === "branch"}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center shrink-0 lg:bg-transparent lg:border-0 lg:w-auto lg:h-auto">
                    <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[10px] lg:text-[11px] font-sans font-bold lg:font-medium text-[#8E92A0] uppercase lg:normal-case leading-none">
                      Branch / Location
                    </span>
                    <span className="font-sans text-[13px] sm:text-[14px] font-semibold text-white tracking-tight leading-tight mt-1 truncate">
                      {branchDisplay}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#8E92A0] shrink-0 ml-2 group-hover:text-[#D4AF37] transition-colors" />
              </button>

              {/* Desktop Divider */}
              <div
                className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-[#2C2F38] pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* 2. CHECK-IN - CHECK-OUT DATE SELECTOR (Full width on mobile with dual-date display, flex-1 on desktop) */}
            <div className="col-span-2 lg:col-span-1 lg:flex-1 relative min-w-0">
              <button
                type="button"
                id="hero-checkin-checkout-date-button"
                onClick={handleOpenCalendar}
                className={cn(
                  "w-full h-full min-h-[50px] lg:min-h-[64px] px-3.5 sm:px-4 py-2 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer group",
                  "bg-[#1A1D26]/80 border border-[#2E3038] lg:bg-transparent lg:border-transparent hover:border-[#D4AF37]/50 lg:hover:bg-[#252830]/70",
                  "focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]",
                  activePopover === "calendar" && "bg-[#121316] ring-1 ring-[#D4AF37] border-[#D4AF37]"
                )}
                aria-label={`Dates: ${dateRangeDisplay}`}
                aria-expanded={activePopover === "calendar"}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center shrink-0 lg:bg-transparent lg:border-0 lg:w-auto lg:h-auto">
                    <CalendarIcon className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  </div>

                  {/* Desktop Unified Date Range */}
                  <div className="hidden lg:flex flex-col min-w-0 flex-1">
                    <span className="text-[11px] font-sans font-medium text-[#8E92A0] leading-none">
                      Check-in - Check-out
                    </span>
                    <span className="font-sans text-[13px] sm:text-[14px] font-semibold text-white tracking-tight leading-tight mt-1 truncate">
                      {dateRangeDisplay}
                    </span>
                  </div>

                  {/* Mobile Dual Date Columns with Night Duration Indicator */}
                  <div className="lg:hidden flex items-center justify-between min-w-0 flex-1 gap-2.5">
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-[10px] font-sans font-bold text-[#8E92A0] uppercase leading-none">
                        Check-In
                      </span>
                      <span className="font-sans text-[12.5px] sm:text-[13.5px] font-semibold text-white tracking-tight leading-tight mt-1 truncate">
                        {checkIn ? format(checkIn, "d MMM, EEE") : "Select date"}
                      </span>
                    </div>

                    <div className="h-6 w-px bg-[#2E3038] shrink-0" aria-hidden="true" />

                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-sans font-bold text-[#8E92A0] uppercase leading-none">
                          Check-Out
                        </span>
                        {nightsCount > 0 && (
                          <span className="text-[9px] font-mono text-[#D4AF37] font-bold">
                            {nightsCount}N
                          </span>
                        )}
                      </div>
                      <span className="font-sans text-[12.5px] sm:text-[13.5px] font-semibold text-white tracking-tight leading-tight mt-1 truncate">
                        {checkOut ? format(checkOut, "d MMM, EEE") : "Select date"}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#8E92A0] shrink-0 ml-2 group-hover:text-[#D4AF37] transition-colors" />
              </button>

              {/* Desktop Divider */}
              <div
                className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-[#2C2F38] pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* 3. GUESTS SELECTOR (1-col on mobile, flex-1 on desktop) */}
            <div className="col-span-1 lg:flex-1 relative min-w-0">
              <button
                type="button"
                id="hero-guests-selector-button"
                onClick={handleOpenGuests}
                className={cn(
                  "w-full h-full min-h-[50px] lg:min-h-[64px] px-3 sm:px-4 py-2 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer group",
                  "bg-[#1A1D26]/80 border border-[#2E3038] lg:bg-transparent lg:border-transparent hover:border-[#D4AF37]/50 lg:hover:bg-[#252830]/70",
                  "focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]",
                  activePopover === "guests" && "bg-[#121316] ring-1 ring-[#D4AF37] border-[#D4AF37]"
                )}
                aria-label={`Guests: ${guestsDisplay}`}
                aria-expanded={activePopover === "guests"}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center shrink-0 lg:bg-transparent lg:border-0 lg:w-auto lg:h-auto">
                    <Users className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[10px] lg:text-[11px] font-sans font-bold lg:font-medium text-[#8E92A0] uppercase lg:normal-case leading-none">
                      Guests
                    </span>
                    <span className="font-sans text-[12px] sm:text-[14px] font-semibold text-white tracking-tight leading-tight mt-1 truncate">
                      {hasSelectedGuests ? `${adults} Ad, ${childrenCount} Ch` : "2 Guests"}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#8E92A0] shrink-0 ml-1.5 sm:ml-2 group-hover:text-[#D4AF37] transition-colors" />
              </button>

              {/* Desktop Divider */}
              <div
                className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-[#2C2F38] pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* 4. FLAT TYPE SELECTOR (1-col on mobile, flex-1 on desktop) */}
            <div className="col-span-1 lg:flex-1 relative min-w-0">
              <button
                type="button"
                id="hero-flat-type-selector-button"
                onClick={handleOpenFlatType}
                className={cn(
                  "w-full h-full min-h-[50px] lg:min-h-[64px] px-3 sm:px-4 py-2 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer group",
                  "bg-[#1A1D26]/80 border border-[#2E3038] lg:bg-transparent lg:border-transparent hover:border-[#D4AF37]/50 lg:hover:bg-[#252830]/70",
                  "focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]",
                  activePopover === "flatType" && "bg-[#121316] ring-1 ring-[#D4AF37] border-[#D4AF37]"
                )}
                aria-label={`Flat Type: ${flatTypeDisplay}`}
                aria-expanded={activePopover === "flatType"}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center shrink-0 lg:bg-transparent lg:border-0 lg:w-auto lg:h-auto">
                    <LayoutGrid className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[10px] lg:text-[11px] font-sans font-bold lg:font-medium text-[#8E92A0] uppercase lg:normal-case leading-none">
                      Flat Type
                    </span>
                    <span className="font-sans text-[12px] sm:text-[14px] font-semibold text-white tracking-tight leading-tight mt-1 truncate">
                      {flatTypeDisplay}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#8E92A0] shrink-0 ml-1.5 sm:ml-2 group-hover:text-[#D4AF37] transition-colors" />
              </button>

              {/* Desktop Divider */}
              <div
                className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-[#2C2F38] pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* 5. STAY PURPOSE SELECTOR (Full width on mobile, flex-1 on desktop) */}
            <div className="col-span-2 lg:flex-1 relative min-w-0">
              <button
                type="button"
                id="hero-stay-purpose-selector-button"
                onClick={handleOpenPurpose}
                className={cn(
                  "w-full h-full min-h-[46px] lg:min-h-[64px] px-3.5 sm:px-4 py-2 rounded-xl text-left flex items-center justify-between transition-all cursor-pointer group",
                  "bg-[#1A1D26]/70 border border-[#2E3038]/70 lg:bg-transparent lg:border-transparent hover:border-[#D4AF37]/50 lg:hover:bg-[#252830]/70",
                  "focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]",
                  activePopover === "purpose" && "bg-[#121316] ring-1 ring-[#D4AF37] border-[#D4AF37]"
                )}
                aria-label={`Stay Purpose: ${purposeDisplay}`}
                aria-expanded={activePopover === "purpose"}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center shrink-0 lg:bg-transparent lg:border-0 lg:w-auto lg:h-auto">
                    <Star className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  </div>
                  <div className="flex items-center lg:flex-col lg:items-start min-w-0 flex-1 gap-2 lg:gap-0">
                    <span className="text-[10px] lg:text-[11px] font-sans font-bold lg:font-medium text-[#8E92A0] uppercase lg:normal-case leading-none whitespace-nowrap">
                      Stay Focus:
                    </span>
                    <span className="font-sans text-[12.5px] sm:text-[14px] font-semibold text-white tracking-tight leading-tight lg:mt-1 truncate">
                      {purposeDisplay}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-[#8E92A0] shrink-0 ml-2 group-hover:text-[#D4AF37] transition-colors" />
              </button>
            </div>

            {/* 6. SEARCH FLATS PROMINENT CTA (Full width on mobile, auto shrink on desktop) */}
            <div className="col-span-2 lg:col-auto lg:shrink-0 flex items-center p-0.5 lg:p-1 lg:pl-2">
              <button
                type="submit"
                id="hero-search-flats-submit-button"
                className={cn(
                  "w-full min-h-[48px] lg:min-h-[56px] px-5 sm:px-6 py-3 rounded-xl cursor-pointer",
                  "bg-[#E5B54F] hover:bg-[#D4A33B] active:scale-[0.98]",
                  "text-[#121316] font-sans font-bold text-xs sm:text-[13px] tracking-wide",
                  "flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-[#E5B54F]/15",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F5F7]"
                )}
              >
                <Search className="w-4 h-4 shrink-0 stroke-[2.5]" />
                <span className="whitespace-nowrap">Search Available Flats</span>
              </button>
            </div>
          </div>
        </form>

        {/* ======================================================== */}
        {/* DESKTOP POPOVERS (Positioned below/above bar)           */}
        {/* ======================================================== */}
        {activePopover === "branch" && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="hidden lg:block absolute bottom-full mb-3 z-50 left-0 animate-in fade-in slide-in-from-bottom-2 zoom-in-95 duration-150"
          >
            <BranchSelector
              selectedBranch={selectedBranch}
              onSelectBranch={(b) => {
                setSelectedBranch(b);
                setActivePopover(null);
              }}
              onClose={() => setActivePopover(null)}
            />
          </div>
        )}

        {activePopover === "calendar" && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="hidden lg:block absolute bottom-full mb-3 z-50 left-[16%] animate-in fade-in slide-in-from-bottom-2 zoom-in-95 duration-150"
          >
            <DateRangePicker
              checkIn={checkIn}
              checkOut={checkOut}
              onSelectRange={handleDateSelectRange}
              activeField={calendarTargetField}
              onFieldChange={setCalendarTargetField}
              onClose={() => setActivePopover(null)}
            />
          </div>
        )}

        {activePopover === "guests" && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="hidden lg:block absolute bottom-full mb-3 z-50 left-[48%] -translate-x-1/2 animate-in fade-in slide-in-from-bottom-2 zoom-in-95 duration-150"
          >
            <GuestSelector
              adults={adults}
              childrenCount={childrenCount}
              onChangeAdults={(val) => {
                setAdults(val);
                setHasSelectedGuests(true);
              }}
              onChangeChildren={(val) => {
                setChildrenCount(val);
                setHasSelectedGuests(true);
              }}
              onConfirm={() => {
                setHasSelectedGuests(true);
                setActivePopover(null);
              }}
              onReset={() => {
                setHasSelectedGuests(false);
                setAdults(2);
                setChildrenCount(0);
                setActivePopover(null);
              }}
              onClose={() => setActivePopover(null)}
            />
          </div>
        )}

        {activePopover === "flatType" && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="hidden lg:block absolute bottom-full mb-3 z-50 right-[18%] animate-in fade-in slide-in-from-bottom-2 zoom-in-95 duration-150"
          >
            <FlatTypeSelector
              selectedType={selectedFlatType}
              onSelectType={(t) => {
                setSelectedFlatType(t);
                setActivePopover(null);
              }}
              onClose={() => setActivePopover(null)}
            />
          </div>
        )}

        {activePopover === "purpose" && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="hidden lg:block absolute bottom-full mb-3 z-50 right-0 animate-in fade-in slide-in-from-bottom-2 zoom-in-95 duration-150"
          >
            <StayPurposeSelector
              selectedPurpose={selectedPurpose}
              onSelectPurpose={(p) => {
                setSelectedPurpose(p);
                setActivePopover(null);
              }}
              onClose={() => setActivePopover(null)}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* MOBILE MODAL OVERLAY (Centered, thumb-friendly modal)    */}
        {/* ======================================================== */}
        {activePopover && (
          <div
            role="dialog"
            aria-modal="true"
            className="lg:hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121316]/85 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setActivePopover(null)}
          >
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[360px]">
              {activePopover === "branch" && (
                <BranchSelector
                  selectedBranch={selectedBranch}
                  onSelectBranch={(b) => {
                    setSelectedBranch(b);
                    setActivePopover(null);
                  }}
                  onClose={() => setActivePopover(null)}
                  isMobileModal
                />
              )}
              {activePopover === "calendar" && (
                <DateRangePicker
                  checkIn={checkIn}
                  checkOut={checkOut}
                  onSelectRange={handleDateSelectRange}
                  activeField={calendarTargetField}
                  onFieldChange={setCalendarTargetField}
                  onClose={() => setActivePopover(null)}
                  isMobileModal
                />
              )}
              {activePopover === "guests" && (
                <GuestSelector
                  adults={adults}
                  childrenCount={childrenCount}
                  onChangeAdults={(val) => {
                    setAdults(val);
                    setHasSelectedGuests(true);
                  }}
                  onChangeChildren={(val) => {
                    setChildrenCount(val);
                    setHasSelectedGuests(true);
                  }}
                  onConfirm={() => {
                    setHasSelectedGuests(true);
                    setActivePopover(null);
                  }}
                  onReset={() => {
                    setHasSelectedGuests(false);
                    setAdults(2);
                    setChildrenCount(0);
                    setActivePopover(null);
                  }}
                  onClose={() => setActivePopover(null)}
                  isMobileModal
                />
              )}
              {activePopover === "flatType" && (
                <FlatTypeSelector
                  selectedType={selectedFlatType}
                  onSelectType={(t) => {
                    setSelectedFlatType(t);
                    setActivePopover(null);
                  }}
                  onClose={() => setActivePopover(null)}
                  isMobileModal
                />
              )}
              {activePopover === "purpose" && (
                <StayPurposeSelector
                  selectedPurpose={selectedPurpose}
                  onSelectPurpose={(p) => {
                    setSelectedPurpose(p);
                    setActivePopover(null);
                  }}
                  onClose={() => setActivePopover(null)}
                  isMobileModal
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Interim Matching Flats Results Modal */}
      <AvailabilityModal
        isOpen={isAvailabilityOpen}
        onClose={() => setIsAvailabilityOpen(false)}
        checkIn={checkIn}
        checkOut={checkOut}
        adults={hasSelectedGuests ? adults : null}
        childrenCount={hasSelectedGuests ? childrenCount : 0}
        branch={selectedBranch}
        flatType={selectedFlatType}
        purpose={selectedPurpose}
      />
    </>
  );
}
