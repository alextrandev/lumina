"use client";

import { useState, useCallback } from "react";
import { TypingText } from "@/app/components/ui/typing-text";
import { FadeIn } from "@/app/components/ui/fade-in";
import { MysticButton } from "@/app/components/ui/mystic-button";
import { MysticInput } from "@/app/components/ui/mystic-input";
import { ThinkingIndicator } from "@/app/components/ui/thinking-indicator";
import { questionPrompt } from "@/app/data/dialogue";

interface QuestionInputProps {
  onSubmit: (question: string) => void;
}

export function QuestionInput({ onSubmit }: QuestionInputProps) {
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
            text={questionPrompt}
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
              placeholder="Speak your question..."
              multiline
            />
            <MysticButton onClick={handleSubmit} disabled={!value.trim()}>
              Reveal My Question
            </MysticButton>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
