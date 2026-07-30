import type * as PageTree from 'fumadocs-core/page-tree';

export const COMING_SOON_PREFIX = 'coming-soon:';

export const isComingSoonSidebarItem = (item: PageTree.Item) => {
  return item.$id?.startsWith(COMING_SOON_PREFIX) ?? false;
};

export const injectComingSoonSidebarItems = (
  nodes: PageTree.Node[]
): PageTree.Node[] => {
  const result: PageTree.Node[] = [];

  for (const node of nodes) {
    result.push(node);

    if (node.type === 'page' && node.url === '/docs/mcp-server') {
      result.push({
        type: 'page',
        $id: `${COMING_SOON_PREFIX}agent-skills`,
        name: 'Agent Skills',
        url: '#'
      });
    }
  }

  return result;
};
