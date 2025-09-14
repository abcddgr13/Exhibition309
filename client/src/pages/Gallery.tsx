import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { Artwork, Category, categoryNames } from "@shared/schema";
import { generatePlaceholderArtworks } from "@/lib/data";
import { getArtworks } from "@/lib/localStorage";
import ArtworkCard from "@/components/ArtworkCard";
import ArtworkModal from "@/components/ArtworkModal";

export default function Gallery() {
  const [location] = useLocation();
  const [allArtworks, setAllArtworks] = useState<Artwork[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Combine user artworks with placeholder artworks
    const userArtworks = getArtworks();
    const placeholderArtworks = generatePlaceholderArtworks();
    setAllArtworks([...userArtworks, ...placeholderArtworks]);
  }, []);

  // Check if we should open a modal for a specific artwork
  useEffect(() => {
    const params = new URLSearchParams(location.split('?')[1] || '');
    const artworkId = params.get('id');
    
    if (artworkId) {
      const artwork = allArtworks.find(a => a.id === artworkId);
      if (artwork) {
        setSelectedArtwork(artwork);
        setIsModalOpen(true);
      }
    }
  }, [location, allArtworks]);

  const filteredArtworks = useMemo(() => {
    if (selectedCategory === "all") {
      return allArtworks;
    }
    return allArtworks.filter(artwork => artwork.category === selectedCategory);
  }, [allArtworks, selectedCategory]);

  const categories: Array<{ key: Category | "all"; label: string }> = [
    { key: "all", label: "ทั้งหมด" },
    { key: "brochure", label: categoryNames.brochure },
    { key: "popup", label: categoryNames.popup },
    { key: "sculpture", label: categoryNames.sculpture },
    { key: "cubism", label: categoryNames.cubism },
    { key: "thaipop", label: categoryNames.thaipop },
  ];

  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArtwork(null);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            แกลเลอรี่ผลงานศิลปะ
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            สำรวจผลงานศิลปะจากศิลปินชั้นนำ
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === key
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
              onClick={() => setSelectedCategory(key)}
              data-testid={`category-button-${key}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Artwork Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredArtworks.map((artwork) => (
            <div key={artwork.id} onClick={() => handleArtworkClick(artwork)}>
              <ArtworkCard artwork={artwork} />
            </div>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              ไม่มีผลงานในหมวดหมู่นี้
            </p>
          </div>
        )}
      </div>

      <ArtworkModal
        artwork={selectedArtwork}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
