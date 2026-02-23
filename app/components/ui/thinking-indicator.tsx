"use client";

import { useState, useEffect, useMemo } from "react";
import { useI18n } from "@/app/i18n";

interface ThinkingIndicatorProps {
  duration?: number;
  onComplete?: () => void;
}

export function ThinkingIndicator({ duration = 2000, onComplete }: ThinkingIndicatorProps) {
  const { t } = useI18n();
  const phrase = useMemo(() => {
    return t.thinking[Math.floor(Math.random() * t.thinking.length)];
  }, [t.thinking]);

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
