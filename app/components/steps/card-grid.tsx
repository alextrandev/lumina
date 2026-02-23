"use client";

import { TarotCard } from "@/app/types";
import { CardSlot } from "./card-slot";

interface CardGridProps {
  cards: TarotCard[];
  selectedCards: TarotCard[];
  onSelect: (card: TarotCard) => void;
  disabled: boolean;
}

export function CardGrid({ cards, selectedCards, onSelect, disabled }: CardGridProps) {
  const selectedIds = new Set(selectedCards.map((c) => c.id));

  return (
    <div className="card-grid">
      {cards.map((card) => (
        <CardSlot
          key={card.id}
          card={card}
          isSelected={selectedIds.has(card.id)}
          onSelect={onSelect}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
