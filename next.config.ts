import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Für Docker Standalone Output
  output: 'standalone',
  
  // External Images erlauben
  images: {
    domains: ['images.wimwenigerkind.com'],
  },
  
  // Optional: Disable x-powered-by header
  poweredByHeader: false,
};

export default nextConfig;
