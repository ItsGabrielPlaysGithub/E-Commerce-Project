import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbopackFileSystemCacheForDev : true,
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/products/upload-image',
          destination: 'http://localhost:4000/products/upload-image',
        },
        {
          source: '/uploads/:path*',
          destination: 'http://localhost:4000/uploads/:path*',
        },
      ],
    };
  },
};

export default nextConfig;
