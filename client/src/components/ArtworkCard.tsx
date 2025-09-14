import { Artwork, categoryNames } from "@shared/schema";
import { Link } from "wouter";
import { Eye } from "lucide-react";

interface ArtworkCardProps {
  artwork: Artwork;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden artwork-card-hover">
      <div className="relative">
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-64 object-cover"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground" data-testid={`artwork-title-${artwork.id}`}>
          {artwork.title}
        </h3>
        <p className="text-primary font-medium mb-2" data-testid={`artwork-artist-${artwork.id}`}>
          โดย {artwork.artist}
        </p>
        <p className="text-muted-foreground text-sm mb-4" data-testid={`artwork-category-${artwork.id}`}>
          {categoryNames[artwork.category]}
        </p>
        
        <Link
          href={`/artwork/${artwork.id}`}
          className="w-full inline-flex items-center justify-center gap-2 border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          data-testid={`view-artwork-button-${artwork.id}`}
        >
          <Eye size={16} />
          ดูผลงาน
        </Link>
      </div>
    </div>
  );
}
