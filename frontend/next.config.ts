import type { NextConfig } from "next";

const backendInternalUrl = process.env.BACKEND_INTERNAL_URL ?? "http://backend:4000";

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
          destination: `${backendInternalUrl}/products/upload-image`,
        },
        {
          source: '/uploads/:path*',
          destination: `${backendInternalUrl}/uploads/:path*`,
        },
      ],
    };
  },
};

export default nextConfig;
