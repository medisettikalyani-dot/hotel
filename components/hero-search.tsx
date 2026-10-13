"use client";

import * as React from "react";
import { format, addDays, isBefore, startOfToday } from "date-fns";
import {
  Calendar as CalendarIcon,
  Users,
  Search,
  Sparkles,
  HeartPulse,
  Compass,
  Users2,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const PURPOSES = [
  {
    id: "medical",
    label: "Medical Stay",
    tagline: "Quiet, hygienic, attendant-friendly",
    icon: HeartPulse,
  },
  {
    id: "tourism",
    label: "Tourism & Leisure",
    tagline: "Sightseeing, heritage, Old City shopping",
    icon: Compass,
  },
  {
    id: "family",
    label: "Family Stay",
    tagline: "Spacious, furnished kitchen, wedding guests",
    icon: Users2,
  },
] as const;

type PurposeId = (typeof PURPOSES)[number]["id"];

export function HeroSearch() {
  // 1. Dates State
  const [checkIn, setCheckIn] = React.useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = React.useState<Date | undefined>(undefined);

  // Lazy client fallback for dates without triggering cascading effect renders
  const displayCheckIn = checkIn || (typeof window !== "undefined" ? startOfToday() : undefined);
  const displayCheckOut = checkOut || (typeof window !== "undefined" ? addDays(startOfToday(), 2) : undefined);

  const [checkInOpen, setCheckInOpen] = React.useState(false);
  const [checkOutOpen, setCheckOutOpen] = React.useState(false);

  // 2. Guests State (Defaults: 2 adults, 0 children)
  const [adults, setAdults] = React.useState(2);
  const [childrenCount, setChildrenCount] = React.useState(0);
  const [guestsOpen, setGuestsOpen] = React.useState(false);

  // 3. Stay Purpose State (Default: Medical Stay per PRD priority)
  const [selectedPurpose, setSelectedPurpose] = React.useState<PurposeId>("medical");
  const [purposeOpen, setPurposeOpen] = React.useState(false);

  // 4. Local Interaction Feedback State
  const [searchFeedback, setSearchFeedback] = React.useState<string | null>(null);

  const totalGuests = adults + childrenCount;
  const currentPurpose = PURPOSES.find((p) => p.id === selectedPurpose);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const effectiveIn = checkIn || displayCheckIn;
    const effectiveOut = checkOut || displayCheckOut;
    if (!effectiveIn || !effectiveOut) return;

    const formattedIn = format(effectiveIn, "d MMM yyyy");
    const formattedOut = format(effectiveOut, "d MMM yyyy");
    setSearchFeedback(
      `Search criteria captured: ${formattedIn} – ${formattedOut} • ${totalGuests} Guest${totalGuests > 1 ? "s" : ""} (${adults} Adult${adults > 1 ? "s" : ""}${childrenCount > 0 ? `, ${childrenCount} Child` : ""}) • ${currentPurpose?.label}. Room availability queries will be linked in the next stage.`
    );
  };

  return (
    <div className="w-full">
      {/* Search Panel Container */}
      <form
        onSubmit={handleSearchSubmit}
        className="w-full rounded-2xl border border-border-warm bg-card p-2 sm:p-2.5 shadow-[0_8px_30px_rgba(41,40,36,0.08)]"
        aria-label="Room Search and Booking Parameters"
      >
        {/* Responsive Grid: Desktop horizontal, Tablet 2x2, Mobile stacked */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-2 lg:gap-1.5 items-stretch">
          {/* 1. CHECK-IN */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3">
            <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    className="flex h-full min-h-[58px] w-full flex-col justify-center rounded-xl bg-soft-cream/60 px-3.5 py-2 text-left transition-colors hover:bg-soft-cream focus:outline-none focus-visible:ring-1 focus-visible:ring-deep-olive border border-border-warm/60 hover:border-border-warm"
                    aria-label={`Check-in date: ${checkIn ? format(checkIn, "EEE, d MMM yyyy") : displayCheckIn ? format(displayCheckIn, "EEE, d MMM yyyy") : "Select date"}`}
                  />
                }
              >
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-warm-gray">
                  <CalendarIcon className="h-3.5 w-3.5 text-deep-olive" />
                  <span>Check-In</span>
                </div>
                <div className="mt-1 text-xs sm:text-sm font-medium text-charcoal truncate">
                  {checkIn ? format(checkIn, "EEE, d MMM yyyy") : displayCheckIn ? format(displayCheckIn, "EEE, d MMM yyyy") : "Select date"}
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-3 bg-card border border-border-warm shadow-xl rounded-xl z-50"
                align="start"
              >
                <div className="pb-2 mb-2 border-b border-border-warm text-xs font-semibold text-deep-olive">
                  Select Check-in Date
                </div>
                {checkInOpen && (
                  <Calendar
                    mode="single"
                    selected={checkIn || displayCheckIn}
                    onSelect={(date) => {
                      setCheckIn(date);
                      if (date && (checkOut || displayCheckOut) && isBefore(checkOut || displayCheckOut!, date)) {
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
          </div>

          {/* 2. CHECK-OUT */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3">
            <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    className="flex h-full min-h-[58px] w-full flex-col justify-center rounded-xl bg-soft-cream/60 px-3.5 py-2 text-left transition-colors hover:bg-soft-cream focus:outline-none focus-visible:ring-1 focus-visible:ring-deep-olive border border-border-warm/60 hover:border-border-warm"
                    aria-label={`Check-out date: ${checkOut ? format(checkOut, "EEE, d MMM yyyy") : displayCheckOut ? format(displayCheckOut, "EEE, d MMM yyyy") : "Select date"}`}
                  />
                }
              >
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-warm-gray">
                  <CalendarIcon className="h-3.5 w-3.5 text-deep-olive" />
                  <span>Check-Out</span>
                </div>
                <div className="mt-1 text-xs sm:text-sm font-medium text-charcoal truncate">
                  {checkOut ? format(checkOut, "EEE, d MMM yyyy") : displayCheckOut ? format(displayCheckOut, "EEE, d MMM yyyy") : "Select date"}
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-3 bg-card border border-border-warm shadow-xl rounded-xl z-50"
                align="start"
              >
                <div className="pb-2 mb-2 border-b border-border-warm text-xs font-semibold text-deep-olive">
                  Select Check-out Date
                </div>
                {checkOutOpen && (
                  <Calendar
                    mode="single"
                    selected={checkOut || displayCheckOut}
                    onSelect={(date) => {
                      setCheckOut(date);
                      setCheckOutOpen(false);
                    }}
                    disabled={{
                      before: (checkIn || displayCheckIn) ? addDays(checkIn || displayCheckIn!, 1) : startOfToday(),
                    }}
                    className="rounded-md"
                  />
                )}
              </PopoverContent>
            </Popover>
          </div>

          {/* 3. GUESTS */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    className="flex h-full min-h-[58px] w-full flex-col justify-center rounded-xl bg-soft-cream/60 px-3.5 py-2 text-left transition-colors hover:bg-soft-cream focus:outline-none focus-visible:ring-1 focus-visible:ring-deep-olive border border-border-warm/60 hover:border-border-warm"
                    aria-label={`Guests: ${adults} Adults, ${childrenCount} Children`}
                  />
                }
              >
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-warm-gray">
                  <Users className="h-3.5 w-3.5 text-deep-olive" />
                  <span>Guests</span>
                </div>
                <div className="mt-1 text-xs sm:text-sm font-medium text-charcoal truncate">
                  {adults} Adult{adults > 1 ? "s" : ""}
                  {childrenCount > 0 ? `, ${childrenCount} Child` : ""}
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="w-72 p-4 bg-card border border-border-warm shadow-xl rounded-xl z-50 space-y-4"
                align="start"
              >
                <div className="border-b border-border-warm pb-2">
                  <p className="text-xs font-semibold text-deep-olive tracking-wide">
                    Select Guests
                  </p>
                  <p className="text-[11px] text-warm-gray">
                    1 BHK, 2 BHK, and 3 BHK capacities apply
                  </p>
                </div>

                {/* Adults Stepper */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-charcoal">Adults</p>
                    <p className="text-[10px] text-warm-gray">Age 13 and above</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                      disabled={adults <= 1}
                      className="h-8 w-8 rounded-lg border border-border-warm bg-soft-cream flex items-center justify-center text-charcoal hover:bg-[#E5DEC9] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Decrease adults"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-sm font-semibold text-charcoal">
                      {adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => Math.min(12, prev + 1))}
                      disabled={adults >= 12}
                      className="h-8 w-8 rounded-lg border border-border-warm bg-soft-cream flex items-center justify-center text-charcoal hover:bg-[#E5DEC9] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Increase adults"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Children Stepper */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-charcoal">Children</p>
                    <p className="text-[10px] text-warm-gray">Ages 0 to 12 · Free</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setChildrenCount((prev) => Math.max(0, prev - 1))}
                      disabled={childrenCount <= 0}
                      className="h-8 w-8 rounded-lg border border-border-warm bg-soft-cream flex items-center justify-center text-charcoal hover:bg-[#E5DEC9] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Decrease children"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-sm font-semibold text-charcoal">
                      {childrenCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setChildrenCount((prev) => Math.min(6, prev + 1))}
                      disabled={childrenCount >= 6}
                      className="h-8 w-8 rounded-lg border border-border-warm bg-soft-cream flex items-center justify-center text-charcoal hover:bg-[#E5DEC9] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                      aria-label="Increase children"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-border-warm flex justify-end">
                  <Button
                    type="button"
                    size="sm"
                    className="h-8 px-3 text-xs bg-deep-olive hover:bg-deep-olive-hover text-warm-ivory"
                    onClick={() => setGuestsOpen(false)}
                  >
                    Done
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* 4. STAY PURPOSE */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2">
            <Popover open={purposeOpen} onOpenChange={setPurposeOpen}>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    className="flex h-full min-h-[58px] w-full flex-col justify-center rounded-xl bg-soft-cream/60 px-3.5 py-2 text-left transition-colors hover:bg-soft-cream focus:outline-none focus-visible:ring-1 focus-visible:ring-deep-olive border border-border-warm/60 hover:border-border-warm"
                    aria-label={`Stay Purpose: ${currentPurpose?.label}`}
                  />
                }
              >
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-warm-gray">
                  {currentPurpose && <currentPurpose.icon className="h-3.5 w-3.5 text-deep-olive" />}
                  <span>Stay Purpose</span>
                </div>
                <div className="mt-1 text-xs sm:text-sm font-medium text-charcoal truncate">
                  {currentPurpose?.label}
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="w-80 p-2 bg-card border border-border-warm shadow-xl rounded-xl z-50 space-y-1"
                align="start"
              >
                <div className="px-3 py-1.5 border-b border-border-warm mb-1">
                  <p className="text-xs font-semibold text-deep-olive">Select Stay Purpose</p>
                  <p className="text-[10px] text-warm-gray">
                    Enables complimentary amenities tailored for your stay
                  </p>
                </div>
                {PURPOSES.map((purpose) => {
                  const Icon = purpose.icon;
                  const isSelected = selectedPurpose === purpose.id;
                  return (
                    <button
                      key={purpose.id}
                      type="button"
                      onClick={() => {
                        setSelectedPurpose(purpose.id);
                        setPurposeOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-start gap-3 p-2.5 rounded-lg text-left transition-colors",
                        isSelected
                          ? "bg-soft-cream border border-deep-olive/30"
                          : "hover:bg-soft-cream/70 border border-transparent"
                      )}
                    >
                      <div
                        className={cn(
                          "h-7 w-7 rounded-md flex items-center justify-center shrink-0 mt-0.5",
                          isSelected
                            ? "bg-deep-olive text-warm-ivory"
                            : "bg-soft-cream text-deep-olive"
                        )}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-charcoal">{purpose.label}</p>
                          {isSelected && <Check className="h-3.5 w-3.5 text-deep-olive" />}
                        </div>
                        <p className="text-[10px] text-warm-gray leading-tight mt-0.5">
                          {purpose.tagline}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </PopoverContent>
            </Popover>
          </div>

          {/* 5. SEARCH ROOMS ACTION BUTTON */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 flex items-center">
            <Button
              type="submit"
              className="w-full h-[58px] rounded-xl bg-deep-olive hover:bg-deep-olive-hover text-warm-ivory font-semibold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-deep-olive"
            >
              <Search className="h-4 w-4 shrink-0 text-champagne" />
              <span>Search Rooms</span>
            </Button>
          </div>
        </div>
      </form>

      {/* Local Interaction Feedback Notification */}
      {searchFeedback && (
        <div
          role="status"
          className="mt-3.5 rounded-xl border border-border-warm bg-soft-cream p-3 text-xs text-charcoal flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200"
        >
          <Sparkles className="h-4 w-4 text-deep-olive shrink-0 mt-0.5" />
          <div className="flex-1 text-[11px] sm:text-xs leading-relaxed text-warm-gray">
            <span className="font-semibold text-deep-olive">Search Ready: </span>
            {searchFeedback}
          </div>
          <button
            type="button"
            onClick={() => setSearchFeedback(null)}
            className="text-[11px] text-warm-gray hover:text-deep-olive underline ml-2 shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
