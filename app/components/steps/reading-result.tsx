"use client";

import { FadeIn } from "@/app/components/ui/fade-in";
import { MysticButton } from "@/app/components/ui/mystic-button";
import { ReadingCard } from "./reading-card";
import { Spread, TarotCard, UserInfo } from "@/app/types";
import { useI18n } from "@/app/i18n";

interface ReadingResultProps {
  spread: Spread;
  selectedCards: TarotCard[];
  question: string;
  userInfo: UserInfo;
  readingText: string;
  isError?: boolean;
  onRestart: () => void;
  onRetry?: () => void;
}

export function ReadingResult({
  spread,
  selectedCards,
  question,
  userInfo,
  readingText,
  isError,
  onRestart,
  onRetry,
}: ReadingResultProps) {
  const { t } = useI18n();
  const name = userInfo.name || t.reading.defaultName;
  const title = t.reading.title.replace("{name}", name);
  const subtitle = t.reading.subtitle
    .replace("{spread}", spread.name)
    .replace("{count}", String(spread.cardCount));

  // Split reading text into paragraphs for nice rendering
  const paragraphs = readingText
    ? readingText.split(/\n\n+/).filter((p) => p.trim())
    : [];

  return (
    <div className="step-container reading-result">
      <FadeIn>
        <h2 className="reading-title">{title}</h2>
        <p className="reading-subtitle">{subtitle}</p>
      </FadeIn>

      <FadeIn delay={300}>
        <div className="reading-question">
          <p className="reading-question-label">{t.reading.questionLabel}</p>
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
          <h3>
            {isError ? (t.reading.errorTitle || "The Connection Faltered") : t.reading.interpretationTitle}
          </h3>
          {isError ? (
            <div className="reading-error-state">
              <p>{t.reading.errorText}</p>
              {onRetry && (
                <div style={{ marginTop: "24px", display: "flex", justifyContent: "center" }}>
                  <MysticButton onClick={onRetry}>{t.reading.tryAgain || "Realign and Try Again"}</MysticButton>
                </div>
              )}
            </div>
          ) : paragraphs.length > 0 ? (
            paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))
          ) : (
            <>
              <p>{t.reading.interpretationText}</p>
              <p className="reading-placeholder-note">{t.reading.placeholderNote}</p>
            </>
          )}
        </div>
      </FadeIn>

      <FadeIn delay={1000}>
        <MysticButton onClick={onRestart}>{t.reading.restart}</MysticButton>
      </FadeIn>
    </div>
  );
}
