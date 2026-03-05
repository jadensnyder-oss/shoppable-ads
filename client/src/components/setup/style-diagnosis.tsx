import { useState } from "react";
import { AlertTriangle, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ExtractedStyles, ExtractionFlag } from "@shared/schema";

interface StyleDiagnosisProps {
  styles: ExtractedStyles;
  flags: ExtractionFlag[];
  onApply: (overrides: Record<string, string>) => void;
  onDismissFlag: (index: number) => void;
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
  return (
    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded border border-border cursor-pointer"
      />
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">
          {value.toUpperCase()}
          {source && ` • from ${source}`}
          {confidence !== undefined &&
            ` • ${Math.round(confidence * 100)}% confidence`}
        </p>
      </div>
    </div>
  );
}

export function StyleDiagnosis({
  styles,
  flags,
  onApply,
  onDismissFlag,
}: StyleDiagnosisProps) {
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [dismissedFlags, setDismissedFlags] = useState<Set<number>>(new Set());

  const update = (key: string, value: string) => {
    setOverrides((prev) => ({ ...prev, [key]: value }));
  };

  const activeFlags = flags.filter((_, i) => !dismissedFlags.has(i));

  const handleDismiss = (index: number) => {
    setDismissedFlags((prev) => new Set(prev).add(index));
    onDismissFlag(index);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Flags */}
      {activeFlags.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Issues Found ({activeFlags.length})
          </h3>
          {flags.map((flag, i) =>
            dismissedFlags.has(i) ? null : (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm"
              >
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
                  className="shrink-0 text-xs"
                  onClick={() => handleDismiss(i)}
                >
                  Dismiss
                </Button>
              </div>
            )
          )}
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
              <Input
                placeholder="Override font family"
                value={overrides.fontFamily || ""}
                onChange={(e) => update("fontFamily", e.target.value)}
                className="text-sm"
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
                <input
                  type="color"
                  value={
                    overrides.buttonBgColor || styles.buttonStyles.bgColor
                  }
                  onChange={(e) => update("buttonBgColor", e.target.value)}
                  className="w-full h-8 rounded border cursor-pointer"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">
                  Text Color
                </label>
                <input
                  type="color"
                  value={
                    overrides.buttonTextColor || styles.buttonStyles.textColor
                  }
                  onChange={(e) => update("buttonTextColor", e.target.value)}
                  className="w-full h-8 rounded border cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Border Radius */}
      {styles.borderRadius && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Border Radius</h3>
          <div className="p-3 bg-muted/30 rounded-lg flex items-center gap-3">
            <div
              className="w-12 h-12 bg-primary/10 border-2 border-primary/30"
              style={{
                borderRadius:
                  overrides.borderRadius || styles.borderRadius.value,
              }}
            />
            <Input
              value={overrides.borderRadius || styles.borderRadius.value}
              onChange={(e) => update("borderRadius", e.target.value)}
              className="text-sm max-w-[120px]"
            />
          </div>
        </div>
      )}

      <Button onClick={() => onApply(overrides)} className="w-full">
        {activeFlags.length > 0
          ? `Apply with ${activeFlags.length} unresolved flag(s)`
          : "Apply Extracted Styles"}
      </Button>
    </div>
  );
}
