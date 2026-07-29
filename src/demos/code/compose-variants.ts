export const composeVariants = `const baseButton = tv({
  base: 'font-semibold text-white rounded-full active:opacity-80',
  variants: {
    color: {
      primary: 'bg-blue-500 hover:bg-blue-700',
      secondary: 'bg-purple-500 hover:bg-purple-700',
      success: 'bg-green-500 hover:bg-green-700'
    },
    size: {
      small: 'py-0 px-2 text-xs',
      medium: 'py-1 px-3 text-sm',
      large: 'py-1.5 px-3 text-md'
    }
  }
});

const myButton = tv({
  extend: baseButton,
  variants: {
    isSquared: {
      true: 'rounded-sm'
    }
  }
});

myButton({ color: 'success', size: 'medium', isSquared: true });

/**
 * Result:
 * font-semibold text-white active:opacity-80 rounded-sm bg-purple-500 hover:bg-purple-700 py-1 px-3 text-sm
 */`;

export default composeVariants;
