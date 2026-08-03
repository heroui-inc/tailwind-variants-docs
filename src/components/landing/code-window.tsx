'use client';

import type { ReactNode } from 'react';

import { useState } from 'react';
import { cn } from 'tailwind-variants';

import { ContextualSwapIcon } from '@/components/contextual-swap-icon';
import { CheckIcon, CopyIcon } from '@/components/icons';
import { easeOut, focusRing, interactive } from '@/components/landing/styles';

type CodeWindowProps = {
  filename: string;
  children: ReactNode;
  className?: string;
  /** Raw source for the copy control. Omit to hide the control. */
  code?: string;
};

export const CodeWindow = ({
  filename,
  children,
  className,
  code
}: CodeWindowProps) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const copy = async () => {
    if (!code) {
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
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
        'landing-code-window relative flex flex-col overflow-x-auto overflow-y-visible rounded-2xl border',
        'border-border bg-code-window',
        className
      )}
    >
      <div className="grid shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-separator px-4 py-3">
        <div className="flex gap-1.5 opacity-70" aria-hidden>
          <span className="size-2 rounded-full bg-code-traffic-red" />
          <span className="size-2 rounded-full bg-code-traffic-yellow" />
          <span className="size-2 rounded-full bg-code-traffic-green" />
        </div>
        <span className="font-mono text-xs tracking-tight text-muted">
          {filename}
        </span>
        <div className="flex justify-end">
          {code ? (
            <button
              type="button"
              onClick={copy}
              aria-label={
                error ? 'Copy failed' : copied ? 'Copied' : `Copy ${filename}`
              }
              className={cn(
                'inline-flex size-8 items-center justify-center rounded-md text-muted',
                'hover:bg-default hover:text-foreground',
                'transition-[color,background-color,transform] active:scale-[0.96]',
                'motion-reduce:transition-none motion-reduce:active:scale-100',
                easeOut,
                focusRing,
                interactive
              )}
            >
              <ContextualSwapIcon
                active={copied}
                activeIcon={
                  <CheckIcon size={16} className="text-success size-4" />
                }
                inactiveIcon={<CopyIcon size={16} className="size-4" />}
              />
            </button>
          ) : null}
        </div>
      </div>
      {children}
      {code ? (
        <span className="sr-only" aria-live="polite">
          {error ? 'Couldn’t copy. Select the code and copy manually.' : ''}
          {copied ? 'Copied to clipboard.' : ''}
        </span>
      ) : null}
    </div>
  );
};
