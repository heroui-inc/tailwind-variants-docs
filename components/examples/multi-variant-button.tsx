'use client';

import type { ReactNode } from 'react';

import { TVComponent } from '@components';

interface MultiVariantButtonProps {
  color?: 'primary' | 'secondary' | 'success';
  size?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

const MultiVariantButton = ({
  children,
  color,
  size
}: MultiVariantButtonProps) => {
  return (
    <TVComponent
      as="button"
      color={color}
      size={size}
      tv={{
        base: 'font-semibold text-white py-1 px-3 rounded-full active:opacity-80',
        variants: {
          color: {
            primary: 'bg-blue-500 hover:bg-blue-700',
            secondary: 'bg-purple-500 hover:bg-purple-700',
            success: 'bg-green-500 hover:bg-green-700'
          },
          size: {
            sm: 'py-1 px-3 text-xs',
            md: 'py-1.5 px-4 text-sm',
            lg: 'py-2 px-6 text-md'
          }
        }
      }}
    >
      {children}
    </TVComponent>
  );
};

export default MultiVariantButton;
