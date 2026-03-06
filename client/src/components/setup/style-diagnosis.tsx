import { useState, useEffect, useCallback } from "react";
import { AlertTriangle, Check, Info, X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FontPicker } from "@/components/setup/font-picker";
import { isFontAvailable } from "@shared/fonts";
import type { ExtractedStyles, ExtractionFlag } from "@shared/schema";

function parsePx(value: string): number {
  const num = parseFloat(value.replace(/[^0-9.]/g, ""));
  return isNaN(num) ? 8 : Math.round(num);
}

function RadiusStepper({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const px = parsePx(value);
  const setPx = (n: number) => onChange(`${Math.max(0, Math.min(100, n))}px`);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => setPx(px - 1)}
        disabled={px <= 0}
        className="w-8 h-8 rounded-md border border-input bg-background flex items-center justify-center hover:bg-accent disabled:opacity-40 cursor-pointer transition-colors"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      <input
        type="number"
        min={0}
        max={100}
        value={px}
        onChange={(e) => setPx(parseInt(e.target.value, 10) || 0)}
        className="w-16 h-8 text-center text-sm font-medium rounded-md border border-input bg-background [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <span className="text-sm text-muted-foreground">px</span>
      <button
        type="button"
        onClick={() => setPx(px + 1)}
        disabled={px >= 100}
        className="w-8 h-8 rounded-md border border-input bg-background flex items-center justify-center hover:bg-accent disabled:opacity-40 cursor-pointer transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

interface StyleDiagnosisProps {
  styles: ExtractedStyles;
  flags: ExtractionFlag[];
  onApply: (overrides: Record<string, string>) => void;
  onDismissFlag: (index: number) => void;
  customFonts?: string[];
}

function ColorSwatch({
  label,
  value,
  confidence,
  source,
  onChange,
}: {
  label: string;
  value: string;
  confidence?: number;
  source?: string;
  onChange: (val: string) => void;
}) {
  const handleHexInput = (raw: string) => {
    const v = raw.startsWith("#") ? raw : `#${raw}`;
    if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange(v);
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded border border-border cursor-pointer shrink-0"
      />
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        <div className="flex items-center gap-2">
          <Input
            value={value.toUpperCase()}
            onChange={(e) => handleHexInput(e.target.value)}
            className="w-24 h-6 text-xs font-mono px-1.5"
          />
          <span className="text-xs text-muted-foreground">
            {source && `from ${source}`}
            {confidence !== undefined &&
              ` • ${Math.round(confidence * 100)}%`}
          </span>
        </div>
      </div>
    </div>
  );
}

export function StyleDiagnosis({
  styles,
  flags,
  onApply,
  onDismissFlag,
  customFonts = [],
}: StyleDiagnosisProps) {
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [dismissedFlags, setDismissedFlags] = useState<Set<number>>(new Set());

  const [resolvedFlags, setResolvedFlags] = useState<Map<number, string>>(new Map());
  const [flagInputs, setFlagInputs] = useState<Map<number, string>>(new Map());

  const update = (key: string, value: string) => {
    setOverrides((prev) => ({ ...prev, [key]: value }));
  };

  const resolveFlag = useCallback((index: number, resolution: string) => {
    setResolvedFlags((prev) => new Map(prev).set(index, resolution));
  }, []);

  const resolveFontFlag = useCallback((fontName: string) => {
    update("fontFamily", fontName);
    flags.forEach((flag, i) => {
      if (flag.type === "font_unavailable" && !dismissedFlags.has(i)) {
        resolveFlag(i, fontName);
      }
    });
  }, [flags, dismissedFlags, resolveFlag]);

  useEffect(() => {
    const fontOverride = overrides.fontFamily;
    if (!fontOverride) return;

    const isAvailable = isFontAvailable(fontOverride) || customFonts.includes(fontOverride);
    if (isAvailable) {
      flags.forEach((flag, i) => {
        if (flag.type === "font_unavailable" && !dismissedFlags.has(i)) {
          setResolvedFlags((prev) => new Map(prev).set(i, fontOverride));
        }
      });
    }
  }, [overrides.fontFamily, flags, customFonts, dismissedFlags]);

  const activeFlags = flags.filter(
    (_, i) => !dismissedFlags.has(i) && !resolvedFlags.has(i)
  );

  const handleDismiss = (index: number) => {
    setDismissedFlags((prev) => new Set(prev).add(index));
    onDismissFlag(index);
  };

  const handleFlagInputChange = (index: number, value: string) => {
    setFlagInputs((prev) => new Map(prev).set(index, value));
  };

  const handleFlagInputResolve = (flag: ExtractionFlag, index: number) => {
    const value = flagInputs.get(index)?.trim();
    if (!value) return;
    if (flag.type === "font_unavailable") {
      resolveFontFlag(value);
    } else if (flag.type === "missing_color") {
      update("primaryColor", value);
      resolveFlag(index, value);
    } else {
      resolveFlag(index, value);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Flags */}
      {(activeFlags.length > 0 || resolvedFlags.size > 0) && (
        <div className="flex flex-col gap-2">
          {activeFlags.length > 0 && (
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Issues Found ({activeFlags.length})
            </h3>
          )}
          {flags.map((flag, i) => {
            if (dismissedFlags.has(i)) return null;
            const resolvedValue = resolvedFlags.get(i);
            if (resolvedValue) {
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg text-sm"
                >
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  <p className="text-green-800 flex-1">
                    Resolved: using <strong>{resolvedValue}</strong>
                  </p>
                  <button
                    onClick={() => {
                      setResolvedFlags((prev) => { const n = new Map(prev); n.delete(i); return n; });
                    }}
                    className="text-green-600 hover:text-green-800 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            }
            return (
              <div
                key={i}
                className="flex flex-col gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm"
              >
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-amber-900">{flag.message}</p>
                    {flag.substitute && (
                      <p className="text-amber-700 text-xs mt-1">
                        Suggested substitute:{" "}
                        <strong>{flag.substitute}</strong>
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs shrink-0"
                    onClick={() => handleDismiss(i)}
                  >
                    Dismiss
                  </Button>
                </div>

                {/* Inline resolution controls */}
                <div className="flex gap-2 ml-7">
                  {flag.type === "font_unavailable" ? (
                    <>
                      <div className="flex-1">
                        <FontPicker
                          value={flagInputs.get(i) || ""}
                          onChange={(v) => {
                            handleFlagInputChange(i, v);
                            resolveFontFlag(v);
                          }}
                          customFonts={customFonts}
                          placeholder="Pick a replacement font..."
                        />
                      </div>
                      {flag.substitute && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs shrink-0"
                          onClick={() => resolveFontFlag(flag.substitute!)}
                        >
                          Use {flag.substitute}
                        </Button>
                      )}
                    </>
                  ) : flag.type === "missing_color" ? (
                    <>
                      <input
                        type="color"
                        value={flagInputs.get(i) || "#000000"}
                        onChange={(e) => handleFlagInputChange(i, e.target.value)}
                        className="w-10 h-8 rounded border cursor-pointer shrink-0"
                      />
                      <Input
                        value={flagInputs.get(i) || ""}
                        onChange={(e) => handleFlagInputChange(i, e.target.value)}
                        placeholder="#hex color..."
                        className="text-sm font-mono flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs shrink-0"
                        disabled={!flagInputs.get(i)?.trim()}
                        onClick={() => handleFlagInputResolve(flag, i)}
                      >
                        Apply
                      </Button>
                    </>
                  ) : (
                    <>
                      <Input
                        value={flagInputs.get(i) || ""}
                        onChange={(e) => handleFlagInputChange(i, e.target.value)}
                        placeholder="Enter a value to resolve..."
                        className="text-sm flex-1"
                        onKeyDown={(e) => e.key === "Enter" && handleFlagInputResolve(flag, i)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs shrink-0"
                        disabled={!flagInputs.get(i)?.trim()}
                        onClick={() => handleFlagInputResolve(flag, i)}
                      >
                        Resolve
                      </Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Colors */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold">Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {styles.primaryColor && (
            <ColorSwatch
              label="Primary Color"
              value={overrides.primaryColor || styles.primaryColor.value}
              confidence={styles.primaryColor.confidence}
              source={styles.primaryColor.source}
              onChange={(v) => update("primaryColor", v)}
            />
          )}
          {styles.secondaryColor && (
            <ColorSwatch
              label="Secondary Color"
              value={overrides.secondaryColor || styles.secondaryColor.value}
              confidence={styles.secondaryColor.confidence}
              source={styles.secondaryColor.source}
              onChange={(v) => update("secondaryColor", v)}
            />
          )}
          {styles.backgroundColor && (
            <ColorSwatch
              label="Background"
              value={
                overrides.backgroundColor || styles.backgroundColor.value
              }
              confidence={styles.backgroundColor.confidence}
              source={styles.backgroundColor.source}
              onChange={(v) => update("backgroundColor", v)}
            />
          )}
        </div>
      </div>

      {/* Typography */}
      {styles.fontFamily && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Typography</h3>
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              {styles.fontFamily.available ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              )}
              <p className="text-sm">
                <strong>{styles.fontFamily.value}</strong>
                {styles.fontFamily.available
                  ? " — available via Google Fonts"
                  : ` — using substitute: ${styles.fontFamily.substitute || "Inter"}`}
              </p>
            </div>
            <div className="mt-2">
              <FontPicker
                value={overrides.fontFamily || ""}
                onChange={(v) => update("fontFamily", v)}
                customFonts={customFonts}
                placeholder="Override font family..."
              />
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      {styles.buttonStyles && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Button Styles</h3>
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-4 mb-2">
              <div
                className="px-6 py-2 rounded text-sm font-medium"
                style={{
                  backgroundColor:
                    overrides.buttonBgColor || styles.buttonStyles.bgColor,
                  color:
                    overrides.buttonTextColor || styles.buttonStyles.textColor,
                  borderRadius:
                    overrides.buttonBorderRadius ||
                    styles.buttonStyles.borderRadius,
                  border: styles.buttonStyles.border,
                }}
              >
                Sample Button
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div>
                <label className="text-xs text-muted-foreground">
                  Background
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={
                      overrides.buttonBgColor || styles.buttonStyles.bgColor
                    }
                    onChange={(e) => update("buttonBgColor", e.target.value)}
                    className="w-8 h-8 rounded border cursor-pointer shrink-0"
                  />
                  <Input
                    value={(overrides.buttonBgColor || styles.buttonStyles.bgColor).toUpperCase()}
                    onChange={(e) => {
                      const v = e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`;
                      if (/^#[0-9a-fA-F]{6}$/.test(v)) update("buttonBgColor", v);
                    }}
                    className="flex-1 h-8 text-xs font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Text Color
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="color"
                    value={
                      overrides.buttonTextColor || styles.buttonStyles.textColor
                    }
                    onChange={(e) => update("buttonTextColor", e.target.value)}
                    className="w-8 h-8 rounded border cursor-pointer shrink-0"
                  />
                  <Input
                    value={(overrides.buttonTextColor || styles.buttonStyles.textColor).toUpperCase()}
                    onChange={(e) => {
                      const v = e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`;
                      if (/^#[0-9a-fA-F]{6}$/.test(v)) update("buttonTextColor", v);
                    }}
                    className="flex-1 h-8 text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Border Radius */}
      {styles.borderRadius && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Border Radius</h3>
          <div className="p-3 bg-muted/30 rounded-lg flex items-center gap-4">
            <div
              className="w-12 h-12 bg-primary/10 border-2 border-primary/30 shrink-0"
              style={{
                borderRadius:
                  overrides.borderRadius || `${parsePx(styles.borderRadius.value)}px`,
              }}
            />
            <RadiusStepper
              value={overrides.borderRadius || styles.borderRadius.value}
              onChange={(v) => update("borderRadius", v)}
            />
          </div>
        </div>
      )}

      <Button onClick={() => onApply(overrides)} className="w-full">
        {activeFlags.length > 0
          ? `Apply Styles (${activeFlags.length} unresolved flag${activeFlags.length > 1 ? "s" : ""})`
          : "Apply Extracted Styles"}
      </Button>
    </div>
  );
}
