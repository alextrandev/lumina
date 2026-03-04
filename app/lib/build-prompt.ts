import { Spread, TarotCard, UserInfo } from "@/app/types";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Constructs chat messages for tarot reading using the fine-tuned model.
 * Returns an array of chat messages in the Qwen2 chat format.
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
      return `- Position "${pos.name}" (${pos.meaning}): ${card.name}`;
    })
    .join("\n");

  // Build user context
  const contextParts = [
    userInfo.name && `Name: ${userInfo.name}`,
    userInfo.age && `Age: ${userInfo.age}`,
    userInfo.occupation && `Occupation: ${userInfo.occupation}`,
    userInfo.status && `Relationship status: ${userInfo.status}`,
  ].filter(Boolean);

  const userContext = contextParts.length > 0
    ? contextParts.join(", ")
    : "";

  const systemPrompt = `You are Lumina, a mystical and deeply empathetic tarot reader. You speak naturally, like a warm, wise friend — never formal, never like an email. No "Dear", no formal closings, no bullet points.

Your reading style:
- Briefly touch on what each card means in its position — just 1-2 sentences per card.
- Then focus deeply on answering the user's specific question. Connect the cards to their feelings, situation, and what they're really asking.
- Weave a coherent narrative. The cards tell a story together, not just individual meanings.
- Be warm, honest, and encouraging. If you see challenges, frame them as growth opportunities.
- Use gentle, poetic language — but keep it conversational and real, not overly dramatic.
- End with a short, heartfelt message of guidance.
- Keep the whole reading around 300-400 words.

Important context rules:
- If the user provides personal info (name, age, occupation, relationship status), use it naturally in your reading. Address them by name. Consider their life stage, career, and situation when interpreting the cards.
- Language Rule: ALWAYS respond in the same language as the user's question. If they ask in Vietnamese, respond entirely in Vietnamese (tự nhiên, sâu sắc, đồng cảm). If they ask in English, respond in English. Match their language exactly.
- Do NOT use markdown formatting, headers, or lists. Write in flowing, natural paragraphs.`;

  const userPrompt = userContext
    ? `Context: ${userContext}.
Question: ${question}
Spread: ${spread.name} (${spread.cardCount} cards)
Cards drawn:
${cardLayout}`
    : `Question: ${question}
Spread: ${spread.name} (${spread.cardCount} cards)
Cards drawn:
${cardLayout}`;

  return [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];
}
