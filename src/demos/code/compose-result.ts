export const composeResult = `const baseButton = tv({
  base: 'font-medium text-sm px-3 py-1 bg-blue-500 text-white rounded-full active:opacity-80'
});

const actionButton = tv({
  base: [baseButton(), 'bg-red-500', 'rounded-xs']
});

actionButton();

/**
 * Result:
 * font-medium text-sm px-3 py-1 text-white active:opacity-80 bg-red-500 rounded-xs
 */`;

export default composeResult;
