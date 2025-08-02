import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Für Docker Standalone Output
  output: 'standalone',
  
  // External Images erlauben
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.wimwenigerkind.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Optional: Disable x-powered-by header
  poweredByHeader: false,
};

export default nextConfig;
