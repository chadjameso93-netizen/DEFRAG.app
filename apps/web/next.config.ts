import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@defrag/relational-schema",
    "@defrag/shared",
    "@defrag/feature-engine",
    "@defrag/pattern-engine",
    "@defrag/state-engine",
    "@defrag/simulation-engine",
    "@defrag/explanation-engine",
    "@defrag/governance-engine",
  ],
};

export default nextConfig;
