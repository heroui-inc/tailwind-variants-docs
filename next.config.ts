import type { NextConfig } from 'next';

import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const config: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  serverExternalPackages: ['@takumi-rs/core'],
  images: {
    qualities: [75, 90]
  },
  experimental: {
    useTypeScriptCli: true,
    optimizePackageImports: ['@gravity-ui/icons']
  },
  async rewrites() {
    return [
      {
        source: '/docs/:path*.md',
        destination: '/llms.mdx/docs/:path*'
      }
    ];
  },
  redirects: async () => [
    {
      source: '/docs',
      destination: '/docs/introduction',
      permanent: true
    },
    {
      source: '/docs/getting-started',
      destination: '/docs/quick-start',
      permanent: true
    },
    {
      source: '/docs/conflict-resolution',
      destination: '/docs/class-resolution',
      permanent: true
    },
    {
      source: '/docs/examples',
      destination: '/docs/recipes',
      permanent: true
    },
    {
      source: '/docs/release-notes',
      destination: '/docs/releases',
      permanent: true
    },
    {
      source: '/docs/config',
      destination: '/docs/configuration',
      permanent: true
    },
    {
      source: '/docs/overriding-styles',
      destination: '/docs/overrides',
      permanent: true
    },
    {
      source: '/docs/composing-components',
      destination: '/docs/extending',
      permanent: true
    }
  ]
};

export default withMDX(config);
