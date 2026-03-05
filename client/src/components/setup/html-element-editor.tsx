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

  const visualScript = `
    <script>
      (function() {
        var selected = new Set();
        var hoverEl = null;

        function getClasses(el) {
          var cn = el.className;
          if (!cn) return [];
          if (typeof cn === 'string') return cn.trim().split(/\\s+/).filter(Boolean);
          if (cn.baseVal != null) return cn.baseVal.trim().split(/\\s+/).filter(Boolean);
          return [];
        }

        function getNthChild(el) {
          var parent = el.parentElement;
          if (!parent) return '';
          var tag = el.tagName.toLowerCase();
          var siblings = parent.children;
          var sameTag = [];
          for (var i = 0; i < siblings.length; i++) {
            if (siblings[i].tagName.toLowerCase() === tag) sameTag.push(siblings[i]);
          }
          if (sameTag.length <= 1) return '';
          var idx = sameTag.indexOf(el) + 1;
          return ':nth-of-type(' + idx + ')';
        }

        function buildSelector(el) {
          if (el.id) return '#' + el.id;

          var tag = el.tagName.toLowerCase();
          if (tag === 'html' || tag === 'body') return tag;

          var classes = getClasses(el);
          if (classes.length > 0) {
            var cls = classes.slice(0, 3).join('.');
            var sel = tag + '.' + cls;
            try { if (document.querySelectorAll(sel).length === 1) return sel; } catch(e) {}
          }

          var parts = [];
          var current = el;
          for (var depth = 0; depth < 4 && current && current !== document.body; depth++) {
            var cTag = current.tagName.toLowerCase();
            if (current.id) { parts.unshift('#' + current.id); break; }
            var cClasses = getClasses(current);
            var part = cTag;
            if (cClasses.length > 0) {
              part += '.' + cClasses.slice(0, 2).join('.');
            } else {
              part += getNthChild(current);
            }
            parts.unshift(part);
            current = current.parentElement;
          }

          return parts.join(' > ');
        }

        document.addEventListener('mouseover', function(e) {
          var t = e.target;
          if (t === document.body || t === document.documentElement) return;
          if (hoverEl && !selected.has(hoverEl)) {
            hoverEl.style.outline = '';
            hoverEl.style.outlineOffset = '';
          }
          hoverEl = t;
          if (!selected.has(hoverEl)) {
            hoverEl.style.outline = '2px solid #3b82f6';
            hoverEl.style.outlineOffset = '-2px';
          }
        }, true);

        document.addEventListener('mouseout', function(e) {
          if (e.target && !selected.has(e.target)) {
            e.target.style.outline = '';
            e.target.style.outlineOffset = '';
          }
        }, true);

        document.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          var el = e.target;
          if (el === document.body || el === document.documentElement) return;

          if (selected.has(el)) {
            selected.delete(el);
            el.style.outline = '2px solid #3b82f6';
          } else {
            selected.add(el);
            el.style.outline = '3px solid #ef4444';
            el.style.outlineOffset = '-3px';
          }

          var info = [];
          selected.forEach(function(s) {
            var tag = s.tagName.toLowerCase();
            var text = (s.textContent || '').trim().slice(0, 60);
            info.push({ selector: buildSelector(s), tag: tag, preview: text });
          });

          window.parent.postMessage({ type: 'ELEMENT_SELECTION', elements: info }, '*');
        }, true);
      })();
    </script>
  `;

  const handleVisualMessage = useCallback(
    (event: MessageEvent) => {
      if (event.data?.type === "ELEMENT_SELECTION") {
        const elements = event.data.elements as { selector: string; tag: string; preview: string }[];
        setSelectedSelectors(new Set(elements.map((e) => e.selector)));
        setSections((prev) => {
          const existing = new Set(prev.map((s) => s.selector));
          const additions = elements
            .filter((e) => !existing.has(e.selector))
            .map((e) => ({
              selector: e.selector,
              tag: e.tag,
              preview: e.preview || "(empty)",
              category: "other" as const,
            }));
          return [...prev, ...additions];
        });
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("message", handleVisualMessage);
    return () => window.removeEventListener("message", handleVisualMessage);
  }, [handleVisualMessage]);

  const iframeSrcDoc = html + visualScript;

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
              srcDoc={iframeSrcDoc}
              className="w-full h-full border-0"
              sandbox="allow-scripts"
              title="HTML Element Editor"
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
