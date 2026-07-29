'use client';

import { Label, ListBox, Select } from '@heroui/react';
import { useMemo, useState } from 'react';
import { tv } from 'tailwind-variants';

import { DemoPreview } from '@/components/demo-preview';

const button = tv({
  base: 'inline-flex items-center justify-center rounded-full font-medium transition-transform duration-150 ease-out active:scale-97',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary:
        'bg-zinc-800 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200',
      success: 'bg-emerald-500 text-white hover:bg-emerald-600'
    },
    size: {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-1.5 text-sm',
      lg: 'px-5 py-2.5 text-base'
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
});

const colors = [
  { id: 'primary', label: 'primary' },
  { id: 'secondary', label: 'secondary' },
  { id: 'success', label: 'success' }
] as const;

const sizes = [
  { id: 'sm', label: 'sm' },
  { id: 'md', label: 'md' },
  { id: 'lg', label: 'lg' }
] as const;

type Color = (typeof colors)[number]['id'];
type Size = (typeof sizes)[number]['id'];

function buildCode(color: Color, size: Size) {
  return `import { tv } from 'tailwind-variants'

const button = tv({
  base: 'rounded-full font-medium',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-zinc-800 text-white',
      success: 'bg-emerald-500 text-white'
    },
    size: {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-1.5 text-sm',
      lg: 'px-5 py-2.5 text-base'
    }
  }
})

button({ color: '${color}', size: '${size}' })`;
}

export function LandingDemo() {
  const [color, setColor] = useState<Color>('primary');
  const [size, setSize] = useState<Size>('md');
  const className = useMemo(() => button({ color, size }), [color, size]);
  const code = useMemo(() => buildCode(color, size), [color, size]);

  return (
    <DemoPreview
      className="landing-hero-demo my-0"
      code={code}
      lang="tsx"
      meta={
        <span>
          <span className="text-zinc-500 dark:text-zinc-500">result → </span>
          <span className="text-zinc-700 dark:text-zinc-300">{className}</span>
        </span>
      }
      controls={
        <>
          <Select
            className="w-37"
            selectedKey={color}
            onSelectionChange={(key) => {
              if (key != null) setColor(String(key) as Color);
            }}
          >
            <Label>color</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {colors.map((item) => (
                  <ListBox.Item
                    key={item.id}
                    id={item.id}
                    textValue={item.label}
                  >
                    {item.label}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <Select
            className="w-32"
            selectedKey={size}
            onSelectionChange={(key) => {
              if (key != null) setSize(String(key) as Size);
            }}
          >
            <Label>size</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {sizes.map((item) => (
                  <ListBox.Item
                    key={item.id}
                    id={item.id}
                    textValue={item.label}
                  >
                    {item.label}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </>
      }
    >
      <button type="button" className={className}>
        Button
      </button>
    </DemoPreview>
  );
}
