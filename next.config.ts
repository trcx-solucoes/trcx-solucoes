import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    // <ViewTransition> da React + animação automática em navegação.
    // Doc: node_modules/next/dist/docs/01-app/02-guides/view-transitions.md
    viewTransition: true,
  },
};

export default nextConfig;
