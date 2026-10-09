import { notFound } from "next/navigation";
import { RoadmapExplorer } from "@/components/RoadmapExplorer";
import { frenchA1Roadmap } from "@/lib/roadmaps";

export default function FrenchA1Page() {
  if (!frenchA1Roadmap) {
    notFound();
  }

  return <RoadmapExplorer roadmap={frenchA1Roadmap} />;
}
