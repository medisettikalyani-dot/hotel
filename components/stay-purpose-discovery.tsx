"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Stethoscope,
  Heart,
  Users,
  Compass,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  MapPin,
  X,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface PurposeCategoryData {
  id: "medical" | "wedding" | "family" | "tourism" | "corporate";
  title: string;
  badge: string;
  shortDesc: string;
  howFlatelHelps: string;
  imageUrl: string;
  icon: React.ComponentType<{ className?: string }>;
  highlights: string[];
  serviceGroups: {
    groupTitle: string;
    groupDesc: string;
    items: {
      name: string;
      description: string;
      isFree: boolean;
      price?: number;
      priceUnit?: string;
      isRequestRequired?: boolean;
      disclaimer?: string;
      isDestination?: boolean;
      destinationDetails?: {
        distance: string;
        timing: string;
        insiderTip: string;
      };
    }[];
  }[];
}

export const STAY_PURPOSES: PurposeCategoryData[] = [
  {
    id: "medical",
    title: "Medistay — Hospital & Medical",
    badge: "HEALTHCARE CARE & ASSISTANCE",
    shortDesc:
      "Dedicated accommodation for patients, attendants, and doctors visiting Hyderabad's premier hospitals.",
    howFlatelHelps:
      "Eliminate hotel stress with sanitized clinical setups, wheelchair accessibility, in-flat patient kitchens, and 24/7 hospital liaison.",
    imageUrl: "/images/experiences/medistay-suite.jpg",
    icon: Stethoscope,
    highlights: ["14 Complimentary Care Inclusions", "Ambulance Liaison", "Diet Kitchen"],
    serviceGroups: [
      {
        groupTitle: "1. Hospital Planning & Travel Support",
        groupDesc: "Zero-stress coordination between your flat and medical centres.",
        items: [
          {
            name: "Hospital & Doctor Appointments Assistance",
            description: "Logistics liaison to schedule and confirm doctor visits at Apollo, KIMS, Owaisi, AIG & Princess Esra.",
            isFree: true,
            isRequestRequired: true,
          },
          {
            name: "Hospital Travel Distance & Route Timing",
            description: "Curated 5 to 20 minute transit maps and real-time traffic bypass routes.",
            isFree: true,
            isRequestRequired: false,
          },
          {
            name: "24/7 Emergency Ambulance Coordination Desk",
            description: "Direct on-call dispatch link with licensed cardiac and BLS ambulance teams.",
            isFree: true,
            disclaimer: "Ambulance coordination is complimentary; third-party transit charges apply if booked.",
            isRequestRequired: true,
          },
          {
            name: "Pharmacy Flatel Express Delivery",
            description: "Doorstep delivery of verified prescribed medications directly to your suite.",
            isFree: true,
            disclaimer: "Delivery service is free; medicine pharmacy invoice is paid by the guest.",
            isRequestRequired: true,
          },
        ],
      },
      {
        groupTitle: "2. In-Flat Equipment & Comfort Setup",
        groupDesc: "Sanitized clinical recovery equipment provided inside your flat.",
        items: [
          {
            name: "Wheelchair Assistance & Lift Ramp Access",
            description: "Smooth barrier-free entrance and on-site mobility equipment.",
            isFree: true,
            isRequestRequired: true,
          },
          {
            name: "Hospital Bed Setup in Master Suite",
            description: "Specialized clinical recovery bed setup configured before check-in.",
            isFree: true,
            isRequestRequired: true,
          },
          {
            name: "IV Glucose Stand & Vital Monitors",
            description: "In-room IV pole, digital glucometer, BP monitor, and pulse oximeter for daily tracking.",
            isFree: true,
            isRequestRequired: false,
          },
          {
            name: "First-Aid Emergency Kit & Relaxation Massagers",
            description: "Full emergency kit in-room with leg and hand recovery massagers available.",
            isFree: true,
            isRequestRequired: false,
          },
          {
            name: "Deep Disinfection & Sanitized Housekeeping",
            description: "Hospital-grade sanitizer deep cleaning performed before arrival and on alternate days.",
            isFree: true,
            isRequestRequired: false,
          },
        ],
      },
      {
        groupTitle: "3. Guest Assistance & Optional Specialized Care",
        groupDesc: "Transparent on-demand medical care and logistical add-ons.",
        items: [
          {
            name: "24/7 Dedicated Concierge Care Desk",
            description: "Round-the-clock on-site staff available for patient attendant queries.",
            isFree: true,
            isRequestRequired: false,
          },
          {
            name: "Dedicated Doctor / Nurse Home Visits",
            description: "Scheduled on-site clinical consultation and wound dressing support in your suite.",
            isFree: false,
            price: 1500,
            priceUnit: "per visit",
          },
          {
            name: "Oxygen Concentrator / Cylinder Setup",
            description: "Medical-grade oxygen concentrator setup coordinated with verified certified suppliers.",
            isFree: false,
            price: 2500,
            priceUnit: "per booking",
          },
          {
            name: "Diet-Specific Patient Meal Preparation",
            description: "Tailored homestyle clinical diet prepared fresh daily according to physician instructions.",
            isFree: false,
            price: 600,
            priceUnit: "per night",
          },
          {
            name: "Chauffeur-Driven Hospital Cab Transfer",
            description: "Air-conditioned sanitized vehicle with verified driver for clinic and OPD follow-ups.",
            isFree: false,
            price: 800,
            priceUnit: "per booking",
          },
          {
            name: "Priority Check-In & Check-Out Window",
            description: "Immediate arrival suite readiness without front-desk delays for fragile patients.",
            isFree: false,
            price: 500,
            priceUnit: "per booking",
          },
        ],
      },
    ],
  },
  {
    id: "wedding",
    title: "Wedding Stay — Wedding Guests & Events",
    badge: "FAMILY CELEBRATIONS & BESPOKE WEDDING",
    shortDesc:
      "Spacious multi-bedroom suites, group guest check-in, and turnkey concierge for Hyderabad weddings.",
    howFlatelHelps:
      "House entire family clans comfortably together under one roof, while our wedding liaison assists with venue, attire, catering, and guest logistics.",
    imageUrl: "/images/wedding/flatel-royal-wedding.jpg",
    icon: Heart,
    highlights: ["Group Check-In Coordination", "Garment Steamer & Vanity", "Turnkey Concierge"],
    serviceGroups: [
      {
        groupTitle: "1. Wedding Accommodation & Guest Conveniences",
        groupDesc: "Effortless group living and wedding morning readiness.",
        items: [
          {
            name: "Wedding Guest Group Check-In & Luggage Handling",
            description: "Pre-coordinated key handovers and porter luggage assistance for extended family arrivals.",
            isFree: true,
            isRequestRequired: true,
          },
          {
            name: "Heavy Garment Steamer & Full Vanity Setup",
            description: "Professional high-wattage clothes steamer and illuminated vanity space for bridal attire.",
            isFree: true,
            isRequestRequired: false,
          },
          {
            name: "Equipped Kitchen for Large Family Reheating & Chai",
            description: "Full gas stove, double-door fridge, and tea essentials to serve visiting relatives anytime.",
            isFree: true,
            isRequestRequired: false,
          },
          {
            name: "Extra Floor Mattress / Rollaway Bed",
            description: "Premium floor mattress with clean cotton sheets, hotel pillow, and fresh duvet.",
            isFree: false,
            price: 500,
            priceUnit: "per night",
          },
        ],
      },
      {
        groupTitle: "2. Event Venue & Invitation Coordination",
        groupDesc: "Direct assistance with Hyderabad's top function halls and stationery.",
        items: [
          {
            name: "Event Venue Booking & Rate Liaison",
            description: "Shortlisting, date reservation, and rate negotiation for premier Banquet & Convention Halls.",
            isFree: false,
            price: 2500,
            priceUnit: "per booking",
          },
          {
            name: "Wedding Card Printing & Digital Invitations Liaison",
            description: "Custom Urdu/English calligraphy text framing, gold-foil card printing, and digital video invites.",
            isFree: false,
            price: 1200,
            priceUnit: "per booking",
          },
        ],
      },
      {
        groupTitle: "3. Bridal & Groom Preparation",
        groupDesc: "Authentic Hyderabadi artisan styling and boutique tailoring.",
        items: [
          {
            name: "Bride's Khada Dupatta & Zardozi Attire Coordination",
            description: "Boutique fabric selection, custom zardozi embroidery coordination, and master tailoring fittings.",
            isFree: false,
            price: 1500,
            priceUnit: "per booking",
          },
          {
            name: "Groom's Sherwani & Traditional Styling Liaison",
            description: "Fabric selection and tailored cut for groom sherwanis, saafa tying, and formal Nizami accessories.",
            isFree: false,
            price: 1500,
            priceUnit: "per booking",
          },
          {
            name: "Professional Bridal Makeup Artist & Hair Styling",
            description: "Top certified wedding artist coordinating trial and event day makeup, hair, and dupatta draping.",
            isFree: false,
            price: 2500,
            priceUnit: "per booking",
          },
        ],
      },
      {
        groupTitle: "4. Catering, Decor & Luxury Transportation",
        groupDesc: "Authentic Hyderabadi feast management and luxury transport fleet.",
        items: [
          {
            name: "Stage, Floral & Suite Decoration Services",
            description: "Elegant fresh floral stage decor, backdrop styling, and celebratory suite arrangements.",
            isFree: false,
            price: 4000,
            priceUnit: "per booking",
          },
          {
            name: "Luxury Wedding Fleet Arrangement (Mercedes / Audi / Innova)",
            description: "Chauffeured luxury cars for groom arrival and decorated convoy vehicles for family transit.",
            isFree: false,
            price: 3500,
            priceUnit: "per booking",
          },
          {
            name: "Candid Wedding Photography & Drone Coverage Liaison",
            description: "Professional candid photography crew, cinematic highlight reels, and digital album delivery.",
            isFree: false,
            price: 3500,
            priceUnit: "per booking",
          },
        ],
      },
    ],
  },
  {
    id: "family",
    title: "Family Vacation & Long Stay",
    badge: "HOMESTYLE RESIDENCES & EXTENDED STAYS",
    shortDesc:
      "Spacious multi-bedroom furnished flats with full private modular kitchens and duration discounts.",
    howFlatelHelps:
      "Experience the comfort of a true home with infant baby cots, kids indoor games, home-cooked food essentials, and savings up to 25% on weekly/monthly stays.",
    imageUrl: "/images/flats/flat-3bhk-luxury.jpg",
    icon: Users,
    highlights: ["Full Modular Kitchen", "Baby Cot & High Chair", "Up to 25% Off Stays"],
    serviceGroups: [
      {
        groupTitle: "1. In-Flat Family Comforts (Complimentary)",
        groupDesc: "Included automatically with every family residence booking.",
        items: [
          {
            name: "Infant Baby Cot & High Chair Setup",
            description: "Safety-tested baby crib with clean mattress, breathable bedding, and dining booster chair.",
            isFree: true,
            isRequestRequired: true,
          },
          {
            name: "Fully Equipped Modular Kitchen with Gas Stove",
            description: "Double-door refrigerator, RO water purifier, microwave, rice cooker, toaster, mixer & basic spices.",
            isFree: true,
            isRequestRequired: false,
          },
          {
            name: "Family Indoor Games & Kids Sports Kit",
            description: "Carrom board, chess, snakes & ladders, plus outdoor badminton and football kits for kids.",
            isFree: true,
            isRequestRequired: false,
          },
          {
            name: "Alternate-Day Housekeeping & Linen Care",
            description: "Comprehensive flat cleaning, trash disposal, and fresh linen rotation throughout your stay.",
            isFree: true,
            isRequestRequired: false,
          },
          {
            name: "Smart TV with Premium Streaming",
            description: "High-definition smart screen with pre-loaded entertainment apps and high-speed Wi-Fi.",
            isFree: true,
            isRequestRequired: false,
          },
        ],
      },
      {
        groupTitle: "2. Convenience & Extended Stay Services",
        groupDesc: "Optional services to make longer family holidays effortless.",
        items: [
          {
            name: "Extra Floor Mattress / Rollaway Bed",
            description: "Comfortable floor mattress with crisp sheets, duvet, and hotel pillow.",
            isFree: false,
            price: 500,
            priceUnit: "per night",
          },
          {
            name: "Grocery Pre-Stocking Prior to Check-In",
            description: "Your personalized grocery checklist (milk, fruits, vegetables, snacks) stocked before arrival.",
            isFree: false,
            price: 350,
            priceUnit: "per booking",
            disclaimer: "Service fee ₹350; retail store grocery bill paid on arrival.",
          },
          {
            name: "Private Home Cook for Family Meals",
            description: "Dedicated cook preparing breakfast, lunch, and dinner to your family's personal taste.",
            isFree: false,
            price: 1200,
            priceUnit: "per night",
          },
          {
            name: "Full-Day Sightseeing Innova / Tempo Traveler Booking",
            description: "Spacious 7-seater or 12-seater AC vehicle with local driver for multi-generational day trips.",
            isFree: false,
            price: 4500,
            priceUnit: "per booking",
          },
        ],
      },
    ],
  },
  {
    id: "tourism",
    title: "Wanderer — Tourism & Heritage",
    badge: "OLD CITY VICINITY & ROYAL HERITAGE",
    shortDesc:
      "Prime Old City base located near Charminar, Chowmahalla Palace, Mecca Masjid, and bustling bazaars.",
    howFlatelHelps:
      "Stay in the heart of Hyderabad's historic precinct with verified destination guides, chauffeured sightseeing cabs, and private airport transfers.",
    imageUrl: "/images/experiences/wanderer-charminar.jpg",
    icon: Compass,
    highlights: ["10 Min to Charminar", "Curated Itinerary Pack", "Chauffeured Cabs"],
    serviceGroups: [
      {
        groupTitle: "1. Places to Visit (Informational Heritage Guide)",
        groupDesc: "Must-visit Hyderabad landmarks curated by Flatel concierges.",
        items: [
          {
            name: "Charminar & Mecca Masjid",
            description: "Global iconic 16th-century four-minaret monument and majestic granite grand mosque.",
            isFree: true,
            isDestination: true,
            destinationDetails: {
              distance: "10-15 mins from Moghal Pura branch",
              timing: "Open daily 9:00 AM – 5:30 PM (Night illumination until 9 PM)",
              insiderTip: "Best photographed during sunset; enjoy authentic Irani chai right beside the arches.",
            },
          },
          {
            name: "Chowmahalla Palace",
            description: "Seat of the Asaf Jahi Nizams featuring Khilwat durbar hall, 19 crystal chandeliers & 1912 Rolls Royce.",
            isFree: true,
            isDestination: true,
            destinationDetails: {
              distance: "12 mins from Moghal Pura branch",
              timing: "Open 10:00 AM – 5:00 PM (Closed on Fridays)",
              insiderTip: "UNESCO-awarded restoration; explore the vintage carriage museum in the southern courtyard.",
            },
          },
          {
            name: "Golconda Fort & Qutb Shahi Tombs",
            description: "Medieval acoustic citadel fortress and the royal necropolis of Qutb Shahi kings.",
            isFree: true,
            isDestination: true,
            destinationDetails: {
              distance: "25-30 mins drive via inner ring road",
              timing: "Open daily 9:00 AM – 5:30 PM (Sound & Light show in evening)",
              insiderTip: "Clap at the entry portico to test the acoustic amplification echoing 1 km away.",
            },
          },
          {
            name: "Salar Jung Museum & Purani Haveli",
            description: "World's largest 1-man antique collection with the Veiled Rebecca and Nizam's 240-foot wardrobe.",
            isFree: true,
            isDestination: true,
            destinationDetails: {
              distance: "15 mins from Flatel residences",
              timing: "Open 10:00 AM – 5:00 PM (Closed on Fridays)",
              insiderTip: "Gather in the central courtyard 5 minutes before the hour to watch the antique British musical clock chime.",
            },
          },
          {
            name: "Laad Bazaar (Choodi Bazaar)",
            description: "Historic glittering lane along Charminar famous for lacquer bangles, Basra pearls, and ittar.",
            isFree: true,
            isDestination: true,
            destinationDetails: {
              distance: "Walking distance from Charminar",
              timing: "Best visited between 5:00 PM and 10:00 PM",
              insiderTip: "Bargaining is expected; ideal place to buy authentic lacquer bangles hand-studded with stones.",
            },
          },
        ],
      },
      {
        groupTitle: "2. Bookable Transport, Local Guides & Concierge",
        groupDesc: "Transparent services to make your city sightseeing comfortable.",
        items: [
          {
            name: "Detailed Monument Guide & Custom Itinerary Pack",
            description: "Complimentary digital travel pack with monument holiday timetables and crowd-avoidance cheat sheets.",
            isFree: true,
            isRequestRequired: false,
          },
          {
            name: "24/7 Local Concierge & Luggage Storage Desk",
            description: "Luggage holding before check-in or after check-out, plus insider food trail recommendations.",
            isFree: true,
            isRequestRequired: false,
          },
          {
            name: "Airport Pick-up & Drop (Private AC Sedan / MPV)",
            description: "Flight-tracked private airport transit between RGIA Shamshabad and your Flatel suite.",
            isFree: false,
            price: 1200,
            priceUnit: "per transfer",
          },
          {
            name: "Chauffeur-Driven Full-Day Sightseeing Sedan / SUV",
            description: "Dedicated private car with police-verified local driver on standby (8 Hours / 80 Km).",
            isFree: false,
            price: 3000,
            priceUnit: "per booking",
          },
          {
            name: "Expert Multilingual Local Heritage Guide",
            description: "Certified historian guide for Charminar, Golconda Fort, and museums (3-hour guided walk).",
            isFree: false,
            price: 1500,
            priceUnit: "per tour",
          },
          {
            name: "Full-Day Professional Photography & Reel Shoot",
            description: "Dedicated portrait photographer capturing candid vacation photos against palace backdrops.",
            isFree: false,
            price: 2500,
            priceUnit: "per booking",
          },
          {
            name: "Authentic Hyderabadi Breakfast Hamper",
            description: "Fresh daily Irani chai, Osmania biscuits, and traditional breakfast delivered hot to your suite.",
            isFree: false,
            price: 450,
            priceUnit: "per night",
          },
        ],
      },
    ],
  },
  {
    id: "corporate",
    title: "Corporate & Executive Stay",
    badge: "WORK-READY LIVING & CORPORATE TRAVEL",
    shortDesc:
      "Modern executive serviced apartments for corporate executives, IT consultants, and remote founders.",
    howFlatelHelps:
      "Stay focused with dedicated high-speed enterprise Wi-Fi, ergonomic work desks, silent work guarantees, and automated corporate GST invoices.",
    imageUrl: "/images/experiences/desk-cand1.jpg",
    icon: Briefcase,
    highlights: ["Dedicated Work Desk", "High-Speed Enterprise Wi-Fi", "Automated GST Invoice"],
    serviceGroups: [
      {
        groupTitle: "1. Dedicated Workspace & Productivity (Complimentary)",
        groupDesc: "Essential business conveniences included automatically.",
        items: [
          {
            name: "High-Speed Dedicated Enterprise Wi-Fi",
            description: "High-bandwidth fiber internet connection optimized for seamless video calls and heavy uploads.",
            isFree: true,
            isRequestRequired: false,
          },
          {
            name: "Ergonomic Work Desk & Laptop Table",
            description: "Dedicated workstation with comfortable chair, laptop risers, and natural task lighting.",
            isFree: true,
            isRequestRequired: false,
          },
          {
            name: "Universal Fast Charger & Multi-Plug Extension",
            description: "Surge-protected multi-socket strip compatible with international plugs, Type-C, and Apple devices.",
            isFree: true,
            isRequestRequired: false,
          },
          {
            name: "Automated GST Invoice & Corporate Tax Receipt",
            description: "Official tax invoices generated with your company name, GSTIN, and corporate billing details.",
            isFree: true,
            isRequestRequired: false,
          },
          {
            name: "Silent Workspace & Inverter Power Backup Guarantee",
            description: "Continuous 24/7 power backup with zero dropouts for routers and work equipment.",
            isFree: true,
            isRequestRequired: false,
          },
        ],
      },
      {
        groupTitle: "2. Business Logistics & Executive Add-Ons",
        groupDesc: "Optional professional conveniences for traveling business leaders.",
        items: [
          {
            name: "Airport Express Chauffeur Transfer",
            description: "Executive sedan with flight tracking, punctuality guarantee, and quiet cabin.",
            isFree: false,
            price: 1200,
            priceUnit: "per transfer",
          },
          {
            name: "Same-Day Express Laundry & Ironing",
            description: "Suit, blazer, formal shirts, and trousers dry-cleaned and returned pressed within 8 hours.",
            isFree: false,
            price: 500,
            priceUnit: "per booking",
          },
          {
            name: "Healthy Executive Meal Subscription",
            description: "Nutritious, low-oil homestyle lunches and dinners prepared fresh and delivered to your suite.",
            isFree: false,
            price: 750,
            priceUnit: "per night",
          },
          {
            name: "Flexible Early Check-In / Late Check-Out Window",
            description: "Accommodates early morning red-eye flight landings or evening departures without waiting.",
            isFree: false,
            price: 500,
            priceUnit: "per booking",
          },
        ],
      },
    ],
  },
];

interface StayPurposeDiscoveryProps {
  className?: string;
}

export function StayPurposeDiscovery({ className }: StayPurposeDiscoveryProps) {
  const [selectedPurpose, setSelectedPurpose] = React.useState<PurposeCategoryData | null>(null);

  // Close modal on escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPurpose(null);
    };
    if (selectedPurpose) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPurpose]);

  return (
    <section
      id="stay-purposes"
      className={cn(
        "relative w-full bg-[#121316] text-[#F5F5F7] py-16 sm:py-20 lg:py-24 border-t border-[#262835] scroll-mt-16",
        className
      )}
      aria-labelledby="stay-purposes-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[11px] font-sans font-bold tracking-[0.25em] text-[#D4AF37] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            TAILORED HOSPITALITY FOR EVERY VISIT
          </div>
          <h2
            id="stay-purposes-heading"
            className="font-heading text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white"
          >
            Stay With Purpose: <span className="text-[#D4AF37]">Curated Care &amp; Services</span>
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm md:text-base text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
            The flat is your primary accommodation. Choose your reason for visiting Hyderabad to discover
            complimentary care automatically included with your stay, plus verified specialized services.
          </p>
        </div>

        {/* 5 Distinct Purpose Cards (Grid Layout: 3 on top, 2 centered or 5-column responsive) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STAY_PURPOSES.map((purpose, index) => {
            const Icon = purpose.icon;
            return (
              <div
                key={purpose.id}
                className={cn(
                  "group relative flex flex-col justify-between rounded-2xl overflow-hidden bg-[#181A22] border border-[#2E3038] hover:border-[#D4AF37] hover:shadow-[0_16px_36px_rgba(212,175,55,0.14)] hover:-translate-y-1 transition-all duration-300",
                  index === 3 ? "lg:col-span-1 md:col-span-1" : "",
                  index === 4 ? "lg:col-span-2 md:col-span-2 lg:w-2/3 lg:mx-auto" : ""
                )}
              >
                {/* Visual Image Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0E1015]">
                  <Image
                    src={purpose.imageUrl}
                    alt={purpose.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181A22] via-[#181A22]/40 to-transparent" />

                  {/* Corner Badge */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#121316]/85 backdrop-blur-md border border-[#D4AF37]/40 text-[10px] font-bold text-[#E5B54F]">
                    <Icon className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{purpose.badge}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                      {purpose.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed line-clamp-2">
                      {purpose.shortDesc}
                    </p>

                    {/* How FLATEL helps banner */}
                    <div className="mt-3.5 p-3 rounded-xl bg-[#121316]/70 border border-white/5 text-[11px] sm:text-xs text-[#C5C7D0]">
                      <span className="text-[#D4AF37] font-semibold block mb-0.5">How FLATEL Helps:</span>
                      {purpose.howFlatelHelps}
                    </div>

                    {/* Highlight Pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {purpose.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-[#E0E2EC]"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="mt-6 pt-4 border-t border-[#262835] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedPurpose(purpose)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#121316] text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer"
                    >
                      <span>Explore Services</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <Link
                      href={`/#flats?purpose=${purpose.id}`}
                      className="inline-flex items-center gap-1.5 text-xs text-[#A1A1AA] hover:text-white transition-colors"
                    >
                      <span>Browse Flats</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* DEDICATED PURPOSE DETAIL DRAWER / MODAL                              */}
      {/* ==================================================================== */}
      {selectedPurpose && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="purpose-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#161822] border border-[#2E3038] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative px-6 py-5 border-b border-[#262835] bg-[#121316] flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                  <selectedPurpose.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">
                      {selectedPurpose.badge}
                    </span>
                  </div>
                  <h3 id="purpose-modal-title" className="font-heading text-xl sm:text-2xl font-bold text-white">
                    {selectedPurpose.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPurpose(null)}
                className="p-2 rounded-full text-[#A1A1AA] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Organized Service Groups */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* How Flatel Helps banner */}
              <div className="p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 text-xs sm:text-sm text-[#F5F5F7]">
                <strong className="text-[#D4AF37] block font-semibold mb-1">
                  How FLATEL Serviced Living Solves This Stay:
                </strong>
                <p className="text-[#C5C7D0] leading-relaxed">{selectedPurpose.howFlatelHelps}</p>
              </div>

              {selectedPurpose.serviceGroups.map((group, groupIdx) => (
                <div key={groupIdx} className="space-y-3.5">
                  <div className="border-b border-[#262835] pb-2">
                    <h4 className="font-heading text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      {group.groupTitle}
                    </h4>
                    <p className="text-xs text-[#A1A1AA] mt-0.5">{group.groupDesc}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {group.items.map((item, itemIdx) => {
                      if (item.isDestination && item.destinationDetails) {
                        return (
                          <div
                            key={itemIdx}
                            className="p-4 rounded-xl bg-[#121316] border border-[#2E3038] space-y-2 hover:border-[#D4AF37]/40 transition-colors md:col-span-2"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-500/15 border border-sky-500/30 text-sky-300 uppercase mb-1">
                                  Heritage Destination · City Guide
                                </span>
                                <h5 className="font-semibold text-sm text-white">{item.name}</h5>
                              </div>
                              <span className="text-[11px] text-[#A1A1AA] flex items-center gap-1 shrink-0">
                                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                                {item.destinationDetails.distance}
                              </span>
                            </div>
                            <p className="text-xs text-[#A1A1AA] leading-relaxed">{item.description}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px]">
                              <div className="text-[#C5C7D0]">
                                <span className="text-[#8E909B] font-medium block">Timings:</span>
                                {item.destinationDetails.timing}
                              </div>
                              <div className="text-[#C5C7D0]">
                                <span className="text-[#D4AF37] font-medium block">Insider Advice:</span>
                                {item.destinationDetails.insiderTip}
                              </div>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={itemIdx}
                          className="p-3.5 rounded-xl bg-[#121316] border border-[#2E3038] hover:border-white/20 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <h5 className="font-semibold text-xs sm:text-sm text-white">{item.name}</h5>
                              {item.isFree ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
                                  <BadgeCheck className="w-3 h-3" />
                                  INCLUDED (₹0)
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37]/15 border border-[#D4AF37]/35 text-[#E5B54F] shrink-0">
                                  {typeof item.price === "number" ? `+₹${item.price.toLocaleString("en-IN")}` : "ON REQUEST"}
                                  {item.priceUnit ? ` / ${item.priceUnit}` : ""}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-[#A1A1AA] leading-relaxed">{item.description}</p>
                          </div>

                          {item.disclaimer && (
                            <p className="mt-2 text-[10px] text-[#8E909B] italic border-t border-white/5 pt-1.5">
                              Note: {item.disclaimer}
                            </p>
                          )}

                          {item.isFree && item.isRequestRequired && (
                            <span className="mt-2 text-[10px] text-amber-300/80 font-medium">
                              * Available on advance request during booking
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer: Action Bridge into Flats Booking */}
            <div className="px-6 py-4 border-t border-[#262835] bg-[#121316] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-[#A1A1AA] text-center sm:text-left">
                Included services are provided at <span className="text-emerald-400 font-semibold">₹0 extra</span>. Paid add-ons can be bundled on flat detail.
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedPurpose(null)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-xs text-[#C5C7D0] transition-colors cursor-pointer"
                >
                  Close
                </button>

                <Link
                  href={`/#flats?purpose=${selectedPurpose.id}`}
                  onClick={() => setSelectedPurpose(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  <span>Book a Flat for this Stay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
