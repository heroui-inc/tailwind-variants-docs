import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';

import { getLLMText } from '@/lib/get-llm-text';
import { getCanonicalUrl } from '@/lib/site';
import { source } from '@/lib/source';

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'list_pages',
      {
        title: 'List Pages',
        description:
          'List all Tailwind Variants documentation pages with titles, URLs, and descriptions.',
        inputSchema: {}
      },
      async () => {
        const pages = source.getPages().map((page) => ({
          title: page.data.title,
          description: page.data.description,
          url: getCanonicalUrl(page.url),
          markdownUrl: getCanonicalUrl(`${page.url}.md`),
          slugs: page.slugs
        }));

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(pages, null, 2)
            }
          ]
        };
      }
    );

    server.registerTool(
      'search_docs',
      {
        title: 'Search Docs',
        description:
          'Full-text search across Tailwind Variants documentation (title, description, URL, and page body).',
        inputSchema: {
          query: z.string().min(1).describe('Search query')
        }
      },
      async ({ query }) => {
        const q = query.toLowerCase();
        const scored: Array<{
          title: string;
          description: string | undefined;
          url: string;
          score: number;
        }> = [];

        for (const page of source.getPages()) {
          const title = page.data.title;
          const description = page.data.description;
          const url = getCanonicalUrl(page.url);
          const body = await getLLMText(page);
          const fields = [
            { text: title, weight: 5 },
            { text: description ?? '', weight: 3 },
            { text: url, weight: 2 },
            { text: body, weight: 1 }
          ];

          let score = 0;
          for (const field of fields) {
            if (field.text.toLowerCase().includes(q)) {
              score += field.weight;
            }
          }

          if (score > 0) {
            scored.push({ title, description, url, score });
          }
        }

        const results = scored
          .sort((a, b) => b.score - a.score)
          .slice(0, 20)
          .map(({ title, description, url }) => ({
            title,
            description,
            url
          }));

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(results, null, 2)
            }
          ]
        };
      }
    );

    server.registerTool(
      'get_page',
      {
        title: 'Get Page',
        description:
          'Fetch the full Markdown content of a documentation page by path or slug.',
        inputSchema: {
          path: z
            .string()
            .min(1)
            .describe(
              'Page path such as /docs/variants or variants, or a slug path like slots'
            )
        }
      },
      async ({ path }) => {
        const normalized = path
          .replace(/^https?:\/\/[^/]+/, '')
          .replace(/^\/docs\/?/, '')
          .replace(/\.mdx?$/, '')
          .replace(/^\//, '');
        const slugs = normalized
          ? normalized.split('/').filter(Boolean)
          : undefined;
        const page = source.getPage(slugs);

        if (!page) {
          return {
            content: [
              {
                type: 'text' as const,
                text: `Page not found: ${path}`
              }
            ],
            isError: true
          };
        }

        return {
          content: [
            {
              type: 'text' as const,
              text: await getLLMText(page)
            }
          ]
        };
      }
    );
  },
  {},
  {
    basePath: '/api',
    maxDuration: 60,
    verboseLogs: false
  }
);

export { handler as GET, handler as POST, handler as DELETE };
