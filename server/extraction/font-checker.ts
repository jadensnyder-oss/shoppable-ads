import { GOOGLE_FONTS_SET, FONT_SUBSTITUTIONS } from "../../shared/fonts";

export interface FontCheckResult {
  available: boolean;
  substitute?: string;
  original: string;
}

export async function checkFont(fontFamily: string): Promise<FontCheckResult> {
  const normalized = fontFamily.trim().replace(/^['"]|['"]$/g, "");

  if (GOOGLE_FONTS_SET.has(normalized)) {
    return { available: true, original: normalized };
  }

  const substitute = FONT_SUBSTITUTIONS[normalized];
  if (substitute) {
    return { available: false, substitute, original: normalized };
  }

  return {
    available: false,
    substitute: "Inter",
    original: normalized,
  };
}
