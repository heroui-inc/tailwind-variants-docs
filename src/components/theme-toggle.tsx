'use client';

import type { ComponentProps } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from 'fumadocs-ui/components/ui/popover';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from 'tailwind-variants';

import { CheckIcon, DisplayIcon, MoonIcon, SunIcon } from '@/components/icons';
import { iconButtonClass, popoverContentClass } from '@/lib/styles';

type ThemeMode = 'light' | 'dark' | 'system';

const modes: {
  id: ThemeMode;
  label: string;
  Icon: typeof SunIcon;
}[] = [
  { id: 'light', label: 'Light', Icon: SunIcon },
  { id: 'dark', label: 'Dark', Icon: MoonIcon },
  { id: 'system', label: 'System', Icon: DisplayIcon }
];

export type ThemeToggleProps = ComponentProps<'button'> & {
  /** @deprecated Kept for Fumadocs slot compat. */
  mode?: 'light-dark' | 'light-dark-system';
};

export const ThemeToggle = ({
  className,
  mode: _mode,
  ...props
}: ThemeToggleProps) => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const value = (mounted ? (theme ?? 'system') : 'system') as ThemeMode;
  const current = modes.find((item) => item.id === value) ?? modes[2];
  const CurrentIcon = current.Icon;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        data-theme-toggle=""
        aria-label={`Theme: ${current.label}`}
        disabled={!mounted}
        className={cn(
          iconButtonClass(),
          'disabled:cursor-wait disabled:opacity-70',
          className
        )}
        {...props}
      >
        <CurrentIcon size={16} className="size-4" />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className={popoverContentClass('w-max min-w-0 p-1.5')}
      >
        <div className="flex flex-col gap-0.5">
          {modes.map(({ id, label, Icon }) => {
            const selected = value === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setTheme(id);
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1.5 text-start',
                  'transition-colors hover:bg-default',
                  selected && 'bg-default/70'
                )}
              >
                <span className="flex size-4 shrink-0 items-center justify-center text-muted">
                  <Icon size={14} className="size-3.5" />
                </span>
                <span className="text-sm font-medium whitespace-nowrap text-foreground">
                  {label}
                </span>
                {selected ? (
                  <CheckIcon size={12} className="ms-1 size-3 text-muted" />
                ) : (
                  <span className="ms-1 size-3" aria-hidden />
                )}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
