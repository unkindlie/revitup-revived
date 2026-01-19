import { useEffect } from 'react';

type UseDocumentTitleOptions = {
  appNamed?: boolean;
};

export const useDocumentTitle = (
  title: string,
  options?: UseDocumentTitleOptions,
) => {
  const { appNamed } = options ?? { appNamed: false };

  useEffect(() => {
    document.title = title + (appNamed ? ' | REVITUP' : '');
  }, [title, appNamed]);
};
