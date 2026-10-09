"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Compass,
  ExternalLink,
  MessageSquareText,
  Target,
} from "lucide-react";
import type { Roadmap, RoadmapTopic } from "@/lib/roadmaps";

type Props = {
  roadmap: Roadmap;
};

type Point = { x: number; y: number };
type Segment = { p0: Point; cp1: Point; cp2: Point; p1: Point };

function lerp(a: Point, b: Point, t: number): Point {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

function buildSegments(pts: Point[], tension = 0.4): Segment[] {
  return pts.slice(0, -1).map((_, i) => {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    return {
      p0: p1,
      cp1: { x: p1.x + ((p2.x - p0.x) * tension) / 3, y: p1.y + ((p2.y - p0.y) * tension) / 3 },
      cp2: { x: p2.x - ((p3.x - p1.x) * tension) / 3, y: p2.y - ((p3.y - p1.y) * tension) / 3 },
      p1: p2,
    };
  });
}

function segmentsToPath(segs: Segment[]): string {
  if (!segs.length) return "";
  let d = `M ${segs[0].p0.x} ${segs[0].p0.y}`;
  for (const s of segs) {
    d += ` C ${s.cp1.x.toFixed(2)} ${s.cp1.y.toFixed(2)}, ${s.cp2.x.toFixed(2)} ${s.cp2.y.toFixed(2)}, ${s.p1.x} ${s.p1.y}`;
  }
  return d;
}

function getSegmentMidpoint(s: Segment): { x: number; y: number; angle: number } {
  const A = lerp(s.p0, s.cp1, 0.5);
  const B = lerp(s.cp1, s.cp2, 0.5);
  const C = lerp(s.cp2, s.p1, 0.5);
  const D = lerp(A, B, 0.5);
  const E = lerp(B, C, 0.5);
  const M = lerp(D, E, 0.5);
  return { x: M.x, y: M.y, angle: Math.atan2(E.y - D.y, E.x - D.x) * (180 / Math.PI) };
}

const stageIcons = {
  Discover: Compass,
  Build: BookOpen,
  Use: MessageSquareText,
  Validate: Target,
};

export function RoadmapExplorer({ roadmap }: Props) {
  const [selectedId, setSelectedId] = useState(roadmap.topics[0]?.id);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [checkedOutcomes, setCheckedOutcomes] = useState<Record<string, string[]>>({});
  const selectedTopic = useMemo(
    () => roadmap.topics.find((topic) => topic.id === selectedId) ?? roadmap.topics[0],
    [roadmap.topics, selectedId],
  );
  const completion = Math.round((completedIds.length / roadmap.topics.length) * 100);
  const selectedChecks = checkedOutcomes[selectedTopic.id] ?? [];
  const selectedTopicReady = selectedTopic.outcomes.every((outcome) =>
    selectedChecks.includes(outcome.label),
  );
  const { pathData, midpoints } = useMemo(() => {
    const pts = roadmap.topics.map(getSafePosition);
    const segs = buildSegments(pts);
    return { pathData: segmentsToPath(segs), midpoints: segs.map(getSegmentMidpoint) };
  }, [roadmap.topics]);

  function toggleComplete(topicId: string) {
    if (!selectedTopicReady) {
      return;
    }

    setCompletedIds((current) =>
      current.includes(topicId)
        ? current.filter((id) => id !== topicId)
        : [...current, topicId],
    );
  }

  function toggleOutcome(topicId: string, outcomeLabel: string) {
    setCheckedOutcomes((current) => {
      const topicChecks = current[topicId] ?? [];
      const nextChecks = topicChecks.includes(outcomeLabel)
        ? topicChecks.filter((label) => label !== outcomeLabel)
        : [...topicChecks, outcomeLabel];

      return {
        ...current,
        [topicId]: nextChecks,
      };
    });
  }

  return (
    <main className="roadmapPage">
      <section className="roadmapHero">
        <div className="heroText">
          <p className="eyebrow">{roadmap.level}</p>
          <h1>{roadmap.title}</h1>
          <p>{roadmap.description}</p>
        </div>
        <div className="targetPanel" aria-label="Roadmap target">
          <Target aria-hidden size={22} />
          <div>
            <span>Target ability</span>
            <strong>{roadmap.target}</strong>
          </div>
        </div>
      </section>

      <section className="workspace" aria-label={`${roadmap.title} roadmap`}>
        <div className="mapArea">
          <div className="mapToolbar">
            <div>
              <span className="toolbarLabel">Progress</span>
              <strong>{completion}%</strong>
            </div>
            <div className="progressTrack" aria-hidden>
              <span style={{ width: `${completion}%` }} />
            </div>
          </div>

          <div className="roadmapCanvas">
            <svg
              aria-hidden
              className="pathLines"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <path className="pathCurve" d={pathData} />
              {midpoints.map((m, i) => (
                <polygon
                  key={i}
                  className="pathArrow"
                  points="-2.5,-1.5 2.5,0 -2.5,1.5"
                  transform={`translate(${m.x.toFixed(2)}, ${m.y.toFixed(2)}) rotate(${m.angle.toFixed(1)})`}
                />
              ))}
            </svg>

            {roadmap.topics.map((topic, index) => (
              <TopicNode
                completed={completedIds.includes(topic.id)}
                index={index + 1}
                key={topic.id}
                onSelect={() => setSelectedId(topic.id)}
                selected={topic.id === selectedTopic.id}
                topic={topic}
              />
            ))}
          </div>
        </div>

        <aside className="detailPanel" aria-live="polite">
          <div className="detailHeader">
            <span className="stageBadge">{selectedTopic.stage}</span>
            <h2>{selectedTopic.title}</h2>
            <p>{selectedTopic.summary}</p>
          </div>

          <div className="detailSection">
            <h3>What to cover</h3>
            <ul className="checkList">
              {selectedTopic.outcomes.map((outcome) => (
                <li key={outcome.label}>
                  <label>
                    <input
                      checked={selectedChecks.includes(outcome.label)}
                      onChange={() =>
                        toggleOutcome(selectedTopic.id, outcome.label)
                      }
                      type="checkbox"
                    />
                    <span>
                      <a
                        href={outcome.href}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {outcome.label}
                        <ExternalLink aria-hidden size={13} />
                      </a>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="detailSection">
            <h3>Practice checks</h3>
            <ul>
              {selectedTopic.practicePrompts.map((prompt) => (
                <li key={prompt}>
                  <MessageSquareText aria-hidden size={14} />
                  {prompt}
                </li>
              ))}
            </ul>
          </div>

          <button
            className="completeButton"
            disabled={!selectedTopicReady}
            onClick={() => toggleComplete(selectedTopic.id)}
            type="button"
          >
            <CheckCircle2 aria-hidden size={18} />
            {completedIds.includes(selectedTopic.id)
              ? "Marked complete"
              : selectedTopicReady
                ? "Mark complete"
                : "Complete checklist first"}
          </button>
        </aside>
      </section>
    </main>
  );
}

function TopicNode({
  completed,
  index,
  onSelect,
  selected,
  topic,
}: {
  completed: boolean;
  index: number;
  onSelect: () => void;
  selected: boolean;
  topic: RoadmapTopic;
}) {
  const Icon = stageIcons[topic.stage];
  const { x: safeX, y: safeY } = getSafePosition(topic);

  return (
    <button
      aria-pressed={selected}
      className={`topicNode ${selected ? "selected" : ""} ${completed ? "completed" : ""}`}
      onClick={onSelect}
      style={{
        left: `${safeX}%`,
        top: `${safeY}%`,
      }}
      type="button"
    >
      <span className="nodeNumber">{completed ? <CheckCircle2 size={16} /> : index}</span>
      <span className="nodeLabel">
        <Icon aria-hidden size={15} />
        {topic.title}
      </span>
    </button>
  );
}

function getSafePosition(topic: RoadmapTopic) {
  return {
    x: Math.min(76, Math.max(20, topic.position.x)),
    y: Math.min(88, Math.max(12, topic.position.y)),
  };
}
