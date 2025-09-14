import { type Artwork, type InsertArtwork } from "@shared/schema";
import { randomUUID } from "crypto";

// Storage interface for artwork management
export interface IStorage {
  getArtwork(id: string): Promise<Artwork | undefined>;
  getAllArtworks(): Promise<Artwork[]>;
  createArtwork(artwork: InsertArtwork): Promise<Artwork>;
}

export class MemStorage implements IStorage {
  private artworks: Map<string, Artwork>;

  constructor() {
    this.artworks = new Map();
  }

  async getArtwork(id: string): Promise<Artwork | undefined> {
    return this.artworks.get(id);
  }

  async getAllArtworks(): Promise<Artwork[]> {
    return Array.from(this.artworks.values());
  }

  async createArtwork(insertArtwork: InsertArtwork): Promise<Artwork> {
    const id = randomUUID();
    const artwork: Artwork = { 
      ...insertArtwork, 
      id,
      createdAt: new Date().toISOString()
    };
    this.artworks.set(id, artwork);
    return artwork;
  }
}

export const storage = new MemStorage();
