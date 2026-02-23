"use client";

import { useState, useCallback } from "react";
import { TypingText } from "@/app/components/ui/typing-text";
import { FadeIn } from "@/app/components/ui/fade-in";
import { ThinkingIndicator } from "@/app/components/ui/thinking-indicator";
import { SpreadCard } from "./spread-card";
import { spreads } from "@/app/data/spreads";
import { Spread } from "@/app/types";
import { useI18n } from "@/app/i18n";

interface SpreadSelectProps {
  onSelect: (spread: Spread) => void;
}

export function SpreadSelect({ onSelect }: SpreadSelectProps) {
  const { t } = useI18n();
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
            text={t.spreadSelect.intro}
            speed={25}
            onComplete={handleTypingDone}
            className="reader-message"
          />
        </FadeIn>
      )}

      {phase === "ready" && (
        <FadeIn delay={200}>
          <div className="spread-grid">
            {spreads.map((spread, i) => {
              const st = t.spreads[spread.id];
              const label = spread.cardCount === 1 ? t.spreadSelect.cardLabel : t.spreadSelect.cardsLabel;
              return (
                <SpreadCard
                  key={spread.id}
                  spread={spread}
                  name={st?.name ?? spread.name}
                  description={st?.description ?? spread.description}
                  countLabel={`${spread.cardCount} ${label}`}
                  delay={i * 100}
                  onSelect={onSelect}
                />
              );
            })}
          </div>
        </FadeIn>
      )}
    </div>
  );
}
