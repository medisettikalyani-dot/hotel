import * as React from "react";
import Link from "next/link";
import { cn } from "cn";

export interface BookNowButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "default" | "lg";
  fullWidth?: boolean;
  ariaLabel?: string;
}

/**
 * Reusable FLATEL "BOOK YOUR STAY" Primary CTA Button
 * 
 * Follows official brand guidelines:
 * - Restrained champagne-gold background (#C6A15B)
 * - Deep black text (#080807)
 * - Minimum 44px touch target
 * - Architectural refined border treatment
 * - Subtle gold/ivory hover transition, zero glowing effects
 */
export function BookNowButton({
  href = "/#rooms",
  onClick,
  className,
  children = "Book Your Stay",
  variant = "primary",
  size = "default",
  fullWidth = false,
  ariaLabel = "Book Your Stay — FLATEL Furnished Residences",
}: BookNowButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans tracking-[0.08em] uppercase transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-gold-primary disabled:pointer-events-none disabled:opacity-50 active:translate-y-[0.5px] min-h-[44px]";

  const sizeStyles = {
    sm: "h-11 px-5 text-[11px] font-medium rounded-xs",
    default: "h-11 px-6 text-[12px] font-medium rounded-xs",
    lg: "h-12 px-8 text-[13px] font-semibold rounded-xs",
  };

  const variantStyles = {
    primary:
      "bg-gold-primary text-black-deep border border-gold-primary/60 hover:bg-gold-soft hover:border-text-primary/40 active:bg-[#92733E] shadow-sm",
    secondary:
      "bg-charcoal-dark text-text-primary border border-gold-border hover:border-gold-primary/60 hover:text-gold-primary active:bg-black-soft",
    outline:
      "border border-gold-primary/70 text-gold-primary hover:bg-gold-primary/10 hover:border-text-primary/50 active:bg-gold-primary/20",
  };

  const classes = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    fullWidth && "w-full",
    className
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={classes}
        aria-label={ariaLabel}
      >
        <span>{children}</span>
      </button>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      <span>{children}</span>
    </Link>
  );
}
