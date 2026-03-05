import { useState, useRef, useCallback } from "react";
import { Upload, Copy, Check, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UploadedAsset {
  url: string;
  name: string;
}

export function AssetUpload() {
  const [assets, setAssets] = useState<UploadedAsset[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are supported");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/partners/upload-image", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setAssets((prev) => [...prev, { url: data.url, name: file.name }]);
      toast.success(`Uploaded ${file.name}`);
    } catch {
      toast.error(`Failed to upload ${file.name}`);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      Array.from(files).forEach((f) => uploadFile(f));
    },
    [uploadFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const copyUrl = (url: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(url);
    toast.success("URL copied to clipboard");
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const removeAsset = (url: string) => {
    setAssets((prev) => prev.filter((a) => a.url !== url));
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="text-sm font-medium text-foreground">
          Image Assets
        </label>
        <p className="text-xs text-muted-foreground mt-0.5">
          Upload images that are missing from the SingleFile capture (logos,
          icons, backgrounds). Copy the URL and use it to replace broken
          references.
        </p>
      </div>

      {assets.length > 0 && (
        <div className="flex flex-col gap-2">
          {assets.map((asset) => (
            <div
              key={asset.url}
              className="flex items-center gap-3 border rounded-lg px-3 py-2 bg-muted/30"
            >
              <div className="w-10 h-10 rounded border bg-white flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src={asset.url}
                  alt={asset.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{asset.name}</p>
                <p className="text-xs text-muted-foreground truncate font-mono">
                  {asset.url}
                </p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyUrl(asset.url)}
                  className="h-8 px-2"
                >
                  {copiedUrl === asset.url ? (
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAsset(asset.url)}
                  className="h-8 px-2"
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50"
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-muted-foreground">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1.5">
            <ImageIcon className="w-6 h-6 text-muted-foreground" />
            <p className="text-xs font-medium">
              Drop images here or click to upload
            </p>
            <p className="text-[11px] text-muted-foreground">
              PNG, JPG, SVG, WebP
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
