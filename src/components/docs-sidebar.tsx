'use client';

import type * as PageTree from 'fumadocs-core/page-tree';

import { usePathname } from 'fumadocs-core/framework';
import {
  SidebarItem as BaseSidebarItem,
  SidebarSeparator as BaseSidebarSeparator,
  useFolderDepth
} from 'fumadocs-ui/components/sidebar/base';
import { cn } from 'tailwind-variants';

const itemOffset = (depth: number) => {
  return `calc(${2 + 2.5 * depth} * var(--spacing))`;
};

const isItemActive = (href: string, pathname: string) => {
  return href === pathname || href === `${pathname}/`;
};

export const DocsSidebarItem = ({ item }: { item: PageTree.Item }) => {
  const pathname = usePathname();
  const depth = useFolderDepth();

  return (
    <BaseSidebarItem
      href={item.url}
      external={item.external}
      active={isItemActive(item.url, pathname)}
      icon={item.icon}
      className={cn(
        'relative flex cursor-pointer flex-row items-center gap-2 rounded-sm px-2 py-1.5 text-sm leading-snug',
        'text-muted wrap-anywhere transition-colors',
        'hover:bg-default/70 hover:text-foreground',
        'data-[active=true]:text-foreground data-[active=true]:font-medium',
        '[&_svg]:size-4 [&_svg]:shrink-0'
      )}
      style={{ paddingInlineStart: itemOffset(depth) }}
    >
      {item.name}
    </BaseSidebarItem>
  );
};

export const DocsSidebarSeparator = ({
  item
}: {
  item: PageTree.Separator;
}) => {
  const depth = useFolderDepth();

  return (
    <BaseSidebarSeparator
      className={cn(
        'mt-6 mb-1 px-2 first:mt-1',
        'text-xs font-medium tracking-wide text-subtle'
      )}
      style={{ paddingInlineStart: itemOffset(depth) }}
    >
      {item.icon}
      {item.name}
    </BaseSidebarSeparator>
  );
};
