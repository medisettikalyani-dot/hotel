import { NextRequest, NextResponse } from "next/server";
import { BookingService, CreateBookingData } from "@/lib/booking-service";
import { getRazorpayClient } from "@/lib/razorpay/client";

export async function POST(req: NextRequest) {
  try {
    const body: CreateBookingData = await req.json();

    // 1. Basic body presence check
    if (!body.unitId || !body.checkInDate || !body.checkOutDate || !body.guest) {
      return NextResponse.json(
        { success: false, error: "Missing required booking fields." },
        { status: 400 }
      );
    }

    if (!body.guest.fullName || !body.guest.email || !body.guest.phone) {
      return NextResponse.json(
        { success: false, error: "Guest full name, email, and phone number are required." },
        { status: 400 }
      );
    }

    // 2. Server-side validation & booking intent creation
    const { booking, advancePayablePaise } = await BookingService.createBookingIntent(body);

    // 3. Payment Gateway Order Creation (Razorpay / Test Sandbox)
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const isLiveRazorpay =
      keyId &&
      keySecret &&
      !keyId.includes("placeholder") &&
      !keyId.includes("your_key_id") &&
      keyId.startsWith("rzp_");

    let orderId = `order_test_${booking.bookingCode}_${Date.now()}`;
    let isTestMode = true;

    if (isLiveRazorpay) {
      try {
        const razorpay = getRazorpayClient();
        const razorpayOrder = await razorpay.orders.create({
          amount: advancePayablePaise,
          currency: "INR",
          receipt: booking.bookingCode,
          notes: {
            bookingId: booking.id,
            bookingCode: booking.bookingCode,
            property: booking.unitId,
            nights: booking.totalNights.toString(),
          },
        });
        orderId = razorpayOrder.id;
        isTestMode = false;
      } catch (err) {
        console.warn("Razorpay API order creation failed, fallback to test mode:", err);
        isTestMode = true;
      }
    }

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      bookingCode: booking.bookingCode,
      pricing: booking.pricing,
      orderId,
      advancePayable: booking.pricing.advancePayable,
      currency: "INR",
      isTestMode,
      keyId: isTestMode ? "rzp_test_sandbox" : keyId,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to initiate reservation.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 400 }
    );
  }
}
