import { useState, useCallback, useRef } from "react";
import { Upload, FileText, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ExtractionResult } from "@shared/schema";

interface HtmlUploadProps {
  label: string;
  description: string;
  onUpload: (html: string, extraction: ExtractionResult) => void;
  currentHtml?: string | null;
}

export function HtmlUpload({
  label,
  description,
  onUpload,
  currentHtml,
}: HtmlUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    async (file: File) => {
      if (!file.name.endsWith(".html") && !file.name.endsWith(".htm")) {
        setError("Please upload an HTML file");
        return;
      }

      setIsUploading(true);
      setError(null);
      setFileName(file.name);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/partners/upload-html", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("Upload failed");

        const data = await res.json();
        onUpload(data.html, data.extraction);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
        setFileName(null);
      } finally {
        setIsUploading(false);
      }
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setIsDragging(false), []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const hasFile = !!currentHtml || !!fileName;

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <p className="text-xs text-muted-foreground mb-1">{description}</p>

      {hasFile ? (
        <div className="border rounded-lg p-4 flex items-center justify-between bg-muted/30">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium truncate max-w-[200px]">
              {fileName || "Uploaded HTML"}
            </span>
          </div>
          <div className="flex gap-2">
            {currentHtml && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreviewOpen(!previewOpen)}
              >
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setFileName(null);
                onUpload("", { styles: {}, flags: [] });
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".html,.htm"
            className="hidden"
            onChange={handleFileSelect}
          />
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">
                Uploading and analyzing...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm font-medium">
                Drop your SingleFile HTML here
              </p>
              <p className="text-xs text-muted-foreground">
                or click to browse
              </p>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-xs text-destructive mt-1">{error}</p>}

      {previewOpen && currentHtml && (
        <div className="border rounded-lg overflow-hidden mt-2">
          <div className="bg-muted px-3 py-2 flex items-center justify-between">
            <span className="text-xs font-medium">Preview</span>
            <span className="text-xs text-muted-foreground">
              Desktop capture — demo will display in mobile viewport
            </span>
          </div>
          <iframe
            srcDoc={currentHtml}
            className="w-full h-[300px] border-0"
            sandbox="allow-scripts allow-same-origin"
            title={`${label} preview`}
          />
        </div>
      )}
    </div>
  );
}
