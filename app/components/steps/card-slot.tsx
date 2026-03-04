"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { TarotCard } from "@/app/types";
import { CardBack } from "./card-back";
import { useI18n } from "@/app/i18n";
import { createPortal } from "react-dom";

interface CardSlotProps {
  card: TarotCard;
  isSelected: boolean;
  onSelect: (card: TarotCard) => void;
  disabled: boolean;
}

export function CardSlot({ card, isSelected, onSelect, disabled }: CardSlotProps) {
  const { t } = useI18n();
  const [flipped, setFlipped] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isCompleteRef = useRef(false);

  const completeReveal = () => {
    if (isCompleteRef.current) return;
    isCompleteRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    
    setRevealing(false);
    
    // Give a tiny delay for the scale-down animation to start before unlocking UI flow
    setTimeout(() => {
      onSelect(card);
    }, 100);
  };

  const handleClick = () => {
    if (disabled || isSelected || flipped || revealing) return;
    setImgSrc(card.imagePath);
    setFlipped(true);
    setRevealing(true);
    isCompleteRef.current = false;
    
    // Auto complete reveal after 2.5 seconds
    timerRef.current = setTimeout(completeReveal, 2500);
  };

  // Allow clicking anywhere or pressing any key to skip the dramatic reveal
  useEffect(() => {
    if (!revealing) return;
    
    const handleInteraction = () => completeReveal();
    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [revealing]);

  const renderCardInner = (isRevealedInstance = false) => (
    <div className={`card-inner ${isRevealedInstance ? "revealing-instance" : ""}`}>
      <div className="card-face card-front">
        <CardBack />
      </div>
      <div className="card-face card-back-side">
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={card.name}
            className="card-image"
            width={200}
            height={350}
          />
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* 
        Overlay and Portalled Card rendered at the body level to ensure it covers 
        everything and completely bypasses any CSS containing blocks (like transforms)
      */}
      {revealing && typeof document !== 'undefined' && createPortal(
        <div className="reveal-portal-container">
          <div className={`reveal-overlay ${revealing ? 'visible' : ''}`} />
          <div className="card-slot revealed">
            {renderCardInner(true)}
          </div>
        </div>,
        document.body
      )}

      <div
        className={`card-slot ${flipped ? "flipped" : ""} ${isSelected ? "selected" : ""}`}
        onClick={handleClick}
        role="button"
        tabIndex={disabled || isSelected || revealing ? -1 : 0}
        aria-label={flipped ? card.name : t.cardPick.faceDownLabel}
      >
        {/* If it's currently revealing in the portal, hide this exact inner card so we don't see duplicates */}
        <div style={{ visibility: revealing ? 'hidden' : 'visible', width: '100%', height: '100%' }}>
          {renderCardInner()}
        </div>
      </div>
    </>
  );
}
