import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : undefined,
  basePath: isGithubPages ? "/ooj" : "",
  assetPrefix: isGithubPages ? "/ooj/" : undefined,
  trailingSlash: isGithubPages ? true : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/ooj" : "",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
