"use client";

import { useState, useEffect } from "react";
import { FadeIn } from "@/app/components/ui/fade-in";
import { TarotCard, Spread } from "@/app/types";
import { useI18n } from "@/app/i18n";
import { ModelStatus } from "@/app/hooks/use-model";

interface LoadingScreenProps {
  spread: Spread;
  selectedCards: TarotCard[];
  modelStatus: ModelStatus;
  modelProgress: number;
  onComplete: () => void;
}

export function LoadingScreen({
  spread,
  selectedCards,
  modelStatus,
  modelProgress,
  onComplete,
}: LoadingScreenProps) {
  const { t } = useI18n();
  const [phraseIndex, setPhraseIndex] = useState(0);

  // Rotate loading phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % t.loading.phrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [t.loading.phrases.length]);

  // Transition to reading when generation is done
  useEffect(() => {
    if (modelStatus === "done") {
      // Small delay to let the user see the last phrase
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [modelStatus, onComplete]);

  const isDownloading = modelStatus === "downloading";

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

      {isDownloading && (
        <FadeIn>
          <div className="model-progress">
            <div className="model-progress-bar">
              <div
                className="model-progress-fill"
                style={{ width: `${modelProgress}%` }}
              />
            </div>
            <p className="model-progress-text">
              {t.loading.downloading || "Downloading the oracle..."} {modelProgress}%
            </p>
          </div>
        </FadeIn>
      )}

      <FadeIn delay={500}>
        <p className="loading-phrase">{t.loading.phrases[phraseIndex]}</p>
      </FadeIn>
    </div>
  );
}
