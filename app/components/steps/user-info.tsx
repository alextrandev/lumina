"use client";

import { useState, useCallback } from "react";
import { UserInfo } from "@/app/types";
import { UserInfoQuestion } from "./user-info-question";
import { ThinkingIndicator } from "@/app/components/ui/thinking-indicator";
import { useI18n } from "@/app/i18n";

interface UserInfoStepProps {
  onComplete: (info: UserInfo) => void;
}

export function UserInfoStep({ onComplete }: UserInfoStepProps) {
  const { t } = useI18n();
  const questions = t.userInfo.questions;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [info, setInfo] = useState<UserInfo>({});
  const [showThinking, setShowThinking] = useState(true);

  const handleAnswer = useCallback(
    (value: string | undefined) => {
      const q = questions[questionIndex];
      const updated = { ...info, [q.key]: value };
      setInfo(updated);

      if (questionIndex + 1 >= questions.length) {
        onComplete(updated);
      } else {
        setShowThinking(true);
        setQuestionIndex((i) => i + 1);
      }
    },
    [questionIndex, info, onComplete, questions]
  );

  if (showThinking) {
    return (
      <div className="step-container">
        <ThinkingIndicator
          duration={1200}
          onComplete={() => setShowThinking(false)}
        />
      </div>
    );
  }

  const current = questions[questionIndex];

  return (
    <div className="step-container">
      <UserInfoQuestion
        key={current.key}
        question={current.question}
        onAnswer={handleAnswer}
      />
    </div>
  );
}
