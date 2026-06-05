import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows your local IP to connect to the dev server safely
  allowedDevOrigins: ["192.168.1.148"],
};

export default nextConfig;
