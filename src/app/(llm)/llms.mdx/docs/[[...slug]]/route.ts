import { buildNotFoundMarkdown } from '@/lib/agent';
import { getLLMText } from '@/lib/get-llm-text';
import { siteUrl } from '@/lib/site';
import { source } from '@/lib/source';

export const revalidate = false;

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> }
) => {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) {
    return new Response(
      buildNotFoundMarkdown({
        siteUrl,
        path: `/docs/${(slug ?? []).join('/')}`
      }),
      {
        status: 404,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          Vary: 'Accept'
        }
      }
    );
  }

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept'
    }
  });
};

export const generateStaticParams = () => {
  return source.generateParams();
};
