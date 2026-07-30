'use client';

import { useState } from 'react';
import { cn } from 'tailwind-variants';

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

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div
      className={cn(
        'border-border/70 flex min-h-11 items-center gap-3 rounded-xl border px-4 py-2.5 font-mono text-xs md:text-code',
        fullWidth ? 'w-full' : 'mt-auto w-fit max-w-full',
        className
      )}
    >
      <span className="min-w-0 flex-1 truncate">
        <span className="text-muted">$ </span>
        <span>{command}</span>
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : `Copy ${command}`}
        className={cn(
          'inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted hover:bg-default hover:text-foreground',
          'transition-colors active:bg-default/80',
          easeOut,
          focusRing,
          interactive
        )}
      >
        {copied ? (
          <CheckIcon size={16} className="text-success size-4" />
        ) : (
          <CopyIcon size={16} className="size-4" />
        )}
      </button>
    </div>
  );
};
