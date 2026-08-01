'use client';

import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from 'fumadocs-ui/components/ui/popover';
import { useCopyButton } from 'fumadocs-ui/utils/use-copy-button';
import { type ReactNode, useMemo } from 'react';
import { cn } from 'tailwind-variants';

import {
  ArrowUpRightFromSquareIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  MagicWandIcon
} from '@/components/icons';
import {
  getAbsoluteUrl,
  getChatGPTAskUrl,
  getClaudeAskUrl,
  getCopyPrompt,
  getCursorMcpInstallUrl,
  getVSCodeMcpInstallUrl
} from '@/lib/ai-actions';
import { focusRing, iconButtonClass, popoverContentClass } from '@/lib/styles';

type PageActionsProps = {
  title: string;
  pageUrl: string;
  markdownUrl: string;
};

const MarkdownGlyph = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M22.27 19.39H1.73A1.73 1.73 0 0 1 0 17.66V6.34a1.73 1.73 0 0 1 1.73-1.73h20.54A1.73 1.73 0 0 1 24 6.34v11.32a1.73 1.73 0 0 1-1.73 1.73M5.3 15.34V8.66H3.54l2.2 2.73 2.2-2.73h-1.76v6.68zm6.54 0V11.1l1.54 2.05h.2l1.54-2.05v4.24h1.76V8.66h-1.76l-1.87 2.45L10.08 8.66H8.32v6.68zm8.32-4.41v-.88h-1.76v.88h-.88v1.76h.88v.88h1.76v-.88h.88v-1.76z" />
    </svg>
  );
};

const CursorGlyph = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M4 3.5 19.5 12 4 20.5V14l8-2-8-2V3.5Z" />
    </svg>
  );
};

const VSCodeGlyph = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M17.1 2.1 9.4 9.1 4.8 5.7 2.5 6.9v10.2l2.3 1.2 4.6-3.4 7.7 7 4.4-1.8V3.9l-4.4-1.8ZM4.8 14.7V9.3l2.7 2.7-2.7 2.7Zm12.3 3.5-6.1-5.4 6.1-5.4v10.8Z" />
    </svg>
  );
};

const OpenAIGlyph = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M22.28 10.2a5.6 5.6 0 0 0-.48-4.3 5.7 5.7 0 0 0-6.15-2.73A5.7 5.7 0 0 0 10.7 1a5.7 5.7 0 0 0-5.4 3.94A5.7 5.7 0 0 0 1.4 9.3a5.7 5.7 0 0 0 .7 6.5 5.6 5.6 0 0 0 .48 4.3 5.7 5.7 0 0 0 6.15 2.73A5.7 5.7 0 0 0 13.3 23a5.7 5.7 0 0 0 5.4-3.94 5.7 5.7 0 0 0 3.9-4.36 5.7 5.7 0 0 0-.32-4.5ZM13.3 21.4a3.8 3.8 0 0 1-2.44-.88l.12-.07 4.05-2.34a.66.66 0 0 0 .33-.57v-5.72l1.71 1v5.46a3.82 3.82 0 0 1-3.77 3.12Zm-8.05-3.44a3.8 3.8 0 0 1-.45-2.56l.12.07 4.05 2.34c.2.12.45.12.66 0l4.94-2.85v1.97l-4.2 2.43a3.82 3.82 0 0 1-5.12-1.4Zm-1.05-8.7a3.8 3.8 0 0 1 2-1.68v4.84c0 .23.12.45.33.57l4.94 2.85-1.71.99-4.2-2.43a3.82 3.82 0 0 1-1.36-5.14Zm14.2 3.3-4.94-2.85 1.71-.99 4.2 2.43a3.82 3.82 0 0 1-5.9 4.34v-4.84c0-.23-.12-.45-.33-.57Zm1.73-2.58-.12-.07-4.05-2.34a.66.66 0 0 0-.66 0L9.36 9.77V7.8l4.2-2.43a3.82 3.82 0 0 1 5.57 3.95ZM8.36 13.1l-1.71-1V6.64a3.82 3.82 0 0 1 6.25-2.94l-.12.07-4.05 2.34a.66.66 0 0 0-.33.57V13.1Zm1.02-1.17 2.2-1.27 2.2 1.27v2.54l-2.2 1.27-2.2-1.27V11.93Z" />
    </svg>
  );
};

const ClaudeGlyph = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12.8 3.1 16.2 12l-2.1.7-1.1-2.9H11l-1.1 2.9-2.1-.7L11.2 3.1h1.6Zm-1.3 5.3h1l-.5 1.4h-.1l-.4-1.4ZM4.4 14.2h15.2v1.8H4.4v-1.8Zm2.2 3.5h10.8v1.8H6.6v-1.8Zm2.1 3.4h6.6V21h-6.6v-1.9Z" />
    </svg>
  );
};

const actionButtonClass = cn(
  buttonVariants({ variant: 'outline', size: 'sm' }),
  'min-h-10 cursor-pointer select-none gap-1.5 border-border bg-background px-3 text-foreground',
  'hover:bg-default hover:text-foreground',
  focusRing
);

export const PageActions = ({
  title,
  pageUrl,
  markdownUrl
}: PageActionsProps) => {
  const absoluteMarkdownUrl = useMemo(
    () => getAbsoluteUrl(markdownUrl),
    [markdownUrl]
  );
  const absolutePageUrl = useMemo(() => getAbsoluteUrl(pageUrl), [pageUrl]);
  const prompt = useMemo(
    () =>
      getCopyPrompt({
        title,
        pageUrl: absolutePageUrl,
        markdownUrl: absoluteMarkdownUrl
      }),
    [title, absolutePageUrl, absoluteMarkdownUrl]
  );

  const [promptCopied, onCopyPrompt] = useCopyButton(async () => {
    await navigator.clipboard.writeText(prompt);
  });

  const [markdownCopied, onCopyMarkdown] = useCopyButton(async () => {
    const response = await fetch(markdownUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch Markdown (${response.status})`);
    }

    const text = await response.text();
    await navigator.clipboard.writeText(text);
  });

  const menuItems: Array<{
    key: string;
    title: string;
    description: string;
    href: string;
    icon: ReactNode;
    external?: boolean;
    trailing?: boolean;
  }> = [
    {
      key: 'markdown',
      title: 'View as Markdown',
      description: 'Open this page as Markdown',
      href: absoluteMarkdownUrl,
      icon: <MarkdownGlyph className="size-4" />,
      external: true
    },
    {
      key: 'cursor',
      title: 'Add to Cursor',
      description: 'Install the docs MCP server',
      href: getCursorMcpInstallUrl(),
      icon: <CursorGlyph className="size-4" />
    },
    {
      key: 'vscode',
      title: 'Add to VS Code',
      description: 'Install the docs MCP server',
      href: getVSCodeMcpInstallUrl(),
      icon: <VSCodeGlyph className="size-4" />
    },
    {
      key: 'chatgpt',
      title: 'Open in ChatGPT',
      description: 'Ask questions about this page',
      href: getChatGPTAskUrl(absoluteMarkdownUrl),
      icon: <OpenAIGlyph className="size-4" />,
      external: true,
      trailing: true
    },
    {
      key: 'claude',
      title: 'Open in Claude',
      description: 'Ask questions about this page',
      href: getClaudeAskUrl(absoluteMarkdownUrl),
      icon: <ClaudeGlyph className="size-4" />,
      external: true,
      trailing: true
    }
  ];

  return (
    <div className="not-prose flex w-full shrink-0 flex-wrap items-center gap-2 select-none sm:w-auto sm:justify-end">
      <div className="inline-flex min-h-10 min-w-0 flex-1 items-stretch overflow-hidden rounded-xl border border-border bg-background sm:flex-initial">
        <button
          type="button"
          onClick={onCopyMarkdown}
          className={cn(
            actionButtonClass,
            'min-w-0 flex-1 rounded-none border-0 bg-default/50 font-medium shadow-none sm:flex-initial'
          )}
          aria-label={
            markdownCopied
              ? 'Markdown copied to clipboard'
              : 'Copy Markdown to clipboard'
          }
        >
          {markdownCopied ? (
            <CheckIcon size={14} className="size-3.5 text-muted" />
          ) : (
            <CopyIcon size={14} className="size-3.5 text-muted" />
          )}
          {markdownCopied ? 'Copied' : 'Copy Markdown'}
        </button>

        <Popover>
          <PopoverTrigger
            aria-label="Open Markdown and AI actions"
            className={cn(
              iconButtonClass(),
              'h-auto min-h-10 w-10 rounded-none border-0 border-l border-border'
            )}
          >
            <ChevronDownIcon size={14} className="size-3.5" />
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className={popoverContentClass('w-72 p-1.5')}
          >
            <div className="flex flex-col gap-0.5">
              <button
                type="button"
                onClick={onCopyPrompt}
                className={cn(
                  'flex w-full cursor-pointer select-none items-start gap-3 rounded-md px-2.5 py-2 text-start',
                  'text-foreground transition-colors hover:bg-default',
                  focusRing
                )}
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-muted">
                  {promptCopied ? (
                    <CheckIcon size={16} className="size-4" />
                  ) : (
                    <MagicWandIcon size={16} className="size-4" />
                  )}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-sm font-medium text-foreground">
                    {promptCopied ? 'Prompt copied' : 'Copy Prompt'}
                  </span>
                  <span className="text-xs text-muted">
                    Prompt for agents about this page
                  </span>
                </span>
              </button>
              {menuItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                  className={cn(
                    'flex cursor-pointer select-none items-start gap-3 rounded-md px-2.5 py-2',
                    'text-foreground transition-colors hover:bg-default',
                    focusRing
                  )}
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-muted">
                    {item.icon}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                      {item.title}
                      {item.trailing ? (
                        <ArrowUpRightFromSquareIcon
                          size={12}
                          className="size-3 text-muted"
                        />
                      ) : null}
                    </span>
                    <span className="text-xs text-muted">
                      {item.description}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
