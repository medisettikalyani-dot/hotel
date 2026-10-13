"use client";

import * as React from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Phone,
  CheckCircle2,
  X,
  HeartHandshake,
  Compass,
  Stethoscope,
  Heart,
  MapPin,
  Clock,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WHATSAPP_CONFIG } from "@/lib/constants";

export interface ShowcaseItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  desc: string;
  detailedDesc: string;
  badge: string;
  categoryGroup: "medical" | "wedding" | "tourism";
  filterCategory: string;
  imageUrl: string;
  inclusions: string[];
}

export type MedicalCareItem = ShowcaseItem;

/**
 * 19 Official Hospital, Doctor & Guest Wellness Inclusions
 * Directly mapped from the Flatel Hospital & Wellness Official Care Chart
 */
export const MEDICAL_CARE_ITEMS: ShowcaseItem[] = [
  {
    id: "m01",
    number: "01",
    title: "Hospital & Doctor Appointments Assistance",
    shortTitle: "Doctor Appointments",
    desc: "Logistics, scheduling & doctor liaison",
    detailedDesc:
      "Dedicated concierge support to coordinate, schedule, and verify consultation appointments with leading doctors and super-specialists across Hyderabad's premier hospitals.",
    badge: "FREE",
    categoryGroup: "medical",
    filterCategory: "free",
    imageUrl: "/images/medical/01-doctor-appointment.jpg",
    inclusions: [
      "Scheduling with top Apollo, AIG, KIMS, Owaisi & Yashoda specialists",
      "Direct consultation time coordination & OPD pass management",
      "Assistance with digital medical reports filing",
    ],
  },
  {
    id: "m02",
    number: "02",
    title: "Hospital | Travel Distance & Route Timing",
    shortTitle: "Hospital Routes & Timing",
    desc: "Proximity mapping & quickest route estimates",
    detailedDesc:
      "Precision route mapping and real-time traffic estimates from Flatel suites to all major Hyderabad medical centers, ensuring zero stress and timely arrivals.",
    badge: "FREE",
    categoryGroup: "medical",
    filterCategory: "free",
    imageUrl: "/images/medical/02-hospital-travel.jpg",
    inclusions: [
      "Curated 5 to 20 minute transit charts to all major hospital hubs",
      "Alternative emergency route blueprints to avoid city bottlenecks",
      "Dedicated driver route assistance provided 24/7",
    ],
  },
  {
    id: "m03",
    number: "03",
    title: "24/7 Ambulance Coordination",
    shortTitle: "24/7 Ambulance Liaison",
    desc: "Immediate emergency hospital response team",
    detailedDesc:
      "Direct on-call dispatch link with licensed cardiac and BLS ambulance services for priority emergency evacuation to designated medical centers.",
    badge: "FREE",
    categoryGroup: "medical",
    filterCategory: "free",
    imageUrl: "/images/medical/03-ambulance.jpg",
    inclusions: [
      "Zero-delay ambulance callouts with priority medical corridors",
      "Pre-alerts dispatched directly to hospital emergency casualty wards",
      "On-site Flatel staff escort coordination during transfer",
    ],
  },
  {
    id: "m04",
    number: "04",
    title: "24/7 Dedicated Guest Assistance",
    shortTitle: "24/7 Guest Care Desk",
    desc: "Round-the-clock dedicated on-site care team",
    detailedDesc:
      "Around-the-clock front-desk and WhatsApp hospitality liaison ready to assist patients and companion families with every in-room and medical requirement.",
    badge: "FREE",
    categoryGroup: "medical",
    filterCategory: "free",
    imageUrl: "/images/medical/04-guest-assistance.jpg",
    inclusions: [
      "Continuous on-site support staff for senior and recovering guests",
      "Luggage, grocery, and personal errand execution",
      "Direct hotline connectivity to Flatel management",
    ],
  },
  {
    id: "m05",
    number: "05",
    title: "Pharmacy Flatel Express Delivery",
    shortTitle: "Pharmacy Room Delivery",
    desc: "In-room prescription medication delivery",
    detailedDesc:
      "Rapid prescription medicine fulfillment and direct in-room delivery from accredited 24-hour pharmacies, ensuring you never run short of vital medication.",
    badge: "FREE",
    categoryGroup: "medical",
    filterCategory: "free",
    imageUrl: "/images/medical/05-pharmacy-delivery.jpg",
    inclusions: [
      "Pickup & delivery of doctor prescriptions directly to your suite",
      "Verification of tamper-evident medicine packaging",
      "Cold-chain insulin and bio-drug temperature storage support",
    ],
  },
  {
    id: "m06",
    number: "06",
    title: "On-Site Wheelchair Accessibility",
    shortTitle: "On-Site Wheelchair",
    desc: "On-site mobility equipment for clinic visits",
    detailedDesc:
      "Sanitized, lightweight foldable wheelchairs provided on-demand for smooth transit across apartments, elevators, and outdoor hospital consultations.",
    badge: "FREE",
    categoryGroup: "medical",
    filterCategory: "free",
    imageUrl: "/images/medical/06-wheelchair.jpg",
    inclusions: [
      "Foldable, heavy-duty wheelchairs available on prompt request",
      "Elevator-ready and ramp-compatible across Flatel properties",
      "Sanitized thoroughly prior to each guest check-in",
    ],
  },
  {
    id: "m07",
    number: "07",
    title: "In-Room Hospital Medical Bed",
    shortTitle: "In-Room Medical Bed",
    desc: "Hospital-grade recovery bed for patient comfort",
    detailedDesc:
      "Multi-position adjustable semi-fowler recovery bed fitted with side safety rails, designed for post-operative recovery and maximum patient ergonomic support.",
    badge: "FREE",
    categoryGroup: "medical",
    filterCategory: "free",
    imageUrl: "/images/medical/07-medical-bed.jpg",
    inclusions: [
      "Elevation-adjustable backrest and knee rest mechanism",
      "Fold-down safety side railings for fall prevention",
      "Fitted with clean medical-grade waterproof mattress protector",
    ],
  },
  {
    id: "m08",
    number: "08",
    title: "IV Stand (Saline Support)",
    shortTitle: "IV Stand Support",
    desc: "Support for continuous saline, infusions & drip care",
    detailedDesc:
      "Mobile 4-hook stainless steel intravenous infusion stands on smooth castor wheels, enabling patients to move comfortably while receiving prescribed fluids.",
    badge: "FREE",
    categoryGroup: "medical",
    filterCategory: "free",
    imageUrl: "/images/medical/08-iv-stand.jpg",
    inclusions: [
      "Heavy-base 4-hook telescopic stainless steel IV poles",
      "Smooth lockable caster wheels for quiet room movement",
      "Compatible with infusion pumps and drip bottles",
    ],
  },
  {
    id: "m09",
    number: "09",
    title: "Blood Glucose Monitor (Glucometer)",
    shortTitle: "Blood Glucose Monitoring",
    desc: "Accurate blood sugar tracking equipment",
    detailedDesc:
      "Certified digital blood glucose testing kit complete with sterile single-use lancets and calibration strips for rapid diabetes and recovery monitoring.",
    badge: "FREE",
    categoryGroup: "medical",
    filterCategory: "free",
    imageUrl: "/images/medical/09-glucometer.jpg",
    inclusions: [
      "Digital glucometer device with memory log",
      "Individual sterile lancets and test strips provided",
      "Assistance with reading log keeping on request",
    ],
  },
  {
    id: "m10",
    number: "10",
    title: "Blood Pressure Monitor (Digital BP)",
    shortTitle: "Digital BP Monitor",
    desc: "Precision cardiovascular vitals tracking device",
    detailedDesc:
      "Automated one-touch upper arm blood pressure monitor with clinical-grade accuracy, enabling companion families to check patient vitals anytime.",
    badge: "FREE",
    categoryGroup: "medical",
    filterCategory: "free",
    imageUrl: "/images/medical/10-bp-machine.jpg",
    inclusions: [
      "One-touch automated upper-arm cuff monitor",
      "Immediate digital systolic, diastolic and pulse rate display",
      "Irregular heartbeat indicator warning system",
    ],
  },
  {
    id: "m11",
    number: "11",
    title: "Pulse Oximeter",
    shortTitle: "Pulse Oximeter",
    desc: "Instant SpO2 & pulse rate monitor",
    detailedDesc:
      "Compact fingertip pulse oximeter with bright OLED display providing instant real-time oxygen saturation (SpO2) and pulse heart rate feedback.",
    badge: "FREE",
    categoryGroup: "medical",
    filterCategory: "free",
    imageUrl: "/images/medical/11-pulse-oximeter.jpg",
    inclusions: [
      "High-precision non-invasive fingertip infrared sensor",
      "Bright multi-directional dual-color OLED reading screen",
      "Auto-off power saving function",
    ],
  },
  {
    id: "m12",
    number: "12",
    title: "First-Aid Emergency Kit & Hygiene Kit",
    shortTitle: "First-Aid & Hygiene Kit",
    desc: "Antiseptic supplies, dressings, masks & wipes",
    detailedDesc:
      "Comprehensive emergency first-aid kit stocked with antiseptic solution, sterile gauze, bandages, medical tape, clinical thermometers, and sanitizers.",
    badge: "FREE",
    categoryGroup: "medical",
    filterCategory: "free",
    imageUrl: "/images/medical/12-first-aid.jpg",
    inclusions: [
      "Medical dressings, sterile gauze bandages, and surgical tapes",
      "Antiseptic lotions, wound wipes, and burn creams",
      "Restocked and verified after every guest checkout",
    ],
  },
  {
    id: "m13",
    number: "13",
    title: "Professional Therapeutic Massagers",
    shortTitle: "Therapeutic Massagers",
    desc: "Foot & calf relaxation massagers for pain relief",
    detailedDesc:
      "Deep-kneading shiatsu and pneumatic air compression massager designed to relieve leg tiredness, improve circulation, and soothe swollen feet.",
    badge: "FREE",
    categoryGroup: "medical",
    filterCategory: "free",
    imageUrl: "/images/medical/13-massager.jpg",
    inclusions: [
      "Multiple intensity levels for gentle post-hospital relaxation",
      "Infrared warmth therapy for muscle tension and circulation",
      "Fully sanitized with removable hygienic covers",
    ],
  },
  {
    id: "m14",
    number: "14",
    title: "Medical Equipment & Room Utility Trolley",
    shortTitle: "Medical Supply Trolley",
    desc: "In-room sanitized utility organiser for medications",
    detailedDesc:
      "Dedicated multi-tier stainless medical cart placed right by the patient's bedside for neatly organizing medications, vital monitors, and hygiene supplies.",
    badge: "FREE",
    categoryGroup: "medical",
    filterCategory: "free",
    imageUrl: "/images/medical/14-medical-trolley.jpg",
    inclusions: [
      "Tiered stainless steel shelves with smooth lockable wheels",
      "Easy-to-clean hygienic surfaces for medical and dressing items",
      "Keeps all medicines accessible and tidy for family caretakers",
    ],
  },
  {
    id: "m15",
    number: "15",
    title: "Dedicated Doctor & Nurse Visits",
    shortTitle: "Doctor & Nurse Visits",
    desc: "On-call physician consultations & registered home nurses",
    detailedDesc:
      "Coordination of licensed medical doctors and certified home health nurses to conduct physical examinations, vitals checks, dressing changes, and injections.",
    badge: "FREE",
    categoryGroup: "medical",
    filterCategory: "free",
    imageUrl: "/images/medical/15-doctor-nurse.jpg",
    inclusions: [
      "On-call physician home visits arranged at scheduled convenience",
      "Registered nurses for dressing changes, catheter care, and injections",
      "Hospital-standard clinical documentation recorded in suite",
    ],
  },
  {
    id: "m16",
    number: "16",
    title: "Oxygen Concentrator & Cylinder",
    shortTitle: "Oxygen Concentrator",
    desc: "Clinical continuous oxygen therapy support",
    detailedDesc:
      "Certified 5L/10L medical-grade oxygen concentrators and filled emergency oxygen cylinders delivered on-demand for continuous respiratory care.",
    badge: "PAID",
    categoryGroup: "medical",
    filterCategory: "paid",
    imageUrl: "/images/medical/16-oxygen-concentrator.jpg",
    inclusions: [
      "Adjustable flow medical oxygen concentrator with humidification bottle",
      "Sterile nasal cannulas and mask attachments included",
      "24/7 technical backup and refill assistance",
    ],
  },
  {
    id: "m17",
    number: "17",
    title: "Diet-Specific Meal Preparation",
    shortTitle: "Diet-Specific Meals",
    desc: "Nutritional planning, diabetic & therapeutic meals",
    detailedDesc:
      "Wholesome home-style diet meal preparation customized to doctor recommendations, including salt-free, diabetic-friendly, high-protein, or soft bland foods.",
    badge: "PAID",
    categoryGroup: "medical",
    filterCategory: "paid",
    imageUrl: "/images/medical/17-diet-meals.jpg",
    inclusions: [
      "Custom menus tailored to physician dietary directives",
      "Cooked fresh in hygienic kitchens with bottled water and fresh produce",
      "Convenient doorstep meal schedule delivered hot",
    ],
  },
  {
    id: "m18",
    number: "18",
    title: "Priority Check-in & Check-out",
    shortTitle: "Priority Check-in",
    desc: "Seamless expedited contactless arrival and departure",
    detailedDesc:
      "Fast-track VIP check-in directly in your serviced flat with luggage handling and zero waiting time, tailored specifically for elderly and post-treatment patients.",
    badge: "PAID",
    categoryGroup: "medical",
    filterCategory: "paid",
    imageUrl: "/images/medical/18-priority-checkin.jpg",
    inclusions: [
      "Pre-cooled flat ready upon immediate arrival with bed prepared",
      "Doorstep key handover without front desk paperwork delays",
      "Dedicated concierge porter for heavy luggage and medical equipment",
    ],
  },
  {
    id: "m19",
    number: "19",
    title: "Chauffeur-Driven Sanitized Car",
    shortTitle: "Chauffeur Hospital Car",
    desc: "Premium air-conditioned hospital transfer vehicle & driver",
    detailedDesc:
      "Dedicated sanitized AC sedan or spacious MPV with professional chauffeur on standby for hospital rounds, OPD follow-ups, and airport transfers.",
    badge: "PAID",
    categoryGroup: "medical",
    filterCategory: "paid",
    imageUrl: "/images/medical/19-chauffeur-car.jpg",
    inclusions: [
      "Courteous, police-verified driver familiar with hospital gates & ramps",
      "Clean sanitized AC cabin with bottle water and tissue supplies",
      "Flexible hourly packages and full-day patient transfer duty",
    ],
  },
];

/**
 * 17 Official Wedding Services [Part 1 & Part 2]
 * Directly mapped from the Flatel Official Wedding Services Brochure
 */
export const WEDDING_CARE_ITEMS: ShowcaseItem[] = [
  {
    id: "w01",
    number: "01",
    title: "Event Venue Booking Assistance",
    shortTitle: "Venue Booking",
    desc: "Function halls, banquet halls & convention centers",
    detailedDesc:
      "Complete assistance in selecting and booking premier Function Halls, Banquet Halls, and Convention Halls across Hyderabad tailored to your theme, guest capacity, and budget.",
    badge: "BESPOKE",
    categoryGroup: "wedding",
    filterCategory: "venue-attire",
    imageUrl: "/images/wedding/flatel-royal-wedding.jpg",
    inclusions: [
      "Curated shortlisted venues in Barkas, Chandrayangutta, Banjara Hills & Shamshabad",
      "Direct date locking, rate negotiation & guest capacity planning",
      "Venue inspection visit escort & seating layout planning",
    ],
  },
  {
    id: "w02",
    number: "02",
    title: "Wedding Card Printing & Digital Invitations",
    shortTitle: "Wedding Card Printing",
    desc: "Custom calligraphy, gold foil printing & RSVP cards",
    detailedDesc:
      "End-to-end design, text framing, premium paper selection, and high-quality customized printing for traditional and modern wedding invitation cards.",
    badge: "CUSTOM",
    categoryGroup: "wedding",
    filterCategory: "venue-attire",
    imageUrl: "/images/wedding/flatel-royal-wedding.jpg",
    inclusions: [
      "Custom Urdu, English & Arabic calligraphy with Islamic motifs",
      "Text framing assistance with formal etiquette & family titles",
      "Matching digital WhatsApp video cards and physical gift boxes",
    ],
  },
  {
    id: "w03",
    number: "03",
    title: "Bride's Attire Coordination & Tailoring",
    shortTitle: "Bride's Attire",
    desc: "Fabric selection, custom embroidery & bridal tailoring",
    detailedDesc:
      "Fabric selection, custom zardozi embroidery, and professional master tailoring services for bridal Khada Dupatta, lehengas, and shararas.",
    badge: "BESPOKE",
    categoryGroup: "wedding",
    filterCategory: "venue-attire",
    imageUrl: "/images/wedding/flatel-royal-wedding.jpg",
    inclusions: [
      "Dedicated styling liaison for authentic Hyderabadi Khada Dupatta",
      "Artisan zardozi embroidery coordination and fabric selection",
      "Multiple trial fittings with master tailoring adjustments",
    ],
  },
  {
    id: "w04",
    number: "04",
    title: "Groom's Attire Coordination & Bespoke Sherwani",
    shortTitle: "Groom's Attire",
    desc: "Expert guidance, design selection & bespoke tailoring",
    detailedDesc:
      "Expert guidance on fabric, design selection, and bespoke tailoring for groom sherwanis, bandhgalas, handcrafted saafa/turbans, and ceremonial accessories.",
    badge: "BESPOKE",
    categoryGroup: "wedding",
    filterCategory: "venue-attire",
    imageUrl: "/images/wedding/flatel-royal-wedding.jpg",
    inclusions: [
      "Designer fabric selection (raw silk, brocade, velvet & jacquard)",
      "Bespoke embroidery, custom buttons, pocket squares & brooch",
      "Turban tying (saafa) specialist coordination on wedding day",
    ],
  },
  {
    id: "w05",
    number: "05",
    title: "Footwear Arrangement for Bride & Groom",
    shortTitle: "Bridal & Groom Footwear",
    desc: "Personalized styling, sizing & matching wedding shoes",
    detailedDesc:
      "Personalized styling, sizing, and sourcing of premium footwear matching the wedding attire, including handcrafted mojaris, juttis, and comfortable dress footwear.",
    badge: "INCLUDED",
    categoryGroup: "wedding",
    filterCategory: "venue-attire",
    imageUrl: "/images/wedding/flatel-royal-wedding.jpg",
    inclusions: [
      "Curated sourcing of designer mojaris, juttis, and leather dress shoes",
      "Custom embroidery matching outfit colors and threadwork",
      "Anti-fatigue comfort inner padding for prolonged ceremony standing",
    ],
  },
  {
    id: "w06",
    number: "06",
    title: "Arrangement for a Licensed Qazi for Nikah",
    shortTitle: "Arrangement for a Qazi",
    desc: "Hassle-free coordination, paperwork & timely presence",
    detailedDesc:
      "Hassle-free coordination with licensed, government-registered Qazi for Nikah ceremonies, including paperwork, Nikahnama documentation, and timely presence.",
    badge: "PRIORITY",
    categoryGroup: "wedding",
    filterCategory: "styling-concierge",
    imageUrl: "/images/wedding/flatel-royal-wedding.jpg",
    inclusions: [
      "Official government-registered Qazi scheduling and protocol",
      "Legal Nikahnama documentation filing & witness formalities",
      "Punctual arrival coordination at the wedding venue or Flatel suite",
    ],
  },
  {
    id: "w07",
    number: "07",
    title: "Catering & Kitchen Management Services",
    shortTitle: "Catering & Kitchen",
    desc: "Authentic Hyderabadi & Arab cuisine preparation",
    detailedDesc:
      "Authentic Hyderabadi and Arab cuisine preparation — from signature Dum Biryani and Haleem to exclusive desserts — along with complete kitchen setup.",
    badge: "SIGNATURE",
    categoryGroup: "wedding",
    filterCategory: "catering",
    imageUrl: "/images/wedding/flatel-royal-wedding.jpg",
    inclusions: [
      "Authentic Hyderabadi Dum Biryani, Marag, Sheermal & Arab Mandi feast",
      "Full mobile kitchen setup with traditional copper deghs and master ustads",
      "Live tandoor, welcome drinks, and luxury dessert station",
    ],
  },
  {
    id: "w08",
    number: "08",
    title: "On-Site Operations & Catering Control",
    shortTitle: "Catering & Operations",
    desc: "Wastage prevention, waiter supervision & food packing",
    detailedDesc:
      "Preventing unauthorized use, wastage, or removal of food and supplies; managing venue staff and overseeing waiters to ensure seamless guest service; safe packing and delivery of leftover food.",
    badge: "MANAGED",
    categoryGroup: "wedding",
    filterCategory: "catering",
    imageUrl: "/images/wedding/flatel-royal-wedding.jpg",
    inclusions: [
      "Preventing unauthorized use, wastage, or removal of food & supplies",
      "Managing venue staff and overseeing uniform waiters for seamless service",
      "Safe, hygienic packing and delivery of leftover food to designated location",
    ],
  },
  {
    id: "w09",
    number: "09",
    title: "Stage Decoration & Floral Backdrop Services",
    shortTitle: "Stage Decoration",
    desc: "Floral stage designs, regal seating & lighting setups",
    detailedDesc:
      "Modern, traditional, and customized floral stage designs and lighting setups crafted to create breathtaking photo-ready grand function backdrops.",
    badge: "CUSTOM",
    categoryGroup: "wedding",
    filterCategory: "decor-cars",
    imageUrl: "/images/wedding/flatel-royal-wedding.jpg",
    inclusions: [
      "Fresh exotic floral arrangements (roses, orchids, jasmine & lilies)",
      "Custom architectural backdrops, royal sofa seating & crystal chandeliers",
      "Dynamic stage spotlights, fog entry effects & entrance archways",
    ],
  },
  {
    id: "w10",
    number: "10",
    title: "Wedding Room & Bridal Suite Decoration",
    shortTitle: "Wedding Room Decor",
    desc: "Romantic floral styling for bridal suite & bedroom",
    detailedDesc:
      "Romantic and elegant floral styling for the bridal suite and newlywed's bedroom at Flatel, featuring fresh roses, fragrant petals, aroma diffusers, and warm mood lighting.",
    badge: "INCLUDED",
    categoryGroup: "wedding",
    filterCategory: "decor-cars",
    imageUrl: "/images/wedding/flatel-royal-wedding.jpg",
    inclusions: [
      "Luxurious fresh rose petal and fragrant jasmine floral bed styling",
      "Ambient fairy lights, LED candles, and calming aroma diffusion",
      "Complimentary newlywed welcome fruit & confection basket",
    ],
  },
  {
    id: "w11",
    number: "11",
    title: "Car Arrangement & Luxury Guest Fleet",
    shortTitle: "Luxury Fleet & Cars",
    desc: "7-seaters & premium luxury cars (Audi, BMW, Benz)",
    detailedDesc:
      "Seamless transport logistics for guests: comfortable 7-seaters along with premium luxury cars (Audi, BMW, Benz, etc.) for the bride and groom.",
    badge: "PREMIUM",
    categoryGroup: "wedding",
    filterCategory: "decor-cars",
    imageUrl: "/images/wedding/flatel-royal-wedding.jpg",
    inclusions: [
      "Luxury sedans & convertibles for royal couple grand entry",
      "7-seater AC MPVs for outstation relatives & airport transfers",
      "Uniformed, experienced chauffeurs on continuous wedding-day standby",
    ],
  },
  {
    id: "w12",
    number: "12",
    title: "Wedding Car Floral Decoration Services",
    shortTitle: "Car Decoration",
    desc: "Professional floral, net & ribbon styling for entry car",
    detailedDesc:
      "Professional floral, net, and ribbon styling for the couple's luxury entry vehicle, executed on-site at Flatel prior to the Baraat departure.",
    badge: "CUSTOM",
    categoryGroup: "wedding",
    filterCategory: "decor-cars",
    imageUrl: "/images/wedding/flatel-royal-wedding.jpg",
    inclusions: [
      "Designer hood bouquet, side door bouquets & rear floral garnishing",
      "High-grade scratch-free suction mounts and premium satin ribbons",
      "On-site decoration completed at Flatel branch prior to procession",
    ],
  },
  {
    id: "w13",
    number: "13",
    title: "Professional Makeup Artist & Hair Stylist",
    shortTitle: "Bridal Makeup & Hair",
    desc: "Certified artists for bridal makeup, hair & draping",
    detailedDesc:
      "Booking top certified artists for bridal makeup, hair styling, and saree/dupatta draping in the comfort and privacy of your serviced Flatel suite.",
    badge: "EXPERT",
    categoryGroup: "wedding",
    filterCategory: "styling-concierge",
    imageUrl: "/images/wedding/flatel-royal-wedding.jpg",
    inclusions: [
      "Top certified bridal makeup artists with international cosmetics brands",
      "Intricate bridal hairstyling with real fresh flowers and accessories",
      "Professional Khada Dupatta, lehenga, and saree draping support",
    ],
  },
  {
    id: "w14",
    number: "14",
    title: "Grooming & Styling for the Groom",
    shortTitle: "Groom's Grooming",
    desc: "Haircut, beard styling, face cleanup & grooming",
    detailedDesc:
      "Complete salon services including haircut, beard styling, skin rejuvenating face cleanup, and wedding-day grooming tailored for the groom.",
    badge: "PREMIUM",
    categoryGroup: "wedding",
    filterCategory: "styling-concierge",
    imageUrl: "/images/wedding/flatel-royal-wedding.jpg",
    inclusions: [
      "Executive hair styling and beard sculpting by master barbers",
      "Hydrating gold/charcoal facial cleanup and de-tan treatment",
      "Wedding-day dress coordination and fragrance selection assistance",
    ],
  },
  {
    id: "w15",
    number: "15",
    title: "Photography & Videography Coordination",
    shortTitle: "Photo & Video Studio",
    desc: "Candid photography, cinematic films, drone & shoots",
    detailedDesc:
      "Professional candid photography, cinematic wedding films, drone shoots, and pre-wedding coverage to preserve every cherished moment in heirloom quality.",
    badge: "STUDIO",
    categoryGroup: "wedding",
    filterCategory: "styling-concierge",
    imageUrl: "/images/wedding/flatel-royal-wedding.jpg",
    inclusions: [
      "Traditional & candid high-resolution wedding photography",
      "Cinematic 4K teaser reel, full ceremony documentary & drone footage",
      "Premium leatherette hardbound photo album and digital cloud gallery",
    ],
  },
  {
    id: "w16",
    number: "16",
    title: "Dedicated Wedding Concierge Services",
    shortTitle: "Wedding Concierge",
    desc: "Guest requests, welcome assistance & event timelines",
    detailedDesc:
      "Dedicated support for guests' requests, welcome assistance, and overall event timeline management, taking all the coordination stress off the family.",
    badge: "DEDICATED",
    categoryGroup: "wedding",
    filterCategory: "styling-concierge",
    imageUrl: "/images/wedding/flatel-royal-wedding.jpg",
    inclusions: [
      "On-site hospitality desk at Flatel and the banquet venue",
      "Coordination of guest welcome, room keys, and daily itineraries",
      "Seamless backstage vendor coordination and ceremony punctuality",
    ],
  },
  {
    id: "w17",
    number: "17",
    title: "Wedding Packing & Guest Gift Services",
    shortTitle: "Trousseau & Gift Packing",
    desc: "Trousseau packaging, tray decor & return gift packets",
    detailedDesc:
      "Bridal & Groom Trousseau Packing: elegant theme-based packaging, box decoration, and tray presentation. Guest Gift Packets: customized packing and distribution of traditional return gifts.",
    badge: "CURATED",
    categoryGroup: "wedding",
    filterCategory: "styling-concierge",
    imageUrl: "/images/wedding/flatel-royal-wedding.jpg",
    inclusions: [
      "Bridal & groom trousseau packing: elegant theme boxes, lace & tray decor",
      "Customized gift packets with premium dry fruits, ittar, and return favors",
      "Organized delivery and distribution to wedding guests and relatives",
    ],
  },
];

/**
 * 18 Official Leisure & Tourism Inclusions
 * 12 City Destinations + 6 Premium Services & Logistics
 * Directly mapped from the Flatel Leisure & Tourism Brochure
 */
export const TOURISM_CARE_ITEMS: ShowcaseItem[] = [
  {
    id: "t01",
    number: "01",
    title: "Charminar | 16th-Century Heritage Icon",
    shortTitle: "Charminar",
    desc: "Historic four-minaret monument & Old City heart",
    detailedDesc:
      "The global crown jewel of Hyderabad, constructed in 1591 CE by Muhammad Quli Qutb Shah. Marvel at stucco embellishments, climb the historic arches, and soak in the vibrant Old City atmosphere.",
    badge: "HERITAGE",
    categoryGroup: "tourism",
    filterCategory: "heritage",
    imageUrl: "/images/tourism/destinations/01-charminar.jpg",
    inclusions: [
      "Just 10-15 minutes direct drive from Flatel Moghalpura branch",
      "Access to panoramic views overlooking the Mecca Masjid and old markets",
      "Night illumination viewing from 7:00 PM to 9:00 PM",
    ],
  },
  {
    id: "t02",
    number: "02",
    title: "Mecca Masjid | Historic Stone Grand Mosque",
    shortTitle: "Mecca Masjid",
    desc: "Sacred grand mosque with bricks commissioned from Mecca",
    detailedDesc:
      "One of India's largest and oldest heritage mosques, featuring soaring granite arches constructed over 77 years, housing ancient relics and royal Nizami tombs in its peaceful marble courtyard.",
    badge: "HERITAGE",
    categoryGroup: "tourism",
    filterCategory: "heritage",
    imageUrl: "/images/tourism/destinations/02-mecca-masjid.jpg",
    inclusions: [
      "Walking distance from Charminar and Flatel Old City locations",
      "Historic courtyard accommodating over 10,000 worshippers",
      "Nizam royal family marble tombs and architectural heritage tour",
    ],
  },
  {
    id: "t03",
    number: "03",
    title: "Chowmahalla Palace | Seat of the Asaf Jahi Dynasty",
    shortTitle: "Chowmahalla Palace",
    desc: "Opulent royal palace with Belgian chandeliers & vintage cars",
    detailedDesc:
      "The official palace of the Nizams of Hyderabad, boasting the magnificent Khilwat Mubarak durbar hall, 19 pure Belgian crystal chandeliers, royal armor, and the famous 1912 Rolls-Royce Silver Ghost.",
    badge: "HERITAGE",
    categoryGroup: "tourism",
    filterCategory: "heritage",
    imageUrl: "/images/tourism/destinations/03-chowmahalla.jpg",
    inclusions: [
      "UNESCO Asia-Pacific Heritage Award winning restored royal palace",
      "Exquisite clock tower, vintage carriage museum & royal armoury",
      "Manicured Persian-style courtyards and water fountains",
    ],
  },
  {
    id: "t04",
    number: "04",
    title: "Golconda Fort | Medieval Acoustic Citadel Fortress",
    shortTitle: "Golconda Fort",
    desc: "Acoustic wonder fortress, royal palaces & sound-light show",
    detailedDesc:
      "Legendary medieval fortress famed for its acoustic ingenuity where a handclap at the entry gate reverberates to the hilltop pavilion 1 km away. Historic source of the Hope and Koh-i-Noor diamonds.",
    badge: "HERITAGE",
    categoryGroup: "tourism",
    filterCategory: "heritage",
    imageUrl: "/images/tourism/destinations/04-golconda.jpg",
    inclusions: [
      "Guided acoustic marvel walkthrough and royal citadel climb",
      "Evening sound and light show narrated by Amitabh Bachchan",
      "Panoramic hilltop view of the entire Hyderabad skyline",
    ],
  },
  {
    id: "t05",
    number: "05",
    title: "Qutb Shahi Tombs | Royal Domed Necropolis",
    shortTitle: "Qutb Shahi Tombs",
    desc: "Regal domed mausoleums in landscaped heritage gardens",
    detailedDesc:
      "A serene complex of domed tombs representing seven Qutb Shahi rulers, showcasing a unique fusion of Persian, Pathan, and Hindu architectural stone carvings set within restored Deccan gardens.",
    badge: "CULTURE",
    categoryGroup: "tourism",
    filterCategory: "vintage",
    imageUrl: "/images/tourism/destinations/05-qutb-shahi.jpg",
    inclusions: [
      "Meticulously restored by the Aga Khan Trust for Culture",
      "Magnificent granite domes, minarets, and ancient stepwells (baolis)",
      "Peaceful landscaped lawns ideal for morning heritage walks",
    ],
  },
  {
    id: "t06",
    number: "06",
    title: "Purani Haveli | Nizam's Palace & 240ft Wardrobe",
    shortTitle: "Purani Haveli",
    desc: "Royal residence featuring the world's longest wooden wardrobe",
    detailedDesc:
      "Classic U-shaped 18th-century royal palace housing the Nizam's Museum, silver jubilee gifts, and the astonishing 240-foot Burma teak wardrobe of Mahbub Ali Khan, the sixth Nizam.",
    badge: "CULTURE",
    categoryGroup: "tourism",
    filterCategory: "vintage",
    imageUrl: "/images/tourism/destinations/06-purani-haveli.jpg",
    inclusions: [
      "Exclusive display of diamond-studded gold souvenirs and vintage cars",
      "World's longest two-tiered hand-cranked wooden wardrobe walkthrough",
      "Located in the heart of Old City close to Flatel Barkas & Moghalpura",
    ],
  },
  {
    id: "t07",
    number: "07",
    title: "Taramati Baradari | Royal Acoustic Music Pavilion",
    shortTitle: "Taramati Baradari",
    desc: "12-arch royal music pavilion atop Ibrahim Bagh",
    detailedDesc:
      "Built by Abdullah Qutb Shah for his court singer Taramati, this Persian-style music pavilion features 12 arched openings crafted for acoustic natural voice amplification.",
    badge: "CULTURE",
    categoryGroup: "tourism",
    filterCategory: "vintage",
    imageUrl: "/images/tourism/destinations/07-taramati.jpg",
    inclusions: [
      "Semi-open acoustic pavilion perched on a scenic hillock",
      "Evening cultural performances and Open-Air Greek-style Amphitheatre",
      "Picturesque sunset views overlooking Golconda's outer walls",
    ],
  },
  {
    id: "t08",
    number: "08",
    title: "Salar Jung Museum | National Antique Treasure",
    shortTitle: "Salar Jung Museum",
    desc: "World's largest 1-man antique collection & musical clock",
    detailedDesc:
      "One of India's premier national museums housing over 40,000 priceless artifacts across 38 galleries collected by Salar Jung III, including the famous marble Veiled Rebecca and 19th-century musical clock.",
    badge: "CULTURE",
    categoryGroup: "tourism",
    filterCategory: "vintage",
    imageUrl: "/images/tourism/destinations/08-salar-jung.jpg",
    inclusions: [
      "World-famous Veiled Rebecca marble masterpiece sculpted by Benzoni",
      "Hourly chime show of the antique mechanical British bracket clock",
      "Mughal royal daggers, ivory carvings, and Japanese porcelain",
    ],
  },
  {
    id: "t09",
    number: "09",
    title: "Ramoji Film City | World's Largest Studio Complex",
    shortTitle: "Ramoji Film City",
    desc: "Guinness-certified 2,000-acre cinematic wonderland",
    detailedDesc:
      "Guinness World Record certified largest film studio complex spanning over 2,000 acres. Enjoy real movie sets (like Bahubali's Mahishmati), stunt shows, eco-gardens, vintage trains, and rides.",
    badge: "ENTERTAINMENT",
    categoryGroup: "tourism",
    filterCategory: "bazaars",
    imageUrl: "/images/tourism/destinations/09-ramoji.jpg",
    inclusions: [
      "Full-day guided vintage bus tour through international studio sets",
      "Live Wild West stunt shows, space simulations, and cinematic illusions",
      "Comfortable return cab transfers arranged directly by Flatel",
    ],
  },
  {
    id: "t10",
    number: "10",
    title: "Nehru Zoological Park | 380-Acre Natural Sanctuary",
    shortTitle: "Nehru Zoological Park",
    desc: "Open safari drives, Mir Alam Lake & 1,500+ wildlife species",
    detailedDesc:
      "One of India's largest and best-maintained zoological gardens, boasting lion and tiger open safaris, a natural 600-acre reservoir lake, nocturnal animal house, and children's train ride.",
    badge: "ENTERTAINMENT",
    categoryGroup: "tourism",
    filterCategory: "bazaars",
    imageUrl: "/images/tourism/destinations/10-nehru-zoo.jpg",
    inclusions: [
      "Electric battery cart rides and open safari bus passes",
      "Nocturnal animal house, dinosaur park, and butterfly garden",
      "Convenient morning excursion just 15 minutes from Flatel Moghalpura",
    ],
  },
  {
    id: "t11",
    number: "11",
    title: "Shilparamam | Vibrant Arts & Crafts Village",
    shortTitle: "Shilparamam",
    desc: "Traditional Indian arts, handloom bazaar & live folk dances",
    detailedDesc:
      "A scenic rural cultural village in HITEC City celebrating traditional Indian artisans. Shop authentic terracotta pottery, handloom saris, brass idols, and enjoy evening open-air folk music festivals.",
    badge: "ENTERTAINMENT",
    categoryGroup: "tourism",
    filterCategory: "bazaars",
    imageUrl: "/images/tourism/destinations/11-shilparamam.jpg",
    inclusions: [
      "Direct artisan shopping without middlemen markups",
      "Lush landscaped village setup with rock sculptures and boating lake",
      "Evening classical Kathak, Kuchipudi, and folk music amphitheatre shows",
    ],
  },
  {
    id: "t12",
    number: "12",
    title: "Laad Bazaar | World-Famous Bridal & Choodi Market",
    shortTitle: "Laad Bazaar",
    desc: "Historic glittering lane for lacquer bangles, pearls & ittar",
    detailedDesc:
      "Hyderabad's most celebrated historic bazaar running along Charminar, renowned since the Nizam era for hand-studded glass and lacquer bangles, authentic Hyderabadi pearls, pure ittar scents, and bridal zari fabrics.",
    badge: "BAZAAR",
    categoryGroup: "tourism",
    filterCategory: "bazaars",
    imageUrl: "/images/tourism/destinations/12-laad-bazaar.jpg",
    inclusions: [
      "Custom sizing and bespoke hand-embellished lacquer bangles",
      "Certified Hyderabadi Basra pearl merchants and bridal wear stores",
      "Late-night shopping experience right beside illuminated Charminar",
    ],
  },
  {
    id: "t13",
    number: "13",
    title: "Airport Pick-up & Drop Service",
    shortTitle: "Airport Pick-up & Drop",
    desc: "Punctual RGIA transfers with flight tracking & luggage support",
    detailedDesc:
      "Seamless door-to-door transfers to and from Rajiv Gandhi International Airport (Shamshabad). Chauffeur tracks your flight in real-time, greets you at the terminal with a name board, and assists with luggage.",
    badge: "LOGISTICS",
    categoryGroup: "tourism",
    filterCategory: "logistics",
    imageUrl: "/images/tourism/destinations/13-airport-pickup.jpg",
    inclusions: [
      "Real-time live flight status tracking with zero waiting charge on delays",
      "Executive AC sedan or spacious 7-seater MPV with luggage boot",
      "Courteous chauffeur meet-and-greet right at arrival gate",
    ],
  },
  {
    id: "t14",
    number: "14",
    title: "Chauffeur-Driven Full-Day Car Rental",
    shortTitle: "Chauffeur Full-Day Car",
    desc: "Dedicated AC vehicle with city expert driver on standby",
    detailedDesc:
      "Dedicated air-conditioned car with polite, police-verified local chauffeur on duty for 8 hours / 80 km or 12 hours / 120 km. Perfect for effortless multi-stop sightseeing without hailing cabs.",
    badge: "LOGISTICS",
    categoryGroup: "tourism",
    filterCategory: "logistics",
    imageUrl: "/images/tourism/destinations/14-chauffeur-car.jpg",
    inclusions: [
      "Choice of Swift Dzire, Honda City, or Toyota Innova Crysta",
      "Chauffeur familiar with fastest routes, VIP parking, and monuments",
      "Doorstep pickup and drop right from your Flatel suite",
    ],
  },
  {
    id: "t15",
    number: "15",
    title: "Expert Local Guides & Heritage Walkers",
    shortTitle: "Expert Local Guides",
    desc: "Government-licensed multilingual guides for monuments",
    detailedDesc:
      "Professional, certified tour guides fluent in English, Hindi, Urdu, Telugu, and Arabic who share captivating historical context, architecture insights, and hidden secrets of Hyderabad's landmarks.",
    badge: "CONCIERGE",
    categoryGroup: "tourism",
    filterCategory: "logistics",
    imageUrl: "/images/tourism/destinations/15-local-guides.jpg",
    inclusions: [
      "Certified historians providing engaging commentary and anecdotes",
      "Skip-the-line assistance at monuments and museum ticketing desks",
      "Customizable walking tours through Old City culinary lanes",
    ],
  },
  {
    id: "t16",
    number: "16",
    title: "Full-Day Professional Photography",
    shortTitle: "Professional Photography",
    desc: "Dedicated travel & portrait photographer for monuments",
    detailedDesc:
      "Hire a professional portrait photographer equipped with high-end mirrorless cameras to capture stunning family photos, couple portraits, and Instagram reels against historic palace backdrops.",
    badge: "CONCIERGE",
    categoryGroup: "tourism",
    filterCategory: "logistics",
    imageUrl: "/images/tourism/destinations/16-photography.jpg",
    inclusions: [
      "Full-day candid coverage at Charminar, Chowmahalla, and Golconda",
      "Color-graded digital photo delivery within 48 hours via private link",
      "Short vertical cinematic reels ready for social media",
    ],
  },
  {
    id: "t17",
    number: "17",
    title: "Detailed City Information & Insider Guide",
    shortTitle: "Detailed City Info",
    desc: "Verified monument timings, ticket booking & navigation",
    detailedDesc:
      "Complimentary digital concierge pack prepared by Flatel including verified monument opening hours, online ticket booking links, dress code advisories, and curated local food trail recommendations.",
    badge: "FREE",
    categoryGroup: "tourism",
    filterCategory: "logistics",
    imageUrl: "/images/tourism/destinations/17-detailed-info.jpg",
    inclusions: [
      "Comprehensive timetable of all 12 monuments with holiday schedules",
      "Best photo spots and crowd avoidance timing cheat-sheet",
      "100% complimentary inclusion for all Flatel guests",
    ],
  },
  {
    id: "t18",
    number: "18",
    title: "Customized Tour Itineraries & Day Planning",
    shortTitle: "Custom Itineraries",
    desc: "Bespoke 1 to 5-day sightseeing plans for families & groups",
    detailedDesc:
      "Tailor-made day-by-day travel roadmaps created by Flatel concierges matching your group's pace, age group, dietary preferences, and shopping interests with zero hassle.",
    badge: "FREE",
    categoryGroup: "tourism",
    filterCategory: "logistics",
    imageUrl: "/images/tourism/destinations/18-custom-itineraries.jpg",
    inclusions: [
      "Custom 1-Day Old City Heritage Tour or 3-Day Grand Hyderabad Plan",
      "Integrated meal stops at historic biryani & Irani chai landmarks",
      "100% free personalized consultation with Flatel tour planner",
    ],
  },
];

export type ShowcaseCategoryKey = "medical" | "wedding" | "tourism";

interface CategoryMeta {
  key: ShowcaseCategoryKey;
  label: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  subtitle: string;
  bannerIcon: React.ComponentType<{ className?: string }>;
  bannerTitle: string;
  bannerDesc: string;
  bannerActionText: string;
  bannerActionQuery: string;
  subFilters: { id: string; label: string }[];
}

const CATEGORY_CONFIGS: Record<ShowcaseCategoryKey, CategoryMeta> = {
  medical: {
    key: "medical",
    label: "Hospital & Medical Care",
    count: 19,
    icon: Stethoscope,
    eyebrow: "OFFICIAL HEALTHCARE & GUEST WELLNESS",
    title: "Hospital, Doctor & Guest Wellness Care",
    subtitle:
      "100% verified on-site hospitality. Dedicated medical recovery equipment, 24/7 hospital liaison, and on-demand wellness care certified for all Flatel guests.",
    bannerIcon: ShieldCheck,
    bannerTitle: "Certified In-Room Care & Hospital Inclusions",
    bannerDesc:
      "All medical equipment is sanitized with hospital-grade disinfectant prior to arrival. Need special recovery care or continuous nursing?",
    bannerActionText: "Inquire on WhatsApp",
    bannerActionQuery:
      "Hello Flatel Concierge, I would like to inquire about Medical Care & Hospital Inclusions for my upcoming stay.",
    subFilters: [
      { id: "all", label: "All Inclusions (19)" },
      { id: "free", label: "100% Free Inclusions (15)" },
      { id: "paid", label: "On-Demand Add-ons (4)" },
    ],
  },
  wedding: {
    key: "wedding",
    label: "Wedding Services",
    count: 17,
    icon: Heart,
    eyebrow: "FLATEL BESPOKE WEDDING & EVENT SERVICES",
    title: "Wedding, Nikah & Grand Celebration Services",
    subtitle:
      "Complete wedding event management, venue booking, bespoke bridal styling, authentic Hyderabadi Arab catering, and dedicated on-site event concierge.",
    bannerIcon: HeartHandshake,
    bannerTitle: "Bespoke Wedding & Nikah Coordination Team",
    bannerDesc:
      "From banquet hall booking to Arab & Hyderabadi catering control and luxury fleet, Flatel wedding concierge ensures an unforgettable celebration.",
    bannerActionText: "Inquire Wedding Package",
    bannerActionQuery:
      "Hello Flatel Concierge, I would like to inquire about Wedding Services & Event Coordination for our celebration.",
    subFilters: [
      { id: "all", label: "All Wedding Services (17)" },
      { id: "venue-attire", label: "Venue & Attire (5)" },
      { id: "catering", label: "Catering & Kitchen (2)" },
      { id: "decor-cars", label: "Decor & Luxury Fleet (4)" },
      { id: "styling-concierge", label: "Beauty & Concierge (6)" },
    ],
  },
  tourism: {
    key: "tourism",
    label: "Leisure & Tourism",
    count: 18,
    icon: Compass,
    eyebrow: "HYDERABAD HERITAGE, LEISURE & TOURISM GUIDE",
    title: "City Destinations, Royal Heritage & Travel Logistics",
    subtitle:
      "Explore Hyderabad's centuries-old Nizami palaces, historic monuments, bustling bazaars, and luxury chauffeur-driven city excursions coordinated seamlessly.",
    bannerIcon: MapPin,
    bannerTitle: "Curated Hyderabad Tours & Chauffeur Fleet",
    bannerDesc:
      "Experience royal Nizami landmarks, heritage bazaars, and seamless airport transit with Flatel dedicated tourist assistance.",
    bannerActionText: "Book Tour / Chauffeur",
    bannerActionQuery:
      "Hello Flatel Concierge, I would like to inquire about Leisure & Tourism packages and chauffeur rentals.",
    subFilters: [
      { id: "all", label: "All Experiences (18)" },
      { id: "heritage", label: "Heritage Splendour (4)" },
      { id: "vintage", label: "Vintage & Culture (4)" },
      { id: "bazaars", label: "Entertainment & Bazaars (4)" },
      { id: "logistics", label: "Premium Logistics (6)" },
    ],
  },
};

interface MedicalWellnessShowcaseProps {
  className?: string;
  defaultCategory?: ShowcaseCategoryKey;
}

export function MedicalWellnessShowcase({
  className,
  defaultCategory = "medical",
}: MedicalWellnessShowcaseProps) {
  const [activeCategory, setActiveCategory] =
    React.useState<ShowcaseCategoryKey>(defaultCategory);
  const [activeSubFilter, setActiveSubFilter] = React.useState<string>("all");
  const [selectedItem, setSelectedItem] = React.useState<ShowcaseItem | null>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Get active configuration
  const currentConfig = CATEGORY_CONFIGS[activeCategory];

  // Pick dataset based on category
  const rawItems = React.useMemo(() => {
    switch (activeCategory) {
      case "medical":
        return MEDICAL_CARE_ITEMS;
      case "wedding":
        return WEDDING_CARE_ITEMS;
      case "tourism":
        return TOURISM_CARE_ITEMS;
      default:
        return MEDICAL_CARE_ITEMS;
    }
  }, [activeCategory]);

  // Filter items based on selected subfilter
  const filteredItems = React.useMemo(() => {
    if (activeSubFilter === "all") return rawItems;
    return rawItems.filter((item) => item.filterCategory === activeSubFilter);
  }, [rawItems, activeSubFilter]);

  // Handle category switch
  const handleSelectCategory = (categoryKey: ShowcaseCategoryKey) => {
    setActiveCategory(categoryKey);
    setActiveSubFilter("all");
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  // Update arrow states based on scroll position
  const checkScroll = React.useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 12);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 12);
  }, []);

  React.useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, filteredItems]);

  // Close modal on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scroll handler with smooth physics
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardStep = 185; // compact card + gap
    const scrollOffset = direction === "left" ? -cardStep * 3 : cardStep * 3;
    container.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

  // Helper for badge visual classes
  const getBadgeClasses = (badge: string) => {
    switch (badge) {
      case "FREE":
      case "INCLUDED":
        return "bg-emerald-950/85 text-emerald-400 border border-emerald-500/40";
      case "PAID":
      case "PREMIUM":
      case "LOGISTICS":
      case "PRIORITY":
        return "bg-amber-950/85 text-[#F5C451] border border-[#D4AF37]/50";
      case "BESPOKE":
      case "SIGNATURE":
      case "CUSTOM":
      case "MANAGED":
        return "bg-[#251E10]/90 text-[#FCE082] border border-[#D4AF37]/60";
      case "HERITAGE":
      case "CULTURE":
      case "ENTERTAINMENT":
      case "BAZAAR":
        return "bg-[#141A29]/90 text-[#93C5FD] border border-[#3B82F6]/40";
      case "STUDIO":
      case "EXPERT":
      case "DEDICATED":
      case "CURATED":
      case "CONCIERGE":
        return "bg-[#20152B]/90 text-[#E9D5FF] border border-[#A855F7]/40";
      default:
        return "bg-black/70 text-[#D4AF37] border border-[#D4AF37]/40";
    }
  };

  const ActiveIcon = currentConfig.icon;
  const BannerIcon = currentConfig.bannerIcon;

  return (
    <section
      id="healthcare"
      className={cn(
        "relative w-full pt-16 sm:pt-24 pb-16 sm:pb-20 bg-[#0B0C10] text-[#F5F5F7] border-t border-[#1C1E28] select-none overflow-hidden scroll-mt-24 sm:scroll-mt-28",
        className
      )}
      aria-label="Flatel Hospital Care, Wedding Services and Leisure Tourism Showcase"
    >
      {/* Anchor aliases for direct navigation links */}
      <div id="hospitals" className="sr-only" aria-hidden="true" />
      <div id="weddings" className="sr-only" aria-hidden="true" />
      <div id="tourism" className="sr-only" aria-hidden="true" />

      {/* Ambient Luxury Lighting Glows */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08),transparent_70%)] -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 w-[450px] h-[350px] bg-[radial-gradient(ellipse_at_bottom_right,rgba(212,175,55,0.04),transparent_70%)] -z-10"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1540px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-10">
        {/* ========================================================= */}
        {/* 1. MASTER CATEGORY SELECTOR (HOSPITAL / WEDDING / TOURISM)*/}
        {/* ========================================================= */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          {/* Eyebrow Label Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#131520] border border-[#D4AF37]/35 text-[#D4AF37] text-[11px] font-mono uppercase tracking-widest mb-4 shadow-xs">
            <ActiveIcon className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{currentConfig.eyebrow}</span>
          </div>

          {/* Luxury 3-Way Category Pill Bar */}
          <div className="p-1 sm:p-1.5 rounded-2xl bg-[#12141F] border border-[#2B3045] inline-flex items-center gap-1.5 sm:gap-2 mb-6 max-w-full overflow-x-auto shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
            {(
              [
                { key: "medical", label: "Hospital Care (19)", icon: Stethoscope },
                { key: "wedding", label: "Wedding Services (17)", icon: Heart },
                { key: "tourism", label: "Leisure & Tourism (18)", icon: Compass },
              ] as const
            ).map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => handleSelectCategory(cat.key)}
                  className={cn(
                    "flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap",
                    isActive
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#DFBC4B] text-black shadow-[0_4px_16px_rgba(212,175,55,0.35)] scale-[1.02]"
                      : "text-[#9FA3B2] hover:text-white hover:bg-[#1A1D2B]"
                  )}
                  aria-pressed={isActive}
                >
                  <Icon
                    className={cn(
                      "w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0",
                      isActive ? "text-black" : "text-[#D4AF37]"
                    )}
                  />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Section Heading */}
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight transition-all duration-200">
            {currentConfig.title}
          </h2>

          <p className="mt-2.5 text-xs sm:text-sm text-[#9FA3B2] max-w-2xl mx-auto leading-relaxed">
            {currentConfig.subtitle}
          </p>

          {/* Category-Specific Sub-Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {currentConfig.subFilters.map((sf) => {
              const isSubActive = activeSubFilter === sf.id;
              return (
                <button
                  key={sf.id}
                  onClick={() => {
                    setActiveSubFilter(sf.id);
                    if (scrollContainerRef.current) {
                      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
                    }
                  }}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 border cursor-pointer flex items-center gap-1.5",
                    isSubActive
                      ? "bg-[#D4AF37] text-black border-[#D4AF37] font-semibold shadow-[0_2px_12px_rgba(212,175,55,0.25)]"
                      : "bg-[#131520] text-[#A1A1AA] border-[#252838] hover:text-white hover:border-[#D4AF37]/40"
                  )}
                >
                  {sf.id === "free" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                  {sf.id === "paid" && <span className="w-1.5 h-1.5 rounded-full bg-[#E5B54F]" />}
                  <span>{sf.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. CAROUSEL WRAPPER WITH COMPACT ARCH CARDS               */}
        {/* ========================================================= */}
        <div className="relative group/carousel px-1 sm:px-2">
          {/* FLOATING LEFT SCROLL ARROW (DESKTOP) */}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left to view previous services"
            className={cn(
              "absolute -left-2 sm:-left-4 top-[40%] -translate-y-1/2 z-20",
              "w-10 h-10 rounded-full",
              "flex items-center justify-center",
              "bg-[#11131C]/90 backdrop-blur-md border border-[#D4AF37]/40 text-white",
              "shadow-[0_8px_20px_rgba(0,0,0,0.6)]",
              "transition-all duration-200 ease-out cursor-pointer",
              "hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] hover:scale-110",
              "active:scale-95",
              !canScrollLeft && "opacity-0 pointer-events-none"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* FLOATING RIGHT SCROLL ARROW (DESKTOP) */}
          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right to view more services"
            className={cn(
              "absolute -right-2 sm:-right-4 top-[40%] -translate-y-1/2 z-20",
              "w-10 h-10 rounded-full",
              "flex items-center justify-center",
              "bg-[#11131C]/90 backdrop-blur-md border border-[#D4AF37]/40 text-white",
              "shadow-[0_8px_20px_rgba(0,0,0,0.6)]",
              "transition-all duration-200 ease-out cursor-pointer",
              "hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] hover:scale-110",
              "active:scale-95",
              !canScrollRight && "opacity-0 pointer-events-none"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* ========================================================= */}
          {/* 3. HORIZONTAL SCROLL TRACK (COMPACT SLENDER ARCH CARDS)   */}
          {/* ========================================================= */}
          <div
            ref={scrollContainerRef}
            className="w-full flex items-stretch gap-3.5 sm:gap-4.5 overflow-x-auto scroll-smooth pb-5 pt-1 px-1 scrollbar-none snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative flex flex-col shrink-0 w-[145px] sm:w-[165px] md:w-[180px] cursor-pointer snap-start transition-all duration-300 hover:-translate-y-1 focus:outline-none"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedItem(item);
                  }
                }}
                aria-label={`View details for ${item.title}`}
              >
                {/* ARCHED CARD CONTAINER (Slender, Elegant Arch Silhouette) */}
                <div
                  className={cn(
                    "relative w-full aspect-[3/4] rounded-t-[75px] sm:rounded-t-[90px] rounded-b-xl overflow-hidden",
                    "bg-[#131520] border border-[#242738]",
                    "group-hover:border-[#D4AF37] group-hover:shadow-[0_10px_26px_rgba(212,175,55,0.2)]",
                    "transition-all duration-300 p-1.5 flex flex-col justify-between"
                  )}
                >
                  {/* Inner Arched Photo */}
                  <div className="relative w-full h-full rounded-t-[70px] sm:rounded-t-[84px] rounded-b-lg overflow-hidden bg-[#0A0C12]">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover object-center group-hover:scale-106 transition-transform duration-500 ease-out"
                      sizes="(max-width: 640px) 145px, (max-width: 768px) 165px, 180px"
                    />

                    {/* Subtle soft dark gradient overlay for depth */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Item Number Pill (Top Center) */}
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-white/10 text-[10px] font-mono font-medium text-[#D4AF37]">
                      #{item.number}
                    </div>

                    {/* Minimal Category/Status Badge (Bottom Center) */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-center">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-[9px] sm:text-[9.5px] font-semibold tracking-wider uppercase backdrop-blur-md shadow-xs truncate max-w-full",
                          getBadgeClasses(item.badge)
                        )}
                      >
                        {item.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* BOTTOM LABEL & ARROW (Clean Reference Style) */}
                <div className="pt-2.5 pb-0.5 text-center px-1">
                  <div className="inline-flex items-center justify-center gap-1 group-hover:text-[#D4AF37] transition-colors w-full">
                    <span className="font-heading text-xs sm:text-[13px] font-semibold text-white tracking-wide truncate leading-tight">
                      {item.shortTitle}
                    </span>
                    <ArrowRight className="w-3 h-3 text-[#D4AF37] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>

                  <p className="mt-0.5 text-[10.5px] text-[#8E909B] text-center line-clamp-1 group-hover:text-[#A1A1AA] transition-colors">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Bottom Navigation Hint & Arrows */}
          <div className="flex sm:hidden items-center justify-between mt-3 px-1">
            <span className="text-[11px] text-[#8E909B] font-mono">
              Swipe to explore {filteredItems.length} inclusions
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous service"
                className="w-7 h-7 rounded-full flex items-center justify-center bg-[#131520] border border-[#252838] text-white disabled:opacity-30"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                aria-label="Next service"
                className="w-7 h-7 rounded-full flex items-center justify-center bg-[#131520] border border-[#252838] text-white disabled:opacity-30"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. VERIFICATION STRIP & WHATSAPP CARE INQUIRY BANNER      */}
        {/* ========================================================= */}
        <div className="mt-12 sm:mt-14 rounded-2xl bg-[#12141F] border border-[#282D40] p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 text-left">
            <div className="w-11 h-11 rounded-xl bg-[#1A1D2B] text-[#D4AF37] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
              <BannerIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">
                {currentConfig.bannerTitle}
              </h4>
              <p className="text-xs text-[#8E909B] mt-0.5 leading-relaxed">
                {currentConfig.bannerDesc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="tel:+917989100711"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A1D2B] border border-[#30364B] text-white text-xs font-semibold hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+91 7989100711</span>
            </a>

            <a
              href={WHATSAPP_CONFIG.getUrl(currentConfig.bannerActionQuery)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-black text-xs font-bold hover:bg-[#20BE5B] transition-all shadow-md"
            >
              <span>{currentConfig.bannerActionText}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. INTERACTIVE DETAIL MODAL                                */}
      {/* ========================================================= */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-xl rounded-2xl bg-[#12141F] border border-[#D4AF37]/40 shadow-2xl overflow-hidden p-6 text-left max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1C1F2E] text-[#A1A1AA] hover:text-white hover:bg-[#282D42] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Body */}
            <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start">
              {/* Arched Thumbnail */}
              <div className="relative w-36 h-48 sm:w-40 sm:h-52 rounded-t-[70px] rounded-b-xl overflow-hidden border-2 border-[#D4AF37]/40 shrink-0 bg-[#0A0C12]">
                <Image
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/70 text-[10px] font-mono text-[#D4AF37]">
                  #{selectedItem.number}
                </div>
              </div>

              {/* Text Information */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      getBadgeClasses(selectedItem.badge)
                    )}
                  >
                    {selectedItem.badge}
                  </span>
                  <span className="text-xs text-[#8E909B] font-mono">
                    Ref #{selectedItem.number}
                  </span>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold text-white leading-snug">
                  {selectedItem.title}
                </h3>

                <p className="mt-2 text-xs text-[#A1A1AA] leading-relaxed">
                  {selectedItem.detailedDesc}
                </p>

                {/* Key Inclusions Bullet List */}
                <div className="mt-3.5 space-y-1.5">
                  <span className="text-[11px] font-semibold text-[#D4AF37] uppercase tracking-wider">
                    Service Highlights:
                  </span>
                  {selectedItem.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#CAD0DB]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Action CTA */}
            <div className="mt-6 pt-4 border-t border-[#232738] flex flex-col sm:flex-row items-center justify-between gap-3">
              <a
                href="tel:+917989100711"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#1A1D2B] border border-[#30364B] text-white text-xs font-semibold hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Concierge</span>
              </a>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
                >
                  Close
                </button>

                <a
                  href={WHATSAPP_CONFIG.getUrl(
                    `Hello Flatel Concierge, I would like to inquire about ${selectedItem.title} (Ref #${selectedItem.number}) for my stay/event.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-black text-xs font-bold hover:bg-[#20BE5B] transition-all shadow-md"
                >
                  <span>Request on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
