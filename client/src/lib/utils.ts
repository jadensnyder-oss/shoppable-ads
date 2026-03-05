import { useEffect } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useCustomFonts(fonts: { name: string; url: string }[]) {
  useEffect(() => {
    if (fonts.length === 0) return;

    const id = "custom-font-faces";
    let style = document.getElementById(id) as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement("style");
      style.id = id;
      document.head.appendChild(style);
    }

    const rules = fonts.map((f) => {
      const ext = f.url.split(".").pop()?.toLowerCase() || "woff2";
      const format =
        ext === "woff2" ? "woff2" : ext === "woff" ? "woff" : ext === "otf" ? "opentype" : "truetype";
      return `@font-face { font-family: '${f.name}'; src: url('${f.url}') format('${format}'); font-display: swap; }`;
    });
    style.textContent = rules.join("\n");

    return () => {
      if (style && style.parentNode) style.parentNode.removeChild(style);
    };
  }, [fonts]);
}

export function isColorDark(hex: string): boolean {
  const c = hex.replace("#", "");
  if (c.length < 6) return false;
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      const body = await res.json();
      if (body.error) {
        message = typeof body.error === "string" ? body.error : JSON.stringify(body.error);
      }
    } catch {
      const text = await res.text().catch(() => "");
      if (text) message = text;
    }
    throw new Error(message);
  }
  return res.json();
}
