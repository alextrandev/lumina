"use client";

import { useI18n } from "@/app/i18n";
import { locales } from "@/app/i18n/types";
import { Locale } from "@/app/i18n/types";

export function LanguagePicker() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="language-picker">
      {locales.map((l) => (
        <button
          key={l.code}
          className={`lang-btn ${locale === l.code ? "active" : ""}`}
          onClick={() => setLocale(l.code as Locale)}
          aria-label={l.name}
          title={l.name}
        >
          <span className="lang-flag">{l.flag}</span>
          <span className="lang-name">{l.name}</span>
        </button>
      ))}
    </div>
  );
}
