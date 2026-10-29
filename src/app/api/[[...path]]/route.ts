import { buildJsonError } from '@/lib/agent';
import { siteUrl } from '@/lib/site';

// JSON 404 for unknown /api/* paths; static siblings take precedence.
const handler = (request: Request) => {
  const { pathname } = new URL(request.url);

  return Response.json(
    buildJsonError({
      siteUrl,
      code: 'not_found',
      message: `No API endpoint exists at ${pathname}.`,
      hint: 'Available endpoints: GET /api/search?query=..., POST /api/mcp (MCP Streamable HTTP). The full surface is described at /openapi.json.'
    }),
    { status: 404 }
  );
};

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE
};
