"use client";

import * as React from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isBefore,
  isAfter,
  startOfToday,
  addDays,
  differenceInDays,
} from "date-fns";
import { ChevronLeft, ChevronRight, RotateCcw, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onSelectRange: (checkIn: Date | null, checkOut: Date | null) => void;
  activeField?: "checkIn" | "checkOut";
  onFieldChange?: (field: "checkIn" | "checkOut") => void;
  onClose?: () => void;
  className?: string;
  isMobileModal?: boolean;
}

export function DateRangePicker({
  checkIn,
  checkOut,
  onSelectRange,
  activeField = "checkIn",
  onFieldChange,
  onClose,
  className,
  isMobileModal = false,
}: DateRangePickerProps) {
  const [today] = React.useState<Date>(() => startOfToday());

  // Active step in the calendar selection: whether picking checkIn or checkOut
  const [selectionStep, setSelectionStep] = React.useState<"checkIn" | "checkOut">(activeField);

  // Synchronize when parent's activeField changes
  React.useEffect(() => {
    setSelectionStep(activeField);
  }, [activeField]);

  // Display month begins at checkIn, checkOut, or today
  const [currentMonth, setCurrentMonth] = React.useState<Date>(() => {
    return checkIn || new Date();
  });

  // Track hovered date for connected range hover preview
  const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null);

  // Calendar month boundary computations
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const weekDayLabels = ["M", "T", "W", "T", "F", "S", "S"];

  // Navigation handlers
  const prevMonth = () => setCurrentMonth((prev) => subMonths(prev, 1));
  const nextMonth = () => setCurrentMonth((prev) => addMonths(prev, 1));

  // Determine if previous month navigation is allowed (cannot navigate past current month)
  const canGoPrev = today ? !isBefore(monthStart, startOfMonth(today)) : false;

  // Day click logic
  const handleDayClick = (day: Date) => {
    if (today && isBefore(day, today)) return;

    if (selectionStep === "checkIn") {
      onSelectRange(day, null);
      setSelectionStep("checkOut");
      if (onFieldChange) onFieldChange("checkOut");
    } else {
      // Step: picking checkOut
      if (!checkIn) {
        onSelectRange(day, null);
        setSelectionStep("checkOut");
        if (onFieldChange) onFieldChange("checkOut");
      } else if (isSameDay(day, checkIn) || isBefore(day, checkIn)) {
        // Prevent checkout from being equal to or before check-in.
        // Treat click as the new check-in date.
        onSelectRange(day, null);
        setSelectionStep("checkOut");
        if (onFieldChange) onFieldChange("checkOut");
      } else {
        // Valid Check-out selected (strictly after check-in)
        onSelectRange(checkIn, day);
        if (onClose) onClose();
      }
    }
  };

  const handleReset = () => {
    onSelectRange(null, null);
    setSelectionStep("checkIn");
    if (onFieldChange) onFieldChange("checkIn");
  };

  const handleDone = () => {
    if (checkIn && !checkOut) {
      // If user selected check-in and clicks Done, auto-set 1-night checkout
      const defaultOut = addDays(checkIn, 1);
      onSelectRange(checkIn, defaultOut);
    }
    if (onClose) onClose();
  };

  const nightsCount =
    checkIn && checkOut ? Math.max(0, differenceInDays(checkOut, checkIn)) : 0;

  return (
    <div
      className={cn(
        "w-full rounded-2xl bg-[#1C1E24] border border-[#2E3038] text-[#F5F5F7] shadow-[0_24px_60px_rgba(0,0,0,0.9)] select-none",
        isMobileModal
          ? "p-4 max-w-full"
          : "p-3.5 sm:p-4 max-w-[340px] sm:max-w-[360px]",
        className
      )}
    >
      {/* 1. SELECTION STATUS HEADER */}
      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#2E3038] text-xs">
        <button
          type="button"
          onClick={() => {
            setSelectionStep("checkIn");
            if (onFieldChange) onFieldChange("checkIn");
          }}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer",
            selectionStep === "checkIn"
              ? "bg-[#D4AF37]/15 text-[#D4AF37] font-semibold border border-[#D4AF37]/40"
              : "text-[#A1A1AA] hover:text-[#F5F5F7] border border-transparent"
          )}
        >
          <span className="text-[10px] uppercase tracking-wider text-[#C5A880]">In:</span>
          <span>{checkIn ? format(checkIn, "d MMM") : "Select date"}</span>
        </button>

        <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]/60 shrink-0" />

        <button
          type="button"
          onClick={() => {
            setSelectionStep("checkOut");
            if (onFieldChange) onFieldChange("checkOut");
          }}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer",
            selectionStep === "checkOut"
              ? "bg-[#D4AF37]/15 text-[#D4AF37] font-semibold border border-[#D4AF37]/40"
              : "text-[#A1A1AA] hover:text-[#F5F5F7] border border-transparent"
          )}
        >
          <span className="text-[10px] uppercase tracking-wider text-[#C5A880]">Out:</span>
          <span>{checkOut ? format(checkOut, "d MMM") : "Select date"}</span>
          {nightsCount > 0 && (
            <span className="text-[10px] font-mono text-[#D4AF37] ml-0.5 font-bold">
              ({nightsCount}N)
            </span>
          )}
        </button>
      </div>

      {/* 2. MONTH NAVIGATION */}
      <div className="flex items-center justify-between px-1 mb-2">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          className={cn(
            "h-7 w-7 flex items-center justify-center rounded-sm border border-[#2E3038] bg-[#121316] text-[#F5F5F7] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors focus:outline-none cursor-pointer",
            !canGoPrev && "opacity-20 cursor-not-allowed hover:text-[#F5F5F7] hover:border-[#2E3038]"
          )}
          aria-label="Previous month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="font-heading text-base sm:text-lg font-medium tracking-wide text-[#F5F5F7]">
          {format(currentMonth, "MMMM yyyy")}
        </span>

        <button
          type="button"
          onClick={nextMonth}
          className="h-7 w-7 flex items-center justify-center rounded-sm border border-[#2E3038] bg-[#121316] text-[#F5F5F7] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 transition-colors focus:outline-none cursor-pointer"
          aria-label="Next month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3. WEEKDAYS ROW */}
      <div className="grid grid-cols-7 gap-1 mb-1 text-center">
        {weekDayLabels.map((day, idx) => (
          <span
            key={`${day}-${idx}`}
            className="text-[10.5px] font-sans font-medium text-[#A1A1AA] uppercase tracking-wider"
          >
            {day}
          </span>
        ))}
      </div>

      {/* 4. DAYS GRID WITH CONNECTED RANGE HIGHLIGHTING */}
      <div className="grid grid-cols-7 gap-y-1 gap-x-0 text-center">
        {calendarDays.map((day) => {
          const isCurrentMonthDay = isSameMonth(day, currentMonth);
          const isPast = today ? isBefore(day, today) : false;
          const isCheckInDay = checkIn ? isSameDay(day, checkIn) : false;
          const isCheckOutDay = checkOut ? isSameDay(day, checkOut) : false;

          const isRangeMiddle =
            checkIn && checkOut
              ? isAfter(day, checkIn) && isBefore(day, checkOut)
              : checkIn && !checkOut && hoveredDate && selectionStep === "checkOut"
              ? isAfter(day, checkIn) && (isBefore(day, hoveredDate) || isSameDay(day, hoveredDate))
              : false;

          const isSelected = isCheckInDay || isCheckOutDay;

          if (!isCurrentMonthDay) {
            return (
              <div
                key={day.toISOString()}
                className="h-8 w-full flex items-center justify-center opacity-0 pointer-events-none"
              />
            );
          }

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "relative h-8 w-full flex items-center justify-center",
                isRangeMiddle && "bg-[#D4AF37]/15",
                isCheckInDay && (checkOut || hoveredDate) && "rounded-l-full bg-gradient-to-r from-transparent to-[#D4AF37]/15",
                isCheckOutDay && checkIn && "rounded-r-full bg-gradient-to-l from-transparent to-[#D4AF37]/15"
              )}
            >
              <button
                type="button"
                onClick={() => handleDayClick(day)}
                onMouseEnter={() => {
                  if (checkIn && !checkOut && selectionStep === "checkOut") {
                    setHoveredDate(day);
                  }
                }}
                onMouseLeave={() => setHoveredDate(null)}
                disabled={isPast}
                className={cn(
                  "h-7 w-7 sm:h-7.5 sm:w-7.5 rounded-full flex items-center justify-center text-xs font-sans font-medium transition-all cursor-pointer",
                  isPast && "text-[#A1A1AA]/25 cursor-not-allowed",
                  !isPast && !isSelected && "text-[#F5F5F7] hover:bg-[#D4AF37]/20 hover:text-[#D4AF37]",
                  isSelected && "bg-[#D4AF37] text-[#121316] font-bold shadow-xs scale-105 z-10",
                  today && isSameDay(day, today) && !isSelected && "border border-[#D4AF37]/60 text-[#D4AF37]"
                )}
                aria-label={format(day, "EEEE, MMMM d, yyyy")}
                aria-selected={isSelected}
              >
                {format(day, "d")}
              </button>
            </div>
          );
        })}
      </div>

      {/* 5. BOTTOM ACTIONS */}
      <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-[#2E3038]">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-sans text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors rounded-sm focus:outline-none cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#A1A1AA]" />
          <span>Reset</span>
        </button>

        <button
          type="button"
          onClick={handleDone}
          className="px-4 py-1.5 min-h-[32px] rounded-lg border border-[#D4AF37] bg-[#D4AF37] text-[#121316] hover:bg-[#C5A880] text-xs font-sans font-bold tracking-wider uppercase transition-all duration-150 focus:outline-none shadow-xs cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
}
