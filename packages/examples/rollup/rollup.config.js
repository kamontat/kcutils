import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
  input: "index.ts",
  output: [
    {
      file: "lib/index.js",
      format: "commonjs",
      sourcemap: true,
    },
    {
      file: "lib/module.js",
      format: "module",
      sourcemap: true,
    },
  ],
  plugins: [typescript({ outputToFilesystem: true })],
});
