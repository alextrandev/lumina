import { Spread, TarotCard, UserInfo } from "@/app/types";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Constructs a Qwen2 chat-format prompt for tarot reading.
 * Returns an array of chat messages that the pipeline will format
 * using the model's chat template.
 */
export function buildPrompt(opts: {
  spread: Spread;
  selectedCards: TarotCard[];
  question: string;
  userInfo: UserInfo;
}): ChatMessage[] {
  const { spread, selectedCards, question, userInfo } = opts;

  // Build the card layout description
  const cardLayout = selectedCards
    .map((card, i) => {
      const pos = spread.positions[i];
      return `- Position "${pos.name}" (${pos.meaning}): **${card.name}**`;
    })
    .join("\n");

  // Build user context
  const userContext = [
    userInfo.name && `Name: ${userInfo.name}`,
    userInfo.age && `Age: ${userInfo.age}`,
    userInfo.occupation && `Occupation: ${userInfo.occupation}`,
    userInfo.status && `Relationship status: ${userInfo.status}`,
  ]
    .filter(Boolean)
    .join(", ");

  const systemPrompt = `You are Lumina, a mystic tarot reader. Give short, direct readings.

Rules:
- For each card: write exactly ONE sentence explaining what it means in its position.
- After all cards: write 1-2 sentences directly answering the querent's question based on the cards.
- Keep the total response under 150 words.
- Be warm but concise. No rambling.
- Do NOT repeat card names or positions.
- Do NOT use markdown, headers, or bullet points.`;

  const userPrompt = `Question: "${question}"
${userContext ? `Querent: ${userContext}` : ""}
Spread: ${spread.name}
Cards:
${cardLayout}

Read these cards and answer my question directly.`;

  return [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];
}
