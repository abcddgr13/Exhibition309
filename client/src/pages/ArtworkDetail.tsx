import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Artwork, categoryNames } from "@shared/schema";
import { getArtworkById, getArtworks } from "@/lib/localStorage";
import { generatePlaceholderArtworks } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

export default function ArtworkDetail() {
  const [match, params] = useRoute("/artwork/:id");
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!match || !params?.id) return;

    // First check localStorage
    let foundArtwork = getArtworkById(params.id);
    
    // If not found in localStorage, check placeholder artworks
    if (!foundArtwork) {
      const placeholderArtworks = generatePlaceholderArtworks();
      foundArtwork = placeholderArtworks.find(a => a.id === params.id);
    }

    setArtwork(foundArtwork || null);
    setLoading(false);
  }, [match, params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-foreground">ไม่พบผลงาน</h1>
          <p className="text-muted-foreground mb-8">ไม่สามารถค้นหาผลงานที่ระบุได้</p>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-accent transition-colors"
            data-testid="back-to-gallery-link"
          >
            <ArrowLeft size={20} />
            กลับสู่แกลเลอรี่
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
            data-testid="back-button"
          >
            <ArrowLeft size={20} />
            กลับสู่แกลเลอรี่
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Artwork Image */}
          <div className="relative">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-96 lg:h-[600px] object-cover rounded-lg shadow-lg"
              data-testid="artwork-detail-image"
            />
          </div>

          {/* Artwork Information */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground" data-testid="artwork-detail-title">
              {artwork.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-primary mb-4" data-testid="artwork-detail-artist">
              โดย {artwork.artist}
            </p>
            
            <p className="text-lg text-muted-foreground mb-8" data-testid="artwork-detail-category">
              หมวดหมู่: {categoryNames[artwork.category]}
            </p>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-foreground">แนวความคิด/ไอเดีย:</h2>
              <p className="text-card-foreground leading-relaxed text-lg" data-testid="artwork-detail-concept">
                {artwork.concept}
              </p>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>วันที่เพิ่ม: {new Date(artwork.createdAt).toLocaleDateString('th-TH')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
