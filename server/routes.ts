import type { Express, Request, Response } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { storage } from "./storage";
import { insertPartnerSchema, partnerToConfig } from "../shared/schema";
import { extractStyles } from "./extraction/style-extractor";
import { checkFont } from "./extraction/font-checker";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const htmlUpload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

const imageDir = path.resolve(__dirname, "..", "client", "public", "images", "partners");
const imageStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });
    cb(null, imageDir);
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
  // List all partners
  app.get("/api/partners", async (_req: Request, res: Response) => {
    try {
      const allPartners = await storage.getAllPartners();
      const configs = allPartners.map(partnerToConfig);
      res.json(configs);
    } catch (err) {
      console.error("Failed to fetch partners:", err);
      res.status(500).json({ error: "Failed to fetch partners" });
    }
  });

  // Get single partner
  app.get("/api/partners/:partnerId", async (req: Request, res: Response) => {
    try {
      const partner = await storage.getPartner(req.params.partnerId);
      if (!partner) return res.status(404).json({ error: "Partner not found" });
      res.json(partnerToConfig(partner));
    } catch (err) {
      console.error("Failed to fetch partner:", err);
      res.status(500).json({ error: "Failed to fetch partner" });
    }
  });

  // Create partner
  app.post("/api/partners", async (req: Request, res: Response) => {
    try {
      const parsed = insertPartnerSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
      }
      const partner = await storage.createPartner(parsed.data);
      res.status(201).json(partnerToConfig(partner));
    } catch (err: any) {
      if (err?.code === "23505") {
        return res.status(409).json({ error: "Partner ID already exists" });
      }
      console.error("Failed to create partner:", err);
      res.status(500).json({ error: "Failed to create partner" });
    }
  });

  // Update partner
  app.patch("/api/partners/:partnerId", async (req: Request, res: Response) => {
    try {
      const partner = await storage.updatePartner(req.params.partnerId, req.body);
      if (!partner) return res.status(404).json({ error: "Partner not found" });
      res.json(partnerToConfig(partner));
    } catch (err) {
      console.error("Failed to update partner:", err);
      res.status(500).json({ error: "Failed to update partner" });
    }
  });

  // Delete partner
  app.delete("/api/partners/:partnerId", async (req: Request, res: Response) => {
    try {
      const deleted = await storage.deletePartner(req.params.partnerId);
      if (!deleted) return res.status(404).json({ error: "Partner not found" });
      res.json({ success: true });
    } catch (err) {
      console.error("Failed to delete partner:", err);
      res.status(500).json({ error: "Failed to delete partner" });
    }
  });

  // Upload HTML and extract styles
  app.post(
    "/api/partners/upload-html",
    htmlUpload.single("file"),
    async (req: Request, res: Response) => {
      try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });
        const html = req.file.buffer.toString("utf-8");
        const result = await extractStyles(html);
        res.json({ html, extraction: result });
      } catch (err) {
        console.error("Failed to process HTML:", err);
        res.status(500).json({ error: "Failed to process HTML upload" });
      }
    }
  );

  // Upload image
  app.post(
    "/api/partners/upload-image",
    imageUpload.single("image"),
    async (req: Request, res: Response) => {
      try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });
        const url = `/images/partners/${req.file.filename}`;
        res.json({ url });
      } catch (err) {
        console.error("Failed to upload image:", err);
        res.status(500).json({ error: "Failed to upload image" });
      }
    }
  );

  // Check font availability
  app.post("/api/partners/check-font", async (req: Request, res: Response) => {
    try {
      const { fontFamily } = req.body;
      if (!fontFamily) return res.status(400).json({ error: "fontFamily required" });
      const result = await checkFont(fontFamily);
      res.json(result);
    } catch (err) {
      console.error("Failed to check font:", err);
      res.status(500).json({ error: "Failed to check font" });
    }
  });
}
