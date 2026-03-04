"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/app/i18n";

interface ThinkingIndicatorProps {
  duration?: number;
  onComplete?: () => void;
}

export function ThinkingIndicator({ duration = 2000, onComplete }: ThinkingIndicatorProps) {
  const { t } = useI18n();
  const [phrase, setPhrase] = useState(t.thinking[0]);

  useEffect(() => {
    // eslint-disable-next-line
    setPhrase(t.thinking[Math.floor(Math.random() * t.thinking.length)]);
  }, [t.thinking]);

  useEffect(() => {
    let isComplete = false;
    let timer: NodeJS.Timeout;

    const completeNow = () => {
      if (!isComplete) {
        isComplete = true;
        clearTimeout(timer);
        onComplete?.();
      }
    };

    timer = setTimeout(completeNow, duration);

    // Listen to click and keydown events to skip the indicator
    const handleInteraction = (e: MouseEvent | KeyboardEvent) => {
      completeNow();
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [duration, onComplete]);

  return (
    <div className="thinking-indicator">
      <div className="thinking-dots">
        <span /><span /><span />
      </div>
      <p className="thinking-phrase">{phrase}</p>
    </div>
  );
}
