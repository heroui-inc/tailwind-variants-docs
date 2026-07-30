import type { ReactNode } from 'react';

import { DocsLayout } from 'fumadocs-ui/layouts/notebook';

import {
  DocsSidebarItem,
  DocsSidebarSeparator
} from '@/components/docs-sidebar';
import { docsOptions } from '@/lib/layout-shared';
import { source } from '@/lib/source';

const Layout = ({ children }: { children: ReactNode }) => {
  const { nav, ...base } = docsOptions();

  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...base}
      nav={{
        ...nav,
        mode: 'top'
      }}
      sidebar={{
        collapsible: false,
        defaultOpenLevel: 1,
        components: {
          Item: DocsSidebarItem,
          Separator: DocsSidebarSeparator
        }
      }}
    >
      {children}
    </DocsLayout>
  );
};

export default Layout;
