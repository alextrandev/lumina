"use client";

import { useState, useCallback, useMemo } from "react";
import { TypingText } from "@/app/components/ui/typing-text";
import { FadeIn } from "@/app/components/ui/fade-in";
import { ThinkingIndicator } from "@/app/components/ui/thinking-indicator";
import { CardGrid } from "./card-grid";
import { Spread, TarotCard } from "@/app/types";
import { deck } from "@/app/data/cards";
import { cardPickIntro } from "@/app/data/dialogue";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface CardPickProps {
  spread: Spread;
  selectedCards: TarotCard[];
  onCardSelect: (card: TarotCard) => void;
  onComplete: () => void;
}

export function CardPick({ spread, selectedCards, onCardSelect, onComplete }: CardPickProps) {
  const shuffledDeck = useMemo(() => shuffle(deck), []);
  const [phase, setPhase] = useState<"thinking" | "intro" | "picking">("thinking");
  const [showPickThinking, setShowPickThinking] = useState(false);

  const currentIndex = selectedCards.length;
  const position = spread.positions[currentIndex];
  const isComplete = currentIndex >= spread.cardCount;

  const handleThinkingDone = useCallback(() => setPhase("intro"), []);
  const handleIntroDone = useCallback(() => setPhase("picking"), []);

  const handleCardClick = useCallback(
    (card: TarotCard) => {
      onCardSelect(card);
      if (currentIndex + 1 >= spread.cardCount) {
        setTimeout(onComplete, 1500);
      } else {
        setShowPickThinking(true);
      }
    },
    [currentIndex, spread.cardCount, onCardSelect, onComplete]
  );

  if (phase === "thinking") {
    return (
      <div className="step-container">
        <ThinkingIndicator duration={1500} onComplete={handleThinkingDone} />
      </div>
    );
  }

  if (phase === "intro") {
    return (
      <div className="step-container">
        <TypingText text={cardPickIntro} speed={20} onComplete={handleIntroDone} className="reader-message" />
      </div>
    );
  }

  return (
    <div className="step-container card-pick-step">
      {!isComplete && !showPickThinking && position && (
        <FadeIn key={currentIndex}>
          <div className="pick-header">
            <p className="pick-position">
              Card {currentIndex + 1} of {spread.cardCount}: <strong>{position.name}</strong>
            </p>
            <TypingText text={position.instruction} speed={18} className="reader-message pick-instruction" />
          </div>
        </FadeIn>
      )}

      {showPickThinking && (
        <ThinkingIndicator
          duration={1200}
          onComplete={() => setShowPickThinking(false)}
        />
      )}

      <CardGrid
        cards={shuffledDeck}
        selectedCards={selectedCards}
        onSelect={handleCardClick}
        disabled={isComplete || showPickThinking}
      />
    </div>
  );
}
