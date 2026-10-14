"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  User,
  ChevronRight,
  ChevronDown,
  Building2,
  MapPin,
  ExternalLink,
  LogOut,
  CalendarCheck,
  ShieldCheck,
  LogIn,
  UserPlus,
  Search,
} from "lucide-react";
import {
  HEADER_NAVIGATION,
} from "@/lib/constants";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";

// Branch navigation metadata with descriptions and specs
const BRANCH_ITEMS = [
  {
    name: "Barkas Salala",
    slug: "barkas-salala",
    href: "/properties/3bhk",
    location: "Near Chandrayangutta",
    description: "Two 3 BHK Residences · 6–9 Guests",
  },
  {
    name: "Moghal Pura",
    slug: "moghal-pura",
    href: "/#flats?branch=moghal-pura",
    location: "Near Charminar",
    description: "1, 2 & 4 BHK Residences · 2–12 Guests",
  },
] as const;

function SiteHeaderContent() {
  const pathname = usePathname();
  const { user, isAdmin, openAuthModal, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobileBranchesOpen, setIsMobileBranchesOpen] = React.useState(true);
  const [isBranchesDropdownOpen, setIsBranchesDropdownOpen] = React.useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const branchesButtonRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const userDropdownRef = React.useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Track scroll position to update subtle border state
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle click outside to dismiss desktop dropdowns
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        branchesButtonRef.current &&
        !branchesButtonRef.current.contains(event.target as Node)
      ) {
        setIsBranchesDropdownOpen(false);
      }

      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    if (isBranchesDropdownOpen || isUserDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isBranchesDropdownOpen, isUserDropdownOpen]);

  // Handle escape key to close menus
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isBranchesDropdownOpen) {
          setIsBranchesDropdownOpen(false);
          branchesButtonRef.current?.focus();
        }
        if (isUserDropdownOpen) {
          setIsUserDropdownOpen(false);
        }
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBranchesDropdownOpen, isUserDropdownOpen, isMobileMenuOpen]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsBranchesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsBranchesDropdownOpen(false);
    }, 150);
  };

  const isBranchesActive = pathname.startsWith("/branches");

  const handleSearchClick = () => {
    if (pathname === "/") {
      const el = document.getElementById("booking-search-bar") || document.getElementById("flats");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        const input = el.querySelector("input");
        if (input) input.focus();
      }
    } else {
      window.location.href = "/#booking-search-bar";
    }
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-colors duration-200 select-none",
          "bg-[#121316]",
          isScrolled
            ? "border-b border-[#2E3038] shadow-[0_4px_20px_rgba(0,0,0,0.65)]"
            : "border-b border-[#2E3038]/60"
        )}
      >
        <div className="mx-auto flex h-[66px] sm:h-[74px] w-full max-w-7xl items-center justify-between px-3.5 sm:px-6 lg:px-8 xl:px-10">
          {/* ========================================================= */}
          {/* LEFT: BRAND LOCKUP                                        */}
          {/* FLATEL HOSPITALITY                                        */}
          {/* The comfort of a flat. The service of a hotel.            */}
          {/* ========================================================= */}
          <div className="flex items-center shrink-0">
            <Link
              href={HEADER_NAVIGATION.brand.href}
              className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded-xs py-1"
              aria-label="FLATEL Hospitality — The comfort of a flat. The service of a hotel."
            >
              {/* Gold House Emblem matching concept mockup */}
              <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-md border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] bg-[#1C1E24]/80 shadow-xs shrink-0 group-hover:border-[#E5B54F] transition-colors">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#D4AF37]">
                  <path d="M3 10.5L12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-9z" />
                  <path d="M9 21V12h6v9" />
                </svg>
              </div>
              <div className="flex flex-col items-start min-w-0">
                <span className="font-heading text-[16px] sm:text-[20px] lg:text-[21px] font-semibold tracking-[0.06em] text-[#F5F5F7] group-hover:text-[#D4AF37] transition-colors duration-200 leading-none">
                  FLATEL HOSPITALITY
                </span>
                <span className="font-sans text-[8px] sm:text-[9px] font-medium text-[#C5A880] uppercase leading-none mt-1 sm:mt-1.5 transition-colors duration-200">
                  <span className="hidden sm:inline tracking-[0.12em]">THE COMFORT OF A FLAT. THE SERVICE OF A HOTEL.</span>
                  <span className="sm:hidden tracking-[0.14em]">SERVICED APARTMENTS</span>
                </span>
              </div>
            </Link>
          </div>

          {/* ========================================================= */}
          {/* DESKTOP NAVIGATION (RIGHT / CENTER)                       */}
          {/* Strictly aligned with final-prd.md Section 7.1            */}
          {/* Branches (Dropdown), Stays, Amenities, Reviews, About, FAQs */}
          {/* Actions: Hotline, WhatsApp, Admin Login                   */}
          {/* ========================================================= */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {/* Core Navigation Links */}
            <nav
              className="flex items-center gap-4.5 xl:gap-6"
              aria-label="Primary Navigation"
            >
              {/* 1. Properties */}
              <Link
                href="/#flats"
                className={cn(
                  "relative py-1 text-[13px] xl:text-[13.5px] font-sans font-medium tracking-[0.01em] transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded-xs",
                  pathname === "/#flats" || pathname === "/"
                    ? "text-[#F5F5F7] hover:text-[#D4AF37]"
                    : "text-[#A1A1AA] hover:text-[#D4AF37]"
                )}
              >
                <span>Properties</span>
              </Link>

              {/* 2. Amenities */}
              <Link
                href="/#amenities"
                className={cn(
                  "relative py-1 text-[13px] xl:text-[13.5px] font-sans font-medium tracking-[0.01em] transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded-xs",
                  pathname === "/#amenities"
                    ? "text-[#D4AF37]"
                    : "text-[#A1A1AA] hover:text-[#D4AF37]"
                )}
              >
                <span>Amenities</span>
              </Link>

              {/* 3. Hospitals */}
              <Link
                href="/#healthcare"
                className={cn(
                  "relative py-1 text-[13px] xl:text-[13.5px] font-sans font-medium tracking-[0.01em] transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded-xs",
                  pathname === "/#healthcare"
                    ? "text-[#D4AF37]"
                    : "text-[#A1A1AA] hover:text-[#D4AF37]"
                )}
              >
                <span>Hospitals</span>
              </Link>

              {/* 4. Branches (Dropdown) */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  ref={branchesButtonRef}
                  id="branches-menu-trigger"
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={isBranchesDropdownOpen}
                  aria-controls="branches-dropdown-menu"
                  onClick={() => setIsBranchesDropdownOpen((prev) => !prev)}
                  className={cn(
                    "relative inline-flex items-center gap-1.5 py-1 text-[13px] xl:text-[13.5px] font-sans font-medium tracking-[0.01em] transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded-xs cursor-pointer",
                    isBranchesActive || isBranchesDropdownOpen
                      ? "text-[#D4AF37]"
                      : "text-[#A1A1AA] hover:text-[#D4AF37]"
                  )}
                >
                  <span>Branches</span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      isBranchesDropdownOpen ? "rotate-180 text-[#D4AF37]" : "text-[#A1A1AA]"
                    )}
                  />
                  {isBranchesActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  )}
                </button>

                {/* Dropdown Menu Flyout */}
                {isBranchesDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    id="branches-dropdown-menu"
                    role="menu"
                    aria-labelledby="branches-menu-trigger"
                    className="absolute top-full left-0 mt-2 w-72 rounded-xl bg-[#1C1E24] border border-[#2E3038] shadow-[0_16px_40px_rgba(0,0,0,0.7)] p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  >
                    <div className="px-3 py-1.5 text-[10px] uppercase font-sans font-semibold tracking-[0.18em] text-[#C5A880]">
                      Official Branches
                    </div>

                    <div className="space-y-1">
                      {BRANCH_ITEMS.map((branch) => {
                        const isCurrent = pathname === branch.href;
                        return (
                          <Link
                            key={branch.slug}
                            href={branch.href}
                            role="menuitem"
                            onClick={() => setIsBranchesDropdownOpen(false)}
                            className={cn(
                              "flex flex-col gap-0.5 px-3 py-2.5 rounded-lg transition-colors group",
                              isCurrent
                                ? "bg-[#121316] text-[#D4AF37] border border-[#2E3038]"
                                : "text-[#F5F5F7] hover:bg-[#252830] hover:text-[#D4AF37]"
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-heading text-sm font-semibold tracking-tight text-[#F5F5F7] group-hover:text-[#D4AF37]">
                                {branch.name}
                              </span>
                              <ChevronRight className="h-3.5 w-3.5 text-[#A1A1AA]/50 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
                            </div>
                            <span className="text-[11px] font-sans text-[#C5A880]">
                              {branch.location}
                            </span>
                            <span className="text-[11px] font-sans text-[#A1A1AA] line-clamp-1">
                              {branch.description}
                            </span>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="my-1.5 border-t border-[#2E3038]" />

                    <Link
                      href="/#locations"
                      role="menuitem"
                      onClick={() => setIsBranchesDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-sans font-medium text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-[#252830] transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3 w-3 text-[#D4AF37]" />
                        <span>All Locations Overview</span>
                      </span>
                      <ExternalLink className="h-3 w-3 text-[#A1A1AA]/60" />
                    </Link>
                  </div>
                )}
              </div>

              {/* 5. Policies */}
              <Link
                href="/policies"
                className={cn(
                  "relative py-1 text-[13px] xl:text-[13.5px] font-sans font-medium tracking-[0.01em] transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded-xs",
                  pathname === "/policies"
                    ? "text-[#D4AF37]"
                    : "text-[#A1A1AA] hover:text-[#D4AF37]"
                )}
              >
                <span>Policies</span>
              </Link>

              {/* 6. List Property */}
              <Link
                href="/list-property"
                className={cn(
                  "relative py-1 text-[13px] xl:text-[13.5px] font-sans font-medium tracking-[0.01em] transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] rounded-xs",
                  pathname === "/list-property"
                    ? "text-[#D4AF37]"
                    : "text-[#A1A1AA] hover:text-[#D4AF37]"
                )}
              >
                <span>List Property</span>
              </Link>
            </nav>

            {/* Desktop Actions matching screenshot */}
            <div className="flex items-center gap-4 xl:gap-5 shrink-0">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={handleSearchClick}
                className="inline-flex items-center gap-1.5 text-[13px] xl:text-[13.5px] font-medium text-[#A1A1AA] hover:text-[#D4AF37] transition-colors group cursor-pointer"
                aria-label="Search flats and availability"
              >
                <Search className="h-3.5 w-3.5 text-[#A1A1AA] group-hover:text-[#D4AF37] transition-colors shrink-0" />
                <span>Search</span>
              </button>

              {/* 9. Sign In Pill Button */}
              {!user ? (
                <button
                  type="button"
                  onClick={() => openAuthModal("Log in or create an account to view your bookings and access member rates.", undefined, "login")}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#D4AF37]/70 hover:border-[#D4AF37] bg-transparent hover:bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold tracking-wide transition-all focus:outline-none cursor-pointer shadow-xs"
                  aria-label="Account: Sign In"
                >
                  <User className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>Sign In</span>
                </button>
              ) : (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsUserDropdownOpen((prev) => !prev)}
                    className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1C1E24] hover:bg-[#252830] border border-[#D4AF37]/70 text-[#F5F5F7] text-xs font-medium transition-all duration-150 focus:outline-none cursor-pointer"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#121316] flex items-center justify-center font-bold text-[10px] shrink-0">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <span className="max-w-[100px] truncate font-medium">
                      {user.fullName.split(" ")[0]}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 text-[#D4AF37] transition-transform duration-200",
                        isUserDropdownOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {/* User Profile Dropdown Flyout */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-60 rounded-xl bg-[#1C1E24] border border-[#2E3038] shadow-[0_16px_40px_rgba(0,0,0,0.8)] p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 text-xs">
                      <div className="px-3 py-2 border-b border-[#2E3038] mb-1">
                        <span className="font-semibold text-white block truncate">
                          {user.fullName}
                        </span>
                        <span className="text-[11px] text-[#A1A1AA] block truncate">
                          {user.email || user.phone}
                        </span>
                        {isAdmin && (
                          <span className="inline-flex items-center gap-1 mt-1 text-[9px] font-bold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/15 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                            <ShieldCheck className="w-2.5 h-2.5" />
                            <span>Administrator</span>
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <Link
                          href="/my-bookings"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#F5F5F7] hover:bg-[#252830] hover:text-[#D4AF37] transition-colors"
                        >
                          <CalendarCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>My Reservations</span>
                        </Link>

                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setIsUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[#D4AF37] hover:bg-[#252830] transition-colors font-semibold"
                          >
                            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                            <span>Owner Admin Portal</span>
                          </Link>
                        )}
                      </div>

                      <div className="my-1 border-t border-[#2E3038]" />

                      <button
                        type="button"
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          signOut();
                        }}
                        className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* MOBILE HEADER: QUICK ACTIONS & HAMBURGER TRIGGER          */}
          {/* Touch target >= 44px                                      */}
          {/* ========================================================= */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2">
            {/* Quick User Account Action Button (Icon-Only) */}
            {!user ? (
              <button
                type="button"
                onClick={() => openAuthModal("Log in or create an account to view your bookings and access member rates.", undefined, "login")}
                className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-xl border border-[#D4AF37]/50 bg-[#1C1E24] text-[#D4AF37] hover:border-[#D4AF37] active:scale-95 transition-all shadow-xs"
                aria-label="Account: Log In or Sign Up"
                title="Account: Log In or Sign Up"
              >
                <User className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-xl border border-[#D4AF37]/60 bg-[#1C1E24] text-[#D4AF37] active:scale-95 transition-all shadow-xs"
                aria-label={`Logged in as ${user.fullName}`}
                title={user.fullName}
              >
                <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#121316] flex items-center justify-center font-bold text-[10px]">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
              </button>
            )}

            {/* Hamburger Menu Trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-gradient-to-b from-[#1C1E24] to-[#14161E] text-[#F5F5F7] hover:text-[#D4AF37] hover:border-[#D4AF37] active:scale-95 transition-all shadow-xs focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
              aria-label="Open Navigation Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-[#E6C687]" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MOBILE NAVIGATION PANEL (Intentional, Luxurious Drawer)   */}
      {/* ========================================================= */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-50 flex flex-col bg-[#121316]/98 backdrop-blur-xl text-[#F5F5F7] animate-in fade-in duration-200"
        >
          {/* Mobile Panel Header: Brand + 44px Close Button */}
          <div className="flex items-center justify-between h-[68px] sm:h-[74px] px-4 sm:px-6 border-b border-[#2E3038] bg-[#121316] shrink-0">
            <Link
              href={HEADER_NAVIGATION.brand.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2.5 focus:outline-none"
              aria-label="FLATEL Hospitality — The comfort of a flat. The service of a hotel."
            >
              <div className="w-7 h-7 rounded-md border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] bg-[#1C1E24] shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#D4AF37]">
                  <path d="M3 10.5L12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-9z" />
                  <path d="M9 21V12h6v9" />
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <span className="font-heading text-[17px] font-semibold tracking-[0.06em] text-[#F5F5F7] leading-none">
                  FLATEL HOSPITALITY
                </span>
                <span className="font-sans text-[8px] font-medium tracking-[0.1em] text-[#C5A880] uppercase leading-none mt-1">
                  The comfort of a flat. The service of a hotel.
                </span>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="h-10 w-10 flex items-center justify-center rounded-xl border border-white/10 bg-[#1C1E24] text-[#F5F5F7] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 active:scale-95 transition-all focus:outline-none"
              aria-label="Close Navigation Menu"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Mobile Navigation List */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Quick Search Action */}
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSearchClick();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-[#1C1E24] border border-[#D4AF37]/40 text-[#F5F5F7] hover:text-[#D4AF37] text-xs font-semibold shadow-xs cursor-pointer"
                >
                  <Search className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>Search Flats &amp; Availability</span>
                </button>
              </div>

              {/* Main Links matching desktop navbar exact order */}
              <div className="space-y-1 pt-1">
                {/* 1. Properties */}
                <Link
                  href="/#flats"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between min-h-[46px] px-3.5 py-2.5 rounded-xl text-[#F5F5F7] hover:text-[#D4AF37] hover:bg-[#1C1E24] active:bg-[#252830] transition-colors group"
                >
                  <span className="font-sans text-[15px] font-medium tracking-wide">
                    Properties
                  </span>
                  <ChevronRight className="h-4 w-4 text-[#A1A1AA]/50 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
                </Link>

                {/* 2. Amenities */}
                <Link
                  href="/#amenities"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between min-h-[46px] px-3.5 py-2.5 rounded-xl text-[#F5F5F7] hover:text-[#D4AF37] hover:bg-[#1C1E24] active:bg-[#252830] transition-colors group"
                >
                  <span className="font-sans text-[15px] font-medium tracking-wide">
                    Amenities
                  </span>
                  <ChevronRight className="h-4 w-4 text-[#A1A1AA]/50 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
                </Link>

                {/* 3. Hospitals */}
                <Link
                  href="/#healthcare"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between min-h-[46px] px-3.5 py-2.5 rounded-xl text-[#F5F5F7] hover:text-[#D4AF37] hover:bg-[#1C1E24] active:bg-[#252830] transition-colors group"
                >
                  <span className="font-sans text-[15px] font-medium tracking-wide">
                    Hospitals
                  </span>
                  <ChevronRight className="h-4 w-4 text-[#A1A1AA]/50 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
                </Link>

                {/* 4. Branches Accordion Group */}
                <div className="rounded-2xl border border-[#2E3038] bg-[#161822] overflow-hidden my-2">
                  <button
                    type="button"
                    onClick={() => setIsMobileBranchesOpen((prev) => !prev)}
                    className="flex items-center justify-between w-full min-h-[48px] px-4 py-3 text-left focus:outline-none cursor-pointer"
                    aria-expanded={isMobileBranchesOpen}
                  >
                    <div className="flex items-center gap-2.5">
                      <Building2 className="h-4 w-4 text-[#D4AF37]" />
                      <span className="font-heading text-[15px] font-semibold text-[#F5F5F7]">
                        Branches
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-[#A1A1AA] transition-transform duration-200",
                        isMobileBranchesOpen && "rotate-180 text-[#D4AF37]"
                      )}
                    />
                  </button>

                  {isMobileBranchesOpen && (
                    <div className="px-3 pb-3 pt-1 space-y-1.5 border-t border-[#2E3038]/60">
                      {BRANCH_ITEMS.map((branch) => (
                        <Link
                          key={branch.slug}
                          href={branch.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex flex-col p-2.5 rounded-xl bg-[#121316] border border-[#2E3038] hover:border-[#D4AF37]/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-heading text-sm font-semibold text-[#F5F5F7]">
                              {branch.name}
                            </span>
                            <ChevronRight className="h-3.5 w-3.5 text-[#D4AF37]" />
                          </div>
                          <span className="text-[11px] font-sans text-[#C5A880] mt-0.5">
                            {branch.location}
                          </span>
                          <span className="text-[11px] font-sans text-[#A1A1AA]">
                            {branch.description}
                          </span>
                        </Link>
                      ))}

                      <Link
                        href="/#locations"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between p-2 rounded-lg text-xs font-sans text-[#A1A1AA] hover:text-[#F5F5F7]"
                      >
                        <span>View All Locations Overview</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  )}
                </div>

                {/* 5. Policies */}
                <Link
                  href="/policies"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between min-h-[46px] px-3.5 py-2.5 rounded-xl text-[#F5F5F7] hover:text-[#D4AF37] hover:bg-[#1C1E24] active:bg-[#252830] transition-colors group"
                >
                  <span className="font-sans text-[15px] font-medium tracking-wide">
                    Policies
                  </span>
                  <ChevronRight className="h-4 w-4 text-[#A1A1AA]/50 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
                </Link>

                {/* 6. List Property */}
                <Link
                  href="/list-property"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between min-h-[46px] px-3.5 py-2.5 rounded-xl text-[#F5F5F7] hover:text-[#D4AF37] hover:bg-[#1C1E24] active:bg-[#252830] transition-colors group"
                >
                  <span className="font-sans text-[15px] font-medium tracking-wide">
                    List Property
                  </span>
                  <ChevronRight className="h-4 w-4 text-[#A1A1AA]/50 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
                </Link>
              </div>

              {/* Refined Divider */}
              <div className="pt-1 pb-1">
                <div className="h-px w-full bg-[#2E3038]" />
              </div>

              {/* User Authentication Mobile Block (Log In / Create Account) */}
              {!user ? (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openAuthModal("Log in to access your guest reservations.", undefined, "login");
                    }}
                    className="flex items-center justify-center gap-1.5 py-3 rounded-xl border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <LogIn className="h-3.5 w-3.5" />
                    <span>Log In</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openAuthModal("Create an account for instant reservations.", undefined, "signup");
                    }}
                    className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#C5A880] text-[#121316] font-bold text-xs shadow-md shadow-[#D4AF37]/20 transition-all cursor-pointer"
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    <span>Create Account</span>
                  </button>
                </div>
              ) : (
                <div className="rounded-xl border border-[#2E3038] bg-[#161822] p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-white text-xs block">
                        {user.fullName}
                      </span>
                      <span className="text-[11px] text-[#A1A1AA] block">
                        {user.phone || user.email}
                      </span>
                    </div>
                    {isAdmin && (
                      <span className="text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/15 px-2 py-0.5 rounded border border-[#D4AF37]/30">
                        Admin
                      </span>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#2E3038] flex flex-col gap-1 text-xs">
                    <Link
                      href="/my-bookings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 py-1.5 text-[#F5F5F7] hover:text-[#D4AF37]"
                    >
                      <CalendarCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>My Reservations</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 py-1.5 text-[#D4AF37] font-semibold"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Owner Admin Portal</span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        signOut();
                      }}
                      className="flex items-center gap-2 py-1.5 text-red-400 hover:text-red-300 text-left mt-1 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 pb-6 sm:pb-8 border-t border-[#2E3038] space-y-3">
              <Link
                href="/#flats"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full min-h-[46px] px-4 rounded-xl bg-[#D4AF37] hover:bg-[#E5B54F] text-[#121316] font-bold text-sm tracking-wide transition-all shadow-md"
              >
                <span>Explore All Residences</span>
              </Link>

              <p className="text-center font-sans text-[10px] tracking-[0.14em] uppercase text-[#A1A1AA]/70 pt-1">
                FLATEL Hospitality Private Limited • Hyderabad
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function SiteHeader() {
  return (
    <React.Suspense
      fallback={
        <header className="sticky top-0 z-50 w-full h-16 bg-[#121316] border-b border-[#2E3038]" />
      }
    >
      <SiteHeaderContent />
    </React.Suspense>
  );
}
