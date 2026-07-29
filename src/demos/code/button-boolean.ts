export const buttonBoolean = `const button = tv({
  base: 'font-semibold text-white text-sm py-1 px-4 rounded-full active:opacity-80',
  variants: {
    color: {
      primary: 'bg-blue-500 hover:bg-blue-700',
      secondary: 'bg-purple-500 hover:bg-purple-700',
      success: 'bg-green-500 hover:bg-green-700'
    },
    disabled: {
      true: 'opacity-50 bg-gray-500 pointer-events-none'
    }
  }
});

button({ color: 'secondary', disabled: true });
/**
 * Result:
 * font-semibold text-white text-sm py-1 px-4 rounded-full active:opacity-80
 * hover:bg-purple-700 bg-gray-500 opacity-50 cursor-not-allowed pointer-events-none
 */`;

export default buttonBoolean;
