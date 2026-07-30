import { remarkMdxFiles } from 'fumadocs-core/mdx-plugins/remark-mdx-files';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

import { codeThemes } from './src/lib/code-themes';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema
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
