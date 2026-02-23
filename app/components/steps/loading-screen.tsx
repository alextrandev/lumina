"use client";

import { useState, useEffect } from "react";
import { FadeIn } from "@/app/components/ui/fade-in";
import { TarotCard, Spread } from "@/app/types";
import { useI18n } from "@/app/i18n";

interface LoadingScreenProps {
  spread: Spread;
  selectedCards: TarotCard[];
  onComplete: () => void;
}

export function LoadingScreen({ spread, selectedCards, onComplete }: LoadingScreenProps) {
  const { t } = useI18n();
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % t.loading.phrases.length);
    }, 2500);
    const timer = setTimeout(onComplete, 6000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete, t.loading.phrases.length]);

  return (
    <div className="step-container loading-screen">
      <FadeIn>
        <h2 className="loading-title">{spread.name}</h2>
      </FadeIn>

      <div className="loading-cards">
        {selectedCards.map((card, i) => (
          <FadeIn key={card.id} delay={i * 300}>
            <div className="loading-card">
              <img src={card.imagePath} alt={card.name} className="loading-card-img" />
              <p className="loading-card-name">{spread.positions[i]?.name}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="loading-animation">
        <div className="orbit">
          <div className="orbit-dot" />
          <div className="orbit-dot" />
          <div className="orbit-dot" />
        </div>
      </div>

      <FadeIn delay={500}>
        <p className="loading-phrase">{t.loading.phrases[phraseIndex]}</p>
      </FadeIn>
    </div>
  );
}
