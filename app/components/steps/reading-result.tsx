"use client";

import { FadeIn } from "@/app/components/ui/fade-in";
import { MysticButton } from "@/app/components/ui/mystic-button";
import { ReadingCard } from "./reading-card";
import { Spread, TarotCard, UserInfo } from "@/app/types";

interface ReadingResultProps {
  spread: Spread;
  selectedCards: TarotCard[];
  question: string;
  userInfo: UserInfo;
  onRestart: () => void;
}

export function ReadingResult({
  spread,
  selectedCards,
  question,
  userInfo,
  onRestart,
}: ReadingResultProps) {
  const name = userInfo.name || "Seeker";

  return (
    <div className="step-container reading-result">
      <FadeIn>
        <h2 className="reading-title">Your Reading, {name}</h2>
        <p className="reading-subtitle">{spread.name} &mdash; {spread.cardCount} Cards</p>
      </FadeIn>

      <FadeIn delay={300}>
        <div className="reading-question">
          <p className="reading-question-label">Your Question</p>
          <p className="reading-question-text">&ldquo;{question}&rdquo;</p>
        </div>
      </FadeIn>

      <div className="reading-cards">
        {selectedCards.map((card, i) => (
          <ReadingCard
            key={card.id}
            card={card}
            position={spread.positions[i]}
            delay={500 + i * 200}
          />
        ))}
      </div>

      <FadeIn delay={800}>
        <div className="reading-interpretation">
          <h3>The Universe Speaks</h3>
          <p>
            The cards have been drawn and their energy is clear. This reading
            is being prepared by the cosmos — soon, Lumina&apos;s AI will channel
            the full interpretation of your spread. For now, know that the
            cards have heard you, and the answers are forming in the starlight.
          </p>
          <p className="reading-placeholder-note">
            ✦ AI-powered interpretation coming soon ✦
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={1000}>
        <MysticButton onClick={onRestart}>Begin a New Reading</MysticButton>
      </FadeIn>
    </div>
  );
}
