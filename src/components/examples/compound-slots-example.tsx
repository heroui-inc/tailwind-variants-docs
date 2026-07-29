import type { FC } from 'react';

import { tv } from 'tailwind-variants';

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';

interface CompoundSlotsExampleProps {
  className?: string;
}

const pagination = tv({
  slots: {
    base: 'relative flex max-w-fit flex-wrap gap-1',
    item: 'data-[active="true"]:bg-blue-500 data-[active="true"]:text-white',
    prev: '',
    next: ''
  },
  variants: {
    size: {
      xs: {},
      sm: {},
      md: {}
    }
  },
  defaultVariants: {
    size: 'md'
  },
  compoundSlots: [
    {
      slots: ['item', 'prev', 'next'],
      class: [
        'flex',
        'flex-wrap',
        'truncate',
        'box-border',
        'outline-hidden',
        'items-center',
        'justify-center',
        'bg-neutral-200',
        'rounded-lg',
        'hover:bg-neutral-300',
        'active:bg-neutral-400',
        'text-neutral-800'
      ]
    },
    {
      slots: ['item', 'prev', 'next'],
      size: 'xs',
      class: 'text-xs size-7'
    },
    {
      slots: ['item', 'prev', 'next'],
      size: 'sm',
      class: 'text-sm size-8'
    },
    {
      slots: ['item', 'prev', 'next'],
      size: 'md',
      class: 'text-base size-9'
    }
  ]
});

const CompoundSlotsExample: FC<CompoundSlotsExampleProps> = () => {
  const { base, item, prev, next } = pagination();

  return (
    <ul aria-label="pagination navigation" className={base()}>
      <li>
        <button
          type="button"
          aria-label="Go to previous page"
          className={prev()}
          data-disabled="true"
        >
          <ChevronLeftIcon size={16} className="size-4" />
        </button>
      </li>
      <li>
        <button type="button" aria-label="page 1" className={item()}>
          1
        </button>
      </li>
      <li>
        <button type="button" aria-label="page 2" className={item()}>
          2
        </button>
      </li>
      <li>
        <button
          type="button"
          aria-label="page 3"
          className={item()}
          data-active="true"
        >
          3
        </button>
      </li>
      <li>
        <button type="button" aria-label="page 4" className={item()}>
          4
        </button>
      </li>
      <li>
        <button type="button" aria-label="page 5" className={item()}>
          5
        </button>
      </li>
      <li aria-hidden="true" className={item()}>
        ...
      </li>
      <li>
        <button type="button" aria-label="page 10" className={item()}>
          10
        </button>
      </li>
      <li>
        <button type="button" aria-label="Go to next page" className={next()}>
          <ChevronRightIcon size={16} className="size-4" />
        </button>
      </li>
    </ul>
  );
};

export default CompoundSlotsExample;
