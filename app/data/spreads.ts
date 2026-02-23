import { Spread } from "@/app/types";

export const spreads: Spread[] = [
  {
    id: "single",
    name: "Single Card",
    description: "A quick glimpse into the energy surrounding your question.",
    cardCount: 1,
    positions: [
      {
        index: 0,
        name: "The Answer",
        meaning: "The core energy and guidance for your question",
        instruction:
          "Close your eyes. Hold your question in your heart. When you feel ready, let your hand be drawn to a single card.",
      },
    ],
  },
  {
    id: "three-card",
    name: "Three Card Spread",
    description: "Past, present, and future — the arc of your journey.",
    cardCount: 3,
    positions: [
      {
        index: 0,
        name: "The Past",
        meaning: "What has led you here",
        instruction:
          "Think about where you've been. What events shaped this moment? Let your intuition guide your hand to the card that holds your past.",
      },
      {
        index: 1,
        name: "The Present",
        meaning: "Where you stand now",
        instruction:
          "Now, bring your awareness to this very moment. Feel the energy around you. Choose the card that speaks to your present.",
      },
      {
        index: 2,
        name: "The Future",
        meaning: "What lies ahead",
        instruction:
          "Finally, open your mind to what may come. Don't try to force an answer — let the universe reveal the path. Pick your final card.",
      },
    ],
  },
  {
    id: "five-card",
    name: "Five Card Cross",
    description: "A deeper look at your situation from all angles.",
    cardCount: 5,
    positions: [
      {
        index: 0,
        name: "The Present",
        meaning: "Your current situation",
        instruction:
          "Center yourself. Feel the weight of your question. Choose the card that represents where you are right now.",
      },
      {
        index: 1,
        name: "The Challenge",
        meaning: "What stands in your way",
        instruction:
          "Think about the obstacles you face. What holds you back? Let a card reveal itself to you.",
      },
      {
        index: 2,
        name: "The Foundation",
        meaning: "The root cause beneath it all",
        instruction:
          "Go deeper now. What lies beneath the surface? Choose a card that speaks to the hidden truth.",
      },
      {
        index: 3,
        name: "The Recent Past",
        meaning: "Events that recently influenced you",
        instruction:
          "Look back over your shoulder. What recent events still echo? Pick the card that carries that energy.",
      },
      {
        index: 4,
        name: "The Potential",
        meaning: "The best possible outcome",
        instruction:
          "Now look forward with hope. What is the highest possibility? Choose your final card with an open heart.",
      },
    ],
  },
  {
    id: "horseshoe",
    name: "Horseshoe Spread",
    description: "Seven cards for a comprehensive view of your path.",
    cardCount: 7,
    positions: [
      {
        index: 0,
        name: "The Past",
        meaning: "Past influences",
        instruction:
          "Begin at the beginning. Let your memories surface gently, and pick the card that holds the energy of your past.",
      },
      {
        index: 1,
        name: "The Present",
        meaning: "Current circumstances",
        instruction:
          "Bring yourself fully into this moment. What do you feel right now? Choose a card.",
      },
      {
        index: 2,
        name: "Hidden Influences",
        meaning: "What you may not be seeing",
        instruction:
          "There are forces you cannot see. Trust your intuition completely — pick a card without overthinking.",
      },
      {
        index: 3,
        name: "Obstacles",
        meaning: "Challenges to overcome",
        instruction:
          "Acknowledge what stands between you and your desire. Choose the card that represents that barrier.",
      },
      {
        index: 4,
        name: "External Influences",
        meaning: "People and energies around you",
        instruction:
          "Think about the people in your life. Who affects this situation? Let their energy guide your choice.",
      },
      {
        index: 5,
        name: "Advice",
        meaning: "What the universe suggests",
        instruction:
          "Open yourself to guidance. The universe has a message for you. Pick a card with reverence.",
      },
      {
        index: 6,
        name: "The Outcome",
        meaning: "The likely result",
        instruction:
          "This is the final card. Take a deep breath. Whatever comes, trust that it is what you need to see. Choose now.",
      },
    ],
  },
  {
    id: "celtic-cross",
    name: "Celtic Cross",
    description: "The classic ten-card spread for deep, layered insight.",
    cardCount: 10,
    positions: [
      {
        index: 0,
        name: "The Present",
        meaning: "The heart of the matter",
        instruction:
          "This card is the center of everything. Hold your question close and choose the card that resonates most deeply with you right now.",
      },
      {
        index: 1,
        name: "The Challenge",
        meaning: "What crosses you",
        instruction:
          "Every question carries tension. Feel that tension and pick the card that embodies it.",
      },
      {
        index: 2,
        name: "The Foundation",
        meaning: "The root of the situation",
        instruction:
          "Dig deep beneath the surface. What unconscious forces are at play? Choose a card from your gut feeling.",
      },
      {
        index: 3,
        name: "The Recent Past",
        meaning: "What is passing away",
        instruction:
          "Something is leaving your life. Feel that release, and pick a card that captures what is fading.",
      },
      {
        index: 4,
        name: "The Crown",
        meaning: "Your aspirations and best outcome",
        instruction:
          "Look up. What do you hope for? Let your highest wish guide this choice.",
      },
      {
        index: 5,
        name: "The Near Future",
        meaning: "What is approaching",
        instruction:
          "Something new is coming toward you. Can you feel it? Choose the card that carries its energy.",
      },
      {
        index: 6,
        name: "Your Power",
        meaning: "Your inner resources",
        instruction:
          "Reflect on your own strength. What power do you carry within? Pick a card that mirrors your inner self.",
      },
      {
        index: 7,
        name: "External Forces",
        meaning: "How others see you",
        instruction:
          "Step outside yourself. How does the world perceive you in this situation? Choose the card that reflects that.",
      },
      {
        index: 8,
        name: "Hopes & Fears",
        meaning: "What you desire and dread",
        instruction:
          "Hope and fear are often two sides of one coin. Feel both, and pick a card that holds that duality.",
      },
      {
        index: 9,
        name: "The Final Outcome",
        meaning: "Where this journey leads",
        instruction:
          "This is the last card. Take a moment of silence. Breathe deeply. When you are ready, let your soul choose the card that completes your reading.",
      },
    ],
  },
];
