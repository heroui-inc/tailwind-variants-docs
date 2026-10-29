import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';

import { MCP_TOOLS } from '@/lib/agent';
import { getLLMText } from '@/lib/get-llm-text';
import { getCanonicalUrl } from '@/lib/site';
import { source } from '@/lib/source';

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'list_pages',
      {
        title: 'List Pages',
        description: MCP_TOOLS.list_pages,
        inputSchema: z.object({})
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
        description: MCP_TOOLS.search_docs,
        inputSchema: z.object({
          query: z.string().min(1).describe('Search query')
        })
      },
      async ({ query }) => {
        const q = query.toLowerCase();
        const scored: Array<{
          title: string;
          description: string | undefined;
          url: string;
          markdownUrl: string;
          score: number;
        }> = [];

        for (const page of source.getPages()) {
          const title = page.data.title;
          const description = page.data.description;
          const url = getCanonicalUrl(page.url);
          const markdownUrl = getCanonicalUrl(`${page.url}.md`);
          const body = await getLLMText(page);
          const fields = [
            { text: title, weight: 5 },
            { text: description ?? '', weight: 3 },
            { text: url, weight: 2 },
            { text: markdownUrl, weight: 2 },
            { text: body, weight: 1 }
          ];

          let score = 0;
          for (const field of fields) {
            if (field.text.toLowerCase().includes(q)) {
              score += field.weight;
            }
          }

          if (score > 0) {
            scored.push({ title, description, url, markdownUrl, score });
          }
        }

        const results = scored
          .sort((a, b) => b.score - a.score)
          .slice(0, 20)
          .map(({ title, description, url, markdownUrl }) => ({
            title,
            description,
            url,
            markdownUrl
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
        description: MCP_TOOLS.get_page,
        inputSchema: z.object({
          path: z
            .string()
            .min(1)
            .describe(
              'Page path such as /docs/variants or variants, or a slug path like slots'
            )
        })
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
  {
    verboseLogs: false
  }
);

export { handler as GET, handler as POST, handler as DELETE };
