"use client";

import { useCallback } from "react";
import { useSession } from "@/app/hooks/use-session";
import { useI18n } from "@/app/i18n";
import { StarField } from "@/app/components/ui/star-field";
import { Welcome } from "@/app/components/steps/welcome";
import { SpreadSelect } from "@/app/components/steps/spread-select";
import { QuestionInput } from "@/app/components/steps/question-input";
import { UserInfoStep } from "@/app/components/steps/user-info";
import { CardPick } from "@/app/components/steps/card-pick";
import { LoadingScreen } from "@/app/components/steps/loading-screen";
import { ReadingResult } from "@/app/components/steps/reading-result";
import { Spread, TarotCard, UserInfo } from "@/app/types";
import { I18nProvider } from "@/app/i18n";

function AppContent() {
  const { session, goTo, setSpread, setQuestion, updateUserInfo, addCard, reset } = useSession();
  const { t } = useI18n();

  const handleBegin = useCallback(() => goTo("spread-select"), [goTo]);

  const handleSpreadSelect = useCallback(
    (spread: Spread) => {
      setSpread(spread);
      goTo("question");
    },
    [setSpread, goTo]
  );

  const handleQuestion = useCallback(
    (q: string) => {
      setQuestion(q);
      goTo("user-info");
    },
    [setQuestion, goTo]
  );

  const handleUserInfo = useCallback(
    (info: UserInfo) => {
      updateUserInfo(info);
      goTo("card-pick");
    },
    [updateUserInfo, goTo]
  );

  const handleCardSelect = useCallback(
    (card: TarotCard) => addCard(card),
    [addCard]
  );

  const handleCardsComplete = useCallback(() => goTo("loading"), [goTo]);
  const handleLoadingComplete = useCallback(() => goTo("reading"), [goTo]);

  const translatedSpread = session.spread
    ? {
        ...session.spread,
        ...(() => {
          const st = t.spreads[session.spread!.id];
          if (!st) return {};
          return {
            name: st.name,
            description: st.description,
            positions: session.spread!.positions.map((p, i) => ({
              ...p,
              name: st.positions[i]?.name ?? p.name,
              meaning: st.positions[i]?.meaning ?? p.meaning,
              instruction: st.positions[i]?.instruction ?? p.instruction,
            })),
          };
        })(),
      }
    : null;

  return (
    <main className="app-shell">
      <StarField />
      <div className="app-content">
        {session.step === "welcome" && <Welcome onBegin={handleBegin} />}
        {session.step === "spread-select" && <SpreadSelect onSelect={handleSpreadSelect} />}
        {session.step === "question" && <QuestionInput onSubmit={handleQuestion} />}
        {session.step === "user-info" && <UserInfoStep onComplete={handleUserInfo} />}
        {session.step === "card-pick" && translatedSpread && (
          <CardPick
            spread={translatedSpread}
            selectedCards={session.selectedCards}
            onCardSelect={handleCardSelect}
            onComplete={handleCardsComplete}
          />
        )}
        {session.step === "loading" && translatedSpread && (
          <LoadingScreen
            spread={translatedSpread}
            selectedCards={session.selectedCards}
            onComplete={handleLoadingComplete}
          />
        )}
        {session.step === "reading" && translatedSpread && (
          <ReadingResult
            spread={translatedSpread}
            selectedCards={session.selectedCards}
            question={session.question}
            userInfo={session.userInfo}
            onRestart={reset}
          />
        )}
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}
