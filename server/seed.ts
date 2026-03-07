import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { storage } from "./storage";
import type { InsertPartner } from "../shared/schema";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function readHtmlFile(filePath: string): string | null {
  try {
    const fullPath = path.resolve(__dirname, "..", filePath);
    return fs.readFileSync(fullPath, "utf-8");
  } catch {
    return null;
  }
}

const stockxPartner: InsertPartner = {
  partnerId: "stockx",
  name: "StockX",
  logo: "/images/partners/stockx-logo.png",

  primaryColor: "#006340",
  secondaryColor: "#F4F3F1",
  backgroundColor: "#ffffff",
  fontFamily: "Inter",
  fontFamilyFallback: null,
  borderRadius: "4px",
  boxShadow: null,
  buttonBgColor: "#006340",
  buttonTextColor: "#ffffff",
  buttonBorderRadius: "100px",
  buttonBorder: "none",

  secondaryButtonBgColor: "transparent",
  secondaryButtonTextColor: "#000000",
  secondaryButtonBorder: "1px solid #0f0f0f",
  logoColor: null,
  headerBgColor: "#ffffff",
  headerBgImage: null,
  headerLogoHeight: "18px",
  headerAlignment: "center",
  headerSubtextColor: null,

  checkoutHtml: readHtmlFile("client/public/partners/stockx/checkout.html"),
  confirmationHtml: readHtmlFile("client/public/partners/stockx/confirmation.html"),
  confirmationText: "Chris, your order was placed!",

  advertiserBrand: "Palmes",
  advertiserLogo: null,
  productTitle: "Stained Socks Oxiclean Shoe Deodorizer Extra Clean",
  productImage: "/images/partners/product-socks-1.png",
  productImages: [
    "/images/partners/product-socks-1.png",
    "/images/partners/product-socks-2.png",
    "/images/partners/product-socks-3.png",
    "/images/partners/product-socks-4.png",
  ],
  productPrice: "$30",
  productSalePrice: "$24",
  productDiscount: "Save 20%",
  productDescription:
    "One size, fits all.\n• Dip-dye clay effect\n• 85% Cotton + 13% Polyamide + 2% Elastane\n• Embroidery on leg\n• Screenprint on foot\n• Made in Portugal",
  ctaButtonText: "Add to order",
  declineButtonText: "Decline offer",
  countdownSeconds: 300,
  badges: ["EXCLUSIVE OFFER", "Free Shipping"],
  variants: [{ label: "Select color", options: ["Burnt Clay", "Ocean Blue", "Forest Green"], type: "dropdown" as const }],
  soldBy: "Palmes",
  customFonts: [],
};

export async function seedDatabase(): Promise<void> {
  try {
    const existing = await storage.getPartner("stockx");
    if (!existing) {
      await storage.createPartner(stockxPartner);
      console.log("Seeded StockX partner");
    } else {
      console.log("StockX partner already exists, skipping seed");
    }
  } catch (err) {
    console.error("Seed failed:", err);
  }
}
