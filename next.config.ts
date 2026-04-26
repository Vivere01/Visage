import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // @ts-ignore
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
