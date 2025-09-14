import { useState, useEffect } from "react";
import { Artwork } from "@shared/schema";
import { Link } from "wouter";
import { Eye } from "lucide-react";

interface SlideshowProps {
  artworks: Artwork[];
}

export default function Slideshow({ artworks }: SlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (artworks.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % artworks.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [artworks.length]);

  if (artworks.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">ไม่มีผลงานในการแสดงผล</p>
      </div>
    );
  }

  const currentArtwork = artworks[currentSlide];

  return (
    <section className="relative h-screen overflow-hidden mt-[72px]">
      <div className="absolute inset-0">
        <img
          src={currentArtwork.image}
          alt={currentArtwork.title}
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.4)" }}
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 flex items-center justify-center h-full px-4 md:px-8">
        <div className="text-center max-w-4xl">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            {currentArtwork.title}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-primary mb-6">
            โดย {currentArtwork.artist}
          </p>
          <p className="text-base md:text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            {currentArtwork.concept}
          </p>
          <Link
            href={`/artwork/${currentArtwork.id}`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-lg hover:bg-accent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
            data-testid="view-details-button"
          >
            <Eye size={20} />
            ดูรายละเอียด
          </Link>
        </div>
      </div>

      {/* Slideshow Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
        {artworks.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => setCurrentSlide(index)}
            data-testid={`slide-dot-${index}`}
          />
        ))}
      </div>
    </section>
  );
}
