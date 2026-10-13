"use client";

import * as React from "react";
import Image from "next/image";
import {
  Wifi,
  Wind,
  Tv,
  Refrigerator,
  Zap,
  Droplets,
  ArrowUpDown,
  Sparkles,
  UtensilsCrossed,
  X,
  Check,
  Flame,
  Coffee,
  Microwave,
  CookingPot,
  Blend,
  Layers,
  DoorClosed,
  Laptop,
  Shirt,
  ShieldCheck,
  Headphones,
  Baby,
  Dices,
  Car,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getAmenityIllustration } from "./room-detail-data";

interface RoomAmenitiesProps {
  className?: string;
}

// 8 Primary Quick Inclusions for the Agoda-style compact checkmark grid
const QUICK_FACILITIES = [
  "High-Speed Fiber Wi-Fi",
  "Split Air Conditioning",
  "Private Modular Kitchen",
  "24/7 Hot Water Geyser",
  "100% Inverter Power Backup",
  "Step-Free Passenger Elevator",
  "Dedicated Free Parking",
  "Smart TV with Streaming",
];

// Complete Detailed Inventory for Modal
const DETAILED_INVENTORY = [
  {
    category: "Living & Bedroom",
    items: [
      { name: "High-Speed Fiber Wi-Fi", icon: Wifi },
      { name: "Split Air Conditioning", icon: Wind },
      { name: "Smart TV with OTT Apps", icon: Tv },
      { name: "Premium Fresh Linens & Pillows", icon: Sparkles },
      { name: "Wardrobe & Luggage Storage", icon: DoorClosed },
      { name: "Dedicated Laptop Work Desk", icon: Laptop },
      { name: "Premium Wooden / Marble Flooring", icon: Layers },
    ],
  },
  {
    category: "Kitchen & Dining",
    items: [
      { name: "Double-Door Refrigerator", icon: Refrigerator },
      { name: "RO Water Purifier", icon: Droplets },
      { name: "Gas Stove with Piped/Cylinder Gas", icon: Flame },
      { name: "Microwave Oven", icon: Microwave },
      { name: "Electric Water Kettle", icon: Coffee },
      { name: "Rice Cooker", icon: CookingPot },
      { name: "Mixer & Grinder", icon: Blend },
      { name: "Cookware, Pans, Plates & Cutlery", icon: UtensilsCrossed },
      { name: "Starter Kitchen Staples (Tea, Sugar, Salt)", icon: Check },
    ],
  },
  {
    category: "Bathroom & Laundry",
    items: [
      { name: "Water-Softening Geyser (24/7 Hot Water)", icon: Droplets },
      { name: "Fresh Bath Towels & Toiletries", icon: Sparkles },
      { name: "Front-Load Washing Machine (or Laundry Support)", icon: Shirt },
      { name: "24/7 Dual Water Supply", icon: Droplets },
    ],
  },
  {
    category: "Building, Safety & Convenience",
    items: [
      { name: "Step-Free Passenger Elevator Access", icon: ArrowUpDown },
      { name: "100% Inverter Power Backup", icon: Zap },
      { name: "Dedicated Free Parking on Premises", icon: Car },
      { name: "24/7 CCTV & Secure Entry", icon: ShieldCheck },
      { name: "On-Call Guest Assistance", icon: Headphones },
      { name: "Alternate-Day Hotel Housekeeping", icon: Sparkles },
      { name: "Infant Baby Cot (On Prior Request)", icon: Baby },
      { name: "Family Board Games (On Request)", icon: Dices },
    ],
  },
];

export function RoomAmenities({ className }: RoomAmenitiesProps) {
  const [modalOpen, setModalOpen] = React.useState(false);

  // Lock body scroll on modal open
  React.useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setModalOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [modalOpen]);

  return (
    <div className={cn("rounded-2xl border border-[#262835] bg-[#161822] p-5 sm:p-6 space-y-3.5", className)}>
      {/* Header: Title + See all (Matching Agoda reference) */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-lg font-bold text-white tracking-tight">
          Facilities &amp; Inclusions
        </h3>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="text-xs font-semibold text-[#D4AF37] hover:underline cursor-pointer"
        >
          See all facilities (+16 more)
        </button>
      </div>

      {/* Agoda-style Compact Inclusions List with 3D miniature illustrations */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-[#E4E4E7]">
        {QUICK_FACILITIES.map((facility) => {
          const illustration = getAmenityIllustration(facility);
          return (
            <div
              key={facility}
              className="flex items-center gap-2 p-1.5 rounded-lg bg-[#121316] border border-[#2E3038]/60 hover:border-[#D4AF37]/30 transition-colors"
            >
              <div className="relative w-6 h-6 rounded-md bg-[#1C1E24] border border-[#2E3038] flex items-center justify-center shrink-0 overflow-hidden p-0.5">
                <Image
                  src={illustration}
                  alt={facility}
                  fill
                  sizes="24px"
                  className="object-contain"
                />
              </div>
              <span className="truncate">{facility}</span>
            </div>
          );
        })}
      </div>

      {/* Complete Amenities Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[#161822] border border-[#2E3038] shadow-2xl text-[#F5F5F7] p-6 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h4 className="font-heading text-xl font-bold text-white">
                  Full Apartment Inventory &amp; Amenities
                </h4>
                <p className="text-xs text-[#A1A1AA] mt-0.5">
                  Complete list of verified in-suite inclusions and property conveniences.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="h-8 w-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-white/15 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Categorized List */}
            <div className="space-y-6">
              {DETAILED_INVENTORY.map((cat) => (
                <div key={cat.category} className="space-y-2.5">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                    {cat.category}
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {cat.items.map((it) => {
                      const itemIllustration = getAmenityIllustration(it.name);
                      return (
                        <div
                          key={it.name}
                          className="flex items-center gap-2.5 p-2 rounded-lg bg-[#101218] border border-white/5 text-xs text-[#E4E4E7]"
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
                          <span>{it.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#E5B54F] text-[#121316] font-bold text-xs cursor-pointer"
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
