import { TarotCard, Suit } from "@/app/types";

const majorNames = [
  "The Fool", "The Magician", "The High Priestess", "The Empress",
  "The Emperor", "The Hierophant", "The Lovers", "The Chariot",
  "Strength", "The Hermit", "Wheel of Fortune", "Justice",
  "The Hanged Man", "Death", "Temperance", "The Devil",
  "The Tower", "The Star", "The Moon", "The Sun",
  "Judgement", "The World",
];

const minorNumbers = [
  "Ace", "Two", "Three", "Four", "Five",
  "Six", "Seven", "Eight", "Nine", "Ten",
  "Page", "Knight", "Queen", "King",
];

const minorFiles = [
  "1", "2", "3", "4", "5",
  "6", "7", "8", "9", "10",
  "Page", "Knight", "Queen", "King",
];

const suits: Suit[] = ["cups", "pentacles", "swords", "wands"];

const suitLabels: Record<Suit, string> = {
  cups: "Cups",
  pentacles: "Pentacles",
  swords: "Swords",
  wands: "Wands",
};

function buildMajorCards(): TarotCard[] {
  return majorNames.map((name, i) => ({
    id: `major-${i}`,
    name,
    arcana: "major" as const,
    imagePath: `/cards/major/${i}.png`,
  }));
}

function buildMinorCards(): TarotCard[] {
  const cards: TarotCard[] = [];
  for (const suit of suits) {
    for (let i = 0; i < 14; i++) {
      cards.push({
        id: `minor-${suit}-${i}`,
        name: `${minorNumbers[i]} of ${suitLabels[suit]}`,
        arcana: "minor",
        suit,
        imagePath: `/cards/minor/${suit}/${minorFiles[i]}.png`,
      });
    }
  }
  return cards;
}

export const deck: TarotCard[] = [
  ...buildMajorCards(),
  ...buildMinorCards(),
];
