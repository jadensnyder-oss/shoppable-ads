import type { Express, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { storage } from "./storage";
import { insertPartnerSchema, updatePartnerSchema, partnerToConfig } from "../shared/schema";
import { extractStyles } from "./extraction/style-extractor";
import { cleanHtml, analyzeHtml, removeSelectors } from "./extraction/html-cleaner";
import { checkFont } from "./extraction/font-checker";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const htmlUpload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });

export const UPLOADS_DIR = path.resolve(__dirname, "..", "uploads", "images");
export const FONTS_DIR = path.resolve(__dirname, "..", "uploads", "fonts");

const imageStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const imageUpload = multer({
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files allowed"));
  },
});

export function registerRoutes(app: Express): void {
  app.get("/api/partners", async (_req: Request, res: Response) => {
    try {
      const allPartners = await storage.getAllPartners();
      const configs = allPartners.map(partnerToConfig);
      res.json(configs);
    } catch (err: unknown) {
      console.error("Failed to fetch partners:", err);
      res.status(500).json({ error: "Failed to fetch partners" });
    }
  });

  app.get("/api/partners/:partnerId", async (req: Request, res: Response) => {
    try {
      const partner = await storage.getPartner(req.params.partnerId as string);
      if (!partner) return res.status(404).json({ error: "Partner not found" });
      res.json(partnerToConfig(partner));
    } catch (err: unknown) {
      console.error("Failed to fetch partner:", err);
      res.status(500).json({ error: "Failed to fetch partner" });
    }
  });

  app.post("/api/partners", async (req: Request, res: Response) => {
    try {
      const parsed = insertPartnerSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
      }
      const partner = await storage.createPartner(parsed.data);
      res.status(201).json(partnerToConfig(partner));
    } catch (err: unknown) {
      if (err instanceof Error && "code" in err && (err as Record<string, unknown>).code === "23505") {
        return res.status(409).json({ error: "Partner ID already exists" });
      }
      console.error("Failed to create partner:", err);
      res.status(500).json({ error: "Failed to create partner" });
    }
  });

  app.patch("/api/partners/:partnerId", async (req: Request, res: Response) => {
    try {
      const parsed = updatePartnerSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
      }
      const partner = await storage.updatePartner(req.params.partnerId as string, parsed.data);
      if (!partner) return res.status(404).json({ error: "Partner not found" });
      res.json(partnerToConfig(partner));
    } catch (err: unknown) {
      console.error("Failed to update partner:", err);
      res.status(500).json({ error: "Failed to update partner" });
    }
  });

  app.delete("/api/partners/:partnerId", async (req: Request, res: Response) => {
    try {
      const deleted = await storage.deletePartner(req.params.partnerId as string);
      if (!deleted) return res.status(404).json({ error: "Partner not found" });
      res.json({ success: true });
    } catch (err: unknown) {
      console.error("Failed to delete partner:", err);
      res.status(500).json({ error: "Failed to delete partner" });
    }
  });

  app.post(
    "/api/partners/upload-html",
    htmlUpload.single("file"),
    async (req: Request, res: Response) => {
      try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });
        const rawHtml = req.file.buffer.toString("utf-8");
        const result = await extractStyles(rawHtml);
        const html = cleanHtml(rawHtml);
        res.json({ html, extraction: result });
      } catch (err: unknown) {
        console.error("Failed to process HTML:", err);
        res.status(500).json({ error: "Failed to process HTML upload" });
      }
    }
  );

  app.post("/api/partners/analyze-html", async (req: Request, res: Response) => {
    try {
      const { html } = req.body;
      if (!html) return res.status(400).json({ error: "html field required" });
      const sections = analyzeHtml(html);
      res.json({ sections });
    } catch (err: unknown) {
      console.error("Failed to analyze HTML:", err);
      res.status(500).json({ error: "Failed to analyze HTML" });
    }
  });

  app.post("/api/partners/clean-html", async (req: Request, res: Response) => {
    try {
      const { html, selectors } = req.body;
      if (!html || !Array.isArray(selectors)) {
        return res.status(400).json({ error: "html and selectors[] required" });
      }
      const cleaned = removeSelectors(html, selectors);
      res.json({ html: cleaned });
    } catch (err: unknown) {
      console.error("Failed to clean HTML:", err);
      res.status(500).json({ error: "Failed to clean HTML" });
    }
  });

  app.post(
    "/api/partners/upload-image",
    imageUpload.single("image"),
    async (req: Request, res: Response) => {
      try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });
        const url = `/uploads/images/${req.file.filename}`;
        res.json({ url });
      } catch (err: unknown) {
        console.error("Failed to upload image:", err);
        res.status(500).json({ error: "Failed to upload image" });
      }
    }
  );

  const fontStorage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      if (!fs.existsSync(FONTS_DIR)) fs.mkdirSync(FONTS_DIR, { recursive: true });
      cb(null, FONTS_DIR);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}${ext}`);
    },
  });
  const fontUpload = multer({
    storage: fontStorage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      const allowed = [".woff", ".woff2", ".ttf", ".otf"];
      const ext = path.extname(file.originalname).toLowerCase();
      if (allowed.includes(ext)) cb(null, true);
      else cb(new Error("Only font files (woff, woff2, ttf, otf) allowed"));
    },
  });

  app.post(
    "/api/partners/upload-font",
    fontUpload.single("font"),
    async (req: Request, res: Response) => {
      try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });
        const fontFamily = (req.body.fontFamily as string) || path.parse(req.file.originalname).name;
        const url = `/uploads/fonts/${req.file.filename}`;
        res.json({ url, fontFamily });
      } catch (err: unknown) {
        console.error("Failed to upload font:", err);
        res.status(500).json({ error: "Failed to upload font" });
      }
    }
  );

  app.post("/api/partners/check-font", async (req: Request, res: Response) => {
    try {
      const { fontFamily } = req.body;
      if (!fontFamily) return res.status(400).json({ error: "fontFamily required" });
      const result = await checkFont(fontFamily);
      res.json(result);
    } catch (err: unknown) {
      console.error("Failed to check font:", err);
      res.status(500).json({ error: "Failed to check font" });
    }
  });
}
