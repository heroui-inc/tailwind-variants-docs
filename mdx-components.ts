import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs';

const docsComponents = getDocsMDXComponents();

export const useMDXComponents = <T extends Record<string, unknown>>(
  components: T = {} as T
) => {
  return {
    ...docsComponents,
    ...components
  };
};
