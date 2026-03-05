import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { registerRoutes, UPLOADS_DIR, FONTS_DIR } from "./routes";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(
  "/images",
  express.static(path.resolve(__dirname, "..", "client", "public", "images"))
);
app.use("/uploads/images", express.static(UPLOADS_DIR));
app.use("/uploads/fonts", express.static(FONTS_DIR));

registerRoutes(app);

const isDev = process.env.NODE_ENV !== "production";

(async () => {
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
})();
