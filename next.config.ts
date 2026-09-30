import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows your local IP to connect to the dev server safely
  allowedDevOrigins: ['192.168.1.91', '192.168.1.30'],
};

export default nextConfig;
