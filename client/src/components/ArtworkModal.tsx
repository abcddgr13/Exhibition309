import { Artwork } from "@shared/schema";
import { X, ArrowLeft } from "lucide-react";
import { useEffect } from "react";

interface ArtworkModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ArtworkModal({ artwork, isOpen, onClose }: ArtworkModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !artwork) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      data-testid="artwork-modal-overlay"
    >
      <div 
        className="bg-card rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
        data-testid="artwork-modal-content"
      >
        <button
          className="absolute top-4 right-4 bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent transition-colors z-10"
          onClick={onClose}
          data-testid="modal-close-button"
        >
          <X size={20} />
        </button>

        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-96 object-cover"
          data-testid="modal-artwork-image"
        />

        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4 text-foreground" data-testid="modal-artwork-title">
            {artwork.title}
          </h2>
          <p className="text-xl text-primary mb-4" data-testid="modal-artwork-artist">
            โดย {artwork.artist}
          </p>
          
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-2 text-foreground">แนวความคิด/ไอเดีย:</h4>
            <p className="text-card-foreground leading-relaxed" data-testid="modal-artwork-concept">
              {artwork.concept}
            </p>
          </div>

          <button
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent transition-all duration-300"
            onClick={onClose}
            data-testid="back-to-gallery-button"
          >
            <ArrowLeft size={20} />
            กลับสู่แกลเลอรี่
          </button>
        </div>
      </div>
    </div>
  );
}
