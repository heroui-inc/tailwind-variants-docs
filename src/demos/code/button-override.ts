export const buttonOverride = `import { tv } from 'tailwind-variants';

const button = tv({
  base: 'font-semibold text-white py-1 px-3 rounded-full active:opacity-80',
  variants: {
    color: {
      primary: 'bg-blue-500 hover:bg-blue-700',
      secondary: 'bg-purple-500 hover:bg-purple-700',
      success: 'bg-green-500 hover:bg-green-700',
      error: 'bg-red-500 hover:bg-red-700'
    }
  }
});

button({
  color: 'secondary',
  class: 'bg-pink-500 hover:bg-pink-500' // overrides the color variant
});

/**
 * Result:
 * font-semibold text-white py-1 px-3 rounded-full active:opacity-80 bg-pink-500 hover:bg-pink-500
 */`;

export default buttonOverride;
