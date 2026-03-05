"use client";

import { useI18n } from "@/app/i18n";
import { FadeIn } from "./fade-in";
import { LanguagePicker } from "./language-picker";

export function MobileBlock() {
  const { t } = useI18n();

  return (
    <div className="mobile-block-overlay">
      <div className="mobile-block-nav">
        <LanguagePicker />
      </div>
      <FadeIn>
        <div className="mobile-block-content">
          <div className="mobile-block-icon">✧</div>
          <h2 className="mobile-block-title">{t.mobileBlock.title}</h2>
          <p className="mobile-block-message">{t.mobileBlock.message}</p>
          <div className="mobile-block-decoration">
            <span>✦</span>
            <span>✦</span>
            <span>✦</span>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
