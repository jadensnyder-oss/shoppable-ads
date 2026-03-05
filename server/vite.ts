import type { Express } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, type ViteDevServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function setupVite(app: Express): Promise<ViteDevServer> {
  const vite = await createViteServer({
    configFile: path.resolve(__dirname, "..", "vite.config.ts"),
    root: path.resolve(__dirname, "..", "client"),
    server: { middlewareMode: true, hmr: true },
    appType: "spa",
  });

  app.use(vite.middlewares);
  return vite;
}
