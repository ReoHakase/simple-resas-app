'use client';

import Link from 'next/link';
import type { LinkProps } from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { cx, cva } from 'styled-system/css';

export const topNavigationLinkRecipe = cva({
  base: {
    display: 'flex',
    flexDir: 'row',
    gap: '1',
    justifyContent: 'start',
    alignItems: 'center',
    fontFamily: 'heading',
    fontWeight: 'bold',
    px: '4',
    py: '2',
    rounded: 'lg',
    truncate: true,
    smDown: {
      px: '2',
    },
    _descendantIcon: { display: 'inline', w: '6', h: '6', flexShrink: '0' },
  },
  variants: {
    selected: {
      true: {
        color: 'primary.11',
        bg: 'primary.3',
        cursor: 'not-allowed',
      },
      false: {
        _hover: {
          bg: 'keyplate.a.3',
        },
      },
    },
  },
  defaultVariants: {
    selected: false,
  },
});

export type TopNavigationLinkProps = LinkProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof LinkProps> & {
    className?: string;
    selected?: boolean;
    children: ReactNode;
  };

export const TopNavigationLink = ({
  href,
  className,
  selected,
  children,
  ...props
}: TopNavigationLinkProps): ReactNode => {
  // 現在のパスを取得します。パスは「/」で始まります。クエリパラメータは無視されます。
  // @see https://nextjs.org/docs/app/api-reference/functions/use-pathname
  const currentPath = usePathname(); // 例: `/docs/works/shelfree`
  // 現在のパスとhrefが同じかどうかをチェックします。
  const isBeingOpened = useMemo(() => currentPath === href.toString(), [currentPath, href]);

  // 現在のクエリパラメータを取得します。
  // @see https://nextjs.org/docs/app/api-reference/functions/use-search-params
  const searchParams = useSearchParams();

  const hrefWithSearchParamsPreserved = useMemo<string>(() => {
    const searchParamsString = new URLSearchParams(searchParams).toString();
    const encodedSearchParamsString = searchParamsString.replace(/%2C/g, ',');
    return encodedSearchParamsString ? `${href}?${encodedSearchParamsString}` : href.toString();
  }, [href, searchParams]);

  const link = topNavigationLinkRecipe({
    selected: selected || isBeingOpened,
  });

  return (
    <Link
      href={hrefWithSearchParamsPreserved}
      className={cx(link, className)}
      aria-current={selected || isBeingOpened ? 'page' : undefined}
      {...props}
    >
      {children}
    </Link>
  );
};
