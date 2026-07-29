'use client';

import { ShikiMagicMove } from '@shikijs/magic-move/react';

import { highlighter, magicMoveOptions } from '@/components/landing/shiki';
import { useCodeTheme } from '@/components/landing/use-code-theme';

import '@shikijs/magic-move/style.css';

type MagicCodeProps = {
  code: string;
  lang?: string;
};

export function MagicCode({ code, lang = 'typescript' }: MagicCodeProps) {
  const theme = useCodeTheme();

  // ShikiMagicMove closes over the initial theme in a ref — remount on change.
  if (!theme) {
    return <pre className="shiki-magic-move-container min-h-40" aria-hidden />;
  }

  return (
    <ShikiMagicMove
      key={theme}
      code={code}
      highlighter={highlighter}
      lang={lang}
      theme={theme}
      options={magicMoveOptions}
    />
  );
}
