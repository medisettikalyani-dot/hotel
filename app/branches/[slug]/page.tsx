import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BranchDetailView } from "@/components/branches/branch-detail-view";
import { BRANCHES, getBranchBySlug } from "@/lib/constants";
import { InventoryService } from "@/lib/inventory-service";
import { getRoomsByBranch } from "@/lib/mock-rooms";

interface BranchPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BranchPageProps): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);

  if (!branch) {
    return {
      title: "Branch Not Found | Flatel Hospitality",
      description: "Explore Flatel Hospitality serviced branches in Hyderabad.",
    };
  }

  return {
    title: `${branch.name} Branch | Flatel Hospitality`,
    description: `Explore premium furnished flats at Flatel Hospitality ${branch.name}. ${branch.address}.`,
  };
}

export async function generateStaticParams() {
  return BRANCHES.map((b) => ({
    slug: b.slug,
  }));
}

export default async function BranchPage({ params }: BranchPageProps) {
  const { slug } = await params;
  const branch = getBranchBySlug(slug);

  if (!branch) {
    notFound();
  }

  const liveProperties = await InventoryService.getUnitsByBranch(branch.slug);
  const properties = liveProperties.length > 0 ? liveProperties : getRoomsByBranch(branch.slug);

  return (
    <div className="min-h-screen bg-[#121316] text-[#F5F5F7] flex flex-col selection:bg-[#D4AF37]/20 selection:text-[#D4AF37]">
      <SiteHeader />
      <main className="flex-1 w-full">
        <BranchDetailView branch={branch} properties={properties} />
      </main>
      <SiteFooter />
    </div>
  );
}
