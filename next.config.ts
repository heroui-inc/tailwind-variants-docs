import type { NextConfig } from 'next';

import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@heroui/react', '@heroui/styles'],
  images: {
    qualities: [75, 90]
  },
  experimental: {
    useTypeScriptCli: true,
    optimizePackageImports: ['@heroui/react', '@gravity-ui/icons']
  },
  redirects: async () => [
    {
      source: '/docs',
      destination: '/docs/introduction',
      permanent: false
    }
  ]
};

export default withMDX(config);
