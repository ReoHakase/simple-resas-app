'use client';

import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { Link } from '@/components/Link';
import type { LinkProps } from '@/components/Link';
import { css, cx } from 'styled-system/css';

export type PrefectureClearButtonProps<T> = Omit<LinkProps<T>, 'href' | 'children'>;

/**
 * 都道府県選択をクリアするためのボタン。
 *
 * @param props 追加のプロパティ
 * @returns 都道府県選択をクリアするためのボタン
 */
export const PrefectureClearButton = <T,>({ className, ...props }: PrefectureClearButtonProps<T>): ReactNode => {
  // searchParamsは含まない
  const pathname = usePathname();
  return (
    <Link
      href={pathname}
      scroll={false}
      className={cx(
        css({
          display: 'flex',
          h: '44px',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'heading',
          fontWeight: 'bold',
          px: '4',
          py: '2',
          gap: '1',
          bg: 'keyplate.12',
          color: 'keyplate.1',
          rounded: 'full',
        }),
        className,
      )}
      {...props}
    >
      <X
        className={css({
          display: 'inline',
          w: '4',
          h: '4',
        })}
      />
      クリア
    </Link>
  );
};
