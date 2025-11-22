import type { FC } from 'react';

import { tvs, LinkIcon, Snippet, Logo } from '@components';

import AnimatedWave from './animated-wave';
import GradientBG from './gradient-bg';

interface HeroProps {}

const Hero: FC<HeroProps> = () => {
  return (
    <section
      className={tvs.box({
        class: 'relative mt-32 gap-6 overflow-visible lg:mt-36 xl:mt-40'
      })}
    >
      <AnimatedWave className="absolute -z-10 h-[100%] w-[100%] -translate-y-32 md:h-[500px] md:w-[500px] md:-translate-y-44" />
      <GradientBG className="absolute -z-10 aspect-[605/509] w-full -translate-y-[40%] animate-[appear_1s_ease]" />
      <div className={tvs.box({ class: 'relative z-10 w-full' })}>
        <Logo height={120} />
        <h1 className="mt-4 text-center text-4xl font-extrabold text-black dark:text-white md:text-5xl">
          Tailwind Variants
        </h1>
        <p className="mt-2 text-center text-lg font-medium">
          The power of Tailwind combined with a first-class variant API.
        </p>
        <p className="mt-1 text-center text-sm text-gray-600 dark:text-gray-400">
          Created by{' '}
          <a
            className="font-semibold text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            href="https://v3.heroui.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            HeroUI Team
          </a>
        </p>
      </div>
      <div className={tvs.box({ row: true, class: 'z-10 gap-2' })}>
        <a className={tvs.button()} href="/docs/introduction">
          Documentation
        </a>
        <a
          className={tvs.button({
            flat: true,
            color: 'neutral'
          })}
          href="https://github.com/heroui-inc/tailwind-variants"
          rel="noopener noreferrer"
          target="_blank"
          title="github homepage"
        >
          <span className={tvs.box({ row: true })}>
            Github
            <LinkIcon className="ml-1" />
          </span>
        </a>
      </div>
      <Snippet className="z-10" />
    </section>
  );
};

export default Hero;
