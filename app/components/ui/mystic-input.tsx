"use client";

import { KeyboardEvent } from "react";

interface MysticInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
  autoComplete?: string;
}

export function MysticInput({
  value,
  onChange,
  onSubmit,
  placeholder = "",
  multiline = false,
  className = "",
  autoComplete,
}: MysticInputProps) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };

  if (multiline) {
    return (
      <textarea
        className={`mystic-input multiline ${className}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={3}
      />
    );
  }

  return (
    <input
      type="text"
      className={`mystic-input ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
  );
}
