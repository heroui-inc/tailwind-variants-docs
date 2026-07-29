'use client';

import type { ComponentProps } from 'react';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from 'tailwind-variants';

import { DisplayIcon, MoonIcon, SunIcon } from '@/components/icons';

type ThemeMode = 'light' | 'dark' | 'system';

const modes: { id: ThemeMode; label: string; Icon: typeof SunIcon }[] = [
  { id: 'light', label: 'Light', Icon: SunIcon },
  { id: 'dark', label: 'Dark', Icon: MoonIcon },
  { id: 'system', label: 'System', Icon: DisplayIcon }
];

export type ThemeToggleProps = ComponentProps<'div'> & {
  mode?: 'light-dark' | 'light-dark-system';
};

export function ThemeToggle({
  className,
  mode = 'light-dark',
  ...props
}: ThemeToggleProps) {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mode === 'light-dark') {
    const value = mounted ? resolvedTheme : 'dark';

    return (
      <button
        type="button"
        aria-label="Toggle Theme"
        data-theme-toggle=""
        className={cn(
          'inline-flex size-8 shrink-0 items-center justify-center rounded-md',
          className
        )}
        onClick={() => setTheme(value === 'light' ? 'dark' : 'light')}
      >
        <span className="relative inline-flex size-4">
          <SunIcon
            size={16}
            className={cn(
              'absolute inset-0 transition-opacity duration-150 ease-out',
              value === 'light' ? 'opacity-100' : 'opacity-0'
            )}
          />
          <MoonIcon
            size={16}
            className={cn(
              'absolute inset-0 transition-opacity duration-150 ease-out',
              value === 'dark' ? 'opacity-100' : 'opacity-0'
            )}
          />
        </span>
      </button>
    );
  }

  const value = mounted ? (theme ?? 'dark') : 'dark';

  return (
    <div
      data-theme-toggle=""
      className={cn(
        'inline-flex h-8 shrink-0 items-center gap-0.5 rounded-md p-0.5',
        className
      )}
      {...props}
    >
      {modes.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          aria-label={label}
          aria-pressed={value === id}
          className={cn(
            'inline-flex size-7 items-center justify-center rounded-md transition-colors duration-150 ease-out',
            value === id
              ? 'bg-fd-accent text-fd-accent-foreground'
              : 'text-fd-muted-foreground hover:text-fd-foreground'
          )}
          onClick={() => setTheme(id)}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  );
}
