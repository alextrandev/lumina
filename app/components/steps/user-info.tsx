"use client";

import { useState, useCallback } from "react";
import { UserInfo } from "@/app/types";
import { userInfoQuestions } from "@/app/data/dialogue";
import { UserInfoQuestion } from "./user-info-question";
import { ThinkingIndicator } from "@/app/components/ui/thinking-indicator";

interface UserInfoStepProps {
  onComplete: (info: UserInfo) => void;
}

export function UserInfoStep({ onComplete }: UserInfoStepProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [info, setInfo] = useState<UserInfo>({});
  const [showThinking, setShowThinking] = useState(true);

  const handleAnswer = useCallback(
    (value: string | undefined) => {
      const q = userInfoQuestions[questionIndex];
      const updated = { ...info, [q.key]: value };
      setInfo(updated);

      if (questionIndex + 1 >= userInfoQuestions.length) {
        onComplete(updated);
      } else {
        setShowThinking(true);
        setQuestionIndex((i) => i + 1);
      }
    },
    [questionIndex, info, onComplete]
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

  const current = userInfoQuestions[questionIndex];

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
