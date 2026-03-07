import { useState, useRef, useEffect, useCallback } from "react";
import { Trash2, Loader2, Plus, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/utils";
import { toast } from "sonner";

interface HtmlElementEditorProps {
  html: string;
  onHtmlChange: (html: string) => void;
  label: string;
}

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
    <div className="px-4 py-3 border-t">
      <p className="text-xs text-muted-foreground mb-2">
        Can&apos;t find the element? Add a CSS selector manually (e.g. <code className="bg-muted px-1 rounded">.top-section</code>, <code className="bg-muted px-1 rounded">#banner</code>).
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
  const [selectedSelectors, setSelectedSelectors] = useState<Set<string>>(new Set());
  const [removing, setRemoving] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const selectedEls = useRef<Set<HTMLElement>>(new Set());
  const hoverElRef = useRef<HTMLElement | null>(null);

  const getClasses = (el: HTMLElement): string[] => {
    const cn = el.className;
    if (!cn) return [];
    let raw: string[];
    if (typeof cn === "string") raw = cn.trim().split(/\s+/).filter(Boolean);
    else if ((cn as unknown as SVGAnimatedString).baseVal != null)
      raw = (cn as unknown as SVGAnimatedString).baseVal.trim().split(/\s+/).filter(Boolean);
    else return [];
    return raw.filter((c) => !/[:[\]()!@#%^&*+=|~`{}/<>]/.test(c));
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

    // Block all hyperlink navigation
    doc.querySelectorAll("a[href]").forEach((a) => {
      const anchor = a as HTMLAnchorElement;
      anchor.dataset.originalHref = anchor.href;
      anchor.href = "javascript:void(0)";
      anchor.style.cursor = "pointer";
    });

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
      e.stopImmediatePropagation();
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

      const sels = new Set<string>();
      selectedEls.current.forEach((s) => {
        sels.add(buildSelector(s, doc));
      });
      setSelectedSelectors(sels);
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

  const removeSelected = async () => {
    if (selectedSelectors.size === 0) return;
    setRemoving(true);
    try {
      setHistory((prev) => [...prev, html]);
      const result = (await apiFetch("/api/partners/clean-html", {
        method: "POST",
        body: JSON.stringify({ html, selectors: [...selectedSelectors] }),
      })) as { html: string };
      onHtmlChange(result.html);
      setSelectedSelectors(new Set());
      toast.success(`Removed ${selectedSelectors.size} element(s)`);
    } catch {
      setHistory((prev) => prev.slice(0, -1));
      toast.error("Failed to remove elements");
    } finally {
      setRemoving(false);
    }
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prevHtml = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    onHtmlChange(prevHtml);
    setSelectedSelectors(new Set());
    toast.success("Undo successful");
  };

  const handleManualSelectorAdd = (sel: string) => {
    setSelectedSelectors((prev) => new Set(prev).add(sel));
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument) return;
    try {
      const el = iframe.contentDocument.querySelector(sel) as HTMLElement | null;
      if (el) {
        selectedEls.current.add(el);
        el.style.outline = "3px solid #ef4444";
        el.style.outlineOffset = "-3px";
      }
    } catch { /* invalid selector */ }
  };

  if (!html) return null;

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b">
        <h3 className="text-sm font-semibold">{label} - Element Editor</h3>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUndo}
            className="text-xs gap-1"
          >
            <Undo2 className="w-3.5 h-3.5" />
            Undo
          </Button>
        )}
      </div>

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
            sandbox="allow-scripts"
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

        <ManualSelectorInput onAdd={handleManualSelectorAdd} />
      </div>
    </div>
  );
}
