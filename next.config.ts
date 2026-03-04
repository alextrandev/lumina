import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // WebLLM appends /resolve/main/ to model URLs (HuggingFace convention).
        // Rewrite to serve from public/model/ directly.
        source: "/model/resolve/main/:path*",
        destination: "/model/:path*",
      },
    ];
  },
};

export default nextConfig;
