"use client";

import * as React from "react";
import Image from "next/image";
import {
  Star,
  Check,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface CustomerReview {
  id: string;
  name: string;
  role: string;
  branch: string;
  stayType: string;
  rating: number;
  review: string;
}

const REVIEWS: CustomerReview[] = [
  {
    id: "review-1",
    name: "DR. SRINIVAS & ANANYA RAO",
    role: "Family of 6 with Elderly Parents",
    branch: "Moghal Pura Branch (4 BHK)",
    stayType: "Heritage & Family Stay",
    rating: 5,
    review:
      "Booking the 4 BHK in Moghal Pura gave us 3x more space than a luxury hotel suite at a fraction of the cost. The kids loved the spacious hall, my parents enjoyed the quiet master bedrooms, and alternate-day housekeeping kept the entire residence immaculate.",
  },
  {
    id: "review-2",
    name: "DR. TARIQ MANSOOR",
    role: "Patient Attendant for Cardiac Recovery",
    branch: "Barkas Salala Branch (3 BHK)",
    stayType: "Medistay Recovery",
    rating: 5,
    review:
      "The private modular kitchen was a complete lifesaver for my father's strict salt-free diet during his 18 days of treatment near Owaisi Hospital. The 24/7 concierge even coordinated step-free wheelchair access within minutes. Unmatched peace of mind.",
  },
  {
    id: "review-3",
    name: "VIKRAM SENGUPTA",
    role: "Management Consultant",
    branch: "Barkas Salala Branch (3 BHK)",
    stayType: "Corporate Work-Stay",
    rating: 5,
    review:
      "Flawless fiber Wi-Fi and a quiet dedicated ergonomic workstation for two weeks of client Zoom calls. Airport expressway access took only 15 minutes, and paying the remaining 80% on arrival via UPI made company expensing completely effortless.",
  },
  {
    id: "review-4",
    name: "FARHAN & SHAGUFTA KHAN",
    role: "Wedding Group Hosts",
    branch: "Moghal Pura Branch (1 & 2 BHK)",
    stayType: "Wedding Group Stay",
    rating: 5,
    review:
      "We hosted out-of-town wedding relatives across two connected suites steps from Charminar. Fresh sanitized linens, RO drinking water, and round-the-clock caretaker support made hosting 10 guests completely stress-free. Every guest loved the stay.",
  },
];

interface ReviewsSectionProps {
  className?: string;
}

export function ReviewsSection({ className }: ReviewsSectionProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // Auto-advance reviews every 6 seconds unless hovered
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const currentReview = REVIEWS[activeIndex];

  return (
    <section
      id="reviews"
      className={cn(
        "relative w-full overflow-hidden select-none py-20 sm:py-24 lg:py-28 border-t border-[#262835]",
        className
      )}
      aria-label="Customer Reviews"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ========================================================== */}
      {/* 1. CINEMATIC SUNLIT PENTHOUSE LIVING ROOM BACKDROP         */}
      {/* ========================================================== */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/reviews-luxury-backdrop.jpg"
          alt="Luxury Serviced Penthouse Living Room"
          fill
          priority
          quality={95}
          className="object-cover object-center scale-[1.01]"
          sizes="100vw"
        />
        {/* Balanced Luxury Vignette: Soft darkening so room is clearly visible */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/60 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* ========================================================== */}
        {/* 2. SECTION HEADER (EXACT REFERENCE TYPOGRAPHY)             */}
        {/* ========================================================== */}
        <div className="text-center mb-8 sm:mb-11">
          <span className="text-[11px] sm:text-xs font-sans font-bold tracking-[0.28em] text-[#E5B54F] uppercase inline-block drop-shadow-sm">
            VERIFIED EXPERIENCES
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl md:text-[44px] font-normal tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
            Customer Reviews
          </h2>
        </div>

        {/* ========================================================== */}
        {/* 3. FLOATING WHITE REVIEW CARD WITH SIDE ARROWS             */}
        {/* ========================================================== */}
        <div className="relative max-w-2xl lg:max-w-[700px] mx-auto flex items-center justify-center">
          {/* Circular Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-1 sm:-left-5 md:-left-6 z-20 w-8.5 h-8.5 sm:w-11 sm:h-11 rounded-full bg-white text-[#18181B] shadow-[0_12px_32px_rgba(0,0,0,0.35)] flex items-center justify-center hover:scale-108 active:scale-95 transition-all cursor-pointer border border-black/5"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Centered Floating White Card */}
          <div
            key={currentReview.id}
            className="w-full rounded-2xl sm:rounded-3xl bg-white text-[#18181B] px-8 py-5 sm:p-8 md:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-black/5 animate-in fade-in duration-300 relative"
          >
            {/* Top Row: User Avatar, Name, Rating & Verified Badge */}
            <div className="flex items-center justify-between gap-3 pb-3.5 sm:pb-4">
              <div className="flex items-center gap-2.5 sm:gap-3.5">
                {/* Circular User Avatar */}
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#F3F4F6] flex items-center justify-center text-[#6B7280] shrink-0 border border-black/5">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                </div>

                {/* Customer Name in Rust-Amber + 5 Stars */}
                <div>
                  <h3 className="text-[11px] sm:text-[13px] font-sans font-bold tracking-[0.14em] uppercase text-[#7C2D12] leading-tight">
                    {currentReview.name}
                  </h3>
                  {/* 5 Stars */}
                  <div
                    className="flex items-center gap-0.5 mt-1 text-[#F59E0B]"
                    aria-label={`${currentReview.rating} out of 5 stars`}
                  >
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 sm:w-4 sm:h-4 fill-[#F59E0B] stroke-none"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Verified Checkmark Badge */}
              <div
                className="w-5.5 h-5.5 sm:w-7 sm:h-7 rounded-full bg-[#7C2D12] text-white flex items-center justify-center shadow-xs shrink-0"
                title="Verified Guest Stay"
              >
                <Check className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2.75]" />
              </div>
            </div>

            {/* Quotation Body */}
            <p className="text-xs sm:text-sm md:text-[14.5px] font-sans text-[#27272A] leading-[1.65] tracking-normal font-normal">
              &ldquo;{currentReview.review}&rdquo;
            </p>

            {/* Stay Context Footer */}
            <div className="mt-3.5 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2 text-[10.5px] sm:text-[11px] text-[#71717A]">
              <span className="font-medium text-[#18181B] truncate">
                {currentReview.branch}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#F4F4F5] text-[#52525B] font-medium shrink-0">
                {currentReview.stayType}
              </span>
            </div>
          </div>

          {/* Circular Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-1 sm:-right-5 md:-right-6 z-20 w-8.5 h-8.5 sm:w-11 sm:h-11 rounded-full bg-white text-[#18181B] shadow-[0_12px_32px_rgba(0,0,0,0.35)] flex items-center justify-center hover:scale-108 active:scale-95 transition-all cursor-pointer border border-black/5"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* ========================================================== */}
        {/* 4. PAGINATION INDICATOR PILLS                              */}
        {/* ========================================================== */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
          {REVIEWS.map((review, idx) => (
            <button
              key={review.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                activeIndex === idx
                  ? "w-7 sm:w-8 bg-white shadow-md"
                  : "w-1.5 bg-white/40 hover:bg-white/70"
              )}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
