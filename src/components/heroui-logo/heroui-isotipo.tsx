import type { SVGProps } from 'react';

import { cn } from 'tailwind-variants';

export const HeroUIIsotipo = ({
  className,
  height = 22,
  ...props
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      className={cn('text-foreground', className)}
      fill="none"
      focusable={false}
      height={height}
      viewBox="0 0 100 100"
      {...props}
    >
      <path
        d="M21 29.9509V53.8537C21 54.9834 21.5838 56.0333 22.5442 56.6308L38.9262 66.8216C41.1092 68.1797 43.9368 66.6125 43.9368 64.0445V43.9523C43.9368 42.7964 44.5477 41.7262 45.5439 41.1371L55.5368 35.2276V86.7227C55.5368 89.2821 58.3474 90.8507 60.5311 89.51L77.4394 79.1287C78.4092 78.5333 79 77.4781 79 76.3415V26.8915C79 24.3446 76.214 22.7742 74.0296 24.0897L55.5368 35.2276V13.2771C55.5368 10.7371 52.7643 9.16567 50.5797 10.4674L22.5977 27.1412C21.6069 27.7316 21 28.7988 21 29.9509Z"
        fill="currentColor"
      />
    </svg>
  );
};
