import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { FeaturedFlats } from "@/components/featured-flats";
import { BookingSteps } from "@/components/booking-steps";
import { BranchHub } from "@/components/branch-hub";
import { AmenitiesSection } from "@/components/amenities-section";
import { NearbyHospitals } from "@/components/nearby-hospitals";
import { ReviewsSection } from "@/components/reviews-section";
import { AboutSection } from "@/components/about-section";
import { FaqSection } from "@/components/faq-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* 1. Luxury Navigation Header */}
      <SiteHeader />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* 2. Hero Section with Integrated Search & 4 Purpose Cards */}
        <HeroSection />

        {/* 3. Featured Flats Section (1 to 4 BHK with Purpose & Branch Filters) */}
        <FeaturedFlats />

        {/* 4. Effortless 3-Step Reservation Journey (Select -> 20% Deposit -> Relax) */}
        <BookingSteps />

        {/* 5. Two Prime Branches Showcase (Barkas Salala & Moghal Pura) */}
        <BranchHub />

        {/* 6. Signature Inclusions & Master Amenities (Visual Living Experience + 29 Inclusions) */}
        <AmenitiesSection />

        {/* 7. Nearby Top Hospitals & Medical Support (Healthcare Directory & Concierge) */}
        <NearbyHospitals />

        {/* 8. Verified Guest Reviews & Experience Stories */}
        <ReviewsSection />

        {/* 9. About Flatel: Founder Story, Vision, Metrics & Founder's Pledge */}
        <AboutSection />

        {/* 10. Frequently Asked Questions: Searchable Accordion */}
        <FaqSection />
      </main>

      {/* 11. Homepage Footer */}
      <SiteFooter />
    </div>
  );
}
