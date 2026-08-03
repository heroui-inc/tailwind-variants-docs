'use client';

import { MeshGradient } from '@paper-design/shaders-react';
import { useTheme } from 'next-themes';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { cn } from 'tailwind-variants';

const themes = {
  dark: {
    colors: ['#08080a', '#12131a', '#1c1d26', '#2e2c34', '#3f3a35'] as string[]
  },
  light: {
    colors: ['#faf9f7', '#f1efec', '#e6e4e8', '#d2cfc9', '#a9a49c'] as string[]
  }
} as const;

const subscribeReducedMotion = (onStoreChange: () => void) => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', onStoreChange);
  return () => media.removeEventListener('change', onStoreChange);
};

const getReducedMotionSnapshot = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const getReducedMotionServerSnapshot = () => {
  return false;
};

type HeroGrainProps = {
  className?: string;
};

export const HeroGrain = ({ className }: HeroGrainProps) => {
  const { resolvedTheme } = useTheme();
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mode = mounted && resolvedTheme === 'light' ? 'light' : 'dark';
  const { colors } = themes[mode];

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <MeshGradient
        key={mode}
        className="absolute inset-0"
        colors={[...colors]}
        distortion={0.78}
        swirl={0.32}
        grainMixer={0.22}
        grainOverlay={0.28}
        speed={reducedMotion ? 0 : 0.18}
        scale={1.15}
      />
    </div>
  );
};
