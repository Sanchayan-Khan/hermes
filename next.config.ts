import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.pixabay.com"], // Add the domain here
  },
  typescript: {
    ignoreBuildErrors: true, // This will allow the build to continue even with TypeScript errors
  },
};

export default nextConfig;
