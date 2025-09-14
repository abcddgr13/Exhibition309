import { getBestArtworks } from "@/lib/data";
import Slideshow from "@/components/Slideshow";
import { getArtworks } from "@/lib/localStorage";
import { useEffect, useState } from "react";
import { Artwork } from "@shared/schema";

export default function Home() {
  const [bestArtworks, setBestArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    // Get user artworks from localStorage first
    const userArtworks = getArtworks();
    
    if (userArtworks.length >= 5) {
      // If we have enough user artworks, show the latest 5
      setBestArtworks(userArtworks.slice(-5).reverse());
    } else {
      // Otherwise, combine user artworks with placeholder ones
      const placeholderArtworks = getBestArtworks();
      setBestArtworks([...userArtworks.reverse(), ...placeholderArtworks].slice(0, 5));
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Slideshow artworks={bestArtworks} />
    </div>
  );
}
