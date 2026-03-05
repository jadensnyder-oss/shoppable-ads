import {
  pgTable,
  text,
  integer,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const partners = pgTable("partners", {
  partnerId: text("partner_id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo"),

  primaryColor: text("primary_color").default("#1a1a1a"),
  secondaryColor: text("secondary_color").default("#f6f6f6"),
  backgroundColor: text("background_color").default("#ffffff"),
  fontFamily: text("font_family").default("Inter"),
  fontFamilyFallback: text("font_family_fallback"),
  borderRadius: text("border_radius").default("8px"),
  boxShadow: text("box_shadow"),
  buttonBgColor: text("button_bg_color").default("#1a1a1a"),
  buttonTextColor: text("button_text_color").default("#ffffff"),
  buttonBorderRadius: text("button_border_radius").default("100px"),
  buttonBorder: text("button_border").default("none"),

  headerBgColor: text("header_bg_color").default("#ffffff"),
  headerBgImage: text("header_bg_image"),

  checkoutHtml: text("checkout_html"),
  confirmationHtml: text("confirmation_html"),
  confirmationText: text("confirmation_text").default(
    "Your order was placed!"
  ),

  advertiserBrand: text("advertiser_brand"),
  advertiserLogo: text("advertiser_logo"),
  productTitle: text("product_title"),
  productImage: text("product_image"),
  productImages: jsonb("product_images").$type<string[]>().default([]),
  productPrice: text("product_price"),
  productSalePrice: text("product_sale_price"),
  productDiscount: text("product_discount"),
  productDescription: text("product_description"),
  ctaButtonText: text("cta_button_text").default("Add to order"),
  countdownSeconds: integer("countdown_seconds").default(300),
  badges: jsonb("badges").$type<string[]>().default([]),
  variants: jsonb("variants")
    .$type<{ label: string; options: string[] }[]>()
    .default([]),
  soldBy: text("sold_by"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPartnerSchema = createInsertSchema(partners);

export type Partner = typeof partners.$inferSelect;
export type InsertPartner = typeof partners.$inferInsert;

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
      primaryColor: p.primaryColor || "#1a1a1a",
      secondaryColor: p.secondaryColor || "#f6f6f6",
      backgroundColor: p.backgroundColor || "#ffffff",
      fontFamily: p.fontFamily || "Inter",
      fontFamilyFallback: p.fontFamilyFallback,
      borderRadius: p.borderRadius || "8px",
      boxShadow: p.boxShadow,
      buttonBgColor: p.buttonBgColor || "#1a1a1a",
      buttonTextColor: p.buttonTextColor || "#ffffff",
      buttonBorderRadius: p.buttonBorderRadius || "100px",
      buttonBorder: p.buttonBorder || "none",
      headerBgColor: p.headerBgColor || "#ffffff",
      headerBgImage: p.headerBgImage,
      checkoutHtml: p.checkoutHtml,
      confirmationHtml: p.confirmationHtml,
      confirmationText: p.confirmationText || "Your order was placed!",
    },
    advertiser: {
      brandName: p.advertiserBrand,
      brandLogo: p.advertiserLogo,
      productTitle: p.productTitle,
      productImage: p.productImage,
      productImages: (p.productImages as string[]) || [],
      productPrice: p.productPrice,
      productSalePrice: p.productSalePrice,
      productDiscount: p.productDiscount,
      productDescription: p.productDescription,
      ctaButtonText: p.ctaButtonText || "Add to order",
      countdownSeconds: p.countdownSeconds || 300,
      badges: (p.badges as string[]) || [],
      variants:
        (p.variants as { label: string; options: string[] }[]) || [],
      soldBy: p.soldBy,
    },
  };
}

export const extractedStylesSchema = z.object({
  primaryColor: z
    .object({
      value: z.string(),
      confidence: z.number(),
      source: z.string(),
    })
    .optional(),
  secondaryColor: z
    .object({
      value: z.string(),
      confidence: z.number(),
      source: z.string(),
    })
    .optional(),
  backgroundColor: z
    .object({
      value: z.string(),
      confidence: z.number(),
      source: z.string(),
    })
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
