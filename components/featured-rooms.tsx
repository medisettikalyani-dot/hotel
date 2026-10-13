import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  UtensilsCrossed,
  Wifi,
  ArrowUpDown,
  Sparkles,
  BedDouble,
  ArrowRight,
  Sofa,
  Building2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AmenityItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface RoomCardData {
  id: string;
  type: "1 BHK" | "2 BHK" | "3 BHK";
  title: string;
  shortDescription: string;
  pricePerNight: string;
  capacity: string;
  amenities: AmenityItem[];
  imageUrl?: string;
  href: string;
}

const FEATURED_ROOMS: RoomCardData[] = [
  {
    id: "deluxe-1bhk",
    type: "1 BHK",
    title: "1 BHK Furnished Flat",
    shortDescription:
      "A comfortable furnished flat for couples, solo guests, or small families with private bedroom and kitchen.",
    pricePerNight: "₹2,000",
    capacity: "2 base adults · up to 2 extra · Kids 0–12 free",
    amenities: [
      { label: "Fully furnished", icon: Sparkles },
      { label: "Kitchen", icon: UtensilsCrossed },
      { label: "Wi-Fi", icon: Wifi },
      { label: "Lift access", icon: ArrowUpDown },
    ],
    href: "/rooms/deluxe-1bhk",
  },
  {
    id: "premium-2bhk",
    type: "2 BHK",
    title: "2 BHK Furnished Flat",
    shortDescription:
      "More room for families and groups who want to stay together comfortably with two private bedrooms and living lounge.",
    pricePerNight: "₹2,500",
    capacity: "4 base adults · up to 2 extra · Kids 0–12 free",
    amenities: [
      { label: "Spacious living area", icon: Sofa },
      { label: "Fully equipped kitchen", icon: UtensilsCrossed },
      { label: "Wi-Fi", icon: Wifi },
      { label: "Lift access", icon: ArrowUpDown },
    ],
    href: "/rooms/premium-2bhk",
  },
  {
    id: "grand-3bhk",
    type: "3 BHK",
    title: "3 BHK Furnished Flat (Barkas)",
    shortDescription:
      "Generous space for larger families and groups at Barkas Salala, offering three bedrooms and full kitchen.",
    pricePerNight: "₹3,000",
    capacity: "6 base adults · up to 3 extra · Kids 0–12 free",
    amenities: [
      { label: "Large family layout", icon: Building2 },
      { label: "Fully equipped kitchen", icon: UtensilsCrossed },
      { label: "Wi-Fi", icon: Wifi },
      { label: "Lift access", icon: ArrowUpDown },
    ],
    href: "/rooms/grand-3bhk",
  },
];

export function FeaturedRooms() {
  return (
    <section
      id="rooms"
      className="relative w-full border-t border-border/70 bg-background py-16 sm:py-20 lg:py-24"
      aria-labelledby="featured-rooms-heading"
    >
      {/* Subtle Atmospheric Lighting */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(201,168,91,0.04),transparent_75%)]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
              <span className="h-px w-5 sm:w-6 bg-primary" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                Stay Your Way
              </span>
            </div>

            {/* Main Heading (Cormorant Garamond) */}
            <h2
              id="featured-rooms-heading"
              className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.18] text-foreground tracking-tight text-balance"
            >
              Space that feels like home.
            </h2>

            {/* Supporting Copy (Manrope) */}
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed text-balance">
              Choose a furnished apartment that fits your group, your length of stay, and the way
              you want to experience Hyderabad.
            </p>
          </div>

          {/* Desktop Right-Aligned Link */}
          <div className="shrink-0 pt-2 sm:pt-0">
            <a
              href="#rooms"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-brand-gold-hover transition-colors group"
            >
              <span>View All Rooms</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* 3 Featured Room Cards Grid */}
        <div className="mt-10 sm:mt-12 lg:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1 md:[&>*:last-child]:max-w-md md:[&>*:last-child]:w-full md:[&>*:last-child]:mx-auto lg:[&>*:last-child]:max-w-none">
          {FEATURED_ROOMS.map((room) => (
            <article
              key={room.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-[#0B0E10]/95 shadow-xl transition-all duration-300 hover:border-primary/45 hover:bg-[#0B0E10] hover:-translate-y-0.5 focus-within:border-primary/50"
              aria-labelledby={`room-title-${room.id}`}
            >
              {/* 1. Image Area (R2-Ready Structure) */}
              <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden border-b border-border/60 bg-gradient-to-br from-[#111416] via-[#0B0E10] to-[#050708]">
                {room.imageUrl ? (
                  <Image
                    src={room.imageUrl}
                    alt={room.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  // Architectural Luxury Placeholder (Prepared for live R2 storage keys)
                  <div
                    className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5"
                    data-r2-slot={`room-${room.id}`}
                  >
                    {/* Top Row: R2 Badge & Room Type Badge */}
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground/80">
                        The Flatel Suite
                      </span>
                      <Badge
                        variant="outline"
                        className="border-primary/40 bg-[#050708]/80 text-primary text-[10px] font-mono tracking-wider backdrop-blur-xs"
                      >
                        {room.type}
                      </Badge>
                    </div>

                    {/* Center Icon Graphic */}
                    <div className="my-auto text-center z-10 py-3">
                      <div className="h-10 w-10 mx-auto rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center text-primary mb-2 transition-transform duration-300 group-hover:scale-110">
                        <BedDouble className="h-5 w-5" />
                      </div>
                      <p className="font-heading text-sm text-foreground/90 font-light tracking-wide">
                        Furnished Residence
                      </p>
                      <p className="text-[10px] text-muted-foreground/70 font-mono mt-0.5">
                        Cloudflare R2 Media Ready
                      </p>
                    </div>

                    {/* Bottom subtle gradient shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E10] via-transparent to-transparent opacity-60" />
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                  {/* Room Type & Title */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary font-medium">
                      {room.type} Residence
                    </span>
                  </div>

                  <h3
                    id={`room-title-${room.id}`}
                    className="font-heading text-xl sm:text-2xl font-normal text-foreground mt-1.5 tracking-tight group-hover:text-primary transition-colors"
                  >
                    {room.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed mt-2">
                    {room.shortDescription}
                  </p>

                  {/* 5. Guest Capacity */}
                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-secondary/40 px-3 py-2 border border-border/50 text-xs text-foreground/90">
                    <Users className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="font-medium">{room.capacity}</span>
                  </div>

                  {/* 6. Key Amenities (3–4 compact items) */}
                  <div className="mt-4 border-t border-border/50 pt-3.5">
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">
                      Key Amenities
                    </p>
                    <ul className="grid grid-cols-2 gap-2 text-xs text-foreground/80" role="list">
                      {room.amenities.map((item) => {
                        const Icon = item.icon;
                        return (
                          <li key={item.label} className="flex items-center gap-1.5 truncate">
                            <Icon className="h-3 w-3 text-primary shrink-0" />
                            <span className="truncate text-[11px] sm:text-xs">{item.label}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* 7. Price & 8. View Details CTA */}
                <div className="mt-6 border-t border-border/60 pt-4 flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
                      From
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading text-xl sm:text-2xl font-normal text-foreground tracking-tight">
                        {room.pricePerNight}
                      </span>
                      <span className="text-[11px] text-muted-foreground">/ night</span>
                    </div>
                  </div>

                  <Link
                    href={room.href}
                    aria-label={`View Details for ${room.title}`}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "h-10 px-4 rounded-xl border-border/90 bg-secondary/50 hover:bg-primary hover:text-primary-foreground hover:border-primary text-foreground text-xs font-semibold tracking-wide transition-all duration-200 shrink-0"
                    )}
                  >
                    <span>View Details</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
