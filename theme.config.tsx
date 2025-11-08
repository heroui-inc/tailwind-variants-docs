import type { DocsThemeConfig } from 'nextra-theme-docs';

import React from 'react';
import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';

import { tvs, Logo } from '@components';

import pkg from './package.json';

const DEFAULT_VERSION = '0.1.14';

const getVersion = () => {
  return (
    pkg?.dependencies?.['tailwind-variants']?.replace('^', '') ??
    DEFAULT_VERSION
  );
};

const config: DocsThemeConfig = {
  darkMode: true,
  nextThemes: {
    defaultTheme: 'dark'
  },
  logo: (
    <div className="flex items-center">
      <Logo height={30} />
      <b className="ml-1.5 hidden text-sm font-semibold sm:block sm:text-base">
        Tailwind Variants
      </b>
      <span className={tvs.badge({ class: 'hidden sm:flex' })}>
        v{getVersion()}
      </span>
    </div>
  ),
  head: function useHead() {
    const config = useConfig();
    const description =
      config.frontMatter.description ||
      'The power of Tailwind combined with a first-class variant API.';
    const image =
      config.frontMatter.image || 'https://tailwind-variants.org/banner.png';

    // || "https://assets.vercel.com/image/upload/v1572282926/swr/twitter-card.jpg";

    return (
      <>
        {/* Favicons, meta */}
        <link
          href="/favicon/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicon/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicon/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/favicon/site.webmanifest" rel="manifest" />
        <link
          color="#000000"
          href="/favicon/safari-pinned-tab.svg"
          rel="mask-icon"
        />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <meta content="en" httpEquiv="Content-Language" />
        <meta content={description} name="description" />
        <meta content={description} name="og:description" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="@hero_ui" name="twitter:site" />
        <meta content={image} name="twitter:image" />
        <meta content={`${config.title} – tailwind-variants`} name="og:title" />
        <meta content={image} name="og:image" />
        <meta content="tailwind-variants" name="apple-mobile-web-app-title" />
      </>
    );
  },
  useNextSeoProps: function SEO() {
    const router = useRouter();
    const { frontMatter } = useConfig();

    const defaultTitle = frontMatter.overrideTitle || 'Tailwind Variants';

    return {
      description: frontMatter.description,
      defaultTitle,
      titleTemplate: router.pathname !== '/' ? `%s – ${defaultTitle}` : ''
    };
  },
  project: {
    link: 'https://github.com/heroui-inc/tailwind-variants'
  },
  chat: {
    link: 'https://discord.gg/9b6yyZKmH4'
  },
  docsRepositoryBase:
    'https://github.com/heroui-inc/tailwind-variants-docs/blob/main',
  gitTimestamp: '',
  sidebar: {
    defaultMenuCollapseLevel: 1
  },
  footer: {
    text: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <div>
          <a
            className="flex items-center gap-1 text-black dark:text-white"
            href="https://www.heroui.com/?utm_source=tailwind-variants.org"
            rel="noopener noreferrer"
            target="_blank"
            title="heroui homepage"
          >
            <span className="mr-1">Powered by</span>
            <svg
              aria-hidden="true"
              fill="none"
              height="26"
              viewBox="0 0 140 44"
              width="83"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.677734 11.3847V24.0405C0.677734 24.6387 0.985209 25.1946 1.49107 25.5109L10.1195 30.9067C11.2693 31.6257 12.7586 30.796 12.7586 29.4363V18.7981C12.7586 18.186 13.0803 17.6194 13.605 17.3074L18.8683 14.1785V41.4437C18.8683 42.7988 20.3486 43.6293 21.4988 42.9195L30.4044 37.4229C30.9152 37.1076 31.2264 36.549 31.2264 35.9471V9.76484C31.2264 8.41634 29.759 7.58483 28.6085 8.28139L18.8683 14.1785V2.55643C18.8683 1.21158 17.408 0.379537 16.2574 1.06878L1.51927 9.89703C0.997365 10.2097 0.677734 10.7747 0.677734 11.3847Z"
                fill="currentColor"
              />
              <path
                d="M63.8763 24.0707C63.8763 20.4817 62.4078 18.8253 59.4709 18.8253C56.1076 18.8253 53.7391 21.0799 53.7391 26.1412V37.7363H47.6756V5.52769H53.7391V17.3069C55.2075 14.9142 57.6234 13.7179 60.9394 13.7179C66.5764 13.7179 69.8924 17.1688 69.8924 22.9664V37.7363H63.8763V24.0707Z"
                fill="currentColor"
              />
              <path
                d="M84.8996 38.4725C77.3677 38.4725 72.5832 33.5952 72.5832 26.0952C72.5832 18.6872 77.3203 13.7179 84.8996 13.7179C93.0947 13.7179 97.5475 19.5154 96.3158 27.6596H78.6467C78.9783 31.5247 81.252 33.7333 84.8996 33.7333C87.8839 33.7333 89.684 32.2149 90.1577 30.6964H96.1737C95.2263 35.2057 91.0577 38.4725 84.8996 38.4725ZM78.7888 23.6566H90.4419C90.3945 20.4817 88.3102 18.3191 84.7574 18.3191C81.5836 18.3191 79.3572 20.1596 78.7888 23.6566Z"
                fill="currentColor"
              />
              <path
                d="M99.6225 20.3437C99.6225 16.5246 101.754 14.4541 105.828 14.4541H113.597V19.4234H105.686V37.7363H99.6225V20.3437Z"
                fill="currentColor"
              />
              <path
                d="M126.863 38.4725C119.189 38.4725 114.31 33.5492 114.31 26.0952C114.31 18.6412 119.189 13.7179 126.863 13.7179C134.442 13.7179 139.322 18.6412 139.322 26.0952C139.322 33.5492 134.442 38.4725 126.863 38.4725ZM126.863 33.4572C130.653 33.4572 133.163 30.5584 133.163 26.0952C133.163 21.632 130.653 18.6872 126.863 18.6872C123.026 18.6872 120.515 21.632 120.515 26.0952C120.515 30.5584 123.026 33.4572 126.863 33.4572Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
        <div className="mt-6 flex flex-col items-start justify-center gap-3 text-xs">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} NextUI Inc. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-2">
            <a
              className="-mr-1 text-inherit"
              href="https://x.com/hero_ui"
              rel="noreferrer"
              target="_blank"
            >
              <span>Twitter</span>
            </a>
            <a
              className="text-inherit"
              href="https://discord.gg/9b6yyZKmH4"
              rel="noreferrer"
              target="_blank"
            >
              <span>Discord</span>
            </a>
            <a
              className="text-inherit"
              href="https://github.com/heroui-inc"
              rel="noreferrer"
              target="_blank"
            >
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
};

export default config;
