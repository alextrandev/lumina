export type Locale = "en" | "vi" | "fi" | "sv";

export interface LocaleInfo {
  code: Locale;
  name: string;
  flag: string;
}

export const locales: LocaleInfo[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "fi", name: "Suomi", flag: "🇫🇮" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
];

export interface SpreadTranslation {
  name: string;
  description: string;
  positions: {
    name: string;
    meaning: string;
    instruction: string;
  }[];
}

export interface Translations {
  welcome: {
    title: string;
    subtitle: string;
    text: string;
    begin: string;
  };
  spreadSelect: {
    intro: string;
    cardLabel: string;
    cardsLabel: string;
  };
  question: {
    prompt: string;
    placeholder: string;
    submit: string;
  };
  userInfo: {
    questions: { key: string; question: string }[];
    placeholder: string;
    answer: string;
    skip: string;
  };
  cardPick: {
    intro: string;
    cardOf: string;
    faceDownLabel: string;
  };
  thinking: string[];
  loading: {
    phrases: string[];
    downloading?: string;
    preparingTitle?: string;
    preparingSubtitle?: string;
  };
  reading: {
    title: string;
    subtitle: string;
    questionLabel: string;
    interpretationTitle: string;
    interpretationText: string;
    placeholderNote: string;
    restart: string;
    defaultName: string;
  };
  spreads: Record<string, SpreadTranslation>;
}
