export const buttonCompoundMulti = `const button = tv({
  base: 'font-semibold text-white text-md py-1.5 px-4 rounded-full active:opacity-80',
  variants: {
    color: {
      primary: 'bg-blue-500 hover:bg-blue-700',
      secondary: 'bg-purple-500 hover:bg-purple-700',
      success: 'bg-green-500 hover:bg-green-700'
    },
    disabled: {
      true: 'opacity-50 bg-gray-500 pointer-events-none'
    }
  },
  compoundVariants: [
    {
      color: 'success',
      disabled: true,
      class: 'bg-green-100 text-green-700 dark:text-green-800'
    },
    {
      color: ['primary', 'secondary'],
      disabled: true,
      class: 'text-slate-400 bg-slate-200 opacity-100 dark:bg-slate-800'
    }
  ]
});

button({ color: 'primary', disabled: true });
/**
 * Result:
 * font-semibold text-md py-1.5 px-4 rounded-full active:opacity-80 hover:bg-blue-700
 * pointer-events-none text-slate-400 bg-slate-200 dark:bg-slate-800 opacity-100
 */

button({ color: 'secondary', disabled: true });
/**
 * Result:
 * font-semibold text-md py-1.5 px-4 rounded-full active:opacity-80 hover:bg-purple-700
 * pointer-events-none text-slate-400 bg-slate-200 dark:bg-slate-800 opacity-100
 */`;

export default buttonCompoundMulti;
