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
    let isComplete = false;
    let interval: NodeJS.Timeout;

    const completeNow = () => {
      if (!isComplete) {
        isComplete = true;
        clearInterval(interval);
        setDisplayed(text);
        setDone(true);
        onComplete?.();
      }
    };

    interval = setInterval(() => {
      i++;
      if (!isComplete) setDisplayed(text.slice(0, i)); // Prevent overwriting if already skipped
      if (i >= text.length) {
        completeNow();
      }
    }, speed);

    const handleInteraction = (e: MouseEvent | KeyboardEvent) => {
      completeNow();
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);

    return () => {
      clearInterval(interval);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [text, speed, onComplete]);

  return (
    <p className={`typing-text ${className} ${done ? "done" : ""}`}>
      {displayed}
      {!done && <span className="cursor">|</span>}
    </p>
  );
}
