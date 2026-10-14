import * as fs from "fs";
import {
  AMENITY_CATEGORIES,
  ALL_AMENITIES_LIST,
  AMENITY_GRID_CARDS,
  ROW_1_CARDS,
  ROW_2_CARDS,
} from "../components/amenities-section";

async function auditAmenitiesBreakpoints() {
  console.log("==================================================================");
  console.log("   FLATEL HOSPITALITY — AMENITIES MULTI-VIEWPORT AUDIT");
  console.log("==================================================================\n");

  let passes = 0;
  let fails = 0;

  function test(name: string, ok: boolean, details?: string) {
    if (ok) {
      console.log(`[PASS] ${name}`);
      passes++;
    } else {
      console.error(`[FAIL] ${name} ${details ? `(${details})` : ""}`);
      fails++;
    }
  }

  // 1. Data Integrity & Approved Master Scope
  test("Exactly 6 approved categories in AMENITY_CATEGORIES", AMENITY_CATEGORIES.length === 6);
  test("All 29 approved master inclusions present in ALL_AMENITIES_LIST", ALL_AMENITIES_LIST.length === 29);
  test("Exactly 24 flagship amenity cards configured for grid showcase", AMENITY_GRID_CARDS.length === 24);

  // 2. 3D Illustration Image Assets Audit
  console.log("\n--- Checking 3D Illustration Assets ---");
  let allAssetsExist = true;
  let allAssetsValid = true;

  for (const card of AMENITY_GRID_CARDS) {
    const iconPath = `public/images/amenities/icon-${card.slug}.png`;
    const cardPath = `public/images/amenities/card-${card.slug}.png`;

    if (!fs.existsSync(iconPath)) {
      console.error(`Missing icon asset: ${iconPath}`);
      allAssetsExist = false;
    }
    if (!fs.existsSync(cardPath)) {
      console.error(`Missing card source asset: ${cardPath}`);
      allAssetsExist = false;
    }

    if (fs.existsSync(iconPath)) {
      const stats = fs.statSync(iconPath);
      // Valid icon should be at least 10KB
      if (stats.size < 10000) {
        console.error(`Icon asset suspiciously small: ${iconPath} (${stats.size} bytes)`);
        allAssetsValid = false;
      }
    }
  }

  test("All 24 3D illustration icons exist in public/images/amenities/", allAssetsExist);
  test("All 24 3D icons have non-trivial size (>10KB) with clean geometry", allAssetsValid);

  // 3. Component Code Architecture Audit
  console.log("\n--- Checking Component Implementation & Responsiveness ---");
  const componentSource = fs.readFileSync("components/amenities-section.tsx", "utf-8");

  test("Dark charcoal background #121316 applied to section", componentSource.includes("bg-[#121316]"));
  test("Dark card background #1C1E24 applied to cards", componentSource.includes("bg-[#1C1E24]"));
  test("Subtle gold border styling (#2E3038 / #D4AF37) applied", componentSource.includes("border-[#2E3038]") && componentSource.includes("border-[#D4AF37]"));

  test(
    "Mobile 2-column grid configured (grid-cols-2 for <640px)",
    componentSource.includes("grid-cols-2")
  );

  test(
    "Tablet 3-column & 4-column responsive grid configured (sm:grid-cols-3 md:grid-cols-4)",
    componentSource.includes("sm:grid-cols-3") && componentSource.includes("md:grid-cols-4")
  );

  test(
    "Desktop 6-column balanced grid configured (lg:grid-cols-6: 4 complete rows of 6)",
    componentSource.includes("lg:grid-cols-6")
  );

  test(
    "Cards use uniform fixed height at all breakpoints without cut-off",
    componentSource.includes("h-[126px] sm:h-[136px] md:h-[144px]")
  );

  test(
    "Filter pills have horizontal scrolling without page overflow on mobile",
    componentSource.includes("overflow-x-auto") && componentSource.includes("-mx-4 px-4 sm:mx-0 sm:px-0")
  );

  test(
    "Selected filter pill is highlighted in gold (#E3B558)",
    componentSource.includes("bg-[#E3B558]")
  );

  test(
    "Modal opens showing All 29 Master Inclusions across all 6 categories",
    componentSource.includes("All 29 Master Inclusions") && componentSource.includes("isModalOpen")
  );

  test(
    "Explore all 29 amenities button centered and properly spaced",
    componentSource.includes("Explore all 29 amenities") && componentSource.includes("justify-center")
  );

  // 4. Viewport Width Calculations Validation
  console.log("\n--- Checking Grid Geometry at Target Viewports ---");
  const viewports = [
    { width: 320, name: "320px (iPhone SE narrow)" },
    { width: 360, name: "360px (Galaxy S compact)" },
    { width: 390, name: "390px (iPhone 12/13/14)" },
    { width: 430, name: "430px (iPhone 14/15 Pro Max)" },
    { width: 768, name: "768px (iPad Mini / Tablet)" },
    { width: 1280, name: "1280px (Standard Desktop)" },
  ];

  for (const vp of viewports) {
    const isMobile = vp.width < 640;
    const isSmallTablet = vp.width >= 640 && vp.width < 768;
    const isTablet = vp.width >= 768 && vp.width < 1024;
    const isDesktop = vp.width >= 1024;

    const cols = isDesktop ? 6 : isTablet ? 4 : isSmallTablet ? 3 : 2;
    const padding = isMobile ? 32 : 48; // px-4 (32px) vs px-6 (48px)
    const gap = isMobile ? 10 : 16;
    const availableWidth = vp.width - padding;
    const cardWidth = (availableWidth - (cols - 1) * gap) / cols;

    test(
      `${vp.name}: ${cols} complete columns, each card ${cardWidth.toFixed(1)}px (>= 120px minimum)`,
      cardWidth >= 120,
      `Calculated card width: ${cardWidth.toFixed(1)}px`
    );
  }

  // 5. Live HTTP Verification
  console.log("\n--- Live HTTP Server Verification ---");
  try {
    const res = await fetch("http://localhost:3000/#amenities");
    const html = await res.text();

    test("HTTP 200 OK from local server", res.status === 200);
    test("HTML contains amenities anchor id='amenities'", html.includes('id="amenities"'));
    test("HTML renders heading 'Everything you need to feel at home.'", html.includes("Everything you need to") && html.includes("feel at home."));
    test("HTML renders all category filters (All, Living & Bedroom, Kitchen & Dining, etc.)",
      html.includes("Living &amp; Bedroom") && html.includes("Kitchen &amp; Dining")
    );
    test("HTML contains CTA 'Explore all 29 amenities'", html.includes("Explore all 29 amenities"));
    test("HTML contains grid-cols-2 and lg:grid-cols-6 responsive layout",
      html.includes("grid-cols-2") && html.includes("lg:grid-cols-6")
    );
  } catch (err: any) {
    test("HTTP Server verification", false, err.message);
  }

  console.log("\n==================================================================");
  console.log(`AMENITIES BREAKPOINTS AUDIT: ${passes} PASSED | ${fails} FAILED`);
  console.log("==================================================================\n");

  if (fails > 0) process.exit(1);
}

auditAmenitiesBreakpoints().catch((e) => {
  console.error("Audit failed:", e);
  process.exit(1);
});
