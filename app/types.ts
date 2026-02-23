export type Arcana = "major" | "minor";

export type Suit = "cups" | "pentacles" | "swords" | "wands";

export interface TarotCard {
  id: string;
  name: string;
  arcana: Arcana;
  suit?: Suit;
  imagePath: string;
}

export interface SpreadPosition {
  index: number;
  name: string;
  meaning: string;
  instruction: string;
}

export interface Spread {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  positions: SpreadPosition[];
}

export interface UserInfo {
  name?: string;
  age?: string;
  occupation?: string;
  status?: string;
}

export type Step =
  | "welcome"
  | "spread-select"
  | "question"
  | "user-info"
  | "card-pick"
  | "loading"
  | "reading";

export interface SessionData {
  step: Step;
  spread: Spread | null;
  question: string;
  userInfo: UserInfo;
  selectedCards: TarotCard[];
}
