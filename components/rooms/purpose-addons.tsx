"use client";

import * as React from "react";
import {
  HeartPulse,
  Compass,
  Briefcase,
  UsersRound,
  Check,
  Plus,
} from "lucide-react";
import { PURPOSE_PACKAGES, PurposePackage } from "@/lib/mock-rooms";
import { cn } from "@/lib/utils";

interface PurposeAddonsProps {
  selectedPurposeId: "medical" | "tourism" | "corporate" | "family";
  onSelectPurpose: (purposeId: "medical" | "tourism" | "corporate" | "family") => void;
  selectedAddonIds: string[];
  onToggleAddon: (addonId: string) => void;
}

const PURPOSE_TABS = [
  { id: "medical", label: "Medical / Healthcare", icon: HeartPulse },
  { id: "tourism", label: "Tourism & Heritage", icon: Compass },
  { id: "corporate", label: "Corporate & Business", icon: Briefcase },
  { id: "family", label: "Family Vacation", icon: UsersRound },
] as const;

export function PurposeAddons({
  selectedPurposeId,
  onSelectPurpose,
  selectedAddonIds,
  onToggleAddon,
}: PurposeAddonsProps) {
  const currentPackage: PurposePackage =
    PURPOSE_PACKAGES.find((p) => p.id === selectedPurposeId) || PURPOSE_PACKAGES[0];

  return (
    <div
      id="stay-purpose-sec"
      className="rounded-2xl border border-[#262835] bg-[#161822] p-5 sm:p-6 space-y-4"
    >
      <div>
        <h3 className="font-heading text-lg font-bold text-white tracking-tight">
          Personalise Your Stay
        </h3>
        <p className="text-xs text-[#A1A1AA] mt-0.5">
          Select your visit focus to unlock tailored complimentary care and optional arrangements.
        </p>
      </div>

      {/* 4 Sleek Selector Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {PURPOSE_TABS.map((tab) => {
          const isSelected = tab.id === selectedPurposeId;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectPurpose(tab.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer",
                isSelected
                  ? "bg-[#D4AF37] text-[#121316] font-bold shadow-xs scale-102"
                  : "bg-[#101218] border border-white/5 text-[#A1A1AA] hover:text-white hover:border-white/15"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Compact Curated Box */}
      <div className="p-4 rounded-xl bg-[#101218] border border-white/5 space-y-3">
        {/* Complimentary inclusions list */}
        <div>
          <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#34D399] block mb-2">
            Complimentary with your stay ({currentPackage.name.split(" ")[0]}):
          </span>
          <div className="flex flex-wrap gap-1.5 text-xs">
            {(currentPackage.complimentaryServices || []).slice(0, 5).map((service) => (
              <span
                key={service.name}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[#E4E4E7] text-[11px]"
              >
                <Check className="w-3 h-3 text-[#34D399] shrink-0" />
                <span>{service.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Optional Add-ons */}
        {currentPackage.paidAddons.length > 0 && (
          <div className="pt-2 border-t border-white/5">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#D4AF37] block mb-2">
              Optional Add-ons:
            </span>
            <div className="flex flex-wrap gap-2">
              {currentPackage.paidAddons.map((addon) => {
                const isChecked = selectedAddonIds.includes(addon.id);
                const isNumeric = typeof addon.price === "number";

                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => onToggleAddon(addon.id)}
                    className={cn(
                      "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-colors cursor-pointer",
                      isChecked
                        ? "border-[#D4AF37] bg-[#D4AF37]/15 text-white font-semibold"
                        : "border-white/10 bg-[#161822] text-[#A1A1AA] hover:text-white"
                    )}
                  >
                    <span>{isChecked ? "✓" : "+"}</span>
                    <span>{addon.name}</span>
                    <span className="text-[#D4AF37] font-mono text-[10px]">
                      {isNumeric
                        ? addon.pricingType === "per_night"
                          ? `(₹${addon.price}/n)`
                          : `(₹${addon.price})`
                        : "(On Request)"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
