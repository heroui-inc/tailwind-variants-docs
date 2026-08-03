import type { LLMsOptions } from 'fumadocs-core/mdx-plugins/remark-llms';

import { remarkMdxFiles } from 'fumadocs-core/mdx-plugins/remark-mdx-files';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

import { codeThemes } from './src/lib/code-themes';

const llmsOptions: LLMsOptions = {
  // Keep DemoPreview / Callout as tokens so getLLMText can expand them
  // with full demo source at runtime.
  mdxAsPlaceholder: ['DemoPreview', 'Callout']
};

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: llmsOptions
    }
  },
  meta: {
    schema: metaSchema
  }
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMdxFiles],
    rehypeCodeOptions: {
      themes: codeThemes,
      defaultColor: false
    }
  }
});
