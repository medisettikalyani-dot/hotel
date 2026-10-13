import { NextRequest, NextResponse } from "next/server";
import { BookingService } from "@/lib/booking-service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email") || undefined;
    const phone = searchParams.get("phone") || undefined;

    if (!email && !phone) {
      return NextResponse.json(
        { success: false, error: "Please provide either an email or phone number." },
        { status: 400 }
      );
    }

    const bookings = await BookingService.getBookingsByGuest({ email, phone });

    return NextResponse.json({
      success: true,
      bookings,
      count: bookings.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to retrieve guest reservations.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
