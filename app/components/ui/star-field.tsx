import { useEffect, useState } from "react";

export function StarField() {
  const [comets, setComets] = useState<{ id: number; top: string; left: string; delay: string; duration: string }[]>([]);
  const [stars, setStars] = useState<{ id: number; left: string; top: string; sizeClass: string; isGlowing: boolean; delay: string; duration: string }[]>([]);

  useEffect(() => {
    // Generate individual stars to make them twinkle out of sync
    const generatedStars = Array.from({ length: 150 }).map((_, i) => {
      const sizeClass = Math.random() > 0.8 ? "star-large" : Math.random() > 0.4 ? "star-medium" : "star-small";
      const isGlowing = Math.random() > 0.7;
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        sizeClass,
        isGlowing,
        delay: `${Math.random() * 5}s`,
        duration: `${3 + Math.random() * 4}s`,
      };
    });

    const generatedComets = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      top: `${-10 + Math.random() * 40}vh`,
      left: `${40 + Math.random() * 60}vw`,
      delay: `${Math.random() * 15}s`,
      duration: `${12 + Math.random() * 8}s`,
    }));

    let mounted = true;
    if (mounted) {
      // eslint-disable-next-line
      setStars(generatedStars);
      setComets(generatedComets);
    }
    return () => { mounted = false; };
  }, []);

  return (
    <div className="star-field" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className={`star ${star.sizeClass} ${star.isGlowing ? "star-glowing" : ""}`}
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
      
      {comets.map((comet) => (
        <div
          key={comet.id}
          className="comet"
          style={{
            top: comet.top,
            left: comet.left,
            animationDelay: comet.delay,
            animationDuration: comet.duration,
          }}
        />
      ))}
    </div>
  );
}
