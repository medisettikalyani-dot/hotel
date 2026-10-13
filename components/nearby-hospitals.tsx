"use client";

import * as React from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Ambulance,
  Navigation,
  Search,
  X,
  HeartHandshake,
  Pill,
  CalendarCheck,
  AlertCircle,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface HospitalRecord {
  id: string;
  name: string;
  shortName: string;
  specialty: string;
  specialtyCode: "multi-speciality" | "oncology" | "gastroenterology" | "government";
  locality: string;
  address: string;
  phone: string;
  phoneRaw: string;
  ambulanceNumber: string;
  ambulanceRaw: string;
  transitTime: string;
  googleMapsUrl: string;
  imageUrl: string;
}

export interface MedicalService {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const MEDICAL_SERVICES: MedicalService[] = [
  {
    id: "ambulance",
    title: "Ambulance Assistance",
    description: "24×7 coordination for emergency ambulance dispatch to partner hospitals.",
    icon: Ambulance,
  },
  {
    id: "guide",
    title: "Hospital Guide",
    description: "Assistance with hospital visits, admissions, and desk navigation.",
    icon: HeartHandshake,
  },
  {
    id: "pharmacy",
    title: "Medicine Delivery",
    description: "Prescription pickup and doorstep delivery directly to your apartment.",
    icon: Pill,
  },
  {
    id: "appointment",
    title: "Doctor Appointment",
    description: "Help scheduling consultation slots and OPD visits with specialists.",
    icon: CalendarCheck,
  },
];

export const HOSPITAL_RECORDS: HospitalRecord[] = [
  {
    id: "apollo",
    name: "Apollo Hospitals",
    shortName: "Apollo Hospitals",
    specialty: "Multi-Speciality",
    specialtyCode: "multi-speciality",
    locality: "Jubilee Hills",
    address: "Road No 72, Jubilee Hills, Hyderabad",
    phone: "040-2360-7777",
    phoneRaw: "+914023607777",
    ambulanceNumber: "1066",
    ambulanceRaw: "1066",
    transitTime: "10–25 mins drive",
    googleMapsUrl: "https://maps.google.com/?q=Apollo+Hospitals+Jubilee+Hills+Hyderabad",
    imageUrl: "/images/hospital-apollo.jpg",
  },
  {
    id: "yashoda",
    name: "Yashoda Hospitals",
    shortName: "Yashoda Hospitals",
    specialty: "Oncology",
    specialtyCode: "oncology",
    locality: "Somajiguda",
    address: "Raj Bhavan Road, Somajiguda, Hyderabad",
    phone: "040-4567-4567",
    phoneRaw: "+914045674567",
    ambulanceNumber: "040-4567-1066",
    ambulanceRaw: "+914045671066",
    transitTime: "12 mins drive",
    googleMapsUrl: "https://maps.google.com/?q=Yashoda+Hospital+Somajiguda+Hyderabad",
    imageUrl: "/images/hospital-yashoda.jpg",
  },
  {
    id: "kims",
    name: "KIMS Hospitals",
    shortName: "KIMS Hospitals",
    specialty: "Multi-Speciality",
    specialtyCode: "multi-speciality",
    locality: "Secunderabad",
    address: "Minister Road, Secunderabad, Hyderabad",
    phone: "040-4488-5000",
    phoneRaw: "+914044885000",
    ambulanceNumber: "1800-599-1066",
    ambulanceRaw: "18005991066",
    transitTime: "20 mins drive",
    googleMapsUrl: "https://maps.google.com/?q=KIMS+Hospital+Secunderabad",
    imageUrl: "/images/hospital-kims.jpg",
  },
  {
    id: "virinchi",
    name: "Virinchi Hospitals",
    shortName: "Virinchi Hospitals",
    specialty: "Multi-Speciality",
    specialtyCode: "multi-speciality",
    locality: "Banjara Hills",
    address: "Road No 1, Banjara Hills, Hyderabad",
    phone: "040-2333-6666",
    phoneRaw: "+914023336666",
    ambulanceNumber: "040-2333-1066",
    ambulanceRaw: "+914023331066",
    transitTime: "18 mins drive",
    googleMapsUrl: "https://maps.google.com/?q=Virinchi+Hospitals+Banjara+Hills",
    imageUrl: "/images/hospital-virinchi.jpg",
  },
  {
    id: "aig",
    name: "AIG Hospitals",
    shortName: "AIG Hospitals",
    specialty: "Gastroenterology",
    specialtyCode: "gastroenterology",
    locality: "Gachibowli",
    address: "Mindspace Road, Gachibowli, Hyderabad",
    phone: "040-4244-4444",
    phoneRaw: "+914042444444",
    ambulanceNumber: "040-4244-1066",
    ambulanceRaw: "+914042441066",
    transitTime: "25 mins via ORR",
    googleMapsUrl: "https://maps.google.com/?q=AIG+Hospitals+Gachibowli",
    imageUrl: "/images/hospital-aig.jpg",
  },
  {
    id: "aware-global",
    name: "Aware Global Hospital",
    shortName: "Aware Global Hospital",
    specialty: "Multi-Speciality",
    specialtyCode: "multi-speciality",
    locality: "LB Nagar",
    address: "Sagar Road, LB Nagar, Hyderabad",
    phone: "040-6719-9999",
    phoneRaw: "+914067199999",
    ambulanceNumber: "040-6719-1066",
    ambulanceRaw: "+914067191066",
    transitTime: "15 mins drive",
    googleMapsUrl: "https://maps.google.com/?q=Aware+Global+Hospital+LB+Nagar",
    imageUrl: "/images/hospital-aware-global.jpg",
  },
  {
    id: "gandhi",
    name: "Gandhi Hospital",
    shortName: "Gandhi Hospital",
    specialty: "Government",
    specialtyCode: "government",
    locality: "Secunderabad",
    address: "Musheerabad, Padmarao Nagar, Secunderabad",
    phone: "040-2777-0221",
    phoneRaw: "+914027770221",
    ambulanceNumber: "108",
    ambulanceRaw: "108",
    transitTime: "20 mins drive",
    googleMapsUrl: "https://maps.google.com/?q=Gandhi+Hospital+Secunderabad",
    imageUrl: "/images/hospital-gandhi.jpg",
  },
  {
    id: "owaisi",
    name: "Owaisi Hospital & Research Centre",
    shortName: "Owaisi Hospital",
    specialty: "Multi-Speciality",
    specialtyCode: "multi-speciality",
    locality: "Kanchanbagh / Santosh Nagar",
    address: "Near DMRL 'X' Road, Kanchanbagh, Hyderabad",
    phone: "040-2434-2222",
    phoneRaw: "+914024342222",
    ambulanceNumber: "1066",
    ambulanceRaw: "1066",
    transitTime: "6 mins drive",
    googleMapsUrl: "https://maps.google.com/?q=Owaisi+Hospital+Kanchanbagh+Hyderabad",
    imageUrl: "/images/hospital-owaisi.jpg",
  },
];

const SPECIALTY_FILTERS = [
  { id: "all", label: "All Hospitals" },
  { id: "multi-speciality", label: "Multi-Speciality" },
  { id: "oncology", label: "Oncology" },
  { id: "gastroenterology", label: "Gastroenterology" },
  { id: "government", label: "Government" },
] as const;

interface NearbyHospitalsProps {
  className?: string;
}

export function NearbyHospitals({ className }: NearbyHospitalsProps) {
  const [selectedSpecialty, setSelectedSpecialty] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  // Filtered hospital directory
  const filteredHospitals = React.useMemo(() => {
    return HOSPITAL_RECORDS.filter((item) => {
      const matchesSpecialty =
        selectedSpecialty === "all" || item.specialtyCode === selectedSpecialty;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.locality.toLowerCase().includes(q) ||
        item.address.toLowerCase().includes(q) ||
        item.specialty.toLowerCase().includes(q);

      return matchesSpecialty && matchesSearch;
    });
  }, [selectedSpecialty, searchQuery]);

  return (
    <section
      id="healthcare"
      className={cn(
        "relative w-full bg-[#121316] text-[#F5F5F7] py-12 sm:py-14 lg:py-16 border-t border-[#2E3038]",
        className
      )}
      aria-labelledby="hospitals-heading"
    >
      {/* Anchor for direct /#hospitals link compatibility */}
      <div id="hospitals" className="absolute -top-24 pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ========================================================== */}
        {/* 1. SIMPLE SECTION INTRODUCTION                             */}
        {/* ========================================================== */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-wider text-[#D4AF37] uppercase mb-1.5">
            TRUSTED CARE
          </p>
          <h2
            id="hospitals-heading"
            className="font-heading text-2xl sm:text-3xl md:text-4xl text-[#F5F5F7] font-bold tracking-tight"
          >
            Hospitals &amp; Medical Support
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
            Find hospitals and assistance for your stay in Hyderabad.
          </p>
        </div>

        {/* ========================================================== */}
        {/* 2. MEDICAL-SUPPORT SERVICES (4 CLEAN CARDS)                */}
        {/* ========================================================== */}
        <div className="mt-8 sm:mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {MEDICAL_SERVICES.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="rounded-2xl bg-[#1C1E24] border border-[#2E3038] hover:border-[#D4AF37]/40 p-3.5 sm:p-4 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] mb-2.5">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-[#F5F5F7]">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed mt-1">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================== */}
        {/* 3. CLEAN HOSPITAL DIRECTORY                                */}
        {/* ========================================================== */}
        <div className="mt-14 sm:mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F5F5F7] tracking-tight">
                Hospitals in Hyderabad
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
                Choose a hospital to view its location, call, or get directions.
              </p>
            </div>

            <span className="text-xs text-[#A1A1AA] shrink-0">
              Showing <strong className="text-[#D4AF37]">{filteredHospitals.length}</strong> of {HOSPITAL_RECORDS.length} hospitals
            </span>
          </div>

          {/* Search and Filters Bar */}
          <div className="p-3 rounded-2xl bg-[#1C1E24] border border-[#2E3038] mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 min-w-0 sm:min-w-[220px]">
              <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hospital name or locality..."
                className="w-full bg-[#121316] border border-[#2E3038] focus:border-[#D4AF37] rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm text-[#F5F5F7] placeholder-[#71717A] focus:outline-hidden transition-colors"
                aria-label="Search hospitals by name or locality"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#F5F5F7] p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Specialty Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {SPECIALTY_FILTERS.map((filter) => {
                const isActive = selectedSpecialty === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setSelectedSpecialty(filter.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0",
                      isActive
                        ? "bg-[#D4AF37] text-[#121316] font-semibold"
                        : "bg-[#121316] text-[#A1A1AA] hover:text-[#F5F5F7] border border-[#2E3038] hover:border-[#D4AF37]/40"
                    )}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hospital Grid: 4 cols on wide desktop, 3 on desktop, 2 on tablet, 1 on mobile */}
          {filteredHospitals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredHospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="rounded-2xl bg-[#1C1E24] border border-[#2E3038] hover:border-[#D4AF37]/40 transition-colors flex flex-col justify-between overflow-hidden group h-full"
                >
                  {/* Compact Image Header (approx 120-140px) with Specialty Pill */}
                  <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-[#161822] shrink-0">
                    <Image
                      src={hospital.imageUrl}
                      alt={hospital.name}
                      fill
                      quality={85}
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1E24] via-black/30 to-black/10" />

                    {/* Small Specialty Pill */}
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#121316]/90 backdrop-blur-xs text-[#D4AF37] border border-[#2E3038]">
                        {hospital.specialty}
                      </span>
                    </div>

                    {/* Small Drive-Time Label */}
                    <div className="absolute bottom-2 left-2.5 text-[10.5px] text-[#F5D061] font-medium flex items-center gap-1 drop-shadow-sm">
                      <Clock className="w-3 h-3 text-[#D4AF37]" />
                      <span>{hospital.transitTime}</span>
                    </div>
                  </div>

                  {/* Compact Card Body (14-16px padding) */}
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* 1. Hospital Name & 2. Locality */}
                      <div className="space-y-0.5">
                        <h4
                          className="font-heading text-base font-bold text-[#F5F5F7] tracking-tight group-hover:text-[#D4AF37] transition-colors leading-snug line-clamp-1"
                          title={hospital.name}
                        >
                          {hospital.name}
                        </h4>
                        <p className="text-[11px] text-[#C5A880] font-medium">
                          {hospital.locality}
                        </p>
                      </div>

                      {/* 3. Address */}
                      <p
                        className="text-[11px] text-[#A1A1AA] leading-tight line-clamp-1 mt-1.5 flex items-center gap-1"
                        title={hospital.address}
                      >
                        <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
                        <span className="truncate">{hospital.address}</span>
                      </p>

                      {/* 4. Contact Numbers (Compact Section) */}
                      <div className="mt-2.5 pt-2.5 border-t border-[#2E3038]/60 space-y-1 text-[11px]">
                        <div className="flex items-center justify-between">
                          <a
                            href={`tel:${hospital.phoneRaw}`}
                            className="flex items-center gap-1 text-[#F5F5F7] hover:text-[#D4AF37] font-semibold transition-colors"
                          >
                            <Phone className="w-3 h-3 text-[#D4AF37] shrink-0" />
                            <span>{hospital.phone}</span>
                          </a>
                          <span className="text-[10px] text-[#A1A1AA]">OPD</span>
                        </div>

                        {hospital.ambulanceNumber && (
                          <div className="flex items-center justify-between">
                            <a
                              href={`tel:${hospital.ambulanceRaw}`}
                              className="flex items-center gap-1 text-red-300 hover:text-red-200 font-semibold transition-colors"
                            >
                              <Ambulance className="w-3 h-3 text-red-400 shrink-0" />
                              <span>Amb: {hospital.ambulanceNumber}</span>
                            </a>
                            <span className="text-[10px] text-red-400/80">Emergency</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 5. Compact Actions: Call Hospital & Get Directions */}
                    <div className="pt-2.5 border-t border-[#2E3038] flex items-center gap-2">
                      <a
                        href={`tel:${hospital.phoneRaw}`}
                        className="flex-1 py-2 px-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center whitespace-nowrap"
                        aria-label={`Call ${hospital.name}`}
                      >
                        <Phone className="w-3 h-3 shrink-0" />
                        <span>Call Hospital</span>
                      </a>

                      <a
                        href={hospital.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-2.5 rounded-xl bg-[#121316] hover:bg-black text-[#A1A1AA] hover:text-white border border-[#2E3038] hover:border-[#D4AF37]/40 text-xs font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                        aria-label={`Get directions to ${hospital.name}`}
                      >
                        <Navigation className="w-3 h-3 text-[#D4AF37] shrink-0" />
                        <span>Directions</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl bg-[#1C1E24] border border-[#2E3038]">
              <p className="text-sm font-semibold text-white">No hospitals match your search</p>
              <p className="text-xs text-[#A1A1AA] mt-1">Try another hospital name or locality.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSpecialty("all");
                }}
                className="mt-3 px-3.5 py-1.5 rounded-xl bg-[#D4AF37] text-[#121316] font-bold text-xs"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* ========================================================== */}
        {/* 4. CONCISE NOTICE & MEDICAL DISCLAIMER                     */}
        {/* ========================================================== */}
        <div className="mt-12 p-4 rounded-xl bg-[#1C1E24] border border-[#2E3038] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#A1A1AA]">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-[#F5F5F7] font-semibold">Non-Clinical Healthcare Notice:</strong>{" "}
              Flatel Hospitality provides serviced accommodations and non-clinical concierge assistance. We do not provide clinical treatment, diagnoses, or emergency dispatch services. All medical care is delivered exclusively by licensed healthcare facilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
