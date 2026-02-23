"use client";

import { FadeIn } from "@/app/components/ui/fade-in";
import { Spread } from "@/app/types";

interface SpreadCardProps {
  spread: Spread;
  delay: number;
  onSelect: (spread: Spread) => void;
}

export function SpreadCard({ spread, delay, onSelect }: SpreadCardProps) {
  return (
    <FadeIn delay={delay}>
      <button className="spread-card" onClick={() => onSelect(spread)}>
        <h3 className="spread-card-title">{spread.name}</h3>
        <p className="spread-card-desc">{spread.description}</p>
        <span className="spread-card-count">{spread.cardCount} {spread.cardCount === 1 ? "card" : "cards"}</span>
      </button>
    </FadeIn>
  );
}
