import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent ONNX runtime from being bundled server-side
  serverExternalPackages: ["onnxruntime-node"],
  // Turbopack is the default bundler in Next.js 16
  turbopack: {
    resolveAlias: {
      fs: { browser: "./empty-module.js" },
      path: { browser: "./empty-module.js" },
      crypto: { browser: "./empty-module.js" },
    },
  },
};

export default nextConfig;
