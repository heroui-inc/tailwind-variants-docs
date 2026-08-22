/** Builders for agent-facing machine-readable responses. */

export type AgentPage = {
  title: string;
  description?: string;
  /** Site-relative URL such as `/docs/variants`. */
  url: string;
};

// Single source of truth for MCP tool descriptions, shared by the manifest
// and the server registration in /api/mcp.
export const MCP_TOOLS = {
  list_pages:
    'List all Tailwind Variants documentation pages with titles, URLs, and descriptions.',
  search_docs:
    'Full-text search across Tailwind Variants documentation (title, description, URL, and page body).',
  get_page:
    'Fetch the full Markdown content of a documentation page by path or slug.'
} as const;

const WHEN_TO_USE = `## When to use tailwind-variants

Reach for \`tailwind-variants\` when you are:

- Building reusable components styled with Tailwind CSS that need typed \`variants\`, \`defaultVariants\`, and \`compoundVariants\` instead of hand-written className conditionals.
- Styling multi-part components (card, dialog, select) with named \`slots\` that share variant state.
- Merging caller-supplied \`class\`/\`className\` overrides safely — Tailwind conflict resolution is built into the default build.
- Composing or extending an existing recipe with \`extend\` to build design-system hierarchies.
- Applying responsive variants driven by Tailwind breakpoints.

It is framework-agnostic (React, Vue, Svelte, Solid, or vanilla JS) and returns plain class strings. It is not a general CSS-in-JS library, a runtime theming engine, or a styling system for non-Tailwind class names.

## How agents should read these docs

1. Start from this index; fetch any page as Markdown by appending \`.md\` to its URL, or request any \`/docs/*\` URL (or \`/\`) with \`Accept: text/markdown\`.
2. Fetch \`/llms-full.txt\` when you need the whole corpus in one file.
3. Call the MCP server at \`/api/mcp\` (Streamable HTTP; tools: \`list_pages\`, \`search_docs\`, \`get_page\`). Manifest: \`/.well-known/mcp.json\`.
4. Plain HTTP: \`GET /api/search?query=...\` — the full surface is described by the OpenAPI spec at \`/openapi.json\`.`;

export const buildLlmsTxt = ({
  siteUrl,
  pages
}: {
  siteUrl: string;
  pages: AgentPage[];
}) => {
  const docsLinks = pages
    .map((page) => {
      const markdown = `${siteUrl}${page.url}.md`;
      const description = page.description?.trim();
      const note = description ? `: ${description}` : '';

      return `- [${page.title}](${markdown})${note}`;
    })
    .join('\n');

  return [
    '# Tailwind Variants',
    '',
    '> A first-class variant API for Tailwind CSS — typed, composable, and built for design systems.',
    '',
    WHEN_TO_USE,
    '',
    '## Docs',
    '',
    'Links point at Markdown (`.md`). Drop the suffix for HTML.',
    '',
    docsLinks,
    '',
    '## Machine-readable endpoints',
    '',
    `- [Full documentation](${siteUrl}/llms-full.txt): All pages in one Markdown file`,
    `- [MCP server](${siteUrl}/api/mcp): Streamable HTTP — list_pages, search_docs, get_page`,
    `- [MCP manifest](${siteUrl}/.well-known/mcp.json): Server metadata and tool list`,
    `- [OpenAPI spec](${siteUrl}/openapi.json): REST surface (search, Markdown pages, MCP)`,
    `- [Sitemap](${siteUrl}/sitemap.xml): Every indexable HTML page`,
    `- [GitHub](https://github.com/heroui-inc/tailwind-variants): Library source`,
    ''
  ].join('\n');
};

export const buildNotFoundMarkdown = ({
  siteUrl,
  path
}: {
  siteUrl: string;
  path: string;
}) => {
  return [
    '# 404 — Page not found',
    '',
    `\`${path}\` does not exist on this site.`,
    '',
    'Where to look next:',
    '',
    `- [Docs index (Markdown)](${siteUrl}/llms.txt) — every page with a \`.md\` URL`,
    `- [Documentation](${siteUrl}/docs/introduction)`,
    `- [API reference](${siteUrl}/docs/api-reference)`,
    `- [Sitemap](${siteUrl}/sitemap.xml)`,
    `- [OpenAPI spec](${siteUrl}/openapi.json)`,
    '',
    `Search the docs: \`GET ${siteUrl}/api/search?query=...\``,
    ''
  ].join('\n');
};

export const buildMcpManifest = (siteUrl: string) => {
  return {
    name: 'tailwind-variants',
    version: '1.0.0',
    description:
      'Model Context Protocol server for the Tailwind Variants documentation. Lets agents list, search, and fetch docs pages as Markdown.',
    endpoint: `${siteUrl}/api/mcp`,
    transport: 'streamable-http',
    protocol: 'mcp',
    tools: Object.entries(MCP_TOOLS).map(([name, description]) => ({
      name,
      description
    })),
    documentation: `${siteUrl}/docs/mcp-server`,
    openapi: `${siteUrl}/openapi.json`,
    llms_txt: `${siteUrl}/llms.txt`,
    contact: {
      url: 'https://github.com/heroui-inc/tailwind-variants/issues'
    }
  };
};

export type JsonErrorBody = {
  error: {
    code: string;
    message: string;
    hint?: string;
    documentation_url?: string;
  };
};

export const buildJsonError = ({
  siteUrl,
  code,
  message,
  hint
}: {
  siteUrl: string;
  code: string;
  message: string;
  hint?: string;
}): JsonErrorBody => {
  return {
    error: {
      code,
      message,
      ...(hint ? { hint } : {}),
      documentation_url: `${siteUrl}/openapi.json`
    }
  };
};
