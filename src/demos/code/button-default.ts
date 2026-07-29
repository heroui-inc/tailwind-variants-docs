export const buttonDefault = `const button = tv({
  base: 'font-semibold text-white py-1 px-3 rounded-full active:opacity-80',
  variants: {
    color: {
      primary: 'bg-blue-500 hover:bg-blue-700',
      secondary: 'bg-purple-500 hover:bg-purple-700',
      success: 'bg-green-500 hover:bg-green-700'
    },
    size: {
      sm: 'py-1 px-3 text-sm',
      md: 'py-1.5 px-4 text-md',
      lg: 'py-2 px-6 text-lg'
    }
  },
  defaultVariants: {
    color: 'primary',
    size: 'md'
  }
});

button();
/**
 * Result:
 *
 * font-semibold text-white rounded-full active:opacity-80 bg-blue-500 hover:bg-blue-700
 * py-1.5 px-4 text-md
 */`;

export default buttonDefault;
