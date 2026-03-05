import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Partner, InsertPartner } from "../shared/schema";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "..", "data");
const DATA_FILE = path.resolve(DATA_DIR, "partners.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]", "utf-8");
}

function readPartners(): Partner[] {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writePartners(partners: Partner[]) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(partners, null, 2), "utf-8");
}

export interface IStorage {
  getAllPartners(): Promise<Partner[]>;
  getPartner(id: string): Promise<Partner | undefined>;
  createPartner(data: InsertPartner): Promise<Partner>;
  updatePartner(id: string, data: Partial<InsertPartner>): Promise<Partner | undefined>;
  deletePartner(id: string): Promise<boolean>;
}

class FileStorage implements IStorage {
  async getAllPartners(): Promise<Partner[]> {
    return readPartners();
  }

  async getPartner(id: string): Promise<Partner | undefined> {
    return readPartners().find((p) => p.partnerId === id);
  }

  async createPartner(data: InsertPartner): Promise<Partner> {
    const partners = readPartners();
    if (partners.find((p) => p.partnerId === data.partnerId)) {
      const err = new Error("Partner ID already exists") as Error & { code: string };
      err.code = "23505";
      throw err;
    }
    const partner: Partner = {
      partnerId: data.partnerId,
      name: data.name,
      logo: data.logo ?? null,
      primaryColor: data.primaryColor ?? "#1a1a1a",
      secondaryColor: data.secondaryColor ?? "#f6f6f6",
      backgroundColor: data.backgroundColor ?? "#ffffff",
      fontFamily: data.fontFamily ?? "Inter",
      fontFamilyFallback: data.fontFamilyFallback ?? null,
      borderRadius: data.borderRadius ?? "8px",
      boxShadow: data.boxShadow ?? null,
      buttonBgColor: data.buttonBgColor ?? "#1a1a1a",
      buttonTextColor: data.buttonTextColor ?? "#ffffff",
      buttonBorderRadius: data.buttonBorderRadius ?? "100px",
      buttonBorder: data.buttonBorder ?? "none",
      headerBgColor: data.headerBgColor ?? "#ffffff",
      headerBgImage: data.headerBgImage ?? null,
      checkoutHtml: data.checkoutHtml ?? null,
      confirmationHtml: data.confirmationHtml ?? null,
      confirmationText: data.confirmationText ?? "Your order was placed!",
      advertiserBrand: data.advertiserBrand ?? null,
      advertiserLogo: data.advertiserLogo ?? null,
      productTitle: data.productTitle ?? null,
      productImage: data.productImage ?? null,
      productImages: data.productImages ?? [],
      productPrice: data.productPrice ?? null,
      productSalePrice: data.productSalePrice ?? null,
      productDiscount: data.productDiscount ?? null,
      productDescription: data.productDescription ?? null,
      ctaButtonText: data.ctaButtonText ?? "Add to order",
      countdownSeconds: data.countdownSeconds ?? 300,
      badges: data.badges ?? [],
      variants: data.variants ?? [],
      soldBy: data.soldBy ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    partners.push(partner);
    writePartners(partners);
    return partner;
  }

  async updatePartner(id: string, data: Partial<InsertPartner>): Promise<Partner | undefined> {
    const partners = readPartners();
    const index = partners.findIndex((p) => p.partnerId === id);
    if (index === -1) return undefined;
    partners[index] = { ...partners[index], ...data, updatedAt: new Date() } as Partner;
    writePartners(partners);
    return partners[index];
  }

  async deletePartner(id: string): Promise<boolean> {
    const partners = readPartners();
    const index = partners.findIndex((p) => p.partnerId === id);
    if (index === -1) return false;
    partners.splice(index, 1);
    writePartners(partners);
    return true;
  }
}

export const storage = new FileStorage();
