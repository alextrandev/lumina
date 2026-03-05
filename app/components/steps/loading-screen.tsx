"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FadeIn } from "@/app/components/ui/fade-in";
import { TarotCard, Spread } from "@/app/types";
import { useI18n } from "@/app/i18n";
import { ModelStatus } from "@/app/hooks/use-model";

interface LoadingScreenProps {
  spread: Spread;
  selectedCards: TarotCard[];
  modelStatus: ModelStatus;
  modelProgress: number;
  progressMessage: string;
  onComplete: () => void;
}

export function LoadingScreen({
  spread,
  selectedCards,
  modelStatus,
  modelProgress,
  progressMessage,
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

  // Transition to reading when generation starts or is done
  useEffect(() => {
    if (modelStatus === "generating" || modelStatus === "done") {
      // Transition immediately so we can see the text stream
      onComplete();
    }
  }, [modelStatus, onComplete]);

  const isDownloading = modelStatus === "downloading" || modelStatus === "idle";

  return (
    <div className="step-container loading-screen">
      {isDownloading ? (
        /* ── Special loading screen when model is still downloading ── */
        <FadeIn>
          <div className="model-download-screen">
            <div className="model-download-icon">✦</div>
            <h2 className="model-download-title">
              {t.loading.preparingTitle || "Preparing Your Reading"}
            </h2>
            <p className="model-download-subtitle">
              {t.loading.preparingSubtitle ||
                "Lumina is getting ready to channel the cards. This only happens once — future readings will be instant."}
            </p>

            <div className="model-download-progress">
              <div className="model-download-bar">
                <div
                  className="model-download-fill"
                  style={{ width: `${modelProgress}%` }}
                />
              </div>
              <p className="model-download-percent">{modelProgress}%</p>
            </div>

            <div className="model-download-cards">
              {selectedCards.map((card, i) => (
                <div key={card.id} className="model-download-card">
                  <Image src={card.imagePath} alt={card.name} width={60} height={90} className="model-download-card-img" />
                  <span className="model-download-card-label">{spread.positions[i]?.name}</span>
                </div>
              ))}
            </div>

            <p className="loading-phrase">{t.loading.phrases[phraseIndex]}</p>
          </div>
        </FadeIn>
      ) : (
        /* ── Normal loading screen (model ready, generating reading) ── */
        <>
          <FadeIn>
            <h2 className="loading-title">{spread.name}</h2>
          </FadeIn>

          <div className="loading-cards">
            {selectedCards.map((card, i) => (
              <FadeIn key={card.id} delay={i * 300}>
                <div className="loading-card">
                  <Image src={card.imagePath} alt={card.name} className="loading-card-img" width={120} height={210} />
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
        </>
      )}
    </div>
  );
}
