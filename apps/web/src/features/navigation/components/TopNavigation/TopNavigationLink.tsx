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

/**
 * 指定された href が現在のパスと一致しているかどうかを判定するカスタムフックです。
 *
 * @param href - リンク先のパス
 * @returns 現在のパスと href が一致している場合は true、そうでない場合は false
 */
const useIsBeingOpened = (href: string): boolean => {
  // 現在のパスを取得します。パスは「/」で始まります。クエリパラメータは無視されます。
  // @see https://nextjs.org/docs/app/api-reference/functions/use-pathname
  const currentPath = usePathname(); // 例: `/docs/works/shelfree`

  // 現在のパスと href が同じかどうかをチェックします。
  const isBeingOpened = useMemo(() => currentPath === href.toString(), [currentPath, href]);

  return isBeingOpened;
};

/**
 * 指定された href に現在のクエリパラメータを保持したままの URL を生成します。
 * @param href 保持するクエリパラメータを含めたい href
 * @returns 現在のクエリパラメータを保持したままの URL
 */
const useHrefWithPreservedSearchParams = (href: string): string => {
  // 現在のクエリパラメータを取得します。
  // @see https://nextjs.org/docs/app/api-reference/functions/use-search-params
  const searchParams = useSearchParams();

  const hrefWithPreservedSearchParams = useMemo<string>(() => {
    const searchParamsString = new URLSearchParams(searchParams).toString();
    const encodedSearchParamsString = searchParamsString.replace(/%2C/g, ',');
    return encodedSearchParamsString ? `${href}?${encodedSearchParamsString}` : href.toString();
  }, [href, searchParams]);

  return hrefWithPreservedSearchParams;
};

/**
 * ナビゲーションバー内のリンクを表すコンポーネントです。
 * Suspenseのfallbackで使用するための、useSearchParamsを使わないバージョンです。
 * @see https://github.com/ReoHakase/simple-resas-app/pull/7#issuecomment-2127436035
 *
 * @param href - リンク先のURL
 * @param className - 追加のクラス名
 * @param selected - リンクが選択されているかどうか
 * @returns The rendered link component.
 */
export const TopNavigationLinkFallback = ({
  href,
  className,
  selected,
  children,
  ...props
}: TopNavigationLinkProps): ReactNode => {
  const isBeingOpened = useIsBeingOpened(href.toString());

  const link = topNavigationLinkRecipe({
    selected: selected || isBeingOpened,
  });

  return (
    <Link
      href={href}
      scroll={false}
      className={cx(link, className)}
      aria-current={selected || isBeingOpened ? 'page' : undefined}
      {...props}
    >
      {children}
    </Link>
  );
};

/**
 * ナビゲーションバー内のリンクを表すコンポーネントです。
 *
 * @param href - リンク先のURL
 * @param className - 追加のクラス名
 * @param selected - リンクが選択されているかどうか
 * @returns The rendered link component.
 */
export const TopNavigationLink = ({
  href,
  className,
  selected,
  children,
  ...props
}: TopNavigationLinkProps): ReactNode => {
  const isBeingOpened = useIsBeingOpened(href.toString());
  const hrefWithSearchParamsPreserved = useHrefWithPreservedSearchParams(href.toString());

  const link = topNavigationLinkRecipe({
    selected: selected || isBeingOpened,
  });

  return (
    <Link
      href={hrefWithSearchParamsPreserved}
      scroll={false}
      className={cx(link, className)}
      aria-current={selected || isBeingOpened ? 'page' : undefined}
      {...props}
    >
      {children}
    </Link>
  );
};
