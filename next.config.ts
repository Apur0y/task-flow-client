import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'admin.pixelstrap.net',
      pathname: '/**',
    },
  ],
}
};

export default nextConfig;
