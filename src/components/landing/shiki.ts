'use client';

import type {
  MagicMoveDifferOptions,
  MagicMoveRenderOptions
} from '@shikijs/magic-move/types';

import { createHighlighterCoreSync } from 'shiki/core';
import typescript from 'shiki/dist/langs/typescript.mjs';
import vesper from 'shiki/dist/themes/vesper.mjs';
import vitesseLight from 'shiki/dist/themes/vitesse-light.mjs';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

export const highlighter = createHighlighterCoreSync({
  engine: createJavaScriptRegexEngine(),
  themes: [vitesseLight, vesper],
  langs: [typescript]
});

export const magicMoveOptions: MagicMoveRenderOptions & MagicMoveDifferOptions =
  {
    containerStyle: false,
    duration: 400,
    lineNumbers: true,
    stagger: 0.3
  };
