export const composeExtend = `import { tv } from 'tailwind-variants';

const baseButton = tv({
  base: [
    'font-semibold',
    'dark:text-white',
    'py-1',
    'px-3',
    'rounded-full',
    'active:opacity-80',
    'bg-zinc-100',
    'hover:bg-zinc-200',
    'dark:bg-zinc-800',
    'dark:hover:bg-zinc-800'
  ]
});

const buyButton = tv({
  extend: baseButton,
  base: [
    'text-sm',
    'text-white',
    'rounded-lg',
    'shadow-lg',
    'uppercase',
    'tracking-wider',
    'bg-blue-500',
    'hover:bg-blue-600',
    'shadow-blue-500/50',
    'dark:bg-blue-500',
    'dark:hover:bg-blue-600'
  ]
});

return (
  <div className="flex gap-3">
    <button className={baseButton()}>Button</button>
    <button className={buyButton()}>Buy button</button>
  </div>
);

/**
 * buyButton();
 *
 * Result:
 * font-semibold dark:text-white py-1 px-3 active:opacity-80 text-sm text-white rounded-lg
 * shadow-lg shadow-blue-500/50 uppercase tracking-wider bg-blue-500 hover:bg-blue-600
 * dark:bg-blue-500 dark:hover:bg-blue-600
 */`;

export default composeExtend;
