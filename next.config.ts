import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  images: {
    // Demo: backend media is served from the API host (e.g. *.onrender.com).
    remotePatterns: [
      { protocol: "https", hostname: "**.onrender.com", pathname: "/**" },
      { protocol: "https", hostname: "**", pathname: "/media/**" },
      { protocol: "http", hostname: "localhost", pathname: "/**" },
      { protocol: "http", hostname: "127.0.0.1", pathname: "/**" },
    ],
  },
};

export default nextConfig;
