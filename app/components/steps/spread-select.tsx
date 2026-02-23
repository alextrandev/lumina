"use client";

import { useState, useCallback } from "react";
import { TypingText } from "@/app/components/ui/typing-text";
import { FadeIn } from "@/app/components/ui/fade-in";
import { ThinkingIndicator } from "@/app/components/ui/thinking-indicator";
import { SpreadCard } from "./spread-card";
import { spreadIntro } from "@/app/data/dialogue";
import { spreads } from "@/app/data/spreads";
import { Spread } from "@/app/types";

interface SpreadSelectProps {
  onSelect: (spread: Spread) => void;
}

export function SpreadSelect({ onSelect }: SpreadSelectProps) {
  const [phase, setPhase] = useState<"thinking" | "typing" | "ready">("thinking");

  const handleThinkingDone = useCallback(() => setPhase("typing"), []);
  const handleTypingDone = useCallback(() => setPhase("ready"), []);

  return (
    <div className="step-container">
      {phase === "thinking" && (
        <ThinkingIndicator duration={1500} onComplete={handleThinkingDone} />
      )}

      {(phase === "typing" || phase === "ready") && (
        <FadeIn>
          <TypingText
            text={spreadIntro}
            speed={25}
            onComplete={handleTypingDone}
            className="reader-message"
          />
        </FadeIn>
      )}

      {phase === "ready" && (
        <FadeIn delay={200}>
          <div className="spread-grid">
            {spreads.map((spread, i) => (
              <SpreadCard key={spread.id} spread={spread} delay={i * 100} onSelect={onSelect} />
            ))}
          </div>
        </FadeIn>
      )}
    </div>
  );
}
