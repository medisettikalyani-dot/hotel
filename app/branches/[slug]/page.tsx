import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { BRANCHES, getBranchBySlug } from "@/lib/constants";

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

  if (slug === "barkas-salala") {
    redirect("/properties/3bhk");
  } else if (slug === "moghal-pura") {
    redirect("/#flats?branch=moghal-pura");
  } else {
    notFound();
  }
}

