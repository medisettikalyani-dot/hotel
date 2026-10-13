"use client";

import * as React from "react";
import { Users, BedDouble, UtensilsCrossed, Bath, ArrowUpDown, Zap } from "lucide-react";
import { RoomSpec } from "@/lib/mock-rooms";

interface RoomSpecsProps {
  specs: RoomSpec;
  baseAdults?: number;
  maxExtraGuests?: number;
}

export function RoomSpecs({
  specs,
  baseAdults = 2,
  maxExtraGuests = 2,
}: RoomSpecsProps) {
  const items = [
    {
      label: "Occupancy",
      value: `${baseAdults} Adults (+${maxExtraGuests} extra max)`,
      icon: Users,
    },
    {
      label: "Bedrooms",
      value: specs.bedrooms,
      icon: BedDouble,
    },
    {
      label: "Kitchen",
      value: specs.kitchen,
      icon: UtensilsCrossed,
    },
    {
      label: "Bathroom",
      value: specs.bathroom,
      icon: Bath,
    },
    {
      label: "Elevator",
      value: "Step-free lift access",
      icon: ArrowUpDown,
    },
    {
      label: "Utilities",
      value: "24/7 Power & dual water",
      icon: Zap,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-[#2E3038] bg-[#1C1E24] p-3 sm:p-3.5 transition-colors hover:border-[#D4AF37]/40"
          >
            <div className="h-8 w-8 rounded-lg border border-[#2E3038] bg-[#121316] flex items-center justify-center text-[#D4AF37] shrink-0">
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider font-sans text-[#A1A1AA]">
                {item.label}
              </p>
              <p className="text-xs sm:text-[13px] font-medium text-[#F5F5F7] mt-0.5 leading-snug">
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
