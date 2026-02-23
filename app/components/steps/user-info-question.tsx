"use client";

import { useState, useCallback } from "react";
import { TypingText } from "@/app/components/ui/typing-text";
import { FadeIn } from "@/app/components/ui/fade-in";
import { MysticButton } from "@/app/components/ui/mystic-button";
import { MysticInput } from "@/app/components/ui/mystic-input";

interface UserInfoQuestionProps {
  question: string;
  onAnswer: (value: string | undefined) => void;
}

export function UserInfoQuestion({ question, onAnswer }: UserInfoQuestionProps) {
  const [typingDone, setTypingDone] = useState(false);
  const [value, setValue] = useState("");

  const handleTypingDone = useCallback(() => setTypingDone(true), []);

  const handleSubmit = () => {
    onAnswer(value.trim() || undefined);
  };

  const handleSkip = () => {
    onAnswer(undefined);
  };

  return (
    <>
      <TypingText
        text={question}
        speed={25}
        onComplete={handleTypingDone}
        className="reader-message"
      />

      {typingDone && (
        <FadeIn delay={200}>
          <div className="input-area">
            <MysticInput
              value={value}
              onChange={setValue}
              onSubmit={handleSubmit}
              placeholder="Your answer..."
            />
            <div className="button-row">
              <MysticButton onClick={handleSubmit} disabled={!value.trim()}>
                Answer
              </MysticButton>
              <MysticButton variant="ghost" onClick={handleSkip}>
                Skip
              </MysticButton>
            </div>
          </div>
        </FadeIn>
      )}
    </>
  );
}
