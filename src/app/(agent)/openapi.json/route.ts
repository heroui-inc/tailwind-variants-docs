import { buildOpenApiDocument } from '@/lib/openapi';
import { siteUrl } from '@/lib/site';

export const revalidate = false;

export const GET = () => {
  return Response.json(buildOpenApiDocument(siteUrl), {
    headers: {
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
