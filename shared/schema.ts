import { z } from "zod";

export const partnerSchema = z.object({
  partnerId: z.string(),
  name: z.string(),
  logo: z.string().nullable().default(null),

  primaryColor: z.string().default("#1a1a1a"),
  secondaryColor: z.string().default("#f6f6f6"),
  backgroundColor: z.string().default("#ffffff"),
  fontFamily: z.string().default("Inter"),
  fontFamilyFallback: z.string().nullable().default(null),
  borderRadius: z.string().default("8px"),
  boxShadow: z.string().nullable().default(null),
  buttonBgColor: z.string().default("#1a1a1a"),
  buttonTextColor: z.string().default("#ffffff"),
  buttonBorderRadius: z.string().default("100px"),
  buttonBorder: z.string().default("none"),

  headerBgColor: z.string().default("#ffffff"),
  headerBgImage: z.string().nullable().default(null),

  checkoutHtml: z.string().nullable().default(null),
  confirmationHtml: z.string().nullable().default(null),
  confirmationText: z.string().default("Your order was placed!"),

  advertiserBrand: z.string().nullable().default(null),
  advertiserLogo: z.string().nullable().default(null),
  productTitle: z.string().nullable().default(null),
  productImage: z.string().nullable().default(null),
  productImages: z.array(z.string()).default([]),
  productPrice: z.string().nullable().default(null),
  productSalePrice: z.string().nullable().default(null),
  productDiscount: z.string().nullable().default(null),
  productDescription: z.string().nullable().default(null),
  ctaButtonText: z.string().default("Add to order"),
  countdownSeconds: z.number().default(300),
  badges: z.array(z.string()).default([]),
  variants: z
    .array(z.object({ label: z.string(), options: z.array(z.string()) }))
    .default([]),
  soldBy: z.string().nullable().default(null),

  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
});

export const insertPartnerSchema = partnerSchema.omit({
  createdAt: true,
  updatedAt: true,
});

export const updatePartnerSchema = insertPartnerSchema.partial();

export type Partner = z.infer<typeof partnerSchema>;
export type InsertPartner = z.infer<typeof insertPartnerSchema>;

export interface PartnerConfig {
  partner: {
    id: string;
    name: string;
    logo: string | null;
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    fontFamily: string;
    fontFamilyFallback: string | null;
    borderRadius: string;
    boxShadow: string | null;
    buttonBgColor: string;
    buttonTextColor: string;
    buttonBorderRadius: string;
    buttonBorder: string;
    headerBgColor: string;
    headerBgImage: string | null;
    checkoutHtml: string | null;
    confirmationHtml: string | null;
    confirmationText: string;
  };
  advertiser: {
    brandName: string | null;
    brandLogo: string | null;
    productTitle: string | null;
    productImage: string | null;
    productImages: string[];
    productPrice: string | null;
    productSalePrice: string | null;
    productDiscount: string | null;
    productDescription: string | null;
    ctaButtonText: string;
    countdownSeconds: number;
    badges: string[];
    variants: { label: string; options: string[] }[];
    soldBy: string | null;
  };
}

export function partnerToConfig(p: Partner): PartnerConfig {
  return {
    partner: {
      id: p.partnerId,
      name: p.name,
      logo: p.logo,
      primaryColor: p.primaryColor,
      secondaryColor: p.secondaryColor,
      backgroundColor: p.backgroundColor,
      fontFamily: p.fontFamily,
      fontFamilyFallback: p.fontFamilyFallback,
      borderRadius: p.borderRadius,
      boxShadow: p.boxShadow,
      buttonBgColor: p.buttonBgColor,
      buttonTextColor: p.buttonTextColor,
      buttonBorderRadius: p.buttonBorderRadius,
      buttonBorder: p.buttonBorder,
      headerBgColor: p.headerBgColor,
      headerBgImage: p.headerBgImage,
      checkoutHtml: p.checkoutHtml,
      confirmationHtml: p.confirmationHtml,
      confirmationText: p.confirmationText,
    },
    advertiser: {
      brandName: p.advertiserBrand,
      brandLogo: p.advertiserLogo,
      productTitle: p.productTitle,
      productImage: p.productImage,
      productImages: p.productImages,
      productPrice: p.productPrice,
      productSalePrice: p.productSalePrice,
      productDiscount: p.productDiscount,
      productDescription: p.productDescription,
      ctaButtonText: p.ctaButtonText,
      countdownSeconds: p.countdownSeconds,
      badges: p.badges,
      variants: p.variants,
      soldBy: p.soldBy,
    },
  };
}

export const extractedStylesSchema = z.object({
  primaryColor: z
    .object({ value: z.string(), confidence: z.number(), source: z.string() })
    .optional(),
  secondaryColor: z
    .object({ value: z.string(), confidence: z.number(), source: z.string() })
    .optional(),
  backgroundColor: z
    .object({ value: z.string(), confidence: z.number(), source: z.string() })
    .optional(),
  fontFamily: z
    .object({
      value: z.string(),
      available: z.boolean(),
      substitute: z.string().optional(),
    })
    .optional(),
  borderRadius: z
    .object({ value: z.string(), confidence: z.number() })
    .optional(),
  boxShadow: z
    .object({ value: z.string(), confidence: z.number() })
    .optional(),
  buttonStyles: z
    .object({
      bgColor: z.string(),
      textColor: z.string(),
      borderRadius: z.string(),
      border: z.string(),
    })
    .optional(),
});

export type ExtractedStyles = z.infer<typeof extractedStylesSchema>;

export interface ExtractionFlag {
  type: "font_unavailable" | "missing_color" | "asset_failed" | "warning";
  message: string;
  substitute?: string;
}

export interface ExtractionResult {
  styles: ExtractedStyles;
  flags: ExtractionFlag[];
}
