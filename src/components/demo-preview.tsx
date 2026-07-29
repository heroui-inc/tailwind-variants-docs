'use client';

import type { ReactNode } from 'react';

import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { cn } from 'tailwind-variants';

import { DemoIframe } from '@/components/demo-iframe';

export interface DemoPreviewProps {
  children: ReactNode;
  code: string;
  lang?: string;
  className?: string;
  controls?: ReactNode;
  title?: string;
  description?: string;
  meta?: ReactNode;
  /**
   * Render the stage in an iframe for style isolation.
   * Set to false for WindowResizer demos — Tailwind `sm:`/`md:` media queries
   * must use the parent viewport.
   */
  iframe?: boolean;
}

function DemoStage({ children }: { children: ReactNode }) {
  return (
    <div
      data-demo-stage
      className={cn(
        'demo-stage relative flex min-h-37 w-full items-center justify-center overflow-hidden px-5 py-10 sm:min-h-42 sm:px-6 sm:py-12',
        'bg-zinc-100 dark:bg-zinc-950',
        'has-data-window-resizer:items-stretch has-data-window-resizer:justify-stretch has-data-window-resizer:p-3 sm:has-data-window-resizer:p-4'
      )}
    >
      <div
        className={cn(
          'relative z-10 flex w-full min-w-0 items-center justify-center',
          'has-data-window-resizer:block'
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function DemoPreview({
  children,
  code,
  lang = 'tsx',
  className,
  controls,
  title,
  description,
  meta,
  iframe = true
}: DemoPreviewProps) {
  return (
    <div
      className={cn(
        'demo-preview my-6 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950',
        className
      )}
    >
      {(title || description) && (
        <div className="border-b border-zinc-200 px-4 py-3 sm:px-5 dark:border-zinc-800">
          {title ? (
            <p className="text-sm font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
              {title}
            </p>
          ) : null}
          {description ? (
            <p className="text-fd-muted-foreground mt-0.5 text-pretty text-xs/relaxed sm:text-code">
              {description}
            </p>
          ) : null}
        </div>
      )}

      <div className="flex flex-col gap-3 p-3 sm:p-3.5">
        {controls ? (
          <div className="flex flex-wrap items-end gap-3">{controls}</div>
        ) : null}

        <div className="overflow-hidden rounded-lg border border-zinc-200/80 dark:border-zinc-800">
          {iframe ? (
            <DemoIframe title={title ? `${title} preview` : 'Demo preview'}>
              <DemoStage>{children}</DemoStage>
            </DemoIframe>
          ) : (
            <DemoStage>{children}</DemoStage>
          )}
        </div>

        {meta ? (
          <div className="text-fd-muted-foreground px-0.5 font-mono break-all text-xs/relaxed">
            {meta}
          </div>
        ) : null}
      </div>

      <div className="demo-preview-code border-t border-zinc-200 dark:border-zinc-800">
        <DynamicCodeBlock
          lang={lang}
          code={code}
          codeblock={{
            className:
              'demo-preview-codeblock my-0! rounded-none! border-0! bg-transparent! shadow-none!'
          }}
        />
      </div>
    </div>
  );
}
