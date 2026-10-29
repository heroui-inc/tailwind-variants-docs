/** OpenAPI 3.1 document for the machine-readable surface of the docs site. */

const errorResponse = (description: string) => ({
  description,
  content: {
    'application/json': {
      schema: { $ref: '#/components/schemas/ErrorResponse' }
    }
  }
});

const markdownResponse = (description: string) => ({
  description,
  content: {
    'text/markdown': {
      schema: { type: 'string' }
    }
  }
});

export const buildOpenApiDocument = (siteUrl: string) => {
  return {
    openapi: '3.1.0',
    info: {
      title: 'Tailwind Variants Docs API',
      version: '1.0.0',
      summary:
        'Machine-readable access to the Tailwind Variants documentation.',
      description:
        'Read-only API for AI agents and tooling: full-text search, per-page Markdown, llms.txt indexes, and a Model Context Protocol (MCP) server. No authentication is required and there are no server-enforced rate limits beyond CDN abuse protection; be a polite client.',
      contact: {
        name: 'Tailwind Variants (HeroUI)',
        url: 'https://github.com/heroui-inc/tailwind-variants/issues'
      },
      license: {
        name: 'MIT',
        identifier: 'MIT'
      }
    },
    servers: [{ url: siteUrl, description: 'Production' }],
    paths: {
      '/api/search': {
        get: {
          operationId: 'searchDocs',
          summary: 'Search the documentation',
          description:
            'Full-text search across all Tailwind Variants documentation pages. Returns matching pages, headings, and text fragments with URLs (append `.md` to a page URL for Markdown).',
          tags: ['docs'],
          parameters: [
            {
              name: 'query',
              in: 'query',
              required: true,
              description: 'Search terms, e.g. `slots` or `compound variants`.',
              schema: { type: 'string', minLength: 1 }
            }
          ],
          responses: {
            '200': {
              description: 'Ranked search results.',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/SearchResult' }
                  }
                }
              }
            },
            '404': errorResponse('Unknown API path.')
          }
        }
      },
      '/docs/{slug}.md': {
        get: {
          operationId: 'getDocPageMarkdown',
          summary: 'Fetch one docs page as Markdown',
          description:
            'Returns the full Markdown source of a documentation page, with live demos expanded to code fences. The same body is served from `/docs/{slug}` when the request sends `Accept: text/markdown`.',
          tags: ['docs'],
          parameters: [
            {
              name: 'slug',
              in: 'path',
              required: true,
              description: 'Page slug, e.g. `variants` or `api-reference`.',
              schema: { type: 'string' }
            }
          ],
          responses: {
            '200': markdownResponse('Markdown body of the page.'),
            '404': markdownResponse(
              'Markdown 404 page with links to the docs index, llms.txt, and sitemap.'
            )
          }
        }
      },
      '/llms.txt': {
        get: {
          operationId: 'getLlmsIndex',
          summary: 'llms.txt index',
          description:
            'Curated Markdown index of the whole site following the llms.txt convention: when-to-use guidance, every docs page with its `.md` URL, and all machine-readable endpoints.',
          tags: ['agents'],
          responses: {
            '200': markdownResponse('llms.txt Markdown index.')
          }
        }
      },
      '/llms-full.txt': {
        get: {
          operationId: 'getLlmsFullCorpus',
          summary: 'Full docs corpus as one Markdown file',
          description:
            'Every documentation page concatenated into a single Markdown document, for agents that want the entire corpus in context.',
          tags: ['agents'],
          responses: {
            '200': markdownResponse('Concatenated Markdown corpus.')
          }
        }
      },
      '/openapi.json': {
        get: {
          operationId: 'getOpenApiDocument',
          summary: 'This OpenAPI document',
          description: 'Returns this OpenAPI 3.1 document as JSON.',
          tags: ['agents'],
          responses: {
            '200': {
              description: 'OpenAPI 3.1 document.',
              content: {
                'application/json': { schema: { type: 'object' } }
              }
            }
          }
        }
      },
      '/.well-known/mcp.json': {
        get: {
          operationId: 'getMcpManifest',
          summary: 'MCP server manifest',
          description:
            'Metadata for the Model Context Protocol server: endpoint URL, transport, and tool list.',
          tags: ['mcp'],
          responses: {
            '200': {
              description: 'MCP manifest.',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/McpManifest' }
                }
              }
            }
          }
        }
      },
      '/api/mcp': {
        post: {
          operationId: 'mcpStreamableHttp',
          summary: 'MCP server (Streamable HTTP)',
          description:
            'Model Context Protocol endpoint using the Streamable HTTP transport. Send JSON-RPC 2.0 messages (`initialize`, `tools/list`, `tools/call`). Tools: `list_pages`, `search_docs`, `get_page`. Also reachable at `/.well-known/mcp` and `/mcp`. Prefer an MCP client over hand-rolled JSON-RPC.',
          tags: ['mcp'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/JsonRpcMessage' }
              }
            }
          },
          responses: {
            '200': {
              description:
                'JSON-RPC response, either as JSON or as a Server-Sent Events stream.',
              content: {
                'application/json': { schema: { type: 'object' } },
                'text/event-stream': { schema: { type: 'string' } }
              }
            },
            '400': errorResponse('Malformed JSON-RPC message.'),
            '404': errorResponse('Unknown API path.')
          }
        }
      }
    },
    components: {
      schemas: {
        SearchResult: {
          type: 'object',
          description:
            'One search hit. `type` distinguishes page-level results from heading and text fragments.',
          required: ['id', 'url', 'type', 'content'],
          properties: {
            id: { type: 'string', description: 'Stable result identifier.' },
            url: {
              type: 'string',
              description:
                'Site-relative URL of the match, possibly with a heading anchor.'
            },
            type: {
              type: 'string',
              enum: ['page', 'heading', 'text'],
              description: 'Granularity of the match.'
            },
            content: {
              type: 'string',
              description: 'Matched title, heading, or text fragment.'
            }
          }
        },
        JsonRpcMessage: {
          type: 'object',
          description: 'A JSON-RPC 2.0 request as used by MCP.',
          required: ['jsonrpc', 'method'],
          properties: {
            jsonrpc: { type: 'string', const: '2.0' },
            id: {
              description: 'Request id (absent for notifications).',
              oneOf: [{ type: 'string' }, { type: 'number' }]
            },
            method: {
              type: 'string',
              description: 'MCP method, e.g. `initialize` or `tools/call`.'
            },
            params: { type: 'object' }
          }
        },
        McpManifest: {
          type: 'object',
          description: 'Model Context Protocol server manifest.',
          required: ['name', 'endpoint', 'transport', 'tools'],
          properties: {
            name: { type: 'string' },
            version: { type: 'string' },
            description: { type: 'string' },
            endpoint: { type: 'string', format: 'uri' },
            transport: { type: 'string', const: 'streamable-http' },
            tools: {
              type: 'array',
              items: {
                type: 'object',
                required: ['name', 'description'],
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' }
                }
              }
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          description:
            'Structured error body returned by every API error response.',
          required: ['error'],
          properties: {
            error: {
              type: 'object',
              required: ['code', 'message'],
              properties: {
                code: {
                  type: 'string',
                  description: 'Machine-readable error code, e.g. `not_found`.'
                },
                message: {
                  type: 'string',
                  description: 'Human-readable explanation.'
                },
                hint: {
                  type: 'string',
                  description: 'How to resolve or where to look next.'
                },
                documentation_url: {
                  type: 'string',
                  format: 'uri',
                  description: 'Link to the OpenAPI spec or relevant docs.'
                }
              }
            }
          }
        }
      }
    },
    tags: [
      { name: 'docs', description: 'Documentation content and search.' },
      { name: 'agents', description: 'Indexes intended for AI agents.' },
      { name: 'mcp', description: 'Model Context Protocol server.' }
    ]
  };
};
