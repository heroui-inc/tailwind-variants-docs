import type { NextRequest } from 'next/server';

import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { NextResponse } from 'next/server';

const { rewrite: rewriteLLM } = rewritePath(
  '/docs{/*path}',
  '/llms.mdx/docs{/*path}'
);

const resolveMarkdownTarget = (pathname: string) => {
  // `/` negotiates to the llms.txt index; `.md` URLs are already Markdown.
  if (pathname === '/') return '/llms.txt';
  if (pathname.endsWith('.md')) return undefined;

  return rewriteLLM(pathname);
};

export const proxy = (request: NextRequest) => {
  if (isMarkdownPreferred(request)) {
    const result = resolveMarkdownTarget(request.nextUrl.pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl), {
        headers: { Vary: 'Accept' }
      });
    }
  }

  // Negotiated paths vary on Accept even for HTML, so CDNs cache both
  // variants separately. Page responses also get this via next.config headers.
  const response = NextResponse.next();
  response.headers.set('Vary', 'Accept');

  return response;
};

export const config = {
  matcher: ['/', '/docs/:path*']
};
