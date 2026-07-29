import type { ReactNode } from 'react';

import { DocsLayout } from 'fumadocs-ui/layouts/docs';

import { DocsSidebarFooter } from '@/components/docs-sidebar-footer';
import { baseOptions } from '@/lib/layout-shared';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  const options = baseOptions();

  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...options}
      links={[]}
      themeSwitch={{ enabled: false }}
      slots={{
        ...options.slots,
        themeSwitch: false
      }}
      sidebar={{
        footer: <DocsSidebarFooter key="docs-sidebar-footer" />
      }}
    >
      {children}
    </DocsLayout>
  );
}
