import * as React from "react";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CheckoutView } from "@/components/checkout/checkout-view";

export const metadata: Metadata = {
  title: "Secure Checkout | Flatel Hospitality",
  description:
    "Complete your reservation for Flatel Hospitality furnished flats in Hyderabad. 20% advance booking deposit with instant confirmation.",
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#121316] text-[#F5F5F7] flex flex-col">
      <SiteHeader />
      <main className="flex-1 w-full">
        <React.Suspense
          fallback={
            <div className="mx-auto max-w-6xl px-4 py-20 text-center text-[#A1A1AA]">
              <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p>Loading secure checkout...</p>
            </div>
          }
        >
          <CheckoutView />
        </React.Suspense>
      </main>
      <SiteFooter />
    </div>
  );
}
