"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CONTACT_PHONE,
  CONTACT_EMAIL,
  WHATSAPP_CONFIG,
} from "@/lib/constants";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "deposit-split",
    question: "How does the 20% advance deposit and payment split work?",
    answer:
      "To securely confirm and block your flat dates, you pay a flat 20% advance payment online via Razorpay or PhonePe. The remaining 80% balance is paid directly upon arrival at the property desk via Cash or UPI QR Code. You receive an instant digital booking voucher and confirmation receipt upon deposit payment.",
  },
  {
    id: "cancellation-policy",
    question: "What is your cancellation and refund policy?",
    answer:
      "We offer 100% Free Cancellation with a full refund of your 20% advance deposit if cancelled 48 hours or more prior to your scheduled check-in time. Cancellations made within 48 hours of check-in forfeit the 20% deposit, which acts as a reservation hold fee.",
  },
  {
    id: "duration-discounts",
    question: "Do you offer automatic discounts for weekly or monthly stays?",
    answer:
      "Yes! Our booking engine automatically applies discounts to your base room rent: 10% discount for weekly stays (7 to 14 nights), 15% discount for 15 to 27 nights, and 25% discount for monthly stays (28+ nights). The discount is calculated in real time during checkout.",
  },
  {
    id: "checkin-timings",
    question: "What are the standard check-in and check-out timings?",
    answer:
      "Standard flexible check-in is between 11:00 AM and 1:00 PM. Standard check-out is 11:00 AM sharp to allow our staff to deep-sanitize and prepare the residence for incoming guests. Priority check-in windows can be coordinated through our concierge.",
  },
  {
    id: "id-requirements",
    question: "What guest identification documents are required at check-in?",
    answer:
      "By law, valid identification is mandatory for all adult guests: Domestic Indian guests must present one original government photo ID per adult (Driver's License, Voter ID, Passport, or Aadhaar). International travelers must present their original valid physical Passport at check-in.",
  },
  {
    id: "kids-policy",
    question: "Are children allowed, and what is the policy for kids?",
    answer:
      "Children aged 0–12 years stay completely FREE! They are counted toward unit safety capacity but incur ₹0 extra guest fees. For extra adults beyond the base bedroom capacity, an extra person fee of ₹500 per person per night applies. Complimentary infant baby cots are available upon request.",
  },
  {
    id: "housekeeping-schedule",
    question: "How does the housekeeping schedule work?",
    answer:
      "Complimentary professional housekeeping is provided on alternate days across all reservations (daily stays, 15-day stays, and monthly stays). This includes floor sanitation, dusting, trash clearance, and linen refreshes.",
  },
  {
    id: "kitchen-utilities",
    question: "Are cooking gas, utilities, and kitchen staples included?",
    answer:
      "Yes, completely included with zero surcharges! Every flat includes a private modular kitchen with a multi-burner gas stove (piped gas included), double-door refrigerator, RO drinking water purifier, microwave oven, electric kettle, cookware, and starter kitchen staples (tea leaves, sugar, salt, chili powder, and turmeric).",
  },
  {
    id: "medistay-support",
    question: "What medical support is provided under Medistay?",
    answer:
      "For medical guests visiting Apollo, Yashoda, KIMS, Owaisi, or nearby hospitals, Flatel provides: complimentary 24/7 ambulance coordination, hospital timing guides, wheelchair support, and in-flat setup of hospital beds, IV stands, glucometers, BP monitors, and pulse oximeters at no extra cost.",
  },
  {
    id: "locations",
    question: "Where are the Flatel properties located in Hyderabad?",
    answer:
      "We operate two prime flagship branches: Barkas Salala (near Rajiv Gandhi International Airport, Chandrayangutta, and Owaisi Hospital) and Moghal Pura (in the historic heart of Hyderabad, near Charminar and Princess Esra Hospital). Both feature dedicated on-site reception desks.",
  },
];

interface FaqSectionProps {
  className?: string;
}

export function FaqSection({ className }: FaqSectionProps) {
  // First item open by default for immediate context
  const [expandedId, setExpandedId] = React.useState<string | null>("deposit-split");

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const whatsappInquiryUrl = WHATSAPP_CONFIG.getUrl(
    "Hello Flatel Concierge, I have a question regarding booking a serviced flat."
  );

  return (
    <section
      id="faq"
      className={cn(
        "scroll-mt-20 relative w-full bg-[#121316] text-[#F5F5F7] py-20 sm:py-24 lg:py-28 border-t border-[#2E3038] select-none overflow-hidden",
        className
      )}
      aria-labelledby="faq-heading"
    >
      <div id="policies" className="sr-only" aria-hidden="true" />
      {/* Luxury Subtle Radial Ambient Glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.04),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================== */}
        {/* 1. SECTION HEADER (CENTERED SERIF LIKE REFERENCE DESIGN)   */}
        {/* ========================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-3">
            <div className="h-[1px] w-12 sm:w-20 md:w-28 bg-gradient-to-r from-transparent to-[#D4AF37]/80" />
            <span className="text-xs sm:text-[13px] font-sans font-bold tracking-[0.25em] text-[#D4AF37] uppercase">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <div className="h-[1px] w-12 sm:w-20 md:w-28 bg-gradient-to-l from-transparent to-[#D4AF37]/80" />
          </div>

          <h2
            id="faq-heading"
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-normal tracking-tight text-[#F5F5F7] leading-tight"
          >
            Commonly Asked Questions
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#A1A1AA] font-sans max-w-lg mx-auto">
            Everything you need to know about our reservation deposit, check-in policies, private kitchens, and stay rules.
          </p>
        </div>

        {/* ========================================================== */}
        {/* 2. MINIMAL LINED FAQ LIST (EXACT REFERENCE REPLICATION)    */}
        {/* ========================================================== */}
        <div className="border-t border-[#2E3038]/80 divide-y divide-[#2E3038]/80">
          {FAQS.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div key={faq.id} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  aria-expanded={isExpanded}
                  className="w-full py-4 sm:py-5 flex items-center justify-start gap-3 sm:gap-4 text-left cursor-pointer group focus:outline-none"
                >
                  {/* Downward Triangle Arrow Icon (Matching Reference Style) */}
                  <span
                    className={cn(
                      "text-[#D4AF37] transition-transform duration-300 text-[10px] sm:text-xs shrink-0 select-none",
                      isExpanded ? "rotate-180 text-[#F5D061]" : "rotate-0 text-[#D4AF37]/80 group-hover:text-[#D4AF37]"
                    )}
                    aria-hidden="true"
                  >
                    ▼
                  </span>

                  {/* Question in Classic Italic Serif Typography */}
                  <span
                    className={cn(
                      "font-serif italic text-base sm:text-lg md:text-[19px] transition-colors leading-snug",
                      isExpanded
                        ? "text-[#D4AF37]"
                        : "text-[#F5F5F7] group-hover:text-[#D4AF37]"
                    )}
                  >
                    {faq.question}
                  </span>
                </button>

                {/* Smooth Expandable Answer */}
                {isExpanded && (
                  <div className="pl-6 sm:pl-7 pr-2 pb-5 sm:pb-6 text-xs sm:text-[13.5px] text-[#A1A1AA] font-sans leading-relaxed animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ========================================================== */}
        {/* 3. MINIMAL LUXURY CONCIERGE FOOTNOTE                       */}
        {/* ========================================================== */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#2E3038]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-[#A1A1AA]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span>Have a specific requirement? Our 24/7 concierge is on call.</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#D4AF37] font-sans font-semibold hover:text-[#F5D061] transition-colors"
            >
              <span>Chat on WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <span className="text-[#2E3038]" aria-hidden="true">|</span>

            <a
              href={`tel:${CONTACT_PHONE.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center gap-1.5 text-[#F5F5F7] font-mono hover:text-[#D4AF37] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#D4AF37]" />
              <span>{CONTACT_PHONE}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
