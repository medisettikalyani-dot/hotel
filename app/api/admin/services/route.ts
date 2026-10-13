import { NextRequest, NextResponse } from "next/server";
import { AddonService } from "@/lib/addon-service";

export async function GET() {
  try {
    const addons = await AddonService.getAllAddons();
    const packages = await AddonService.getDynamicPurposePackages();

    return NextResponse.json({
      success: true,
      addons,
      packages,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load services.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, purpose_tag, service_name, is_free, pricing_type, price, disclaimer } = body;

    if (!id || !purpose_tag || !service_name || pricing_type === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (id, purpose_tag, service_name, pricing_type)." },
        { status: 400 }
      );
    }

    const created = await AddonService.createAddon({
      id,
      purpose_tag,
      service_name,
      is_free: Boolean(is_free),
      pricing_type,
      price: price !== undefined && price !== null ? Number(price) : null,
      disclaimer: disclaimer || null,
      is_active: true,
    });

    return NextResponse.json({ success: true, addon: created });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create addon service.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing addon service ID." }, { status: 400 });
    }

    const updated = await AddonService.updateAddon(id, updates);
    return NextResponse.json({ success: true, addon: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update addon service.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing addon service ID." }, { status: 400 });
    }

    await AddonService.deleteAddon(id);
    return NextResponse.json({ success: true, message: `Addon ${id} deleted successfully.` });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete addon service.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
