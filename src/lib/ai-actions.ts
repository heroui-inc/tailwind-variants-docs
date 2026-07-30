import { getAbsoluteUrl, getSiteOrigin } from '@/lib/site';

export { getAbsoluteUrl } from '@/lib/site';

export const getMcpUrl = () => {
  return getAbsoluteUrl('/api/mcp');
};

export const getAskPrompt = (markdownUrl: string) => {
  return `Read ${markdownUrl}, I want to ask questions about it.`;
};

export const getCopyPrompt = ({
  title,
  pageUrl,
  markdownUrl
}: {
  title: string;
  pageUrl: string;
  markdownUrl: string;
}) => {
  const mcpUrl = getMcpUrl();
  const origin = getSiteOrigin();

  return `These are official instructions from Tailwind Variants to set up a good AI development environment for using \`tailwind-variants\`.

Complete the following steps yourself. Do not ask the user to run them unless a step requires interactive approval.

## 1. Register the Tailwind Variants docs MCP server

The MCP gives your agent live access to documentation via \`list_pages\`, \`search_docs\`, and \`get_page\`.

### Cursor — \`.cursor/mcp.json\`

Add under \`"mcpServers"\`:

\`\`\`json
"tailwind-variants": { "url": "${mcpUrl}" }
\`\`\`

### VS Code — \`.vscode/mcp.json\`

Add under \`"servers"\`:

\`\`\`json
"tailwind-variants": { "type": "http", "url": "${mcpUrl}" }
\`\`\`

### Claude / other HTTP MCP clients

Point a Streamable HTTP MCP client at:

\`\`\`
${mcpUrl}
\`\`\`

Restart the agent after saving, then verify the \`tailwind-variants\` MCP is connected.

## 2. Prefer machine-readable docs

- Index: ${origin}/llms.txt
- Full docs: ${origin}/llms-full.txt
- This page (Markdown): ${markdownUrl}
- This page (HTML): ${pageUrl}

## 3. Current task context

Page: **${title}**
Use the MCP \`get_page\` tool or the Markdown URL above before inventing Tailwind Variants APIs.

Once done, tell the user:

\`\`\`
✓ MCP server: tailwind-variants
✓ Docs: ${pageUrl}
⚡ Restart your agent if the MCP server was just added
\`\`\`
`;
};

const toBase64Json = (value: object) => {
  const json = JSON.stringify(value);

  if (typeof window === 'undefined') {
    return Buffer.from(json, 'utf8').toString('base64');
  }

  return btoa(unescape(encodeURIComponent(json)));
};

export const getCursorMcpInstallUrl = () => {
  const config = toBase64Json({ url: getMcpUrl() });

  return `cursor://anysphere.cursor-deeplink/mcp/install?name=tailwind-variants&config=${config}`;
};

export const getVSCodeMcpInstallUrl = () => {
  const config = encodeURIComponent(
    JSON.stringify({
      name: 'tailwind-variants',
      type: 'http',
      url: getMcpUrl()
    })
  );

  return `vscode:mcp/install?${config}`;
};

export const getChatGPTAskUrl = (markdownUrl: string) => {
  return `https://chatgpt.com/?${new URLSearchParams({
    hints: 'search',
    q: getAskPrompt(markdownUrl)
  })}`;
};

export const getClaudeAskUrl = (markdownUrl: string) => {
  return `https://claude.ai/new?${new URLSearchParams({
    q: getAskPrompt(markdownUrl)
  })}`;
};
