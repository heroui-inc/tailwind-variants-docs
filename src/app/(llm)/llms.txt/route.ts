import { buildLlmsTxt } from '@/lib/agent';
import { siteUrl } from '@/lib/site';
import { source } from '@/lib/source';

export const revalidate = false;

export const GET = () => {
  const pages = source.getPages().map((page) => ({
    title: page.data.title,
    description: page.data.description,
    url: page.url
  }));

  return new Response(buildLlmsTxt({ siteUrl, pages }), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept'
    }
  });
};
