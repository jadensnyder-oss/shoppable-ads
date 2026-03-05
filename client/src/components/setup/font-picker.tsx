import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { GOOGLE_FONTS } from "@shared/fonts";

const loadedFonts = new Set<string>();

function loadGoogleFont(name: string) {
  if (loadedFonts.has(name)) return;
  loadedFonts.add(name);
  const encoded = name.replace(/ /g, "+");
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encoded}&display=swap`;
  document.head.appendChild(link);
}

function FontPreviewItem({
  font,
  isSelected,
  isGoogle,
  onSelect,
}: {
  font: string;
  isSelected: boolean;
  isGoogle: boolean;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isGoogle || !ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadGoogleFont(font);
          observer.disconnect();
        }
      },
      { rootMargin: "50px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [font, isGoogle]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onSelect}
      className="w-full flex flex-col gap-0.5 px-3 py-2 text-sm hover:bg-accent cursor-pointer text-left"
    >
      <div className="flex items-center gap-2 w-full">
        <span className="flex-1 truncate">{font}</span>
        {isSelected && (
          <Check className="w-3.5 h-3.5 text-primary shrink-0" />
        )}
      </div>
      <span
        className="text-xs text-muted-foreground truncate w-full"
        style={{ fontFamily: `'${font}', sans-serif` }}
      >
        AaBbCc 123 — The quick brown fox
      </span>
    </button>
  );
}

interface FontPickerProps {
  value: string;
  onChange: (font: string) => void;
  customFonts?: string[];
  placeholder?: string;
}

export function FontPicker({
  value,
  onChange,
  customFonts = [],
  placeholder = "Select font...",
}: FontPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (value && GOOGLE_FONTS.includes(value)) {
      loadGoogleFont(value);
    }
  }, [value]);

  const allFonts = [
    ...customFonts.map((f) => ({ name: f, group: "Custom" as const })),
    ...GOOGLE_FONTS.map((f) => ({ name: f, group: "Google Fonts" as const })),
  ];

  const filtered = search
    ? allFonts.filter((f) =>
        f.name.toLowerCase().includes(search.toLowerCase())
      )
    : allFonts;

  const handleSelect = useCallback((font: string) => {
    onChange(font);
    setOpen(false);
    setSearch("");
  }, [onChange]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full h-10 px-3 rounded-md border border-input bg-background text-sm cursor-pointer hover:bg-accent/50 transition-colors"
      >
        <span
          className={value ? "text-foreground" : "text-muted-foreground"}
          style={value ? { fontFamily: `'${value}', sans-serif` } : undefined}
        >
          {value || placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full bg-popover border border-border rounded-md shadow-lg max-h-[320px] flex flex-col">
          <div className="flex items-center gap-2 px-3 py-2 border-b">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && search && filtered.length === 0) {
                  handleSelect(search);
                }
              }}
              placeholder="Search or type custom font..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="overflow-y-auto flex-1">
            {filtered.length === 0 && search && (
              <button
                type="button"
                onClick={() => handleSelect(search)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-accent cursor-pointer"
              >
                Use custom font: <strong>{search}</strong>
              </button>
            )}

            {customFonts.length > 0 && filtered.some((f) => f.group === "Custom") && (
              <div className="px-3 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Custom Fonts
              </div>
            )}
            {filtered
              .filter((f) => f.group === "Custom")
              .map((f) => (
                <FontPreviewItem
                  key={`custom-${f.name}`}
                  font={f.name}
                  isSelected={value === f.name}
                  isGoogle={false}
                  onSelect={() => handleSelect(f.name)}
                />
              ))}

            {filtered.some((f) => f.group === "Google Fonts") && (
              <div className="px-3 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                Google Fonts
              </div>
            )}
            {filtered
              .filter((f) => f.group === "Google Fonts")
              .map((f) => (
                <FontPreviewItem
                  key={`google-${f.name}`}
                  font={f.name}
                  isSelected={value === f.name}
                  isGoogle={true}
                  onSelect={() => handleSelect(f.name)}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
