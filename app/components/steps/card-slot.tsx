"use client";

import { useState } from "react";
import { TarotCard } from "@/app/types";
import { CardBack } from "./card-back";

interface CardSlotProps {
  card: TarotCard;
  isSelected: boolean;
  onSelect: (card: TarotCard) => void;
  disabled: boolean;
}

export function CardSlot({ card, isSelected, onSelect, disabled }: CardSlotProps) {
  const [flipped, setFlipped] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const handleClick = () => {
    if (disabled || isSelected || flipped) return;
    setImgSrc(card.imagePath);
    setFlipped(true);
    onSelect(card);
  };

  return (
    <div
      className={`card-slot ${flipped ? "flipped" : ""} ${isSelected ? "selected" : ""}`}
      onClick={handleClick}
      role="button"
      tabIndex={disabled || isSelected ? -1 : 0}
      aria-label={flipped ? card.name : "Face-down tarot card"}
    >
      <div className="card-inner">
        <div className="card-face card-front">
          <CardBack />
        </div>
        <div className="card-face card-back-side">
          {imgSrc && (
            <img
              src={imgSrc}
              alt={card.name}
              className="card-image"
              loading="lazy"
            />
          )}
        </div>
      </div>
    </div>
  );
}
