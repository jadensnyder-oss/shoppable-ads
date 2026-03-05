const GOOGLE_FONTS_POPULAR: Record<string, boolean> = {
  "Inter": true,
  "Roboto": true,
  "Open Sans": true,
  "Lato": true,
  "Montserrat": true,
  "Poppins": true,
  "Source Sans Pro": true,
  "Oswald": true,
  "Raleway": true,
  "Nunito": true,
  "Nunito Sans": true,
  "PT Sans": true,
  "Merriweather": true,
  "Ubuntu": true,
  "Playfair Display": true,
  "Rubik": true,
  "Work Sans": true,
  "DM Sans": true,
  "Manrope": true,
  "Space Grotesk": true,
  "IBM Plex Sans": true,
  "Barlow": true,
  "Outfit": true,
  "Plus Jakarta Sans": true,
  "Figtree": true,
  "Geist": true,
};

const FONT_SUBSTITUTIONS: Record<string, string> = {
  "Helvetica": "Inter",
  "Helvetica Neue": "Inter",
  "Arial": "Inter",
  "SuisseIntl-Medium": "Inter",
  "SuisseIntl-Regular": "Inter",
  "Suisse Intl": "Inter",
  "Suisse Int'l": "Inter",
  "Metro Sans": "DM Sans",
  "Metro Sans Bold": "DM Sans",
  "Metro Sans Book": "DM Sans",
  "SF Pro": "Inter",
  "SF Pro Display": "Inter",
  "SF Pro Text": "Inter",
  "Avenir": "Nunito",
  "Avenir Next": "Nunito Sans",
  "Futura": "Poppins",
  "Gill Sans": "Lato",
  "Proxima Nova": "Montserrat",
  "Gotham": "Montserrat",
  "Franklin Gothic": "Source Sans Pro",
  "Segoe UI": "Inter",
  "Trebuchet MS": "Open Sans",
  "Verdana": "Open Sans",
  "Georgia": "Merriweather",
  "Times New Roman": "Playfair Display",
  "Garamond": "Playfair Display",
  "Calibri": "Work Sans",
};

export interface FontCheckResult {
  available: boolean;
  substitute?: string;
  original: string;
}

export async function checkFont(fontFamily: string): Promise<FontCheckResult> {
  const normalized = fontFamily.trim().replace(/^['"]|['"]$/g, "");

  if (GOOGLE_FONTS_POPULAR[normalized]) {
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
