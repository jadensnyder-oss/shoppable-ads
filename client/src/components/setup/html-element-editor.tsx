import { useState, useRef, useEffect, useCallback } from "react";
import { Trash2, MousePointer, List, Loader2, Eye, EyeOff, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/utils";
import { toast } from "sonner";

interface DetectedSection {
  selector: string;
  tag: string;
  preview: string;
  category: "header" | "footer" | "rokt" | "ad" | "other";
}

interface HtmlElementEditorProps {
  html: string;
  onHtmlChange: (html: string) => void;
  label: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  header: "Header",
  footer: "Footer",
  rokt: "Rokt Element",
  ad: "Ad Block",
  other: "Other",
};

const CATEGORY_COLORS: Record<string, string> = {
  header: "bg-blue-50 border-blue-200 text-blue-800",
  footer: "bg-purple-50 border-purple-200 text-purple-800",
  rokt: "bg-red-50 border-red-200 text-red-800",
  ad: "bg-amber-50 border-amber-200 text-amber-800",
  other: "bg-gray-50 border-gray-200 text-gray-800",
};

function ManualSelectorInput({ onAdd }: { onAdd: (selector: string) => void }) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    const sel = value.trim();
    if (!sel) return;
    onAdd(sel);
    setValue("");
    toast.success(`Added selector: ${sel}`);
  };

  return (
    <div className="mt-3 pt-3 border-t">
      <p className="text-xs text-muted-foreground mb-2">
        Can&apos;t find the element? Add a CSS selector manually (e.g. <code className="bg-muted px-1 rounded">.top-section</code>, <code className="bg-muted px-1 rounded">#banner</code>, <code className="bg-muted px-1 rounded">div.promo-bar</code>).
      </p>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="CSS selector..."
          className="text-sm font-mono flex-1"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleAdd}
          disabled={!value.trim()}
          className="shrink-0"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>
    </div>
  );
}

export function HtmlElementEditor({
  html,
  onHtmlChange,
  label,
}: HtmlElementEditorProps) {
  const [mode, setMode] = useState<"list" | "visual">("list");
  const [sections, setSections] = useState<DetectedSection[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSelectors, setSelectedSelectors] = useState<Set<string>>(new Set());
  const [removing, setRemoving] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const analyze = useCallback(async () => {
    if (!html) return;
    setLoading(true);
    try {
      const result = (await apiFetch("/api/partners/analyze-html", {
        method: "POST",
        body: JSON.stringify({ html }),
      })) as { sections: DetectedSection[] };
      setSections(result.sections || []);
    } catch {
      toast.error("Failed to analyze HTML");
    } finally {
      setLoading(false);
    }
  }, [html]);

  useEffect(() => {
    analyze();
  }, [analyze]);

  const toggleSelector = (sel: string) => {
    setSelectedSelectors((prev) => {
      const next = new Set(prev);
      if (next.has(sel)) next.delete(sel);
      else next.add(sel);
      return next;
    });
  };

  const removeSelected = async () => {
    if (selectedSelectors.size === 0) return;
    setRemoving(true);
    try {
      const result = (await apiFetch("/api/partners/clean-html", {
        method: "POST",
        body: JSON.stringify({ html, selectors: [...selectedSelectors] }),
      })) as { html: string };
      onHtmlChange(result.html);
      setSelectedSelectors(new Set());
      toast.success(`Removed ${selectedSelectors.size} element(s)`);
    } catch {
      toast.error("Failed to remove elements");
    } finally {
      setRemoving(false);
    }
  };

  const selectedEls = useRef<Set<HTMLElement>>(new Set());
  const hoverElRef = useRef<HTMLElement | null>(null);

  const getClasses = (el: HTMLElement): string[] => {
    const cn = el.className;
    if (!cn) return [];
    if (typeof cn === "string") return cn.trim().split(/\s+/).filter(Boolean);
    if ((cn as unknown as SVGAnimatedString).baseVal != null)
      return (cn as unknown as SVGAnimatedString).baseVal.trim().split(/\s+/).filter(Boolean);
    return [];
  };

  const getNthChild = (el: HTMLElement): string => {
    const parent = el.parentElement;
    if (!parent) return "";
    const tag = el.tagName.toLowerCase();
    const sameTag = Array.from(parent.children).filter(
      (c) => c.tagName.toLowerCase() === tag
    );
    if (sameTag.length <= 1) return "";
    return `:nth-of-type(${sameTag.indexOf(el) + 1})`;
  };

  const buildSelector = useCallback(
    (el: HTMLElement, doc: Document): string => {
      if (el.id) return "#" + el.id;
      const tag = el.tagName.toLowerCase();
      if (tag === "html" || tag === "body") return tag;

      const classes = getClasses(el);
      if (classes.length > 0) {
        const sel = tag + "." + classes.slice(0, 3).join(".");
        try {
          if (doc.querySelectorAll(sel).length === 1) return sel;
        } catch {
          /* ignore */
        }
      }

      const parts: string[] = [];
      let current: HTMLElement | null = el;
      for (let depth = 0; depth < 4 && current && current !== doc.body; depth++) {
        const cTag = current.tagName.toLowerCase();
        if (current.id) {
          parts.unshift("#" + current.id);
          break;
        }
        const cClasses = getClasses(current);
        let part = cTag;
        if (cClasses.length > 0) {
          part += "." + cClasses.slice(0, 2).join(".");
        } else {
          part += getNthChild(current);
        }
        parts.unshift(part);
        current = current.parentElement;
      }
      return parts.join(" > ");
    },
    []
  );

  const listenersRef = useRef<{
    doc: Document;
    mouseover: (e: Event) => void;
    mouseout: (e: Event) => void;
    click: (e: Event) => void;
  } | null>(null);

  const attachVisualListeners = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument;
    if (!doc?.body) return;

    if (listenersRef.current) {
      const prev = listenersRef.current;
      prev.doc.removeEventListener("mouseover", prev.mouseover, true);
      prev.doc.removeEventListener("mouseout", prev.mouseout, true);
      prev.doc.removeEventListener("click", prev.click, true);
      listenersRef.current = null;
    }

    selectedEls.current.clear();

    const onMouseOver = (e: Event) => {
      const t = e.target as HTMLElement;
      if (!t || t === doc.body || t === doc.documentElement) return;
      if (hoverElRef.current && !selectedEls.current.has(hoverElRef.current)) {
        hoverElRef.current.style.outline = "";
        hoverElRef.current.style.outlineOffset = "";
      }
      hoverElRef.current = t;
      if (!selectedEls.current.has(t)) {
        t.style.outline = "2px solid #3b82f6";
        t.style.outlineOffset = "-2px";
      }
    };

    const onMouseOut = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t && !selectedEls.current.has(t)) {
        t.style.outline = "";
        t.style.outlineOffset = "";
      }
    };

    const onClick = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      const el = e.target as HTMLElement;
      if (!el || el === doc.body || el === doc.documentElement) return;

      if (selectedEls.current.has(el)) {
        selectedEls.current.delete(el);
        el.style.outline = "2px solid #3b82f6";
      } else {
        selectedEls.current.add(el);
        el.style.outline = "3px solid #ef4444";
        el.style.outlineOffset = "-3px";
      }

      const info: { selector: string; tag: string; preview: string }[] = [];
      selectedEls.current.forEach((s) => {
        info.push({
          selector: buildSelector(s, doc),
          tag: s.tagName.toLowerCase(),
          preview: (s.textContent || "").trim().slice(0, 60),
        });
      });

      setSelectedSelectors(new Set(info.map((i) => i.selector)));
      setSections((prev) => {
        const existing = new Set(prev.map((s) => s.selector));
        const additions = info
          .filter((i) => !existing.has(i.selector))
          .map((i) => ({
            selector: i.selector,
            tag: i.tag,
            preview: i.preview || "(empty)",
            category: "other" as const,
          }));
        return [...prev, ...additions];
      });
    };

    doc.addEventListener("mouseover", onMouseOver, true);
    doc.addEventListener("mouseout", onMouseOut, true);
    doc.addEventListener("click", onClick, true);

    listenersRef.current = { doc, mouseover: onMouseOver, mouseout: onMouseOut, click: onClick };

    selectedSelectors.forEach((sel) => {
      try {
        const el = doc.querySelector(sel) as HTMLElement | null;
        if (el) {
          selectedEls.current.add(el);
          el.style.outline = "3px solid #ef4444";
          el.style.outlineOffset = "-3px";
        }
      } catch { /* invalid selector */ }
    });
  }, [buildSelector, selectedSelectors]);

  useEffect(() => {
    return () => {
      if (listenersRef.current) {
        const prev = listenersRef.current;
        prev.doc.removeEventListener("mouseover", prev.mouseover, true);
        prev.doc.removeEventListener("mouseout", prev.mouseout, true);
        prev.doc.removeEventListener("click", prev.click, true);
        listenersRef.current = null;
      }
    };
  }, []);

  if (!html) return null;

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b">
        <h3 className="text-sm font-semibold">{label} - Element Editor</h3>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMode("list")}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs cursor-pointer transition-colors ${
              mode === "list"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <List className="w-3.5 h-3.5" />
            List
          </button>
          <button
            onClick={() => setMode("visual")}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs cursor-pointer transition-colors ${
              mode === "visual"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <MousePointer className="w-3.5 h-3.5" />
            Visual
          </button>
        </div>
      </div>

      {mode === "list" && (
        <div className="p-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              <span className="text-sm text-muted-foreground ml-2">Analyzing...</span>
            </div>
          ) : sections.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              No removable sections detected.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {sections.map((section) => {
                const isSelected = selectedSelectors.has(section.selector);
                return (
                  <div
                    key={section.selector}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                      isSelected ? "bg-red-50 border-red-200" : "bg-white border-border"
                    }`}
                  >
                    <button
                      onClick={() => toggleSelector(section.selector)}
                      className={`mt-0.5 shrink-0 cursor-pointer transition-colors ${
                        isSelected
                          ? "text-red-500 hover:text-red-700"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      title={isSelected ? "Deselect" : "Select for removal"}
                    >
                      {isSelected ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${
                            CATEGORY_COLORS[section.category] || CATEGORY_COLORS.other
                          }`}
                        >
                          {CATEGORY_LABELS[section.category] || "Other"}
                        </span>
                        <code className="text-[11px] text-muted-foreground font-mono truncate">
                          {section.selector}
                        </code>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {section.preview}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Manual selector input */}
          <ManualSelectorInput
            onAdd={(sel) => {
              setSections((prev) => {
                if (prev.some((s) => s.selector === sel)) return prev;
                return [...prev, { selector: sel, tag: "custom", preview: "(manually added)", category: "other" }];
              });
              setSelectedSelectors((prev) => new Set(prev).add(sel));
            }}
          />

          {selectedSelectors.size > 0 && (
            <Button
              variant="destructive"
              size="sm"
              className="mt-4 w-full"
              onClick={removeSelected}
              disabled={removing}
            >
              {removing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Remove {selectedSelectors.size} selected element(s)
            </Button>
          )}
        </div>
      )}

      {mode === "visual" && (
        <div className="flex flex-col">
          <div className="bg-muted/20 px-4 py-2 border-b">
            <p className="text-xs text-muted-foreground">
              Hover to highlight elements. Click to select for removal (turns red).
              Click again to deselect.
            </p>
          </div>
          <div className="relative" style={{ height: "400px" }}>
            <iframe
              ref={iframeRef}
              srcDoc={html}
              className="w-full h-full border-0"
              title="HTML Element Editor"
              onLoad={attachVisualListeners}
            />
          </div>
          {selectedSelectors.size > 0 && (
            <div className="p-3 border-t bg-muted/10">
              <div className="flex flex-wrap gap-1 mb-2">
                {[...selectedSelectors].map((sel) => (
                  <span
                    key={sel}
                    className="text-[10px] px-1.5 py-0.5 bg-red-100 text-red-700 rounded font-mono"
                  >
                    {sel}
                  </span>
                ))}
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={removeSelected}
                disabled={removing}
              >
                {removing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4 mr-2" />
                )}
                Remove {selectedSelectors.size} element(s)
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
