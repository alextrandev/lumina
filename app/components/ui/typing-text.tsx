"use client";

import { useState, useEffect } from "react";

interface TypingTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export function TypingText({ text, speed = 30, onComplete, className = "" }: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <p className={`typing-text ${className} ${done ? "done" : ""}`}>
      {displayed}
      {!done && <span className="cursor">|</span>}
    </p>
  );
}
