import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { roadmaps } from "@/lib/roadmaps";

export default function Home() {
  return (
    <main className="shell">
      <header className="pageHeader">
        <div>
          <p className="eyebrow">Learning roadmaps</p>
          <h1>Choose a path</h1>
        </div>
      </header>

      <section className="roadmapList" aria-label="Available roadmaps">
        {roadmaps.map((roadmap) => (
          <Link
            className="roadmapCard"
            href={`/roadmaps/${roadmap.slug}`}
            key={roadmap.slug}
          >
            <span className="levelBadge">{roadmap.level}</span>
            <h2>{roadmap.title}</h2>
            <p>{roadmap.description}</p>
            <span className="cardAction">
              Open roadmap <ArrowRight aria-hidden size={18} />
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
