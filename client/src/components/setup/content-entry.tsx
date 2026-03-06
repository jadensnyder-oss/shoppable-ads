import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X, Plus } from "lucide-react";
import { toast } from "sonner";

interface ContentEntryProps {
  values: {
    advertiserBrand: string;
    productTitle: string;
    productPrice: string;
    productSalePrice: string;
    productDiscount: string;
    productDescription: string;
    productImage: string;
    productImages: string[];
    ctaButtonText: string;
    countdownSeconds: number;
    badges: string[];
    soldBy: string;
    variants: { label: string; options: string[] }[];
  };
  onChange: (values: ContentEntryProps["values"]) => void;
}

export function ContentEntry({ values, onChange }: ContentEntryProps) {
  const [newBadge, setNewBadge] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof ContentEntryProps["values"]>(
    key: K,
    value: ContentEntryProps["values"][K]
  ) => {
    onChange({ ...values, [key]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/partners/upload-image", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      const newImages = [...values.productImages, data.url];
      onChange({
        ...values,
        productImage: values.productImage || data.url,
        productImages: newImages,
      });
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Image upload failed. Please try again.");
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    const newImages = values.productImages.filter((_, i) => i !== index);
    onChange({
      ...values,
      productImages: newImages,
      productImage: newImages[0] || "",
    });
  };

  const addBadge = () => {
    if (newBadge.trim()) {
      update("badges", [...values.badges, newBadge.trim().toUpperCase()]);
      setNewBadge("");
    }
  };

  const removeBadge = (index: number) => {
    update("badges", values.badges.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label>Advertiser / Brand Name</Label>
        <Input
          value={values.advertiserBrand}
          onChange={(e) => {
            const v = e.target.value;
            onChange({ ...values, advertiserBrand: v, soldBy: v });
          }}
          placeholder="e.g. Palmes"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Product Title</Label>
        <Input
          value={values.productTitle}
          onChange={(e) => update("productTitle", e.target.value)}
          placeholder="e.g. Stained Socks Oxiclean Shoe Deodorizer"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label>Original Price</Label>
          <Input
            value={values.productPrice}
            onChange={(e) => update("productPrice", e.target.value)}
            placeholder="$30"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Sale Price</Label>
          <Input
            value={values.productSalePrice}
            onChange={(e) => update("productSalePrice", e.target.value)}
            placeholder="$24"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Discount Label</Label>
          <Input
            value={values.productDiscount}
            onChange={(e) => update("productDiscount", e.target.value)}
            placeholder="Save 20%"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Product Description</Label>
        <textarea
          value={values.productDescription}
          onChange={(e) => update("productDescription", e.target.value)}
          placeholder="Product details..."
          rows={4}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Product Images</Label>
        <div className="flex gap-3 items-start flex-wrap">
          {values.productImages.map((img, i) => (
            <div key={`${img}-${i}`} className="relative w-20 h-20 rounded-lg overflow-hidden border">
              <img
                src={img}
                alt={`Product ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full flex items-center justify-center cursor-pointer"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-20 h-20 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 transition-colors cursor-pointer"
          >
            <Upload className="w-5 h-5" />
            <span className="text-[10px] mt-1">Upload</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label>CTA Button Text</Label>
          <Input
            value={values.ctaButtonText}
            onChange={(e) => update("ctaButtonText", e.target.value)}
            placeholder="Add to order"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Countdown (seconds)</Label>
          <Input
            type="number"
            value={values.countdownSeconds}
            onChange={(e) =>
              update("countdownSeconds", parseInt(e.target.value) || 300)
            }
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Badges</Label>
        <div className="flex flex-wrap gap-2">
          {values.badges.map((badge, i) => (
            <span
              key={`${badge}-${i}`}
              className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-xs font-medium"
            >
              {badge}
              <button onClick={() => removeBadge(i)} className="cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <div className="flex gap-1">
            <Input
              value={newBadge}
              onChange={(e) => setNewBadge(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addBadge()}
              placeholder="Add badge"
              className="h-8 text-xs w-32"
            />
            <Button variant="ghost" size="sm" onClick={addBadge} className="h-8">
              <Plus className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
