"use client";

import { useCallback, useEffect, useRef } from "react";
import { useSession } from "@/app/hooks/use-session";
import { useModel } from "@/app/hooks/use-model";
import { useI18n } from "@/app/i18n";
import { StarField } from "@/app/components/ui/star-field";
import { Welcome } from "@/app/components/steps/welcome";
import { SpreadSelect } from "@/app/components/steps/spread-select";
import { QuestionInput } from "@/app/components/steps/question-input";
import { UserInfoStep } from "@/app/components/steps/user-info";
import { ProfileView } from "@/app/components/steps/profile-view";
import { CardPick } from "@/app/components/steps/card-pick";
import { LoadingScreen } from "@/app/components/steps/loading-screen";
import { ReadingResult } from "@/app/components/steps/reading-result";
import { Spread, TarotCard, UserInfo } from "@/app/types";
import { I18nProvider } from "@/app/i18n";
import { buildPrompt } from "@/app/lib/build-prompt";

function AppContent() {
  const { session, goTo, setSpread, setQuestion, updateUserInfo, addCard, setReadingText, reset } = useSession();
  const { t } = useI18n();
  const model = useModel();
  const hasStartedGeneration = useRef(false);

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
      const hasInfo = session.userInfo.name || session.userInfo.age || session.userInfo.occupation || session.userInfo.status;
      if (hasInfo) {
        goTo("profile" as any);
      } else {
        goTo("user-info");
      }
    },
    [setQuestion, goTo, session.userInfo]
  );

  const handleUserInfo = useCallback(
    (info: UserInfo) => {
      updateUserInfo(info);
      goTo("card-pick");
    },
    [updateUserInfo, goTo]
  );

  const handleProfileConfirm = useCallback(() => {
    const hasInfo = session.userInfo.name || session.userInfo.age || session.userInfo.occupation || session.userInfo.status;
    if (hasInfo) {
      goTo("card-pick");
    } else {
      goTo("user-info");
    }
  }, [goTo, session.userInfo]);

  const handleProfileEdit = useCallback(() => {
    goTo("user-info");
  }, [goTo]);

  const handleCardSelect = useCallback(
    (card: TarotCard) => addCard(card),
    [addCard]
  );

  const handleCardsComplete = useCallback(() => {
    hasStartedGeneration.current = false;
    goTo("loading");
  }, [goTo]);

  const handleLoadingComplete = useCallback(() => goTo("reading"), [goTo]);

  // When we enter the loading step and the model is ready, start generation
  useEffect(() => {
    if (
      session.step === "loading" &&
      (model.status === "ready" || model.status === "done") &&
      session.spread &&
      !hasStartedGeneration.current
    ) {
      hasStartedGeneration.current = true;
      const messages = buildPrompt({
        spread: session.spread,
        selectedCards: session.selectedCards,
        question: session.question,
        userInfo: session.userInfo,
      });
      model.generate(messages);
    }
  }, [session.step, model.status, session.spread, session.selectedCards, session.question, session.userInfo, model]);

  // Stream the model's output into session state
  useEffect(() => {
    if (model.streamedText) {
      setReadingText(model.streamedText);
    }
  }, [model.streamedText, setReadingText]);

  // Handle model errors — go to reading with whatever text we have
  useEffect(() => {
    if (model.status === "error" && session.step === "loading") {
      goTo("reading");
    }
  }, [model.status, session.step, goTo]);

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
        {(session.step as any) === "profile" && (
          <ProfileView 
            userInfo={session.userInfo} 
            onEdit={handleProfileEdit} 
            onConfirm={handleProfileConfirm} 
          />
        )}
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
            modelStatus={model.status}
            modelProgress={model.progress}
            onComplete={handleLoadingComplete}
          />
        )}
        {session.step === "reading" && translatedSpread && (
          <ReadingResult
            spread={translatedSpread}
            selectedCards={session.selectedCards}
            question={session.question}
            userInfo={session.userInfo}
            readingText={session.readingText}
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
