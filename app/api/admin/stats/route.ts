import { NextResponse } from "next/server";
import { getAdminDashboardStats } from "@/lib/booking-service";

export async function GET() {
  try {
    const stats = await getAdminDashboardStats();

    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load dashboard statistics.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

