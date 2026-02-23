"use client";

import { useState, useCallback } from "react";
import { TypingText } from "@/app/components/ui/typing-text";
import { FadeIn } from "@/app/components/ui/fade-in";
import { MysticButton } from "@/app/components/ui/mystic-button";
import { ThinkingIndicator } from "@/app/components/ui/thinking-indicator";
import { welcomeText } from "@/app/data/dialogue";

interface WelcomeProps {
  onBegin: () => void;
}

export function Welcome({ onBegin }: WelcomeProps) {
  const [phase, setPhase] = useState<"thinking" | "typing" | "ready">("thinking");

  const handleThinkingDone = useCallback(() => setPhase("typing"), []);
  const handleTypingDone = useCallback(() => setPhase("ready"), []);

  return (
    <div className="step-container welcome">
      <FadeIn>
        <h1 className="app-title">✦ Lumina ✦</h1>
        <p className="app-subtitle">AI Tarot Reader</p>
      </FadeIn>

      {phase === "thinking" && (
        <ThinkingIndicator duration={2000} onComplete={handleThinkingDone} />
      )}

      {(phase === "typing" || phase === "ready") && (
        <FadeIn delay={200}>
          <TypingText
            text={welcomeText}
            speed={25}
            onComplete={handleTypingDone}
            className="reader-message"
          />
        </FadeIn>
      )}

      {phase === "ready" && (
        <FadeIn delay={300}>
          <MysticButton onClick={onBegin}>Begin Your Reading</MysticButton>
        </FadeIn>
      )}
    </div>
  );
}
