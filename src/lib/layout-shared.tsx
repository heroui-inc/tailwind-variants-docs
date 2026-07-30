import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

import { SiteHeader } from '@/components/site-header';

export { getVersion } from '@/components/site-header';

export const baseOptions = (): BaseLayoutProps => {
  return {
    nav: {
      component: <SiteHeader variant="home" />
    },
    themeSwitch: {
      enabled: false
    },
    searchToggle: {
      enabled: false
    },
    links: []
  };
};

/** Docs notebook layout: top header + sidebar (no sidebar collapse on desktop). */
export const docsOptions = (): BaseLayoutProps => {
  return {
    nav: {
      component: <SiteHeader variant="docs" />,
      url: '/'
    },
    themeSwitch: {
      enabled: false
    },
    searchToggle: {
      enabled: false
    },
    links: []
  };
};
