"use client";

import { useState, useCallback } from "react";
import { TypingText } from "@/app/components/ui/typing-text";
import { FadeIn } from "@/app/components/ui/fade-in";
import { MysticButton } from "@/app/components/ui/mystic-button";
import { ThinkingIndicator } from "@/app/components/ui/thinking-indicator";
import { LanguagePicker } from "@/app/components/ui/language-picker";
import { useI18n } from "@/app/i18n";

interface WelcomeProps {
  onBegin: () => void;
}

export function Welcome({ onBegin }: WelcomeProps) {
  const { t } = useI18n();
  const [phase, setPhase] = useState<"thinking" | "typing" | "ready">("thinking");

  const handleThinkingDone = useCallback(() => setPhase("typing"), []);
  const handleTypingDone = useCallback(() => setPhase("ready"), []);

  return (
    <div className="step-container welcome">
      <FadeIn>
        <LanguagePicker />
      </FadeIn>

      <FadeIn>
        <h1 className="app-title">{t.welcome.title}</h1>
        <p className="app-subtitle">{t.welcome.subtitle}</p>
      </FadeIn>

      {phase === "thinking" && (
        <ThinkingIndicator duration={2000} onComplete={handleThinkingDone} />
      )}

      {(phase === "typing" || phase === "ready") && (
        <FadeIn delay={200}>
          <TypingText
            text={t.welcome.text}
            speed={25}
            onComplete={handleTypingDone}
            className="reader-message"
          />
        </FadeIn>
      )}

      {phase === "ready" && (
        <FadeIn delay={300}>
          <MysticButton onClick={onBegin}>{t.welcome.begin}</MysticButton>
        </FadeIn>
      )}
    </div>
  );
}
