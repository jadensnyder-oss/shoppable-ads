import { build } from "vite";
import { build as esbuild, type Plugin } from "esbuild";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const fixImportMeta: Plugin = {
  name: "fix-import-meta",
  setup(build) {
    build.onLoad({ filter: /\.ts$/ }, async (args) => {
      let contents = await fs.promises.readFile(args.path, "utf8");
      if (contents.includes("import.meta.url")) {
        contents = contents.replace(
          /const __dirname = path\.dirname\(fileURLToPath\(import\.meta\.url\)\);?/g,
          "/* __dirname provided by CJS runtime */"
        );
      }
      return { contents, loader: "ts" };
    });
  },
};

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
    plugins: [fixImportMeta],
  });

  console.log("Build complete!");
}

buildAll().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
