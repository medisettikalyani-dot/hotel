import * as React from "react";
import {
  MapPin,
  Landmark,
  ShoppingBag,
  Hospital,
  Navigation,
  ExternalLink,
  Compass,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LocationHighlight {
  id: string;
  name: string;
  description: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NEARBY_HIGHLIGHTS: LocationHighlight[] = [
  {
    id: "charminar",
    name: "Charminar",
    description: "Walking distance to one of Hyderabad's most iconic landmarks.",
    tag: "Heritage Monument",
    icon: Landmark,
  },
  {
    id: "laad-bazaar",
    name: "Laad Bazaar",
    description: "Explore traditional shopping and the famous Old City markets.",
    tag: "Bazaars & Crafts",
    icon: ShoppingBag,
  },
  {
    id: "hospitals",
    name: "Nearby Hospitals",
    description:
      "Convenient for guests visiting Princess Durru Shehvar Hospital, Osmania-area healthcare facilities, and Care Hospital.",
    tag: "Medical Access",
    icon: Hospital,
  },
  {
    id: "old-city",
    name: "Old City",
    description: "Easy access to historic landmarks, local food, shopping, and Hyderabad's heritage.",
    tag: "Historic Quarter",
    icon: Compass,
  },
];

interface LocationSectionProps {
  /**
   * Optional Google Maps embed URL for live map integration.
   * If not provided, renders the dark luxury architectural map preview.
   */
  mapEmbedUrl?: string;
}

export function LocationSection({ mapEmbedUrl }: LocationSectionProps) {
  // Google Maps directions search URL for the property's established location
  const directionsUrl =
    "https://www.google.com/maps/search/?api=1&query=Charminar+Hyderabad+Telangana";

  return (
    <section
      id="location"
      className="relative w-full border-t border-border/70 bg-background py-16 sm:py-20 lg:py-24"
      aria-labelledby="location-heading"
    >
      {/* Subtle Ambient Radial Lighting */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(201,168,91,0.04),transparent_75%)]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span className="h-px w-5 sm:w-6 bg-primary" aria-hidden="true" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              The Right Location
            </span>
          </div>

          {/* Main Heading (Cormorant Garamond) */}
          <h2
            id="location-heading"
            className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.18] text-foreground tracking-tight text-balance"
          >
            Stay close to the heart of Hyderabad.
          </h2>

          {/* Supporting Copy (Manrope) */}
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed text-balance">
            Located near Charminar in Hyderabad&apos;s Old City, our furnished apartments put historic
            landmarks, local markets, hospitals, and everyday essentials within convenient reach.
          </p>
        </div>

        {/* ======================================================== */}
        {/* MAIN TWO-COLUMN LAYOUT (Desktop: 42% / 58% Split)         */}
        {/* ======================================================== */}
        <div className="mt-10 sm:mt-12 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* ======================================================== */}
          {/* LEFT COLUMN: Address, Highlights, Editorial (5 Cols)     */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Property Address Card */}
              <div className="rounded-2xl border border-border/80 bg-[#0B0E10]/95 p-4 sm:p-5 shadow-lg">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-xl border border-primary/30 bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-primary">
                        Property Address
                      </span>
                      <p className="text-sm sm:text-base font-medium text-foreground mt-0.5 leading-snug">
                        Near Charminar, Hyderabad, Telangana
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Old City Heritage Quarter
                      </p>
                    </div>
                  </div>
                </div>

                {/* Get Directions Action Button */}
                <div className="mt-4 pt-3.5 border-t border-border/60">
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full h-10 rounded-xl border-border/90 bg-secondary/40 hover:bg-primary hover:text-primary-foreground hover:border-primary text-foreground text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 group"
                    )}
                    aria-label="Get Directions to Flatel Near Charminar on Google Maps"
                  >
                    <Navigation className="h-3.5 w-3.5 text-primary group-hover:text-primary-foreground transition-colors" />
                    <span>Get Directions</span>
                    <ExternalLink className="h-3 w-3 opacity-60 ml-0.5" />
                  </a>
                </div>
              </div>

              {/* Nearby Highlights List */}
              <div className="space-y-2.5">
                <p className="text-[10px] uppercase tracking-wider font-mono font-semibold text-muted-foreground px-1">
                  Nearby Key Access
                </p>

                {NEARBY_HIGHLIGHTS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="group flex items-start gap-3 rounded-xl border border-border/70 bg-[#0B0E10]/80 p-3.5 transition-all duration-200 hover:border-primary/40 hover:bg-[#0B0E10]"
                    >
                      <div className="h-8 w-8 rounded-lg bg-secondary/80 flex items-center justify-center text-primary shrink-0 mt-0.5 group-hover:bg-primary/10 transition-colors">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-xs sm:text-[13px] font-medium text-foreground group-hover:text-primary transition-colors">
                            {item.name}
                          </h3>
                          <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground/80 shrink-0">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Editorial Statement */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs leading-relaxed text-foreground/85">
              <p className="italic font-light">
                &ldquo;From hospital visits to family celebrations and Old City exploration, the location
                keeps the places that matter close to your stay.&rdquo;
              </p>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Map Container (7 Cols)                     */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-[320px] sm:h-[400px] lg:h-full min-h-[340px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-border/80 bg-[#0B0E10] shadow-2xl flex flex-col justify-between">
              {mapEmbedUrl ? (
                // Future Google Maps Embed Container
                <iframe
                  title="Flatel Property Location Map"
                  src={mapEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                // Premium Dark Architectural Map Preview (Ready for future embed)
                <div
                  className="relative inset-0 w-full h-full flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-br from-[#0B0E10] via-[#111416] to-[#050708]"
                  data-slot="map-preview"
                >
                  {/* Subtle Cartographic Contour / Grid Pattern */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#F2EEE6_1px,transparent_1px),linear-gradient(to_right,#F2EEE6_1px,transparent_1px),linear-gradient(to_bottom,#F2EEE6_1px,transparent_1px)] [background-size:2.5rem_2.5rem]"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,91,0.08),transparent_65%)]"
                    aria-hidden="true"
                  />

                  {/* Top Map Header Strip */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <Badge
                      variant="outline"
                      className="border-primary/40 bg-[#050708]/85 text-primary text-[10px] font-mono tracking-wider backdrop-blur-xs"
                    >
                      MAP PREVIEW
                    </Badge>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/80">
                      Charminar Sector
                    </span>
                  </div>

                  {/* Central Property Beacon Marker */}
                  <div className="relative z-10 my-auto text-center py-6">
                    <div className="relative inline-flex items-center justify-center mb-3">
                      <span className="absolute h-14 w-14 rounded-full bg-primary/20 animate-ping" />
                      <span className="absolute h-10 w-10 rounded-full bg-primary/30" />
                      <div className="relative h-11 w-11 rounded-full border-2 border-primary bg-[#050708] text-primary flex items-center justify-center shadow-2xl">
                        <MapPin className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="inline-block rounded-xl border border-primary/30 bg-[#050708]/90 px-4 py-2 backdrop-blur-md shadow-xl">
                      <p className="font-heading text-base sm:text-lg text-foreground font-normal tracking-wide">
                        Flatel Serviced Residences
                      </p>
                      <p className="text-[11px] text-primary/90 font-mono mt-0.5">
                        Near Charminar, Hyderabad
                      </p>
                    </div>

                    {/* Nearby Proximity Landmarks on the Map */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-sm mx-auto text-[11px]">
                      <span className="rounded-lg border border-border/60 bg-[#0B0E10]/80 px-2.5 py-1 text-muted-foreground">
                        🏛️ Charminar
                      </span>
                      <span className="rounded-lg border border-border/60 bg-[#0B0E10]/80 px-2.5 py-1 text-muted-foreground">
                        🛍️ Laad Bazaar
                      </span>
                      <span className="rounded-lg border border-border/60 bg-[#0B0E10]/80 px-2.5 py-1 text-muted-foreground">
                        🏥 Princess Durru Shehvar
                      </span>
                    </div>
                  </div>

                  {/* Bottom Map Status Strip */}
                  <div className="relative z-10 pt-3 border-t border-border/60 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                    <span>Telangana • 500002</span>
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      <span>Open Live Map</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
