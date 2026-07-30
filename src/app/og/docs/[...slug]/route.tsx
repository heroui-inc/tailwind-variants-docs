import { notFound } from 'next/navigation';
import { ImageResponse } from 'takumi-js/response';

import { DocsOgImage } from '@/components/og-image';
import { getPageImageUrl, source } from '@/lib/source';

export const revalidate = false;

const GEIST_CDN = 'https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@5.2.5';

const loadGeist = async (weight: 400 | 500) => {
  const response = await fetch(`${GEIST_CDN}/latin-${weight}-normal.ttf`);

  if (!response.ok) {
    throw new Error(`Failed to load Geist ${weight}: ${response.status}`);
  }

  return response.arrayBuffer();
};

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) => {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));

  if (!page) notFound();

  const [regular, medium] = await Promise.all([loadGeist(400), loadGeist(500)]);

  return new ImageResponse(
    <DocsOgImage title={page.data.title} description={page.data.description} />,
    {
      width: 1200,
      height: 630,
      format: 'webp',
      fonts: [
        {
          name: 'Geist',
          data: regular,
          weight: 400,
          style: 'normal'
        },
        {
          name: 'Geist',
          data: medium,
          weight: 500,
          style: 'normal'
        }
      ]
    }
  );
};

export const generateStaticParams = () => {
  return source.getPages().map((page) => ({
    slug: getPageImageUrl(page).segments
  }));
};
