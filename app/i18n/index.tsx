"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Locale, Translations } from "./types";
import { en } from "./en";
import { vi } from "./vi";
import { fi } from "./fi";
import { sv } from "./sv";

const translationMap: Record<Locale, Translations> = { en, vi, fi, sv };

interface I18nContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  t: en,
  setLocale: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);

  const t = translationMap[locale];

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
