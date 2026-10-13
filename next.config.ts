import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-f471c3e24db144a6a94c290eececee02.r2.dev",
      },
      {
        protocol: "https",
        hostname: "**.r2.dev",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/admi/:path*",
        destination: "/admin/:path*",
        permanent: false,
      },
      {
        source: "/admi",
        destination: "/admin",
        permanent: false,
      },
      {
        source: "/admin/login",
        destination: "/admin",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
