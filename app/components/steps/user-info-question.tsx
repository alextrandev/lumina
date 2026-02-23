"use client";

import { useState, useCallback } from "react";
import { TypingText } from "@/app/components/ui/typing-text";
import { FadeIn } from "@/app/components/ui/fade-in";
import { MysticButton } from "@/app/components/ui/mystic-button";
import { MysticInput } from "@/app/components/ui/mystic-input";
import { useI18n } from "@/app/i18n";

interface UserInfoQuestionProps {
  question: string;
  onAnswer: (value: string | undefined) => void;
}

export function UserInfoQuestion({ question, onAnswer }: UserInfoQuestionProps) {
  const { t } = useI18n();
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
              placeholder={t.userInfo.placeholder}
            />
            <div className="button-row">
              <MysticButton onClick={handleSubmit} disabled={!value.trim()}>
                {t.userInfo.answer}
              </MysticButton>
              <MysticButton variant="ghost" onClick={handleSkip}>
                {t.userInfo.skip}
              </MysticButton>
            </div>
          </div>
        </FadeIn>
      )}
    </>
  );
}
