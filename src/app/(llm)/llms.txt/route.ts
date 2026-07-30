import { getCanonicalUrl, siteUrl } from '@/lib/site';
import { source } from '@/lib/source';

export const revalidate = false;

/** https://llmstxt.org/ — H1, summary, H2 lists of `[name](url)` links. */
export const GET = () => {
  const docsLinks = source
    .getPages()
    .map((page) => {
      const markdown = `${getCanonicalUrl(page.url)}.md`;
      const description = page.data.description?.trim();
      const note = description ? `: ${description}` : '';

      return `- [${page.data.title}](${markdown})${note}`;
    })
    .join('\n');

  const body = [
    '# Tailwind Variants',
    '',
    '> A first-class variant API for Tailwind CSS — typed, composable, and built for design systems.',
    '',
    'Links point at Markdown (`.md`). Drop the suffix for HTML.',
    '',
    '## Docs',
    '',
    docsLinks,
    '',
    '## Optional',
    '',
    `- [Full documentation](${siteUrl}/llms-full.txt): All pages in one Markdown file`,
    `- [MCP server](${siteUrl}/api/mcp): list_pages, search_docs, get_page`,
    `- [GitHub](https://github.com/heroui-inc/tailwind-variants): Library source`,
    ''
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8'
    }
  });
};
