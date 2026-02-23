"use client";

import { ReactNode } from "react";

interface MysticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  disabled?: boolean;
  className?: string;
}

export function MysticButton({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
}: MysticButtonProps) {
  return (
    <button
      className={`mystic-button ${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
