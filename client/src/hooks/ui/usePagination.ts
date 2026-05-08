import { useState, useMemo } from 'react';

interface UsePaginationOptions {
  initialPage?: number;
  pageSize?: number;
  totalPages?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
}

export const usePagination = (
  options?: UsePaginationOptions,
): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(options?.initialPage ?? 1);
  const [pageSize, setPageSizeState] = useState(options?.pageSize ?? 10);

  const totalPages = options?.totalPages ?? 1;

  const hasNextPage = useMemo(
    () => currentPage < totalPages,
    [currentPage, totalPages],
  );

  const hasPreviousPage = useMemo(() => currentPage > 1, [currentPage]);

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages || 1));
    setCurrentPage(validPage);
  };

  const nextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const setPageSize = (size: number) => {
    setPageSizeState(size);
    setCurrentPage(1);
  };

  return {
    currentPage,
    pageSize,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToPage,
    nextPage,
    previousPage,
    setPageSize,
  };
};
