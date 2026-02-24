import { Spread, TarotCard, UserInfo } from "@/app/types";

/**
 * Constructs a Qwen2-format chat prompt for tarot reading.
 * Uses the <|im_start|> / <|im_end|> markers per the model's chat template.
 */
export function buildPrompt(opts: {
  spread: Spread;
  selectedCards: TarotCard[];
  question: string;
  userInfo: UserInfo;
}): string {
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

  // Construct the Qwen2 chat format
  return `<|im_start|>system
${systemPrompt}<|im_end|>
<|im_start|>user
${userPrompt}<|im_end|>
<|im_start|>assistant
`;
}
