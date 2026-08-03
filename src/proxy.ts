import type { NextRequest } from 'next/server';

import { isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { NextResponse } from 'next/server';

const { rewrite: rewriteLLM } = rewritePath(
  '/docs{/*path}',
  '/llms.mdx/docs{/*path}'
);

export const proxy = (request: NextRequest) => {
  if (isMarkdownPreferred(request)) {
    const result = rewriteLLM(request.nextUrl.pathname);

    if (result) {
      return NextResponse.rewrite(new URL(result, request.nextUrl), {
        headers: { Vary: 'Accept' }
      });
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/docs/:path*']
};
