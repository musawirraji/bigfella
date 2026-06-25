import type { NextConfig } from "next";
import path from "node:path";

// Auto-inject design tokens into every SCSS file so `$`-vars and the
// `@use "tokens"` module resolve without a per-file import. Without the
// loadPaths/includePaths + additionalData below, `@use "tokens"` fails to
// resolve and the global sheet errors — set this up first.
const designDir = path.join(process.cwd(), "src/shared/design");

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  sassOptions: {
    loadPaths: [designDir],
    includePaths: [designDir],
    additionalData: '@use "tokens" as *;',
    silenceDeprecations: ["legacy-js-api", "import"],
  },
};

export default nextConfig;
