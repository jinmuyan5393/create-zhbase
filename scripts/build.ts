import { build } from "esbuild";

await build({
  bundle: true,
  entryPoints: ["src/index.ts"],
  outfile: "outfile.cjs",
  format: "cjs",
  platform: "node",
  target: "node18",
  minify: true,
});
