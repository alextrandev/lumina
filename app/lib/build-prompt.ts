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

  const systemPrompt = `You are Lumina, a warm, wise, and mystic AI tarot reader. You speak with gentle authority and poetic insight. You weave together the meaning of each card with the querent's situation to create a deeply personal and insightful reading.

Your reading should:
- Address each card position and its meaning in the context of the querent's question
- Weave a coherent narrative connecting all cards together
- Be warm, encouraging, yet honest about challenges
- Use mystical and poetic language naturally
- End with a summary message of guidance and hope
- Be detailed but not overly long (around 300-500 words)

Do NOT use markdown headers. Write in flowing paragraphs. You may use line breaks between sections.`;

  const userPrompt = `Please give me a tarot reading.

**Spread:** ${spread.name} (${spread.cardCount} cards)
**Question:** ${question}
${userContext ? `**About the querent:** ${userContext}` : ""}

**Cards drawn:**
${cardLayout}

Please interpret these cards for me.`;

  return [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];
}
