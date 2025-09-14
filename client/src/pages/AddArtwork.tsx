import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertArtworkSchema, InsertArtwork, categoryNames } from "@shared/schema";
import { saveArtwork, convertImageToBase64 } from "@/lib/localStorage";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Plus } from "lucide-react";

export default function AddArtwork() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<InsertArtwork>({
    resolver: zodResolver(insertArtworkSchema),
    defaultValues: {
      title: "",
      artist: "",
      category: undefined,
      concept: "",
      image: ""
    }
  });

  const category = watch("category");

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "ไฟล์ไม่ถูกต้อง",
        description: "กรุณาเลือกไฟล์รูปภาพเท่านั้น",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "ไฟล์ใหญ่เกินไป",
        description: "กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 5MB",
        variant: "destructive"
      });
      return;
    }

    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: InsertArtwork) => {
    if (!selectedFile) {
      toast({
        title: "กรุณาเลือกรูปภาพ",
        description: "รูปภาพเป็นข้อมูลที่จำเป็น",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert image to base64
      const base64Image = await convertImageToBase64(selectedFile);
      
      // Save artwork with base64 image
      const artworkData: InsertArtwork = {
        ...data,
        image: base64Image
      };

      saveArtwork(artworkData);

      toast({
        title: "บันทึกผลงานสำเร็จ!",
        description: "ผลงานของคุณได้รับการบันทึกแล้ว",
      });

      // Reset form
      reset();
      setSelectedFile(null);
      setImagePreview(null);

      // Redirect to gallery
      setTimeout(() => {
        setLocation("/gallery");
      }, 1500);

    } catch (error) {
      console.error("Error saving artwork:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถบันทึกผลงานได้ กรุณาลองใหม่",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            เพิ่มผลงานศิลปะ
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            แบ่งปันผลงานของคุณกับชุมชน
          </p>
        </div>

        {/* Form */}
        <div className="bg-card p-8 rounded-lg border border-border">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground font-semibold">
                ชื่อผลงาน *
              </Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="กรอกชื่อผลงาน"
                className="bg-secondary border-border"
                data-testid="input-title"
              />
              {errors.title && (
                <p className="text-destructive text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Artist */}
            <div className="space-y-2">
              <Label htmlFor="artist" className="text-foreground font-semibold">
                ชื่อศิลปิน *
              </Label>
              <Input
                id="artist"
                {...register("artist")}
                placeholder="กรอกชื่อศิลปิน"
                className="bg-secondary border-border"
                data-testid="input-artist"
              />
              {errors.artist && (
                <p className="text-destructive text-sm">{errors.artist.message}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label className="text-foreground font-semibold">หมวดหมู่ *</Label>
              <Select
                value={category}
                onValueChange={(value) => setValue("category", value as any)}
              >
                <SelectTrigger className="bg-secondary border-border" data-testid="select-category">
                  <SelectValue placeholder="เลือกหมวดหมู่" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryNames).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-destructive text-sm">{errors.category.message}</p>
              )}
            </div>

            {/* Concept */}
            <div className="space-y-2">
              <Label htmlFor="concept" className="text-foreground font-semibold">
                แนวความคิด/ไอเดีย *
              </Label>
              <Textarea
                id="concept"
                {...register("concept")}
                placeholder="อธิบายแนวความคิดและแรงบันดาลใจของผลงาน..."
                className="bg-secondary border-border min-h-[120px]"
                data-testid="textarea-concept"
              />
              {errors.concept && (
                <p className="text-destructive text-sm">{errors.concept.message}</p>
              )}
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label className="text-foreground font-semibold">รูปภาพผลงาน *</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-full max-h-64 mx-auto rounded-lg"
                      data-testid="image-preview"
                    />
                    <p className="text-sm text-muted-foreground">
                      ไฟล์: {selectedFile?.name}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image-input")?.click()}
                      data-testid="change-image-button"
                    >
                      เปลี่ยนรูปภาพ
                    </Button>
                  </div>
                ) : (
                  <div
                    className="cursor-pointer"
                    onClick={() => document.getElementById("image-input")?.click()}
                    data-testid="upload-area"
                  >
                    <Upload className="mx-auto mb-4 text-primary" size={48} />
                    <p className="text-lg mb-2">คลิกเพื่ออัปโหลดรูปภาพ</p>
                    <p className="text-sm text-muted-foreground">
                      รองรับไฟล์ JPG, PNG, GIF (ขนาดไม่เกิน 5MB)
                    </p>
                  </div>
                )}
              </div>
              <input
                id="image-input"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                data-testid="file-input"
              />
              {errors.image && (
                <p className="text-destructive text-sm">{errors.image.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-accent text-lg py-6"
              disabled={isSubmitting}
              data-testid="submit-button"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  กำลังบันทึก...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Plus size={20} />
                  เพิ่มผลงาน
                </div>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
