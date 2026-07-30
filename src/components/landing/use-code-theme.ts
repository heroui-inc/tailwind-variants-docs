'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { codeThemeDark, codeThemeLight } from '@/lib/code-themes';

export function useCodeTheme() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return resolvedTheme === 'light' ? codeThemeLight : codeThemeDark;
}
