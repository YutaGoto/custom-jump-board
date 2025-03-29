import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "**.steamusercontent.com",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
