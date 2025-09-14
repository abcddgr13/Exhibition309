import { Artwork, InsertArtwork } from "@shared/schema";

const ARTWORKS_KEY = 'artworks';

export function saveArtwork(artwork: InsertArtwork): Artwork {
  const artworks = getArtworks();
  const newArtwork: Artwork = {
    ...artwork,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  
  artworks.push(newArtwork);
  localStorage.setItem(ARTWORKS_KEY, JSON.stringify(artworks));
  
  return newArtwork;
}

export function getArtworks(): Artwork[] {
  try {
    const stored = localStorage.getItem(ARTWORKS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getArtworkById(id: string): Artwork | undefined {
  const artworks = getArtworks();
  return artworks.find(artwork => artwork.id === id);
}

export function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
