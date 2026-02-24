"use client";

import { useState, useCallback } from "react";
import { SessionData, Step, Spread, TarotCard, UserInfo } from "@/app/types";

const initialSession: SessionData = {
  step: "welcome",
  spread: null,
  question: "",
  userInfo: {},
  selectedCards: [],
  readingText: "",
};

export function useSession() {
  const [session, setSession] = useState<SessionData>(initialSession);

  const goTo = useCallback((step: Step) => {
    setSession((s) => ({ ...s, step }));
  }, []);

  const setSpread = useCallback((spread: Spread) => {
    setSession((s) => ({ ...s, spread }));
  }, []);

  const setQuestion = useCallback((question: string) => {
    setSession((s) => ({ ...s, question }));
  }, []);

  const updateUserInfo = useCallback((info: Partial<UserInfo>) => {
    setSession((s) => ({ ...s, userInfo: { ...s.userInfo, ...info } }));
  }, []);

  const addCard = useCallback((card: TarotCard) => {
    setSession((s) => ({ ...s, selectedCards: [...s.selectedCards, card] }));
  }, []);

  const setReadingText = useCallback((readingText: string) => {
    setSession((s) => ({ ...s, readingText }));
  }, []);

  const reset = useCallback(() => {
    setSession(initialSession);
  }, []);

  return { session, goTo, setSpread, setQuestion, updateUserInfo, addCard, setReadingText, reset };
}
