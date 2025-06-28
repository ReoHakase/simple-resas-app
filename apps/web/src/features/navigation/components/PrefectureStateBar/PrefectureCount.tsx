'use client';

import type { ReactNode } from 'react';
import type { PrefCode } from '@/models/prefCode';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { prefCodesSchema } from '@/models/prefCode';

/**
 * 都道府県の数を表示するコンポーネントです。
 *
 * @returns {ReactNode} 都道府県の数を表示するためのコンポーネント
 */
export function PrefectureCount(): ReactNode {
  const searchParams = useSearchParams();
  const count = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentPrefCodes = prefCodesSchema.parse(
      params
        .getAll('prefCodes')
        .map(str => str.split(','))
        .flat(),
    ) as PrefCode[];
    return currentPrefCodes.length;
  }, [searchParams]);
  return <>{count}</>;
}
