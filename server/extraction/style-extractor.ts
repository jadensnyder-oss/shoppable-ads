import * as cheerio from "cheerio";
import type { ExtractionResult, ExtractedStyles, ExtractionFlag } from "../../shared/schema";
import { checkFont } from "./font-checker";

interface ColorCount {
  color: string;
  count: number;
  source: string;
}

function normalizeColor(color: string): string | null {
  color = color.trim().toLowerCase();
  if (!color || color === "transparent" || color === "inherit" || color === "initial" || color === "currentcolor") {
    return null;
  }
  if (color.startsWith("rgb")) {
    const match = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
    if (match) {
      const [, r, g, b] = match;
      return `#${parseInt(r).toString(16).padStart(2, "0")}${parseInt(g).toString(16).padStart(2, "0")}${parseInt(b).toString(16).padStart(2, "0")}`;
    }
  }
  if (color.startsWith("#")) {
    if (color.length === 4) {
      return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
    }
    return color.substring(0, 7);
  }
  const named: Record<string, string> = {
    white: "#ffffff", black: "#000000", red: "#ff0000",
    blue: "#0000ff", green: "#008000", gray: "#808080", grey: "#808080",
  };
  return named[color] || null;
}

function isNeutral(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
  return maxDiff < 20 && (r > 220 || r < 35);
}

function extractColorsFromCSS(cssText: string): ColorCount[] {
  const colors: Map<string, ColorCount> = new Map();
  const bgPattern = /(?:background-color|background)\s*:\s*([^;!}]+)/gi;
  const colorPattern = /(?:^|[{;\s])color\s*:\s*([^;!}]+)/gi;
  const borderColorPattern = /border(?:-color)?\s*:\s*([^;!}]+)/gi;

  for (const [pattern, source] of [
    [bgPattern, "background"],
    [colorPattern, "text"],
    [borderColorPattern, "border"],
  ] as const) {
    let match;
    while ((match = pattern.exec(cssText)) !== null) {
      const raw = match[1].trim().split(/\s+/)[0];
      const normalized = normalizeColor(raw);
      if (normalized && !isNeutral(normalized)) {
        const existing = colors.get(normalized);
        if (existing) existing.count++;
        else colors.set(normalized, { color: normalized, count: 1, source });
      }
    }
  }

  return [...colors.values()].sort((a, b) => b.count - a.count);
}

function extractFontsFromCSS(cssText: string): string[] {
  const fonts = new Set<string>();
  const pattern = /font-family\s*:\s*([^;!}]+)/gi;
  let match;
  while ((match = pattern.exec(cssText)) !== null) {
    const families = match[1].split(",").map((f) =>
      f.trim().replace(/^['"]|['"]$/g, "")
    );
    for (const f of families) {
      if (f && !["inherit", "initial", "sans-serif", "serif", "monospace", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI"].includes(f)) {
        fonts.add(f);
      }
    }
  }
  return [...fonts];
}

function extractBorderRadius(cssText: string): string | null {
  const values: Map<string, number> = new Map();
  const pattern = /border-radius\s*:\s*([^;!}]+)/gi;
  let match;
  while ((match = pattern.exec(cssText)) !== null) {
    const val = match[1].trim().split(/\s+/)[0];
    if (val === "0" || val === "0px") continue;
    // Skip percentage values (50% is circles/avatars, not card radii)
    if (val.endsWith("%")) continue;
    values.set(val, (values.get(val) || 0) + 1);
  }
  if (values.size === 0) return null;
  return [...values.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

function extractBoxShadow(cssText: string): string | null {
  const pattern = /box-shadow\s*:\s*([^;!}]+)/gi;
  let match;
  while ((match = pattern.exec(cssText)) !== null) {
    const val = match[1].trim();
    if (val !== "none") return val;
  }
  return null;
}

function extractButtonStyles($: cheerio.CheerioAPI): {
  bgColor: string;
  textColor: string;
  borderRadius: string;
  border: string;
} | null {
  const buttons = $('button, [type="submit"], a[class*="btn"], a[class*="button"]');
  if (buttons.length === 0) return null;

  let bgColor = "#1a1a1a";
  let textColor = "#ffffff";
  let borderRadius = "8px";
  let border = "none";

  buttons.each((_, el) => {
    const style = $(el).attr("style") || "";
    const bgMatch = style.match(/background(?:-color)?\s*:\s*([^;]+)/i);
    const colorMatch = style.match(/(?:^|;\s*)color\s*:\s*([^;]+)/i);
    const radiusMatch = style.match(/border-radius\s*:\s*([^;]+)/i);
    const borderMatch = style.match(/(?:^|;\s*)border\s*:\s*([^;]+)/i);

    if (bgMatch) {
      const c = normalizeColor(bgMatch[1]);
      if (c && !isNeutral(c)) bgColor = c;
    }
    if (colorMatch) {
      const c = normalizeColor(colorMatch[1]);
      if (c) textColor = c;
    }
    if (radiusMatch) {
      const rv = radiusMatch[1].trim();
      if (!rv.endsWith("%")) borderRadius = rv;
    }
    if (borderMatch) border = borderMatch[1].trim();
  });

  return { bgColor, textColor, borderRadius, border };
}

export async function extractStyles(html: string): Promise<ExtractionResult> {
  const $ = cheerio.load(html);
  const flags: ExtractionFlag[] = [];

  let allCSS = "";
  $("style").each((_, el) => {
    allCSS += $(el).html() || "";
  });
  $("[style]").each((_, el) => {
    allCSS += `;${$(el).attr("style")}`;
  });

  const colors = extractColorsFromCSS(allCSS);
  const fonts = extractFontsFromCSS(allCSS);
  const radius = extractBorderRadius(allCSS);
  const shadow = extractBoxShadow(allCSS);
  const buttonStyles = extractButtonStyles($);

  const styles: ExtractedStyles = {};

  if (colors.length > 0) {
    styles.primaryColor = {
      value: colors[0].color,
      confidence: Math.min(colors[0].count / 10, 1),
      source: colors[0].source,
    };
  } else {
    flags.push({ type: "missing_color", message: "Could not detect a primary color" });
  }

  if (colors.length > 1) {
    styles.secondaryColor = {
      value: colors[1].color,
      confidence: Math.min(colors[1].count / 10, 1),
      source: colors[1].source,
    };
  }

  const bgColors = extractColorsFromCSS(
    [...$("body").attr("style") || "", ...$("html").attr("style") || ""].join(";")
  );
  if (bgColors.length > 0) {
    styles.backgroundColor = {
      value: bgColors[0].color,
      confidence: 0.8,
      source: "page background",
    };
  }

  if (fonts.length > 0) {
    const fontResult = await checkFont(fonts[0]);
    styles.fontFamily = {
      value: fonts[0],
      available: fontResult.available,
      substitute: fontResult.substitute,
    };
    if (!fontResult.available) {
      flags.push({
        type: "font_unavailable",
        message: `Font "${fonts[0]}" may require a license`,
        substitute: fontResult.substitute,
      });
    }
  }

  if (radius) {
    styles.borderRadius = { value: radius, confidence: 0.7 };
  }

  if (shadow) {
    styles.boxShadow = { value: shadow, confidence: 0.6 };
  }

  if (buttonStyles) {
    styles.buttonStyles = buttonStyles;
  }

  return { styles, flags };
}
