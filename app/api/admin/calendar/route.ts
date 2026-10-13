import { NextRequest, NextResponse } from "next/server";
import { CalendarService } from "@/lib/calendar-service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const unitSlug = searchParams.get("unitSlug") || undefined;

    const blockedDates = await CalendarService.getBlockedDates(unitSlug);

    return NextResponse.json({
      success: true,
      blockedDates,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load calendar blocks.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { unitId, startDate, endDate, reason } = body;

    if (!unitId || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: "unitId, startDate, and endDate are required." },
        { status: 400 }
      );
    }

    const created = await CalendarService.addBlockedDateRange(unitId, startDate, endDate, reason);
    return NextResponse.json({ success: true, blockedDates: created });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to add calendar block.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing blocked date ID." }, { status: 400 });
    }

    await CalendarService.removeBlockedDate(id);
    return NextResponse.json({ success: true, message: "Blocked date removed successfully." });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to remove blocked date.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
