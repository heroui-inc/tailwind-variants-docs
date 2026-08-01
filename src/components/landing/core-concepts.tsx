'use client';

import type { KeyboardEvent } from 'react';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { cn } from 'tailwind-variants';

import { ArrowRightIcon } from '@/components/icons';
import { CodeWindow } from '@/components/landing/code-window';
import { MagicCode } from '@/components/landing/magic-code';
import { LandingSection, SectionIntro } from '@/components/landing/section';
import { easeOut, focusRing, interactive } from '@/components/landing/styles';

const concepts = [
  {
    id: 'variants',
    name: 'Variants',
    blurb: 'Variant, size, and state as a first-class API.',
    description:
      'Map variants like color and size once, then reuse them on every instance.',
    docsHref: '/docs/variants',
    fileName: 'button.styles.ts',
    usage: `import { tv } from 'tailwind-variants';

export const button = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full font-medium select-none',
  variants: {
    variant: {
      primary: 'bg-zinc-900 text-white',
      secondary: 'bg-zinc-100 text-zinc-900',
      tertiary: 'text-zinc-600',
    },
    size: {
      sm: 'text-sm px-3 py-1',
      md: 'text-base px-4 py-2',
    },
  },
});

button({ variant: 'primary', size: 'sm' });`
  },
  {
    id: 'slots',
    name: 'Slots',
    blurb: 'Multi-part UI without losing structure.',
    description:
      'Split a component into named parts that still share the same variant API.',
    docsHref: '/docs/slots',
    fileName: 'button.styles.ts',
    usage: `import { tv } from 'tailwind-variants';

export const button = tv({
  slots: {
    base: 'inline-flex cursor-pointer items-center gap-2 rounded-full select-none',
    icon: 'size-4 shrink-0',
    label: 'truncate font-medium',
  },
  variants: {
    size: {
      sm: { base: 'px-3 py-1 text-sm', icon: 'size-3.5' },
      md: { base: 'px-4 py-2 text-base', icon: 'size-4' },
    },
  },
});

const { base, icon, label } = button({ size: 'md' });`
  },
  {
    id: 'compound',
    name: 'Compound',
    blurb: 'Styles for specific combinations.',
    description:
      'Express combination rules declaratively when a single axis is not enough.',
    docsHref: '/docs/compound-variants',
    fileName: 'button.styles.ts',
    usage: `import { tv } from 'tailwind-variants';

export const button = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full font-medium select-none',
  variants: {
    variant: {
      primary: 'text-white',
      secondary: 'text-zinc-900',
      tertiary: 'text-zinc-600',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      size: 'sm',
      class: 'uppercase tracking-wide',
    },
  ],
});`
  },
  {
    id: 'defaults',
    name: 'Defaults',
    blurb: 'Sensible defaults for every call site.',
    description:
      'Define the common case once, then override only what needs to change.',
    docsHref: '/docs/default-variants',
    fileName: 'button.styles.ts',
    usage: `import { tv } from 'tailwind-variants';

export const button = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full font-medium select-none',
  variants: {
    variant: {
      primary: 'bg-zinc-900 text-white',
      secondary: 'bg-zinc-100 text-zinc-900',
      tertiary: 'text-zinc-600',
    },
    size: {
      sm: 'text-sm px-3 py-1',
      md: 'text-base px-4 py-2',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

button(); // primary + md
button({ size: 'sm' }); // primary + sm`
  },
  {
    id: 'typescript',
    name: 'Types',
    blurb: 'Types that follow your variant map.',
    description:
      'Props and slots stay in sync with the recipe as the API grows.',
    docsHref: '/docs/typescript',
    fileName: 'button.styles.ts',
    usage: `import { tv, type VariantProps } from 'tailwind-variants';

export const button = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full font-medium select-none',
  variants: {
    variant: {
      primary: 'bg-zinc-900 text-white',
      secondary: 'bg-zinc-100 text-zinc-900',
      tertiary: 'text-zinc-600',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export type ButtonVariants = VariantProps<typeof button>;`
  },
  {
    id: 'override',
    name: 'Overrides',
    blurb: 'Local tweaks at the call site.',
    description: 'Adjust a single instance without forking the shared recipe.',
    docsHref: '/docs/overrides',
    fileName: 'button.styles.ts',
    usage: `import { tv } from 'tailwind-variants';

export const button = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full bg-zinc-900 px-3 py-1 font-medium text-white select-none',
});

button({ class: 'bg-pink-500' });
// merges with base — pink wins when conflict resolution is on`
  },
  {
    id: 'compose',
    name: 'Compose',
    blurb: 'Extend shared recipes into new ones.',
    description:
      'Inherit base styles and variants, then override only what changes.',
    docsHref: '/docs/extending',
    fileName: 'button.styles.ts',
    usage: `import { tv } from 'tailwind-variants';

const baseButton = tv({
  base: 'inline-flex cursor-pointer items-center justify-center rounded-full font-medium select-none active:opacity-80',
});

export const button = tv({
  extend: baseButton,
  variants: {
    variant: {
      primary: 'bg-zinc-900 text-white',
      secondary: 'bg-zinc-100 text-zinc-900',
      tertiary: 'text-zinc-600',
    },
  },
});`
  },
  {
    id: 'conflict',
    name: 'Merge',
    blurb: 'Predictable class resolution.',
    description:
      'Conflicting utilities resolve by intent — the last declaration wins.',
    docsHref: '/docs/class-resolution',
    fileName: 'button.styles.ts',
    usage: `import { tv, cn } from 'tailwind-variants';

cn('px-2 py-1', 'px-4');
// => "py-1 px-4"

export const button = tv({
  base: 'px-2',
  variants: {
    size: {
      lg: 'px-4',
    },
  },
});

button({ size: 'lg' });
// => "px-4"`
  },
  {
    id: 'createTV',
    name: 'Config',
    blurb: 'One factory for design system defaults.',
    description:
      'Share merge rules and custom class groups across every component recipe.',
    docsHref: '/docs/configuration',
    fileName: 'tv.ts',
    usage: `import { createTV } from 'tailwind-variants';

export const tv = createTV({
  twMerge: true,
  twMergeConfig: {
    extend: {
      classGroups: {
        'font-size': ['text-small', 'text-medium'],
      },
    },
  },
});

// import { tv } from './tv' in every recipe`
  }
] as const;

type ConceptId = (typeof concepts)[number]['id'];

export const CoreConcepts = () => {
  const [activeId, setActiveId] = useState<ConceptId>(concepts[0].id);
  const listRef = useRef<HTMLDivElement>(null);

  const active =
    concepts.find((concept) => concept.id === activeId) ?? concepts[0];

  const moveSelection = (direction: 1 | -1) => {
    const currentIndex = concepts.findIndex(
      (concept) => concept.id === activeId
    );
    const nextIndex =
      (currentIndex + direction + concepts.length) % concepts.length;
    const next = concepts[nextIndex];

    if (next) {
      setActiveId(next.id);
      listRef.current
        ?.querySelector<HTMLElement>(`[data-concept-id="${next.id}"]`)
        ?.focus();
    }
  };

  const handleListKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveSelection(1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveSelection(-1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      const first = concepts[0];
      if (first) {
        setActiveId(first.id);
        listRef.current
          ?.querySelector<HTMLElement>(`[data-concept-id="${first.id}"]`)
          ?.focus();
      }
    } else if (event.key === 'End') {
      event.preventDefault();
      const last = concepts[concepts.length - 1];
      if (last) {
        setActiveId(last.id);
        listRef.current
          ?.querySelector<HTMLElement>(`[data-concept-id="${last.id}"]`)
          ?.focus();
      }
    }
  };

  return (
    <LandingSection className="grid gap-8 py-10 md:py-14">
      <SectionIntro
        eyebrow="Core Concepts"
        title={
          <>
            Minimal by default.
            <br />
            Powerful when you need it.
          </>
        }
        description="Building blocks for a typed API that scales with your design system."
      />

      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8">
        <div
          ref={listRef}
          role="listbox"
          aria-label="Core concepts"
          aria-activedescendant={`concept-option-${active.id}`}
          tabIndex={0}
          onKeyDown={handleListKeyDown}
          className="divide-separator flex flex-col divide-y outline-none"
        >
          {concepts.map((concept) => {
            const isActive = concept.id === active.id;

            return (
              <button
                key={concept.id}
                type="button"
                id={`concept-option-${concept.id}`}
                role="option"
                aria-selected={isActive}
                data-concept-id={concept.id}
                tabIndex={-1}
                onClick={() => setActiveId(concept.id)}
                className={cn(
                  'w-full px-3 py-3 text-start sm:px-3.5 sm:py-3.5',
                  'transition-[color,background-color]',
                  easeOut,
                  focusRing,
                  interactive,
                  isActive
                    ? 'bg-default font-medium text-foreground'
                    : 'text-muted hover:bg-default/50 hover:text-foreground'
                )}
              >
                <span
                  className={cn(
                    'mb-0.5 block text-sm tracking-tight',
                    isActive ? 'font-semibold text-foreground' : 'font-medium'
                  )}
                >
                  {concept.name}
                </span>
                <span className="block text-xs/relaxed text-muted">
                  {concept.blurb}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex min-h-112 flex-col gap-5 md:min-h-128">
          <div>
            <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
              {active.name}
            </h3>
            <p className="mt-2 text-pretty text-sm/relaxed text-muted">
              {active.description}
            </p>
            <Link
              href={active.docsHref}
              className={cn(
                'mt-4 inline-flex min-h-9 items-center gap-1.5 text-sm font-medium text-foreground',
                'underline-offset-4 transition-[opacity,text-decoration-color] hover:underline',
                easeOut,
                focusRing,
                interactive
              )}
            >
              View {active.name} docs
              <ArrowRightIcon size={14} className="size-3.5" aria-hidden />
            </Link>
          </div>

          <CodeWindow
            filename={active.fileName}
            code={active.usage}
            className="flex min-h-0 flex-1 flex-col justify-start"
          >
            <MagicCode code={active.usage} />
          </CodeWindow>
        </div>
      </div>
    </LandingSection>
  );
};
