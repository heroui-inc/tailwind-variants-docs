import { buildMcpManifest } from '@/lib/agent';
import { siteUrl } from '@/lib/site';

export const revalidate = false;

// Served at /.well-known/mcp.json via a rewrite in next.config.ts.
export const GET = () => {
  return Response.json(buildMcpManifest(siteUrl), {
    headers: {
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
