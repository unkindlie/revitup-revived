import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';
import { Translation } from 'react-i18next';

const Pagination = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <nav
    role="navigation"
    aria-label="Pagination Navigation"
    className={cn('flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
));
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
));
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
  size?: 'default' | 'icon';
} & ButtonHTMLAttributes<HTMLButtonElement>;

const PaginationLink = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ className, isActive, size = 'icon', disabled, ...props }, ref) => (
    <button
      ref={ref}
      aria-current={isActive ? 'page' : undefined}
      disabled={disabled}
      className={cn(
        'border-input bg-background ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex items-center justify-center rounded-md border px-2.5 py-2 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        isActive &&
          'border-primary bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
        size === 'icon' && 'px-2.5',
        className,
      )}
      {...props}
    />
  ),
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = React.forwardRef<
  HTMLButtonElement,
  PaginationLinkProps
>(({ className, disabled, ...props }, ref) => (
  <Translation>
    {(t) => (
      <PaginationLink
        ref={ref}
        size="default"
        className={cn('gap-1', className)}
        disabled={disabled}
        {...props}
      >
        <ChevronLeft className="size-4" />
        <span>{t('components.pagination.previous', { ns: 'common' })}</span>
      </PaginationLink>
    )}
  </Translation>
));
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ className, disabled, ...props }, ref) => (
    <Translation>
      {(t) => (
        <PaginationLink
          ref={ref}
          size="default"
          className={cn('gap-1', className)}
          disabled={disabled}
          {...props}
        >
          <span>{t('components.pagination.next', { ns: 'common' })}</span>
          <ChevronRight className="size-4" />
        </PaginationLink>
      )}
    </Translation>
  ),
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
