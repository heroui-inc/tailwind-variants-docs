import type { SVGProps } from 'react';

import { cn } from '@heroui/theme';

interface LogoProps extends SVGProps<SVGSVGElement> {
  auto?: boolean;
  small?: boolean;
  outlined?: boolean;
  fill?: string;
  className?: string;
  size?: number;
}

const SmallLogoOutlined: React.FC<LogoProps> = ({
  auto,
  size,
  width,
  height,
  className,
  ...props
}) => (
  <svg
    className={cn(
      'block text-foreground sm:data-[auto=true]:hidden',
      className
    )}
    data-auto={auto ? 'true' : undefined}
    fill="none"
    height={height || size || 25}
    viewBox="0 0 126 126"
    width={width || size || 25}
    {...props}
  >
    <path
      d="M33.3529 5H92.6471C108.306 5 121 17.694 121 33.3529V92.6471C121 108.306 108.306 121 92.6471 121H33.3529C17.694 121 5 108.306 5 92.6471V33.3529C5 17.694 17.694 5 33.3529 5Z"
      stroke="currentColor"
      strokeWidth="10"
    />
    <path d="M94.9539 36V89.6887H86.3363V36H94.9539Z" fill="currentColor" />
    <path
      d="M69.0885 36H77.7339V71.3118C77.7339 75.0694 76.795 78.3987 74.9172 81.2998C73.0394 84.1835 70.3993 86.4555 66.9969 88.1158C63.5945 89.7586 59.6064 90.58 55.0327 90.58C50.4776 90.58 46.4988 89.7586 43.0964 88.1158C39.694 86.4555 37.0539 84.1835 35.1761 81.2998C33.2983 78.3987 32.3594 75.0694 32.3594 71.3118V36H40.9769V70.6565C40.9769 73.0857 41.544 75.2441 42.6781 77.1316C43.8308 79.0191 45.4577 80.5046 47.5586 81.5882C49.6595 82.6543 52.1509 83.1873 55.0327 83.1873C57.9331 83.1873 60.4338 82.6543 62.5347 81.5882C64.6542 80.5046 66.2718 79.0191 67.3873 77.1316C68.5214 75.2441 69.0885 73.0857 69.0885 70.6565V36Z"
      fill="currentColor"
    />
  </svg>
);

const HeroUILogo: React.FC<LogoProps> = ({
  auto,
  small,
  outlined,
  ...props
}) => {
  if (outlined) {
    return <SmallLogoOutlined {...props} />;
  }

  if (auto) {
    return (
      <div>
        <SmallLogo auto={auto} {...props} />
        <LargeLogo auto={auto} {...props} />
      </div>
    );
  }

  if (small) {
    return <SmallLogo {...props} />;
  }

  return <LargeLogo auto={auto} {...props} />;
};

export const SmallLogo: React.FC<LogoProps> = ({
  auto,
  size,
  width,
  height,
  className,
  ...props
}) => (
  <svg
    className={cn(
      'block text-foreground sm:data-[auto=true]:hidden',
      className
    )}
    data-auto={auto ? 'true' : undefined}
    fill="none"
    height={height || size || 25}
    viewBox="0 0 126 126"
    width={width || size || 25}
    {...props}
  >
    <path
      d="M92.6471 0H33.3529C14.9326 0 0 14.9326 0 33.3529V92.6471C0 111.067 14.9326 126 33.3529 126H92.6471C111.067 126 126 111.067 126 92.6471V33.3529C126 14.9326 111.067 0 92.6471 0Z"
      fill="currentColor"
    />
    <path
      className="fill-background"
      d="M86.3181 89.4661V36H92.9271V89.4661H86.3181Z"
    />
    <path
      className="fill-background"
      d="M54.0894 90.58C49.9557 90.58 46.3046 89.726 43.1363 88.0181C39.9679 86.3101 37.4803 83.9215 35.6733 80.8521C33.8911 77.758 33 74.1317 33 69.9733V36.0371L39.6833 36V69.4163C39.6833 71.9411 40.1041 74.1441 40.9457 76.0253C41.812 77.8818 42.9506 79.4289 44.3616 80.6665C45.7725 81.9041 47.3195 82.8324 49.0027 83.4512C50.7107 84.0453 52.4062 84.3423 54.0894 84.3423C55.7974 84.3423 57.5053 84.0329 59.2133 83.4141C60.9212 82.7952 62.4682 81.8794 63.8544 80.6665C65.2653 79.4289 66.3916 77.8694 67.2332 75.9882C68.0748 74.107 68.4956 71.9164 68.4956 69.4163V36H75.1788V69.9733C75.1788 74.107 74.2754 77.7209 72.4684 80.815C70.6862 83.9091 68.2109 86.3101 65.0425 88.0181C61.8742 89.726 58.2231 90.58 54.0894 90.58Z"
    />
  </svg>
);

export const LargeLogo: React.FC<LogoProps> = ({
  auto,
  className,
  ...props
}) => (
  <svg
    className={cn(
      'block text-foreground data-[auto=true]:hidden sm:data-[auto=true]:block',
      className
    )}
    data-auto={auto ? 'true' : undefined}
    fill="none"
    viewBox="0 0 384 96"
    {...props}
  >
    <path
      d="M374.28 93.12V0.959961H383.688V93.12H374.28Z"
      fill="currentColor"
    />
    <path
      d="M319.093 95.04C312.053 95.04 305.824 93.5893 300.405 90.688C295.029 87.7866 290.805 83.6906 287.733 78.4C284.661 73.1093 283.125 66.9226 283.125 59.84V1.02396L292.597 0.959961V58.624C292.597 63.4026 293.408 67.5413 295.029 71.04C296.65 74.496 298.762 77.3546 301.365 79.616C304.01 81.8346 306.89 83.4773 310.005 84.544C313.12 85.6106 316.149 86.144 319.093 86.144C322.08 86.144 325.13 85.6106 328.245 84.544C331.36 83.4773 334.218 81.8346 336.821 79.616C339.424 77.3546 341.536 74.496 343.157 71.04C344.778 67.5413 345.589 63.4026 345.589 58.624V0.959961H355.061V59.84C355.061 66.9226 353.525 73.1093 350.453 78.4C347.381 83.648 343.136 87.744 337.717 90.688C332.341 93.5893 326.133 95.04 319.093 95.04Z"
      fill="currentColor"
    />
    <path
      d="M236.239 95.04C229.37 95.04 223.503 93.4827 218.639 90.368C213.775 87.2534 210.042 82.944 207.439 77.44C204.836 71.936 203.535 65.6214 203.535 58.496C203.535 51.2427 204.858 44.8854 207.503 39.424C210.148 33.9627 213.903 29.7173 218.767 26.688C223.674 23.616 229.498 22.08 236.239 22.08C243.151 22.08 249.039 23.6373 253.903 26.752C258.81 29.824 262.543 34.112 265.103 39.616C267.706 45.0774 269.007 51.3707 269.007 58.496C269.007 65.7494 267.706 72.128 265.103 77.632C262.5 83.0934 258.746 87.36 253.839 90.432C248.932 93.504 243.066 95.04 236.239 95.04ZM236.239 86.016C243.919 86.016 249.636 83.4773 253.391 78.4C257.146 73.28 259.023 66.6454 259.023 58.496C259.023 50.1333 257.124 43.4773 253.327 38.528C249.572 33.5787 243.876 31.104 236.239 31.104C231.076 31.104 226.81 32.2773 223.439 34.624C220.111 36.928 217.615 40.1494 215.951 44.288C214.33 48.384 213.519 53.12 213.519 58.496C213.519 66.816 215.439 73.4933 219.279 78.528C223.119 83.52 228.772 86.016 236.239 86.016Z"
      fill="currentColor"
    />
    <path
      d="M162.5 93.12V24H170.948V40.64L169.284 38.464C170.052 36.416 171.055 34.5387 172.292 32.832C173.529 31.0827 174.873 29.6533 176.324 28.544C178.116 26.9653 180.207 25.7707 182.596 24.96C184.985 24.1067 187.396 23.616 189.828 23.488C192.26 23.3173 194.479 23.488 196.484 24V32.832C193.967 32.192 191.215 32.0427 188.228 32.384C185.241 32.7253 182.489 33.92 179.972 35.968C177.668 37.76 175.94 39.9147 174.788 42.432C173.636 44.9067 172.868 47.552 172.484 50.368C172.1 53.1413 171.908 55.8933 171.908 58.624V93.12H162.5Z"
      fill="currentColor"
    />
    <path
      d="M116.873 95.04C110.132 95.04 104.286 93.5467 99.337 90.56C94.4304 87.5734 90.6117 83.3707 87.881 77.952C85.1504 72.5334 83.785 66.176 83.785 58.88C83.785 51.328 85.129 44.8 87.817 39.296C90.505 33.792 94.281 29.5467 99.145 26.56C104.052 23.5733 109.833 22.08 116.489 22.08C123.316 22.08 129.14 23.6587 133.961 26.816C138.782 29.9307 142.43 34.4107 144.905 40.256C147.38 46.1014 148.51 53.0773 148.297 61.184H138.697V57.856C138.526 48.896 136.585 42.1333 132.873 37.568C129.204 33.0027 123.828 30.72 116.745 30.72C109.321 30.72 103.625 33.1307 99.657 37.952C95.7317 42.7734 93.769 49.6427 93.769 58.56C93.769 67.264 95.7317 74.0267 99.657 78.848C103.625 83.6267 109.236 86.016 116.489 86.016C121.438 86.016 125.748 84.8853 129.417 82.624C133.129 80.32 136.052 77.0134 138.185 72.704L146.953 76.096C144.222 82.112 140.19 86.784 134.857 90.112C129.566 93.3974 123.572 95.04 116.873 95.04ZM99 61.184V53.312H143.241V61.184H99Z"
      fill="currentColor"
    />
    <path
      d="M0 93.12V0.959961H9.408V42.496H60.352V0.959961H69.696V93.12H60.352V51.52H9.408V93.12H0Z"
      fill="currentColor"
    />
  </svg>
);

export default HeroUILogo;
