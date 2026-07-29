import type { ComponentType, SVGProps } from 'react';

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export function withIconSize(
  Icon: ComponentType<SVGProps<SVGSVGElement>>,
  defaultSize = 16
) {
  function SizedIcon({
    size = defaultSize,
    width,
    height,
    ...props
  }: IconProps) {
    const w = width ?? size;
    const h = height ?? size;

    return <Icon width={w} height={h} aria-hidden {...props} />;
  }

  SizedIcon.displayName = `Sized(${Icon.displayName ?? Icon.name ?? 'Icon'})`;

  return SizedIcon;
}
