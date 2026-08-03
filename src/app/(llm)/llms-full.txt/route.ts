import { collapseBlankLines, getLLMText } from '@/lib/get-llm-text';
import { source } from '@/lib/source';

export const revalidate = false;

export const GET = async () => {
  const scanned = await Promise.all(source.getPages().map(getLLMText));

  return new Response(collapseBlankLines(scanned.join('\n\n')), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8'
    }
  });
};
