'use client';

import { MeshGradient } from '@paper-design/shaders-react';
import { useReducedMotion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from 'tailwind-variants';

const themes = {
  dark: {
    colors: ['#05080f', '#0a1628', '#0072f5', '#1e3a8a'] as string[]
  },
  light: {
    colors: ['#f4f8ff', '#dbeafe', '#60a5fa', '#0072f5'] as string[]
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
        distortion={0.65}
        swirl={0.18}
        grainMixer={0.35}
        grainOverlay={0.45}
        speed={reducedMotion ? 0 : 0.28}
      />
    </div>
  );
}
