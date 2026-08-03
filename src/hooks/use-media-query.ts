import { useSyncExternalStore } from 'react';

const subscribe = (width: number, onStoreChange: () => void) => {
  const media = window.matchMedia(`(max-width: ${width}px)`);

  media.addEventListener('change', onStoreChange);

  return () => media.removeEventListener('change', onStoreChange);
};

const getSnapshot = (width: number) => {
  return window.matchMedia(`(max-width: ${width}px)`).matches;
};

const getServerSnapshot = () => {
  return false;
};

export const useMediaQuery = (width: number): boolean => {
  return useSyncExternalStore(
    (onStoreChange) => subscribe(width, onStoreChange),
    () => getSnapshot(width),
    getServerSnapshot
  );
};

export const useIsMobile = () => {
  return useMediaQuery(640);
};
