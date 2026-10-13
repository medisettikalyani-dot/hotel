import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RoomDetailView } from "@/components/rooms/room-detail-view";
import { InventoryService } from "@/lib/inventory-service";
import { getRoomById } from "@/lib/mock-rooms";

interface PropertyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = (await InventoryService.getUnitBySlug(slug)) || getRoomById(slug);

  if (!room) {
    return {
      title: "Property Not Found | Flatel Hospitality",
      description:
        "Explore our premium 1 BHK, 2 BHK, 3 BHK, and 4 BHK furnished residences in Hyderabad.",
    };
  }

  return {
    title: `${room.title} | Flatel Hospitality`,
    description: room.shortDescription,
  };
}

export async function generateStaticParams() {
  return [
    { slug: "1bhk" },
    { slug: "2bhk" },
    { slug: "3bhk" },
    { slug: "4bhk" },
  ];
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params;
  const room = (await InventoryService.getUnitBySlug(slug)) || getRoomById(slug);

  if (!room) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#121316] text-[#F5F5F7] flex flex-col selection:bg-[#D4AF37]/20 selection:text-[#D4AF37]">
      <SiteHeader />
      <main className="flex-1 w-full">
        <RoomDetailView room={room} requestedId={slug} />
      </main>
      <SiteFooter />
    </div>
  );
}
