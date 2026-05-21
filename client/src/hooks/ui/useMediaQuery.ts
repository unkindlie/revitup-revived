import { useEffect, useState } from 'react';

export function useMediaQuery(query: string, initialValue?: boolean): boolean {
  const [matches, setMatches] = useState<boolean>(initialValue ?? false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQueryList = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setMatches('matches' in event ? event.matches : mediaQueryList.matches);
    };

    handleChange(mediaQueryList);

    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', handleChange as EventListener);
      return () =>
        mediaQueryList.removeEventListener(
          'change',
          handleChange as EventListener,
        );
    }

    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener(
        'change',
        handleChange as (this: MediaQueryList, ev: MediaQueryListEvent) => void,
      );
      return () =>
        mediaQueryList.removeEventListener(
          'change',
          handleChange as (
            this: MediaQueryList,
            ev: MediaQueryListEvent,
          ) => void,
        );
    }

    return () => {};
  }, [query]);

  return matches;
}
