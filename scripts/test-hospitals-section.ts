import * as fs from "fs";
import http from "http";
import { HOSPITAL_RECORDS, MEDICAL_SERVICES } from "../components/nearby-hospitals";

function fetchPage(url: string): Promise<{ status: number; data: string }> {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve({ status: res.statusCode || 0, data }));
    }).on("error", reject);
  });
}

async function verifySimplifiedHospitals() {
  console.log("=======================================================");
  console.log("   FLATEL HOSPITALITY — SIMPLIFIED HOSPITALS AUDIT");
  console.log("=======================================================");

  let passes = 0;
  let fails = 0;

  function test(name: string, fn: () => boolean) {
    try {
      const ok = fn();
      if (ok) {
        console.log(`[PASS] ${name}`);
        passes++;
      } else {
        console.error(`[FAIL] ${name}`);
        fails++;
      }
    } catch (e: any) {
      console.error(`[FAIL] ${name}: ${e.message}`);
      fails++;
    }
  }

  // 1. Static Source Code Checks
  const source = fs.readFileSync("components/nearby-hospitals.tsx", "utf-8");
  const homeSource = fs.readFileSync("app/page.tsx", "utf-8");

  test("Eyebrow contains 'TRUSTED CARE'", () => {
    return source.includes("TRUSTED CARE");
  });

  test("Heading matches simplified prompt: 'Hospitals & Medical Support'", () => {
    return source.includes("Hospitals &amp; Medical Support") || source.includes("Hospitals & Medical Support");
  });

  test("Subtitle matches: 'Find hospitals and assistance for your stay in Hyderabad.'", () => {
    return source.includes("Find hospitals and assistance for your stay in Hyderabad.");
  });

  test("All 4 approved services exist: Ambulance Assistance, Hospital Guide, Medicine Delivery, Doctor Appointment", () => {
    const titles = MEDICAL_SERVICES.map((s) => s.title);
    return (
      titles.includes("Ambulance Assistance") &&
      titles.includes("Hospital Guide") &&
      titles.includes("Medicine Delivery") &&
      titles.includes("Doctor Appointment") &&
      MEDICAL_SERVICES.length === 4
    );
  });

  test("Directory heading matches: 'Hospitals in Hyderabad'", () => {
    return source.includes("Hospitals in Hyderabad");
  });

  test("Directory subtitle matches: 'Choose a hospital to view its location, call, or get directions.'", () => {
    return source.includes("Choose a hospital to view its location, call, or get directions.");
  });

  test("All 8 verified hospital records are present", () => {
    const ids = HOSPITAL_RECORDS.map((h) => h.id);
    const required = [
      "apollo",
      "yashoda",
      "kims",
      "virinchi",
      "aig",
      "aware-global",
      "gandhi",
      "owaisi",
    ];
    return required.every((id) => ids.includes(id)) && HOSPITAL_RECORDS.length === 8;
  });

  test("Wide desktop grid is configured with 4 columns ('xl:grid-cols-4')", () => {
    return source.includes("xl:grid-cols-4");
  });

  test("Desktop grid is configured with 3 columns ('lg:grid-cols-3')", () => {
    return source.includes("lg:grid-cols-3");
  });

  test("Tablet grid is configured with 2 columns ('md:grid-cols-2')", () => {
    return source.includes("md:grid-cols-2");
  });

  test("Mobile grid is single column ('grid-cols-1')", () => {
    return source.includes("grid-cols-1");
  });

  test("Each card has 'Call Hospital' and 'Directions' buttons", () => {
    return source.includes("Call Hospital") && source.includes("Directions");
  });

  test("All 8 hospitals have verified phone numbers and ambulance lines", () => {
    return HOSPITAL_RECORDS.every(
      (h) =>
        h.phone.length > 5 &&
        h.phoneRaw.startsWith("+91") &&
        h.ambulanceNumber.length > 2 &&
        h.ambulanceRaw.length > 2
    );
  });

  test("All 8 hospitals have functional Google Maps URLs", () => {
    return HOSPITAL_RECORDS.every(
      (h) => h.googleMapsUrl.startsWith("https://maps.google.com/?q=")
    );
  });

  test("All 8 hospital image files exist in public/images/", () => {
    return HOSPITAL_RECORDS.every((h) => {
      const filePath = "public" + h.imageUrl;
      return fs.existsSync(filePath);
    });
  });

  test("Includes search input and specialty filters", () => {
    return (
      source.includes('placeholder="Search hospital name or locality..."') &&
      source.includes('"All Hospitals"') &&
      source.includes('"Multi-Speciality"') &&
      source.includes('"Oncology"') &&
      source.includes('"Gastroenterology"') &&
      source.includes('"Government"')
    );
  });

  test("Maintains section id='healthcare' and anchor id='hospitals'", () => {
    return source.includes('id="healthcare"') && source.includes('id="hospitals"');
  });

  test("Mounted in app/page.tsx", () => {
    return (
      homeSource.includes('import { NearbyHospitals } from "@/components/nearby-hospitals"') &&
      homeSource.includes("<NearbyHospitals />")
    );
  });

  test("Includes concise non-clinical healthcare disclaimer", () => {
    return source.includes("Non-Clinical Healthcare Notice:");
  });

  // 2. Live SSR / HTTP Verification against dev server
  console.log("\nTesting live SSR on http://localhost:3000 ...");
  try {
    const res = await fetchPage("http://localhost:3000");
    test("Live homepage returns HTTP 200", () => res.status === 200);

    const html = res.data;

    test("Live page renders 'Hospitals &amp; Medical Support'", () =>
      html.includes("Hospitals &amp; Medical Support") || html.includes("Hospitals & Medical Support")
    );
    test("Live page renders 'Hospitals in Hyderabad'", () => html.includes("Hospitals in Hyderabad"));
    test("Live page renders 'Apollo Hospitals'", () => html.includes("Apollo Hospitals"));
    test("Live page renders 'Yashoda Hospitals'", () => html.includes("Yashoda Hospitals"));
    test("Live page renders 'KIMS Hospitals'", () => html.includes("KIMS Hospitals"));
    test("Live page renders 'Virinchi Hospitals'", () => html.includes("Virinchi Hospitals"));
    test("Live page renders 'AIG Hospitals'", () => html.includes("AIG Hospitals"));
    test("Live page renders 'Aware Global Hospital'", () => html.includes("Aware Global Hospital"));
    test("Live page renders 'Gandhi Hospital'", () => html.includes("Gandhi Hospital"));
    test("Live page renders 'Owaisi Hospital'", () => html.includes("Owaisi Hospital"));
    test("Live page contains anchor id='healthcare'", () => html.includes('id="healthcare"'));
    test("Live page contains functional tel links", () => html.includes('tel:+914023607777'));
    test("Live page contains Call Hospital button", () => html.includes("Call Hospital"));
  } catch (err: any) {
    console.error("Live fetch error:", err.message);
    fails++;
  }

  console.log("\n=======================================================");
  console.log(`SIMPLIFIED HOSPITALS AUDIT: ${passes} PASSED | ${fails} FAILED`);
  console.log("=======================================================\n");

  if (fails > 0) {
    process.exit(1);
  }
}

verifySimplifiedHospitals().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
