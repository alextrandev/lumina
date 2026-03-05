import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Model files live in public/model/resolve/main/ to match WebLLM's
  // HuggingFace-style URL convention, so no server-side rewrites are needed.
};

export default nextConfig;
