"use client";

import { FadeIn } from "@/app/components/ui/fade-in";
import { Spread } from "@/app/types";

interface SpreadCardProps {
  spread: Spread;
  name: string;
  description: string;
  countLabel: string;
  delay: number;
  onSelect: (spread: Spread) => void;
}

export function SpreadCard({ spread, name, description, countLabel, delay, onSelect }: SpreadCardProps) {
  return (
    <FadeIn delay={delay}>
      <button className="spread-card" onClick={() => onSelect(spread)}>
        <h3 className="spread-card-title">{name}</h3>
        <p className="spread-card-desc">{description}</p>
        <span className="spread-card-count">{countLabel}</span>
      </button>
    </FadeIn>
  );
}
