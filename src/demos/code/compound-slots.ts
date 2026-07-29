export const compoundSlots = `const pagination = tv({
  slots: {
    base: 'flex flex-wrap relative gap-1 max-w-fit',
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
        'outline-none',
        'items-center',
        'justify-center',
        'bg-neutral-100',
        'hover:bg-neutral-200',
        'active:bg-neutral-300',
        'text-neutral-500'
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

const App = () => {
  const { base, item, prev, next } = pagination();

  return (
    <ul aria-label="pagination navigation" className={base()}>
      <li
        aria-label="Go to previous page"
        className={prev()}
        data-disabled="true"
        role="button"
      >
        {'<'}
      </li>
      <li aria-label="page 1" className={item()} role="button">
        1
      </li>
      <li aria-label="page 2" className={item()} role="button">
        2
      </li>
      <li
        aria-label="page 3"
        className={item()}
        data-active="true"
        role="button"
      >
        3
      </li>
      <li aria-label="page 4" className={item()} role="button">
        4
      </li>
      <li aria-label="page 5" className={item()} role="button">
        5
      </li>
      <li aria-hidden="true" className={item()} role="button">
        ...
      </li>
      <li aria-label="page 10" className={item()} role="button">
        10
      </li>
      <li aria-label="Go to next page" className={next()} role="button">
        {'>'}
      </li>
    </ul>
  );
};

export default App;
`;

export default compoundSlots;
