import * as React from "react";
import { HeartPulse, Compass, UsersRound, Check, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PurposeStayItem {
  id: string;
  index: string;
  label: string;
  title: string;
  shortDescription: string;
  benefits: string[];
  cta: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PURPOSE_STAYS: PurposeStayItem[] = [
  {
    id: "medical",
    index: "01",
    label: "Healthcare",
    title: "Medical Stay",
    shortDescription:
      "Comfortable furnished accommodation for patients, attendants, and families visiting nearby hospitals.",
    benefits: [
      "Wheelchair-friendly / easy access",
      "Hospital pickup support",
      "Attendant-friendly accommodation",
      "Furnished kitchen for patient meals",
    ],
    cta: "Explore Medical Stay",
    href: "#medical-stay",
    icon: HeartPulse,
  },
  {
    id: "tourism",
    index: "02",
    label: "Heritage",
    title: "Tourism & Leisure",
    shortDescription:
      "Stay close to Charminar, historic landmarks, local markets, and the culture of Hyderabad’s Old City.",
    benefits: [
      "Close to Charminar",
      "Guided shopping / local support",
      "Comfortable furnished apartment",
      "Easy access to Old City attractions",
    ],
    cta: "Explore Leisure Stay",
    href: "#leisure-stay",
    icon: Compass,
  },
  {
    id: "family",
    index: "03",
    label: "Extended",
    title: "Family Stay",
    shortDescription:
      "Spacious furnished apartments designed for families who prefer staying together instead of booking separate hotel rooms.",
    benefits: [
      "Spacious 1 BHK / 2 BHK / 3 BHK options",
      "Fully furnished living",
      "Kitchen for family meals",
      "Lift access",
    ],
    cta: "Explore Family Stay",
    href: "#family-stay",
    icon: UsersRound,
  },
];

export function PurposeStays() {
  return (
    <section
      id="purposes"
      className="relative w-full border-t border-border/70 bg-background py-16 sm:py-20 lg:py-24"
      aria-labelledby="purpose-stays-heading"
    >
      {/* Subtle Atmospheric Glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(201,168,91,0.04),transparent_75%)]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
            <span className="h-px w-5 sm:w-6 bg-primary" aria-hidden="true" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-primary">
              Stay With Purpose
            </span>
          </div>

          {/* Main Heading (Cormorant Garamond) */}
          <h2
            id="purpose-stays-heading"
            className="font-heading text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.18] text-foreground tracking-tight text-balance"
          >
            Designed around the reason you’re here.
          </h2>

          {/* Supporting Copy (Manrope) */}
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed text-balance">
            Whether you’re visiting for medical care, exploring Hyderabad, or staying together with
            family, our furnished apartments give you the space and everyday comforts of home.
          </p>
        </div>

        {/* 3 Premium Purpose Cards Grid */}
        <div className="mt-10 sm:mt-12 lg:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1 md:[&>*:last-child]:max-w-md md:[&>*:last-child]:w-full md:[&>*:last-child]:mx-auto lg:[&>*:last-child]:max-w-none">
          {PURPOSE_STAYS.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-[#0B0E10]/95 p-5 sm:p-6 lg:p-7 transition-all duration-300 hover:border-primary/45 hover:bg-[#0B0E10] hover:-translate-y-0.5 focus-within:border-primary/50"
                aria-labelledby={`card-title-${card.id}`}
              >
                <div>
                  {/* Top Header: Icon + Index Numeral / Label */}
                  <div className="flex items-start justify-between pb-4 border-b border-border/60">
                    <div
                      className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl border border-border/80 bg-secondary/70 flex items-center justify-center text-primary group-hover:border-primary/40 group-hover:bg-primary/10 transition-colors"
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-heading text-base sm:text-lg font-light text-primary/70 group-hover:text-primary transition-colors">
                        {card.index}
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-muted-foreground mt-0.5">
                        {card.label}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3
                    id={`card-title-${card.id}`}
                    className="font-heading text-xl sm:text-2xl font-normal text-foreground mt-4 sm:mt-5 tracking-tight group-hover:text-primary transition-colors"
                  >
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed mt-2">
                    {card.shortDescription}
                  </p>

                  {/* Benefit Points */}
                  <div className="my-5 border-t border-border/60 pt-4">
                    <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-3">
                      Key Highlights
                    </p>
                    <ul className="space-y-2.5" role="list">
                      {card.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-start gap-2 text-xs sm:text-[13px] text-foreground/85 leading-snug"
                        >
                          <span
                            className="h-4 w-4 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5 text-primary"
                            aria-hidden="true"
                          >
                            <Check className="h-2.5 w-2.5" />
                          </span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Action */}
                <div className="mt-4 pt-3 border-t border-border/50">
                  <a
                    href={card.href}
                    aria-label={`${card.cta} for ${card.title}`}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full h-11 rounded-xl border-border/90 bg-secondary/40 hover:bg-primary hover:text-primary-foreground hover:border-primary text-foreground text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                    )}
                  >
                    <span>{card.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-primary group-hover/btn:text-primary-foreground group-hover/btn:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
