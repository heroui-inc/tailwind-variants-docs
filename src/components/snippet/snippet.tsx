'use client';

import type { FC, HTMLAttributes } from 'react';

import { useState } from 'react';
import { cn } from 'tailwind-variants';

import { CheckIcon, CopyIcon } from '@/components/icons';
import { Tooltip } from '@/components/tooltip';

export type SnippetProps = HTMLAttributes<HTMLDivElement>;

const Snippet: FC<SnippetProps> = ({ className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('npm install tailwind-variants');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 4000);
  };

  return (
    <div
      className={cn(
        'flex h-11 w-full items-center justify-between gap-3 rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-4 py-2 font-mono text-xs text-zinc-900 backdrop-blur-sm md:text-code dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-100',
        className
      )}
    >
      <div className="min-w-0 truncate">
        <span className="text-zinc-400 dark:text-zinc-500">$ </span>
        <span>npm install tailwind-variants</span>
      </div>
      <Tooltip content="Copy to clipboard" delay={600} onClick={handleCopyCode}>
        <span className="inline-flex size-4.5 shrink-0 items-center justify-center">
          {copied ? (
            <CheckIcon className="text-success" size={18} />
          ) : (
            <CopyIcon className="text-zinc-500 dark:text-zinc-400" size={18} />
          )}
        </span>
      </Tooltip>
    </div>
  );
};

export default Snippet;
