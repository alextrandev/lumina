import { Translations } from "./types";

export const en: Translations = {
  welcome: {
    title: "✦ Lumina ✦",
    subtitle: "AI Tarot Reader",
    text: "Welcome, seeker. I am Lumina, your guide through the veil of the unknown. The cards have been waiting for you. Shall we begin?",
    begin: "Begin Your Reading",
  },
  spreadSelect: {
    intro: "Before we begin, I must know how deeply you wish to look. Choose a spread — each reveals the cosmos in a different way...",
    cardLabel: "card",
    cardsLabel: "cards",
  },
  question: {
    prompt: "Now, tell me... what weighs on your mind? What question has brought you to the cards today?\n\nSpeak freely — about love, career, a decision you face, or simply what the universe wants you to know. The more open your heart, the clearer the cards will speak.",
    placeholder: "Speak your question...",
    submit: "Reveal My Question",
  },
  userInfo: {
    questions: [
      { key: "name", question: "First, let me know you a little. What shall I call you?" },
      { key: "age", question: "And how many seasons have you walked this earth? Your age, if you will." },
      { key: "occupation", question: "What occupies your days? Your work, your craft — what do you do?" },
      { key: "status", question: "One last thing — what is your heart's current state? Are you in love, seeking, healing?" },
    ],
    placeholder: "Your answer...",
    answer: "Answer",
    skip: "Skip",
  },
  cardPick: {
    intro: "The cards are laid before you, face down, shrouded in mystery. Do not rush. Let your intuition speak louder than your mind.",
    cardOf: "Card {current} of {total}:",
    faceDownLabel: "Face-down tarot card",
  },
  thinking: [
    "The stars are aligning...",
    "I sense the energy shifting...",
    "The veil between worlds thins...",
    "Let me attune to your vibration...",
    "The cosmos whispers...",
    "I feel something forming...",
    "The cards are listening...",
  ],
  loading: {
    phrases: [
      "The universe is weaving your reading...",
      "The cards speak in whispers... I am listening...",
      "Ancient energies converge upon your spread...",
      "The threads of fate are being read...",
      "I see the patterns forming in the starlight...",
    ],
    downloading: "Downloading the oracle...",
  },
  reading: {
    title: "Your Reading, {name}",
    subtitle: "{spread} — {count} Cards",
    questionLabel: "Your Question",
    interpretationTitle: "The Universe Speaks",
    interpretationText: "The cards have been drawn and their energy is clear. This reading is being prepared by the cosmos — soon, Lumina's AI will channel the full interpretation of your spread. For now, know that the cards have heard you, and the answers are forming in the starlight.",
    placeholderNote: "✦ AI-powered interpretation coming soon ✦",
    restart: "Begin a New Reading",
    defaultName: "Seeker",
  },
  spreads: {
    single: {
      name: "Single Card",
      description: "A quick glimpse into the energy surrounding your question.",
      positions: [
        { name: "The Answer", meaning: "The core energy and guidance for your question", instruction: "Close your eyes. Hold your question in your heart. When you feel ready, let your hand be drawn to a single card." },
      ],
    },
    "three-card": {
      name: "Three Card Spread",
      description: "Past, present, and future — the arc of your journey.",
      positions: [
        { name: "The Past", meaning: "What has led you here", instruction: "Think about where you've been. What events shaped this moment? Let your intuition guide your hand to the card that holds your past." },
        { name: "The Present", meaning: "Where you stand now", instruction: "Now, bring your awareness to this very moment. Feel the energy around you. Choose the card that speaks to your present." },
        { name: "The Future", meaning: "What lies ahead", instruction: "Finally, open your mind to what may come. Don't try to force an answer — let the universe reveal the path. Pick your final card." },
      ],
    },
    "five-card": {
      name: "Five Card Cross",
      description: "A deeper look at your situation from all angles.",
      positions: [
        { name: "The Present", meaning: "Your current situation", instruction: "Center yourself. Feel the weight of your question. Choose the card that represents where you are right now." },
        { name: "The Challenge", meaning: "What stands in your way", instruction: "Think about the obstacles you face. What holds you back? Let a card reveal itself to you." },
        { name: "The Foundation", meaning: "The root cause beneath it all", instruction: "Go deeper now. What lies beneath the surface? Choose a card that speaks to the hidden truth." },
        { name: "The Recent Past", meaning: "Events that recently influenced you", instruction: "Look back over your shoulder. What recent events still echo? Pick the card that carries that energy." },
        { name: "The Potential", meaning: "The best possible outcome", instruction: "Now look forward with hope. What is the highest possibility? Choose your final card with an open heart." },
      ],
    },
    horseshoe: {
      name: "Horseshoe Spread",
      description: "Seven cards for a comprehensive view of your path.",
      positions: [
        { name: "The Past", meaning: "Past influences", instruction: "Begin at the beginning. Let your memories surface gently, and pick the card that holds the energy of your past." },
        { name: "The Present", meaning: "Current circumstances", instruction: "Bring yourself fully into this moment. What do you feel right now? Choose a card." },
        { name: "Hidden Influences", meaning: "What you may not be seeing", instruction: "There are forces you cannot see. Trust your intuition completely — pick a card without overthinking." },
        { name: "Obstacles", meaning: "Challenges to overcome", instruction: "Acknowledge what stands between you and your desire. Choose the card that represents that barrier." },
        { name: "External Influences", meaning: "People and energies around you", instruction: "Think about the people in your life. Who affects this situation? Let their energy guide your choice." },
        { name: "Advice", meaning: "What the universe suggests", instruction: "Open yourself to guidance. The universe has a message for you. Pick a card with reverence." },
        { name: "The Outcome", meaning: "The likely result", instruction: "This is the final card. Take a deep breath. Whatever comes, trust that it is what you need to see. Choose now." },
      ],
    },
    "celtic-cross": {
      name: "Celtic Cross",
      description: "The classic ten-card spread for deep, layered insight.",
      positions: [
        { name: "The Present", meaning: "The heart of the matter", instruction: "This card is the center of everything. Hold your question close and choose the card that resonates most deeply with you right now." },
        { name: "The Challenge", meaning: "What crosses you", instruction: "Every question carries tension. Feel that tension and pick the card that embodies it." },
        { name: "The Foundation", meaning: "The root of the situation", instruction: "Dig deep beneath the surface. What unconscious forces are at play? Choose a card from your gut feeling." },
        { name: "The Recent Past", meaning: "What is passing away", instruction: "Something is leaving your life. Feel that release, and pick a card that captures what is fading." },
        { name: "The Crown", meaning: "Your aspirations and best outcome", instruction: "Look up. What do you hope for? Let your highest wish guide this choice." },
        { name: "The Near Future", meaning: "What is approaching", instruction: "Something new is coming toward you. Can you feel it? Choose the card that carries its energy." },
        { name: "Your Power", meaning: "Your inner resources", instruction: "Reflect on your own strength. What power do you carry within? Pick a card that mirrors your inner self." },
        { name: "External Forces", meaning: "How others see you", instruction: "Step outside yourself. How does the world perceive you in this situation? Choose the card that reflects that." },
        { name: "Hopes & Fears", meaning: "What you desire and dread", instruction: "Hope and fear are often two sides of one coin. Feel both, and pick a card that holds that duality." },
        { name: "The Final Outcome", meaning: "Where this journey leads", instruction: "This is the last card. Take a moment of silence. Breathe deeply. When you are ready, let your soul choose the card that completes your reading." },
      ],
    },
  },
};
