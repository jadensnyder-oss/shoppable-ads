import express, { type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { registerRoutes, UPLOADS_DIR, FONTS_DIR } from "./routes";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(
  "/images",
  express.static(path.resolve(__dirname, "..", "client", "public", "images"))
);
app.use("/uploads/images", express.static(UPLOADS_DIR));
app.use("/uploads/fonts", express.static(FONTS_DIR));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

try {
  registerRoutes(app);
} catch (err) {
  console.error("FATAL: Failed to register routes:", err);
  process.exit(1);
}

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ error: "File too large" });
    }
    return res.status(400).json({ error: err.message });
  }
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const isDev = process.env.NODE_ENV !== "production";

(async () => {
  try {
    if (isDev) {
      const { setupVite } = await import("./vite");
      await setupVite(app);
    } else {
      const distPath = path.resolve(__dirname, "..", "dist", "public");
      app.use(express.static(distPath, { maxAge: "1d" }));
      app.get("*", (_req, res) => {
        res.sendFile(path.resolve(distPath, "index.html"));
      });
    }

    const { seedDatabase } = await import("./seed");
    await seedDatabase();

    const port = parseInt(process.env.PORT || "5000", 10);
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("FATAL: Server startup failed:", err);
    process.exit(1);
  }
})();
