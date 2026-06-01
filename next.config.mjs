import nextra from 'nextra';

const withNextra = nextra({
  defaultShowCopyCode: true
});

export default withNextra({
  reactStrictMode: true,
  redirects: async () => [
    {
      source: '/docs',
      destination: '/docs/introduction',
      permanent: false
    }
  ]
});
