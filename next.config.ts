import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_ACTIONS ? "/eCity" : "",
};

export default nextConfig;
