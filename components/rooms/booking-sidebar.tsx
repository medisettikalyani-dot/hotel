"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { format, addDays, isBefore, startOfToday, differenceInCalendarDays } from "date-fns";
import {
  Calendar as CalendarIcon,
  Users,
  Minus,
  Plus,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  Building,
  AlertCircle,
  CheckCircle2,
  User,
  Sparkles,
  Check,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RoomDetail, PURPOSE_PACKAGES, FacilityAddon, ALL_MASTER_ADDONS } from "@/lib/mock-rooms";
import { WHATSAPP_CONFIG } from "@/lib/constants";
import { calculateFlatelPrice } from "@/lib/pricing";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";

interface BookingSidebarProps {
  room: RoomDetail;
  selectedPurposeId:
    | "medical"
    | "wedding"
    | "tourism"
    | "corporate"
    | "family"
    | "accommodation_only"
    | null;
  selectedAddonIds: string[];
  onSelectPurpose?: (
    purposeId:
      | "medical"
      | "wedding"
      | "tourism"
      | "corporate"
      | "family"
      | "accommodation_only"
      | null
  ) => void;
  onToggleAddon?: (addonId: string) => void;
  onOpenServiceDrawer?: () => void;
  onScrollToPurpose?: () => void;
  checkIn?: Date | undefined;
  checkOut?: Date | undefined;
  adults?: number;
  childrenCount?: number;
  onCheckInChange?: (date: Date | undefined) => void;
  onCheckOutChange?: (date: Date | undefined) => void;
  onAdultsChange?: (adults: number) => void;
  onChildrenChange?: (children: number) => void;
}

export function BookingSidebar({
  room,
  selectedPurposeId,
  selectedAddonIds,
  onSelectPurpose,
  onToggleAddon,
  onOpenServiceDrawer,
  onScrollToPurpose,
  checkIn: controlledCheckIn,
  checkOut: controlledCheckOut,
  adults: controlledAdults,
  childrenCount: controlledChildrenCount,
  onCheckInChange,
  onCheckOutChange,
  onAdultsChange,
  onChildrenChange,
}: BookingSidebarProps) {
  const router = useRouter();
  const { user, openAuthModal } = useAuth();
  const [internalCheckIn, setInternalCheckIn] = React.useState<Date | undefined>(undefined);
  const [internalCheckOut, setInternalCheckOut] = React.useState<Date | undefined>(undefined);
  const [internalAdults, setInternalAdults] = React.useState<number>(room.baseAdults || 2);
  const [internalChildrenCount, setInternalChildrenCount] = React.useState<number>(0);
  const [dateError, setDateError] = React.useState<string | null>(null);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = React.useState(false);

  const checkIn = controlledCheckIn !== undefined ? controlledCheckIn : internalCheckIn;
  const checkOut = controlledCheckOut !== undefined ? controlledCheckOut : internalCheckOut;
  const adults = controlledAdults !== undefined ? controlledAdults : internalAdults;
  const childrenCount = controlledChildrenCount !== undefined ? controlledChildrenCount : internalChildrenCount;

  const setCheckIn = (date: Date | undefined) => {
    setInternalCheckIn(date);
    onCheckInChange?.(date);
  };

  const setCheckOut = (date: Date | undefined) => {
    setInternalCheckOut(date);
    onCheckOutChange?.(date);
  };

  const setAdults = (value: number | ((prev: number) => number)) => {
    const newVal = typeof value === "function" ? value(adults) : value;
    setInternalAdults(newVal);
    onAdultsChange?.(newVal);
  };

  const setChildrenCount = (value: number | ((prev: number) => number)) => {
    const newVal = typeof value === "function" ? value(childrenCount) : value;
    setInternalChildrenCount(newVal);
    onChildrenChange?.(newVal);
  };

  // Popover open states
  const [checkInOpen, setCheckInOpen] = React.useState(false);
  const [checkOutOpen, setCheckOutOpen] = React.useState(false);
  const [guestsOpen, setGuestsOpen] = React.useState(false);


  // Night calculation: differenceInCalendarDays (check-out date is never billed as an extra night)
  // Defaults to 2 nights for UI presentation when dates are being selected
  const totalNights = React.useMemo(() => {
    if (checkIn && checkOut) {
      const diff = differenceInCalendarDays(checkOut, checkIn);
      return Math.max(1, diff);
    }
    return 2;
  }, [checkIn, checkOut]);

  // Capacity validation
  const maxAllowedAdults = room.maxAdults;
  const maxAllowedChildren = room.maxChildren;
  const isAdultsOverCapacity = adults > maxAllowedAdults;
  const isChildrenOverCapacity =
    typeof maxAllowedChildren === "number" ? childrenCount > maxAllowedChildren : false;
  const isOverCapacity = isAdultsOverCapacity || isChildrenOverCapacity;

  // Selected add-ons resolution across all packages
  const activePackage =
    selectedPurposeId && selectedPurposeId !== "accommodation_only"
      ? PURPOSE_PACKAGES.find((p) => p.id === selectedPurposeId) || null
      : null;

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
        return null;
    }
  }, [selectedPurposeId]);

  const allAvailableAddons = React.useMemo(() => ALL_MASTER_ADDONS, []);
  const activeAddons = React.useMemo(() => {
    return allAvailableAddons.filter((addon) =>
      selectedAddonIds.includes(addon.id)
    );
  }, [allAvailableAddons, selectedAddonIds]);

  // PRD Dynamic Pricing Calculation
  const fareResult = React.useMemo(() => {
    const validPaidAddons = activeAddons
      .filter((a): a is FacilityAddon & { price: number } => typeof a.price === "number")
      .map((a) => ({
        id: a.id,
        name: a.name,
        price: a.price,
        pricingType: a.pricingType === "per_night" ? ("per_night" as const) : ("per_booking" as const),
      }));

    return calculateFlatelPrice({
      nights: totalNights,
      basePricePerNight: room.basePricePerNight,
      baseAdults: room.baseAdults || 2,
      selectedAdults: adults,
      selectedKids: childrenCount,
      extraPersonFee: room.extraPersonFeePerNight || 500,
      selectedPaidAddons: validPaidAddons,
    });
  }, [totalNights, room, adults, childrenCount, activeAddons]);

  // Central WhatsApp Concierge link (configuration-driven)
  const whatsappUrl = WHATSAPP_CONFIG.getUrl(
    `Hello Flatel, I am interested in reserving the ${room.title} for ${totalNights} nights.`
  );

  const handleProceedToBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOverCapacity) return;

    if (!checkIn || !checkOut) {
      setDateError("Please select check-in and check-out dates to proceed to secure booking.");
      setCheckInOpen(true);
      return;
    }

    setDateError(null);
    const query = new URLSearchParams({
      property: room.slug,
      checkIn: format(checkIn, "yyyy-MM-dd"),
      checkOut: format(checkOut, "yyyy-MM-dd"),
      adults: adults.toString(),
      kids: childrenCount.toString(),
    });

    if (selectedPurposeId) {
      query.set("purpose", selectedPurposeId);
    } else {
      query.set("purpose", "accommodation_only");
    }

    if (selectedAddonIds.length > 0) {
      query.set("addons", selectedAddonIds.join(","));
    }

    const targetUrl = `/checkout?${query.toString()}`;
    router.push(targetUrl);
  };

  return (
    <aside
      id="booking-panel"
      className="w-full rounded-3xl border border-white/10 bg-[#141620] p-5 sm:p-6 shadow-xl backdrop-blur-md"
      aria-label="Reservation Summary and Booking Form"
    >
      {/* Top Pricing Header */}
      <div className="flex items-baseline justify-between border-b border-border/70 pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
            Starting from
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="font-heading text-2xl sm:text-3xl font-normal text-foreground">
              ₹{room.basePricePerNight.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-muted-foreground">/ night</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-medium">
            20% Advance Policy
          </span>
          <p className="text-[11px] text-muted-foreground mt-0.5">Pay 80% on arrival</p>
        </div>
      </div>

      {/* Date & Guest Form */}
      <form onSubmit={handleProceedToBook} className="mt-5 space-y-3">
        {/* Date Grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* Check-In */}
          <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
            <PopoverTrigger
              render={
                <button
                  type="button"
                  className="flex flex-col items-start justify-center rounded-xl border border-border/80 bg-secondary/40 p-2.5 text-left hover:bg-secondary/70 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary w-full"
                  aria-label="Select check-in date"
                />
              }
            >
              <div className="flex items-center gap-1.5 text-[9px] uppercase font-mono tracking-wider text-muted-foreground font-semibold">
                <CalendarIcon className="h-3 w-3 text-primary" /> Check-In
              </div>
              <span className="text-xs font-medium text-foreground mt-1 truncate w-full">
                {checkIn ? format(checkIn, "d MMM yyyy") : "Select date"}
              </span>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-3 bg-popover border border-border shadow-xl rounded-xl z-50"
              align="start"
            >
              <div className="pb-2 mb-2 border-b border-border text-xs font-medium text-foreground">
                Select Check-in Date
              </div>
              {checkInOpen && (
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={(date) => {
                    setCheckIn(date);
                    setDateError(null);
                    if (date && checkOut && isBefore(checkOut, date)) {
                      setCheckOut(addDays(date, 2));
                    }
                    setCheckInOpen(false);
                  }}
                  disabled={{ before: startOfToday() }}
                  className="rounded-md"
                />
              )}
            </PopoverContent>
          </Popover>

          {/* Check-Out */}
          <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
            <PopoverTrigger
              render={
                <button
                  type="button"
                  className="flex flex-col items-start justify-center rounded-xl border border-border/80 bg-secondary/40 p-2.5 text-left hover:bg-secondary/70 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary w-full"
                  aria-label="Select check-out date"
                />
              }
            >
              <div className="flex items-center gap-1.5 text-[9px] uppercase font-mono tracking-wider text-muted-foreground font-semibold">
                <CalendarIcon className="h-3 w-3 text-primary" /> Check-Out
              </div>
              <span className="text-xs font-medium text-foreground mt-1 truncate w-full">
                {checkOut ? format(checkOut, "d MMM yyyy") : "Select date"}
              </span>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-3 bg-popover border border-border shadow-xl rounded-xl z-50"
              align="end"
            >
              <div className="pb-2 mb-2 border-b border-border text-xs font-medium text-foreground">
                Select Check-out Date
              </div>
              {checkOutOpen && (
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={(date) => {
                    setCheckOut(date);
                    setDateError(null);
                    setCheckOutOpen(false);
                  }}
                  disabled={{
                    before: checkIn ? addDays(checkIn, 1) : startOfToday(),
                  }}
                  className="rounded-md"
                />
              )}
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests Selector */}
        <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
          <PopoverTrigger
            render={
              <button
                type="button"
                className="flex items-center justify-between w-full rounded-xl border border-border/80 bg-secondary/40 px-3.5 py-2.5 text-left hover:bg-secondary/70 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                aria-label="Select guests"
              />
            }
          >
            <div>
              <div className="flex items-center gap-1.5 text-[9px] uppercase font-mono tracking-wider text-muted-foreground font-semibold">
                <Users className="h-3 w-3 text-primary" /> Guests
              </div>
              <span className="text-xs font-medium text-foreground mt-0.5 block">
                {adults} Adult{adults > 1 ? "s" : ""}
                {childrenCount > 0 ? `, ${childrenCount} Child` : ""}
              </span>
            </div>
            <span className="text-[10px] text-primary/80 font-mono">
              {room.maxChildren !== null
                ? `Max ${room.maxAdults}A + ${room.maxChildren}C`
                : `Max ${room.maxAdults} Adults · Kids 0–12 free`}
            </span>
          </PopoverTrigger>
          <PopoverContent
            className="w-72 p-4 bg-popover border border-border shadow-xl rounded-xl z-50 space-y-4"
            align="start"
          >
            <div className="border-b border-border pb-2">
              <p className="text-xs font-semibold text-foreground">Apartment Occupancy</p>
              <p className="text-[10px] text-muted-foreground">
                {room.title} accommodates up to {room.maxAdults} adults ({room.baseAdults} base + {room.maxExtraGuests} extra).
                {" "}
                {room.maxChildren !== null
                  ? `Child safety capacity: up to ${room.maxChildren} children. Children aged 0–12 stay free but count toward safety capacity.`
                  : "Children aged 0–12 stay free but count toward safety capacity (exact child limit subject to unit size)."}
              </p>
            </div>

            {/* Adults Stepper */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-foreground">Adults</p>
                <p className="text-[10px] text-muted-foreground">Max {room.maxAdults}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                  disabled={adults <= 1}
                  className="h-7 w-7 rounded-lg border border-border bg-secondary flex items-center justify-center text-foreground disabled:opacity-40"
                  aria-label="Decrease adults"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-5 text-center text-sm font-semibold text-foreground">
                  {adults}
                </span>
                <button
                  type="button"
                  onClick={() => setAdults((prev) => Math.min(room.maxAdults, prev + 1))}
                  disabled={adults >= room.maxAdults}
                  className="h-7 w-7 rounded-lg border border-border bg-secondary flex items-center justify-center text-foreground disabled:opacity-40"
                  aria-label="Increase adults"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Children Stepper */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-foreground">Children (0–12 yrs)</p>
                <p className="text-[10px] text-muted-foreground">
                  {room.maxChildren !== null
                    ? `Max ${room.maxChildren} · Stay free (safety capacity)`
                    : "Stay free · Counts toward safety capacity"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setChildrenCount((prev) => Math.max(0, prev - 1))}
                  disabled={childrenCount <= 0}
                  className="h-7 w-7 rounded-lg border border-border bg-secondary flex items-center justify-center text-foreground disabled:opacity-40"
                  aria-label="Decrease children"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-5 text-center text-sm font-semibold text-foreground">
                  {childrenCount}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setChildrenCount((prev) =>
                      room.maxChildren !== null
                        ? Math.min(room.maxChildren, prev + 1)
                        : Math.min(10, prev + 1)
                    )
                  }
                  disabled={
                    room.maxChildren !== null
                      ? childrenCount >= room.maxChildren
                      : childrenCount >= 10
                  }
                  className="h-7 w-7 rounded-lg border border-border bg-secondary flex items-center justify-center text-foreground disabled:opacity-40"
                  aria-label="Increase children"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setGuestsOpen(false)}
              className="w-full text-xs font-medium border-border"
            >
              Done
            </Button>
          </PopoverContent>
        </Popover>

        {/* Capacity Warning */}
        {isOverCapacity && (
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-xs">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>
              {isAdultsOverCapacity
                ? `Exceeds maximum adult limit (${maxAllowedAdults} adults) for this residence.`
                : `Exceeds child safety capacity (${maxAllowedChildren} children) for this residence.`}
            </span>
          </div>
        )}

        {/* ======================================================== */}
        {/* STAY PURPOSE & SERVICES (Step 2 of the Journey)           */}
        {/* ======================================================== */}
        <div className="pt-3 border-t border-[#2E3038] space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#A1A1AA] font-semibold flex items-center gap-1.5">
              <span>Step 2 · Stay Purpose</span>
            </span>
            {selectedPurposeId && selectedPurposeId !== "accommodation_only" ? (
              <button
                type="button"
                onClick={() => {
                  if (onOpenServiceDrawer) onOpenServiceDrawer();
                  else onScrollToPurpose?.();
                }}
                className="text-[10px] text-[#D4AF37] hover:underline cursor-pointer"
              >
                Edit Services →
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onScrollToPurpose?.()}
                className="text-[10px] text-[#D4AF37] hover:underline cursor-pointer"
              >
                {selectedPurposeId === "accommodation_only" ? "Change Focus ↓" : "Select ↓"}
              </button>
            )}
          </div>

          {/* State 1: A specific stay purpose is active */}
          {selectedPurposeId && selectedPurposeId !== "accommodation_only" ? (
            <div className="p-3 rounded-xl bg-[#121316] border border-[#D4AF37]/50 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-xs shadow-[#D4AF37]" />
                  <span className="font-semibold text-white">
                    {activePurposeLabel}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                  {activeAddons.length > 0 ? `+${activeAddons.length} Paid Extras` : "Complimentary Care"}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#2E3038]/60 text-[11px]">
                <span className="text-[#A1A1AA]">
                  {activeAddons.length > 0
                    ? `₹${fareResult.addonsTotal.toLocaleString("en-IN")} extras total`
                    : "Included complimentary care"}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenServiceDrawer) onOpenServiceDrawer();
                    else onScrollToPurpose?.();
                  }}
                  className="text-[#D4AF37] hover:underline font-medium cursor-pointer"
                >
                  Manage services →
                </button>
              </div>
            </div>
          ) : selectedPurposeId === "accommodation_only" ? (
            /* State 2: Guest explicitly selected accommodation only */
            <div className="p-3 rounded-xl bg-[#121316] border border-[#2E3038] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-semibold text-white">
                    Accommodation only
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Standard Stay
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-[#2E3038]/60 text-[11px]">
                <span className="text-[#A1A1AA]">No extra service packages</span>
                <button
                  type="button"
                  onClick={() => onScrollToPurpose?.()}
                  className="text-[#D4AF37] hover:underline font-medium cursor-pointer"
                >
                  Personalize stay ↓
                </button>
              </div>
            </div>
          ) : (
            /* State 3: Nothing selected yet */
            <button
              type="button"
              onClick={() => onScrollToPurpose?.()}
              className="w-full p-3 rounded-xl bg-[#121316] border border-dashed border-[#2E3038] hover:border-[#D4AF37]/50 text-left transition-colors cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#A1A1AA]" />
                  <span className="font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                    Choose your stay purpose
                  </span>
                </div>
                <span className="text-[10px] text-[#D4AF37] group-hover:translate-x-0.5 transition-transform">
                  Explore →
                </span>
              </div>
              <p className="text-[11px] text-[#A1A1AA] mt-1">
                Optional · Medical, Wedding, Family, Tourism or Corporate
              </p>
            </button>
          )}
        </div>

        {/* ======================================================== */}
        {/* DETAILED BOOKING SUMMARY & PRD FORMULA BREAKDOWN        */}
        {/* ======================================================== */}
        <div className="pt-4 border-t border-border/70 space-y-2.5 text-xs">
          <div className="flex justify-between text-muted-foreground">
            <span>
              ₹{room.basePricePerNight.toLocaleString("en-IN")} × {totalNights} night{totalNights > 1 ? "s" : ""}
            </span>
            <span className="font-mono text-foreground font-medium">
              ₹{fareResult.standardBaseRent.toLocaleString("en-IN")}
            </span>
          </div>

          {/* Duration Discount (10% for 7-14N, 15% for 15-27N, 25% for 28+N) */}
          {fareResult.discountRate > 0 && (
            <div className="flex justify-between text-[#D4AF37] font-medium bg-[#D4AF37]/10 px-2 py-1 rounded-xs border border-[#D4AF37]/25">
              <span>Duration Discount ({fareResult.discountRate * 100}% off)</span>
              <span className="font-mono">-₹{fareResult.baseRentDiscount.toLocaleString("en-IN")}</span>
            </div>
          )}

          {/* Extra Adult Fees (Adults exceeding base capacity: ₹500/night each) */}
          {fareResult.extraAdults > 0 && (
            <div className="flex justify-between text-muted-foreground">
              <span>
                Extra Adults ({fareResult.extraAdults} × ₹500 × {totalNights}n)
              </span>
              <span className="font-mono text-foreground font-medium">
                ₹{fareResult.extraGuestsTotal.toLocaleString("en-IN")}
              </span>
            </div>
          )}

          {/* Itemized Paid Add-ons */}
          {activeAddons.length > 0 && (
            <div className="space-y-1.5 pt-1 border-t border-border/40">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                <span>Selected Add-ons ({activeAddons.length})</span>
                {onOpenServiceDrawer && (
                  <button
                    type="button"
                    onClick={onOpenServiceDrawer}
                    className="text-[#D4AF37] hover:underline lowercase font-sans text-xs cursor-pointer"
                  >
                    edit
                  </button>
                )}
              </div>
              {activeAddons.map((addon) => {
                const addonPrice = addon.price;
                const isNumericPrice = typeof addonPrice === "number";
                const subtotal = isNumericPrice
                  ? addon.pricingType === "per_night"
                    ? addonPrice * totalNights
                    : addonPrice
                  : null;

                return (
                  <div key={addon.id} className="flex justify-between items-center text-muted-foreground text-[11px]">
                    <span className="truncate pr-2">
                      {addon.name}
                      {isNumericPrice && addon.pricingType === "per_night" ? ` (${totalNights}n)` : ""}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-foreground font-medium">
                        {subtotal !== null ? `₹${subtotal.toLocaleString("en-IN")}` : "Quote on Request"}
                      </span>
                      {onToggleAddon && (
                        <button
                          type="button"
                          onClick={() => onToggleAddon(addon.id)}
                          className="text-[#A1A1AA] hover:text-rose-400 p-0.5 text-xs font-bold leading-none cursor-pointer"
                          title="Remove add-on"
                          aria-label={`Remove ${addon.name}`}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Grand Total */}
          <div className="flex justify-between items-baseline pt-2 border-t border-border/70 text-sm font-semibold text-foreground">
            <span>Gross Total</span>
            <span className="font-heading text-lg font-normal text-primary">
              ₹{fareResult.grossTotal.toLocaleString("en-IN")}
            </span>
          </div>

          {/* ======================================================== */}
          {/* PAYMENT SPLIT: 20% ADVANCE NOW vs 80% REMAINING BALANCE  */}
          {/* ======================================================== */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 space-y-2 mt-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <CreditCard className="h-3.5 w-3.5 text-primary" />
                <span className="font-medium text-foreground">20% Online Advance Deposit</span>
              </div>
              <span className="font-heading text-base font-normal text-foreground">
                ₹{fareResult.advancePayable.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-1.5 border-t border-border/50 text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Building className="h-3.5 w-3.5 text-muted-foreground" />
                <span>80% Balance Due on Arrival (Cash / UPI)</span>
              </div>
              <span className="font-mono font-medium text-foreground/80">
                ₹{fareResult.balanceDueOnArrival.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* Inline Date Validation Error */}
        {dateError && (
          <div
            role="alert"
            className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-300 flex items-start gap-2 animate-in fade-in duration-200"
          >
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <span>{dateError}</span>
          </div>
        )}

        {/* Primary CTA: Proceed to Secure Booking */}
        <Button
          type="submit"
          disabled={isOverCapacity}
          className="w-full h-12 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-bold text-sm tracking-wide transition-all shadow-lg active:scale-[0.99] mt-3 flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-[#121316]" />
          <span>Proceed to Secure Booking</span>
        </Button>

        {/* Secondary: WhatsApp Concierge */}
        <div className="pt-1 text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 text-xs text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors p-1.5 w-full rounded-lg"
          >
            <MessageSquare className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Need help? Chat with us on WhatsApp</span>
          </a>
        </div>
      </form>

      {/* Mobile Fixed Bottom Summary & Action */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1C1E24]/95 backdrop-blur-md border-t border-[#2E3038] px-4 py-3 flex items-center justify-between shadow-2xl">
        <div className="min-w-0 pr-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider truncate">
              {checkIn && checkOut ? `${totalNights}N Total` : "Starting from"}
            </span>
            {activePurposeLabel && (
              <span className="text-[9px] font-mono text-[#D4AF37] bg-[#D4AF37]/10 px-1.5 py-0.2 rounded border border-[#D4AF37]/20 truncate max-w-[130px]">
                {activePurposeLabel.split("—")[0].trim()}
              </span>
            )}
          </div>
          <div className="font-heading text-base sm:text-lg font-semibold text-[#F5F5F7]">
            ₹{fareResult.grossTotal.toLocaleString("en-IN")}
          </div>
          <div className="text-[10px] text-[#C5A880]">
            Advance: ₹{fareResult.advancePayable.toLocaleString("en-IN")} (20%)
          </div>
        </div>
        <Button
          type="button"
          onClick={() => setIsMobileSheetOpen(true)}
          className="bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-semibold text-xs h-10 px-4 rounded-xl shadow-md cursor-pointer shrink-0"
        >
          <span>{checkIn && checkOut ? "Review & Book (20%)" : "Select Dates & Book"}</span>
        </Button>
      </div>

      {/* ======================================================== */}
      {/* MOBILE EXPANDABLE BOOKING BOTTOM SHEET                    */}
      {/* ======================================================== */}
      {isMobileSheetOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-booking-sheet-title"
          className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsMobileSheetOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-h-[88vh] overflow-y-auto rounded-t-3xl bg-[#1C1E24] border-t border-[#2E3038] p-5 shadow-2xl text-[#F5F5F7] animate-in slide-in-from-bottom duration-200 space-y-4"
          >
            {/* Sheet Handle & Close */}
            <div className="w-10 h-1 rounded-full bg-[#2E3038] mx-auto" />
            <div className="flex items-center justify-between pb-3 border-b border-[#2E3038]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37]">
                  Mobile Booking Panel
                </span>
                <h3 id="mobile-booking-sheet-title" className="font-heading text-lg font-semibold text-[#F5F5F7]">
                  {room.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileSheetOpen(false)}
                className="h-8 w-8 rounded-lg border border-[#2E3038] bg-[#121316] text-[#A1A1AA] hover:text-[#F5F5F7] flex items-center justify-center cursor-pointer text-xs font-bold"
                aria-label="Close booking panel"
              >
                ✕
              </button>
            </div>

            {/* Dates in Sheet */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCheckInOpen(true)}
                className="flex flex-col items-start p-2.5 rounded-xl bg-[#121316] border border-[#2E3038] text-left"
              >
                <span className="text-[9px] uppercase font-mono tracking-wider text-[#A1A1AA]">Check-In</span>
                <span className="text-xs font-medium text-[#F5F5F7] mt-0.5 truncate">
                  {checkIn ? format(checkIn, "d MMM yyyy") : "Select date"}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setCheckOutOpen(true)}
                className="flex flex-col items-start p-2.5 rounded-xl bg-[#121316] border border-[#2E3038] text-left"
              >
                <span className="text-[9px] uppercase font-mono tracking-wider text-[#A1A1AA]">Check-Out</span>
                <span className="text-xs font-medium text-[#F5F5F7] mt-0.5 truncate">
                  {checkOut ? format(checkOut, "d MMM yyyy") : "Select date"}
                </span>
              </button>
            </div>

            {/* Guests in Sheet */}
            <div className="p-3 rounded-xl bg-[#121316] border border-[#2E3038] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="font-medium text-[#F5F5F7] block">Adults (13+ yrs)</span>
                  <span className="text-[10px] text-[#A1A1AA]">Max {room.maxAdults} adults</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                    disabled={adults <= 1}
                    className="h-7 w-7 rounded-lg border border-[#2E3038] bg-[#1C1E24] flex items-center justify-center text-[#F5F5F7] disabled:opacity-30"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-5 text-center font-mono text-sm">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults((prev) => Math.min(room.maxAdults, prev + 1))}
                    disabled={adults >= room.maxAdults}
                    className="h-7 w-7 rounded-lg border border-[#2E3038] bg-[#1C1E24] flex items-center justify-center text-[#F5F5F7] disabled:opacity-30"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#2E3038]/60">
                <div>
                  <span className="font-medium text-[#F5F5F7] block">Children (0–12 yrs)</span>
                  <span className="text-[10px] text-[#A1A1AA]">Free accommodation</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setChildrenCount((prev) => Math.max(0, prev - 1))}
                    disabled={childrenCount <= 0}
                    className="h-7 w-7 rounded-lg border border-[#2E3038] bg-[#1C1E24] flex items-center justify-center text-[#F5F5F7] disabled:opacity-30"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-5 text-center font-mono text-sm">{childrenCount}</span>
                  <button
                    type="button"
                    onClick={() => setChildrenCount((prev) => prev + 1)}
                    className="h-7 w-7 rounded-lg border border-[#2E3038] bg-[#1C1E24] flex items-center justify-center text-[#F5F5F7]"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stay Purpose in Sheet */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA] font-semibold">
                  Stay Purpose (Step 2)
                </span>
                {selectedPurposeId && (
                  <button
                    type="button"
                    onClick={() => onSelectPurpose && onSelectPurpose("accommodation_only")}
                    className="text-[10px] text-[#A1A1AA] hover:text-white underline cursor-pointer"
                  >
                    Accommodation only
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-1.5" role="radiogroup">
                {[
                  { id: "accommodation_only" as const, label: "Accommodation Only" },
                  { id: "medical" as const, label: "Medistay (Medical)" },
                  { id: "wedding" as const, label: "Wedding Stay" },
                  { id: "family" as const, label: "Family Vacation" },
                  { id: "tourism" as const, label: "Wanderer (Tourism)" },
                  { id: "corporate" as const, label: "Corporate" },
                ].map((item) => {
                  const isChecked = selectedPurposeId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="radio"
                      aria-checked={isChecked}
                      onClick={() => {
                        onSelectPurpose && onSelectPurpose(item.id);
                        if (item.id !== "accommodation_only" && onOpenServiceDrawer) {
                          setIsMobileSheetOpen(false);
                          onOpenServiceDrawer();
                        }
                      }}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded-lg border text-left text-xs transition-colors cursor-pointer",
                        isChecked
                          ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#F5F5F7] font-medium"
                          : "border-[#2E3038] bg-[#121316] text-[#A1A1AA]"
                      )}
                    >
                      <span
                        className={cn(
                          "w-3 h-3 rounded-full border flex items-center justify-center shrink-0",
                          isChecked ? "border-[#D4AF37] bg-[#D4AF37]" : "border-[#2E3038]"
                        )}
                      />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {selectedPurposeId && selectedPurposeId !== "accommodation_only" && onOpenServiceDrawer && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileSheetOpen(false);
                    onOpenServiceDrawer();
                  }}
                  className="w-full mt-2 py-2 px-3 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {activeAddons.length > 0
                      ? `Manage Services (${activeAddons.length} selected) →`
                      : "Explore Services for this Purpose →"}
                  </span>
                </button>
              )}
            </div>

            {/* Sheet Fare Breakdown */}
            <div className="p-3.5 rounded-xl bg-[#121316] border border-[#2E3038] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#A1A1AA]">
                <span>Base Rent ({totalNights}N)</span>
                <span className="font-mono text-[#F5F5F7]">₹{fareResult.baseRent.toLocaleString("en-IN")}</span>
              </div>
              {fareResult.extraGuestsTotal > 0 && (
                <div className="flex justify-between text-[#A1A1AA]">
                  <span>Extra Adults Fee</span>
                  <span className="font-mono text-[#F5F5F7]">₹{fareResult.extraGuestsTotal.toLocaleString("en-IN")}</span>
                </div>
              )}
              {fareResult.addonsTotal > 0 && (
                <div className="flex justify-between text-[#A1A1AA]">
                  <span>Add-ons</span>
                  <span className="font-mono text-[#F5F5F7]">₹{fareResult.addonsTotal.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#2E3038] flex justify-between font-semibold text-sm">
                <span>Gross Total</span>
                <span className="text-[#D4AF37]">₹{fareResult.grossTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-[11px] text-[#C5A880] pt-1">
                <span>20% Online Advance Due:</span>
                <span className="font-bold">₹{fareResult.advancePayable.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Error in Sheet */}
            {dateError && (
              <p className="text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/30">
                {dateError}
              </p>
            )}

            {/* Action CTA in Sheet */}
            <Button
              type="button"
              onClick={handleProceedToBook}
              disabled={isOverCapacity}
              className="w-full h-12 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-semibold text-sm cursor-pointer shadow-lg"
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              <span>Proceed to Secure Booking (₹{fareResult.advancePayable.toLocaleString("en-IN")})</span>
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
}
