'use client';

import { MeshGradient } from '@paper-design/shaders-react';
import { useReducedMotion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from 'tailwind-variants';

/**
 * Neutral mesh: cool ink + a warm graphite accent.
 * Enough value range for depth, without loud chroma.
 */
const themes = {
  dark: {
    colors: [
      '#08080a', // void
      '#12131a', // cool ink
      '#1c1d26', // slate depth
      '#2e2c34', // lifted charcoal
      '#3f3a35' // warm graphite
    ] as string[]
  },
  light: {
    colors: [
      '#faf9f7', // paper
      '#f1efec', // warm mist
      '#e6e4e8', // cool stone
      '#d2cfc9', // soft taupe
      '#a9a49c' // muted bronze
    ] as string[]
  }
} as const;

type HeroGrainProps = {
  className?: string;
};

export function HeroGrain({ className }: HeroGrainProps) {
  const { resolvedTheme } = useTheme();
  const reducedMotion = useReducedMotion();
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
}
