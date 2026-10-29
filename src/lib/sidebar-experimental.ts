import type * as PageTree from 'fumadocs-core/page-tree';

const EXPERIMENTAL_URLS = new Set(['/docs/debugging']);

export const isExperimentalSidebarItem = (item: PageTree.Item) => {
  return typeof item.url === 'string' && EXPERIMENTAL_URLS.has(item.url);
};
