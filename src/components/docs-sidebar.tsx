'use client';

import type * as PageTree from 'fumadocs-core/page-tree';

import { usePathname } from 'fumadocs-core/framework';
import {
  SidebarItem as BaseSidebarItem,
  SidebarSeparator as BaseSidebarSeparator,
  useFolderDepth
} from 'fumadocs-ui/components/sidebar/base';
import { cn } from 'tailwind-variants';

import { FlaskIcon } from '@/components/icons';
import { isComingSoonSidebarItem } from '@/lib/sidebar-coming-soon';
import { isExperimentalSidebarItem } from '@/lib/sidebar-experimental';

const itemOffset = (depth: number) => {
  return `calc(${2 + 2.5 * depth} * var(--spacing))`;
};

const isItemActive = (href: string, pathname: string) => {
  return href === pathname || href === `${pathname}/`;
};

export const DocsSidebarItem = ({ item }: { item: PageTree.Item }) => {
  const pathname = usePathname();
  const depth = useFolderDepth();

  if (isComingSoonSidebarItem(item)) {
    return (
      <span
        aria-disabled="true"
        className={cn(
          'relative flex cursor-not-allowed flex-row items-center gap-1.5 rounded-sm px-2 py-1.5 text-sm leading-snug',
          'select-none text-subtle'
        )}
        style={{ paddingInlineStart: itemOffset(depth) }}
      >
        <span className="truncate">{item.name}</span>
        <span className="shrink-0 rounded-sm bg-default px-1.5 py-0.5 text-xs font-medium tracking-wide text-muted uppercase">
          Soon
        </span>
      </span>
    );
  }

  return (
    <BaseSidebarItem
      href={item.url}
      external={item.external}
      active={isItemActive(item.url, pathname)}
      icon={item.icon}
      className={cn(
        'relative flex cursor-pointer flex-row items-center gap-2 rounded-md px-2 py-1.5 text-sm leading-snug',
        'text-muted wrap-anywhere',
        'data-[active=true]:bg-default data-[active=true]:font-semibold data-[active=true]:text-foreground',
        '[&_svg]:size-4 [&_svg]:shrink-0'
      )}
      style={{ paddingInlineStart: itemOffset(depth) }}
    >
      {item.name}
      {isExperimentalSidebarItem(item) && (
        <span
          title="Experimental"
          className="flex shrink-0 items-center text-subtle"
        >
          <FlaskIcon size={14} className="size-3.5!" aria-hidden />
          <span className="sr-only">(Experimental)</span>
        </span>
      )}
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
