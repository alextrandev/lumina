import { FadeIn } from "@/app/components/ui/fade-in";
import { TarotCard, SpreadPosition } from "@/app/types";

interface ReadingCardProps {
  card: TarotCard;
  position: SpreadPosition;
  delay: number;
}

export function ReadingCard({ card, position, delay }: ReadingCardProps) {
  return (
    <FadeIn delay={delay}>
      <div className="reading-card">
        <img src={card.imagePath} alt={card.name} className="reading-card-img" />
        <div className="reading-card-info">
          <h4 className="reading-card-position">{position.name}</h4>
          <p className="reading-card-name">{card.name}</p>
          <p className="reading-card-meaning">{position.meaning}</p>
        </div>
      </div>
    </FadeIn>
  );
}
