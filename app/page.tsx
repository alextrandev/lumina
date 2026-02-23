"use client";

import { useCallback } from "react";
import { useSession } from "@/app/hooks/use-session";
import { StarField } from "@/app/components/ui/star-field";
import { Welcome } from "@/app/components/steps/welcome";
import { SpreadSelect } from "@/app/components/steps/spread-select";
import { QuestionInput } from "@/app/components/steps/question-input";
import { UserInfoStep } from "@/app/components/steps/user-info";
import { CardPick } from "@/app/components/steps/card-pick";
import { LoadingScreen } from "@/app/components/steps/loading-screen";
import { ReadingResult } from "@/app/components/steps/reading-result";
import { Spread, TarotCard, UserInfo } from "@/app/types";

export default function Home() {
  const { session, goTo, setSpread, setQuestion, updateUserInfo, addCard, reset } = useSession();

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

  return (
    <main className="app-shell">
      <StarField />
      <div className="app-content">
        {session.step === "welcome" && <Welcome onBegin={handleBegin} />}
        {session.step === "spread-select" && <SpreadSelect onSelect={handleSpreadSelect} />}
        {session.step === "question" && <QuestionInput onSubmit={handleQuestion} />}
        {session.step === "user-info" && <UserInfoStep onComplete={handleUserInfo} />}
        {session.step === "card-pick" && session.spread && (
          <CardPick
            spread={session.spread}
            selectedCards={session.selectedCards}
            onCardSelect={handleCardSelect}
            onComplete={handleCardsComplete}
          />
        )}
        {session.step === "loading" && session.spread && (
          <LoadingScreen
            spread={session.spread}
            selectedCards={session.selectedCards}
            onComplete={handleLoadingComplete}
          />
        )}
        {session.step === "reading" && session.spread && (
          <ReadingResult
            spread={session.spread}
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
