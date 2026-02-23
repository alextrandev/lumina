"use client";

import { useState, useEffect } from "react";
import { thinkingPhrases } from "@/app/data/dialogue";

interface ThinkingIndicatorProps {
  duration?: number;
  onComplete?: () => void;
}

export function ThinkingIndicator({ duration = 2000, onComplete }: ThinkingIndicatorProps) {
  const [phrase] = useState(
    () => thinkingPhrases[Math.floor(Math.random() * thinkingPhrases.length)]
  );

  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), duration);
    return () => clearTimeout(timer);
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
