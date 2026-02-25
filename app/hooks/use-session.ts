"use client";

import { useState, useCallback, useEffect } from "react";
import { SessionData, Step, Spread, TarotCard, UserInfo } from "@/app/types";

const initialSession: SessionData = {
  step: "welcome",
  spread: null,
  question: "",
  userInfo: {},
  selectedCards: [],
  readingText: "",
};

const STORAGE_KEY = "lumina_user_info";

export function useSession() {
  const [session, setSession] = useState<SessionData>(initialSession);

  // Load user info from localStorage on mount
  useEffect(() => {
    const savedInfo = localStorage.getItem(STORAGE_KEY);
    if (savedInfo) {
      try {
        const parsed = JSON.parse(savedInfo);
        setSession((s) => ({ ...s, userInfo: parsed }));
      } catch (e) {
        console.error("Failed to parse saved user info", e);
      }
    }
  }, []);

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
    setSession((s) => {
      const newUserInfo = { ...s.userInfo, ...info };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUserInfo));
      return { ...s, userInfo: newUserInfo };
    });
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
