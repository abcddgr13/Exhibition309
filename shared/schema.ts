import { z } from "zod";

export const artworkSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.string(),
  category: z.enum(["brochure", "popup", "sculpture", "cubism", "thaipop"]),
  concept: z.string(),
  image: z.string(), // base64 encoded image or URL
  createdAt: z.string(),
});

export const insertArtworkSchema = artworkSchema.omit({
  id: true,
  createdAt: true,
});

export type Artwork = z.infer<typeof artworkSchema>;
export type InsertArtwork = z.infer<typeof insertArtworkSchema>;

export const categoryNames = {
  brochure: "แผ่นพับ อาชีพทัศนศิลป์",
  popup: "Pop-up",
  sculpture: "ประติมากรรม",
  cubism: "Cubism Art",
  thaipop: "Thai Pop Art",
} as const;

export type Category = keyof typeof categoryNames;
