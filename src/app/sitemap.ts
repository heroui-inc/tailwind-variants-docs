import type { MetadataRoute } from 'next';

import { statSync } from 'node:fs';
import path from 'node:path';

import { siteUrl } from '@/lib/site';
import { source } from '@/lib/source';

const getFileLastModified = (absolutePath: string | undefined) => {
  if (!absolutePath) return undefined;

  try {
    return statSync(absolutePath).mtime;
  } catch {
    return undefined;
  }
};

const maxDate = (dates: Array<Date | undefined>) => {
  return dates.reduce<Date | undefined>((latest, date) => {
    if (!date) return latest;
    if (!latest || date > latest) return date;
    return latest;
  }, undefined);
};

const sitemap = (): MetadataRoute.Sitemap => {
  const pages = source.getPages().map((page) => {
    const isIntro = page.slugs.join('/') === 'introduction';
    const isQuickStart = page.slugs.join('/') === 'quick-start';

    return {
      url: `${siteUrl}${page.url}`,
      lastModified: getFileLastModified(page.absolutePath),
      changeFrequency: 'weekly' as const,
      priority: isIntro || isQuickStart ? 0.9 : 0.7
    };
  });

  const homeLastModified = maxDate([
    getFileLastModified(path.join(process.cwd(), 'src/app/(landing)/page.tsx')),
    ...pages.map((page) => page.lastModified)
  ]);

  return [
    {
      url: siteUrl,
      lastModified: homeLastModified,
      changeFrequency: 'weekly',
      priority: 1
    },
    ...pages
  ];
};

export default sitemap;
