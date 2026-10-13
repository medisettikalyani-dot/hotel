import { NextRequest, NextResponse } from "next/server";
import { InventoryService } from "@/lib/inventory-service";

export async function GET() {
  try {
    const units = await InventoryService.getAllUnits({ includeInactive: true });
    const branches = await InventoryService.getAllBranches();

    return NextResponse.json({
      success: true,
      units,
      branches,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load inventory.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      category,
      slug,
      branchSlug,
      basePricePerNight,
      baseAdults,
      maxAdults,
      maxKids,
      extraPersonFeePerNight,
      totalUnits,
      images,
      isAvailable,
    } = body;

    if (!title || !category || !slug || !branchSlug || !basePricePerNight) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (title, category, slug, branchSlug, basePricePerNight)." },
        { status: 400 }
      );
    }

    const created = await InventoryService.createUnit({
      title,
      category,
      slug,
      branchSlug,
      basePricePerNight: Number(basePricePerNight),
      baseAdults: Number(baseAdults || 2),
      maxAdults: Number(maxAdults || 4),
      maxKids: maxKids !== undefined ? Number(maxKids) : 2,
      extraPersonFeePerNight: Number(extraPersonFeePerNight || 500),
      totalUnits: Number(totalUnits || 1),
      images: images || [],
      isAvailable: isAvailable ?? true,
    });

    return NextResponse.json({ success: true, unit: created });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create unit.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, ...updates } = body;

    if (!slug) {
      return NextResponse.json({ success: false, error: "Missing unit slug." }, { status: 400 });
    }

    const updated = await InventoryService.updateUnit(slug, updates);
    return NextResponse.json({ success: true, unit: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update unit.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ success: false, error: "Missing unit slug." }, { status: 400 });
    }

    await InventoryService.deleteUnit(slug);
    return NextResponse.json({ success: true, message: `Unit ${slug} deleted successfully.` });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete unit.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
