'use client';

import type { ReactNode } from 'react';

import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { cn } from 'tailwind-variants';

import { DemoIframe } from '@/components/demo-iframe';
import { DemoResizer } from '@/components/demo-resizer';
import { codeThemes } from '@/lib/code-themes';

export type DemoPreviewProps = {
  children: ReactNode;
  code: string;
  lang?: string;
  className?: string;
  title?: string;
  description?: string;
  meta?: ReactNode;
  iframe?: boolean;
  resizable?: boolean;
  defaultWidth?: number;
};

function DemoStage({ children }: { children: ReactNode }) {
  return (
    <div
      data-demo-stage
      className={cn(
        'demo-stage relative flex min-h-60 w-full items-center justify-center overflow-hidden px-5 py-10 sm:px-6 sm:py-12',
        'bg-[color-mix(in_oklab,var(--background)_55%,var(--default)_45%)]'
      )}
    >
      <div className="relative z-10 flex w-full min-w-0 items-center justify-center">
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
  title,
  description,
  meta,
  iframe = true,
  resizable = false,
  defaultWidth
}: DemoPreviewProps) {
  const stage = <DemoStage>{children}</DemoStage>;

  const preview = iframe ? (
    <DemoIframe title={title ? `${title} preview` : 'Demo preview'}>
      {stage}
    </DemoIframe>
  ) : (
    stage
  );

  return (
    <div
      className={cn(
        'demo-preview not-prose my-6 overflow-hidden rounded-xl border border-border bg-surface shadow-none',
        resizable && 'demo-preview-resizable',
        className
      )}
    >
      {title || description ? (
        <div className="border-b border-separator px-4 py-3 sm:px-5">
          {title ? (
            <p className="text-sm font-medium tracking-tight text-foreground">
              {title}
            </p>
          ) : null}
          {description ? (
            <p className="mt-0.5 text-pretty text-xs/relaxed text-muted sm:text-code">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="select-none overflow-hidden">
        {resizable ? (
          <DemoResizer defaultWidth={defaultWidth}>{preview}</DemoResizer>
        ) : (
          preview
        )}
      </div>

      {meta ? (
        <div className="mt-3 px-0.5 font-mono break-all text-xs/relaxed text-muted">
          {meta}
        </div>
      ) : null}

      <div className="demo-preview-code border-t border-separator">
        <DynamicCodeBlock
          lang={lang}
          code={code}
          options={{
            themes: codeThemes,
            defaultColor: false
          }}
          codeblock={{
            className:
              'demo-preview-codeblock my-0! rounded-none! border-0! bg-transparent! shadow-none!'
          }}
        />
      </div>
    </div>
  );
}
