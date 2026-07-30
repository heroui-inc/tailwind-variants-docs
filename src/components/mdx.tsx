import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';

import { Callout } from 'fumadocs-ui/components/callout';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import defaultMdxComponents from 'fumadocs-ui/mdx';

import { DemoPreview } from '@/components/demo-preview';

export const getMDXComponents = (components?: MDXComponents) => {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    Callout,
    DemoPreview,
    File,
    Files,
    Folder,
    TypeTable,
    pre: ({ ref: _ref, ...props }: ComponentProps<'pre'>) => (
      <CodeBlock {...props} viewportProps={{ className: 'text-sm py-3.5' }}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    ...components
  } satisfies MDXComponents;
};

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
