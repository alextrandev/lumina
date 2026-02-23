"use client";

import { useState, useCallback } from "react";
import { TypingText } from "@/app/components/ui/typing-text";
import { FadeIn } from "@/app/components/ui/fade-in";
import { MysticButton } from "@/app/components/ui/mystic-button";
import { MysticInput } from "@/app/components/ui/mystic-input";
import { ThinkingIndicator } from "@/app/components/ui/thinking-indicator";
import { useI18n } from "@/app/i18n";

interface QuestionInputProps {
  onSubmit: (question: string) => void;
}

export function QuestionInput({ onSubmit }: QuestionInputProps) {
  const { t } = useI18n();
  const [phase, setPhase] = useState<"thinking" | "typing" | "ready">("thinking");
  const [value, setValue] = useState("");

  const handleThinkingDone = useCallback(() => setPhase("typing"), []);
  const handleTypingDone = useCallback(() => setPhase("ready"), []);

  const handleSubmit = () => {
    if (value.trim()) onSubmit(value.trim());
  };

  return (
    <div className="step-container">
      {phase === "thinking" && (
        <ThinkingIndicator duration={1500} onComplete={handleThinkingDone} />
      )}

      {(phase === "typing" || phase === "ready") && (
        <FadeIn>
          <TypingText
            text={t.question.prompt}
            speed={20}
            onComplete={handleTypingDone}
            className="reader-message"
          />
        </FadeIn>
      )}

      {phase === "ready" && (
        <FadeIn delay={300}>
          <div className="input-area">
            <MysticInput
              value={value}
              onChange={setValue}
              onSubmit={handleSubmit}
              placeholder={t.question.placeholder}
              multiline
            />
            <MysticButton onClick={handleSubmit} disabled={!value.trim()}>
              {t.question.submit}
            </MysticButton>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
