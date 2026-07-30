'use client';

import type { ComponentProps } from 'react';

import { useSearchContext } from 'fumadocs-ui/contexts/search';
import { cn } from 'tailwind-variants';

import { MagnifierIcon } from '@/components/icons';
import { iconButtonClass } from '@/lib/styles';

type SearchTriggerProps = ComponentProps<'button'> & {
  hideIfDisabled?: boolean;
};

export const SearchTriggerSm = ({
  hideIfDisabled,
  className: _className,
  ...props
}: SearchTriggerProps) => {
  const { setOpenSearch, enabled } = useSearchContext();

  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      type="button"
      data-search=""
      aria-label="Open Search"
      className={iconButtonClass()}
      onClick={() => setOpenSearch(true)}
      {...props}
    >
      <MagnifierIcon size={16} className="size-4" />
    </button>
  );
};

export const SearchTriggerFull = ({
  hideIfDisabled,
  className,
  ...props
}: SearchTriggerProps) => {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();

  if (hideIfDisabled && !enabled) return null;

  return (
    <button
      type="button"
      data-search-full=""
      className={cn(
        'inline-flex h-8 w-full max-w-sm cursor-pointer items-center gap-2 rounded-md border border-border bg-default/70 px-2.5 text-sm text-muted transition-colors',
        'hover:border-foreground/15 hover:bg-default hover:text-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/40',
        className
      )}
      onClick={() => setOpenSearch(true)}
      {...props}
    >
      <MagnifierIcon size={16} className="size-4 shrink-0" />
      <span className="flex-1 text-start">Search</span>
      <span className="ms-auto inline-flex gap-0.5">
        {hotKey.map((k, i) => (
          <kbd
            key={String(i)}
            className="rounded border border-border bg-background px-1.5 font-sans text-[0.6875rem] text-muted"
          >
            {k.display}
          </kbd>
        ))}
      </span>
    </button>
  );
};
