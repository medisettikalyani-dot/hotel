import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RoomDetailView } from "@/components/rooms/room-detail-view";
import { InventoryService } from "@/lib/inventory-service";
import { getRoomById } from "@/lib/mock-rooms";

interface RoomPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: RoomPageProps): Promise<Metadata> {
  const { id } = await params;
  const room = (await InventoryService.getUnitBySlug(id)) || getRoomById(id);

  if (!room) {
    return {
      title: "Residence Not Found | Flatel Hospitality",
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
    { id: "1bhk" },
    { id: "2bhk" },
    { id: "3bhk" },
    { id: "4bhk" },
  ];
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { id } = await params;
  const room = (await InventoryService.getUnitBySlug(id)) || getRoomById(id);

  if (!room) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#121316] text-[#F5F5F7] flex flex-col selection:bg-[#D4AF37]/20 selection:text-[#D4AF37]">
      <SiteHeader />
      <main className="flex-1 w-full">
        <RoomDetailView room={room} requestedId={id} />
      </main>
      <SiteFooter />
    </div>
  );
}
