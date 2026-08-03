'use client';

import { useState } from 'react';
import { cn } from 'tailwind-variants';

import { ContextualSwapIcon } from '@/components/contextual-swap-icon';
import { CheckIcon, CopyIcon } from '@/components/icons';
import { easeOut, focusRing, interactive } from '@/components/landing/styles';

const command = 'npm install tailwind-variants';

type InstallCommandProps = {
  className?: string;
  fullWidth?: boolean;
};

export const InstallCommand = ({
  className,
  fullWidth = false
}: InstallCommandProps) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setError(false);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setError(true);
      window.setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <div
      className={cn(
        'flex min-h-11 items-center gap-3 rounded-xl border border-border px-4 py-2.5 font-mono text-xs md:text-code',
        fullWidth ? 'w-full' : 'mt-auto w-fit max-w-full',
        className
      )}
    >
      <span className="min-w-0 flex-1 truncate text-foreground">
        <span className="text-muted">$ </span>
        <span>{command}</span>
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={
          error ? 'Copy failed' : copied ? 'Copied' : `Copy ${command}`
        }
        className={cn(
          'inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted hover:bg-default hover:text-foreground',
          'transition-[color,background-color,transform] active:bg-default/80 active:scale-[0.96]',
          'motion-reduce:transition-none motion-reduce:active:scale-100',
          easeOut,
          focusRing,
          interactive
        )}
      >
        <ContextualSwapIcon
          active={copied}
          activeIcon={<CheckIcon size={16} className="text-success size-4" />}
          inactiveIcon={<CopyIcon size={16} className="size-4" />}
        />
      </button>
      <span className="sr-only" aria-live="polite">
        {error ? 'Couldn’t copy. Select the command and copy manually.' : ''}
        {copied ? 'Copied to clipboard.' : ''}
      </span>
    </div>
  );
};
