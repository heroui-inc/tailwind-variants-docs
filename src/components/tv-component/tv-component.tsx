import type { ElementType, ReactNode } from 'react';

import { tv as createTV } from 'tailwind-variants';

type TVComponentProps = {
  as?: ElementType;
  tv: Parameters<typeof createTV>[0];
  children?: ReactNode;
} & Record<string, unknown>;

export default function TVComponent({
  as: Component = 'div',
  tv: config,
  children,
  ...otherProps
}: TVComponentProps) {
  const styles = createTV(config);

  return (
    <Component className={styles(otherProps as never)}>{children}</Component>
  );
}
