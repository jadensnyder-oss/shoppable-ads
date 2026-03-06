import { build } from "vite";
import { build as esbuild } from "esbuild";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

async function buildAll() {
  console.log("Building client...");
  await build({
    configFile: path.resolve(root, "vite.config.ts"),
    build: {
      outDir: path.resolve(root, "dist", "public"),
      emptyOutDir: true,
    },
  });

  console.log("Building server...");
  await esbuild({
    entryPoints: [path.resolve(root, "server", "index.ts")],
    outfile: path.resolve(root, "dist", "index.cjs"),
    platform: "node",
    format: "cjs",
    bundle: true,
    external: ["lightningcss", "esbuild", "vite", "tsx"],
    target: "node20",
    sourcemap: true,
    banner: {
      js: 'const _importMetaUrl = require("url").pathToFileURL(__filename).href;',
    },
    define: {
      "import.meta.url": "_importMetaUrl",
    },
  });

  console.log("Build complete!");
}

buildAll().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
