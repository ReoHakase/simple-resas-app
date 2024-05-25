'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import type { ReactNode, ChangeEvent } from 'react';
import { Checkbox } from '@/components/Checkbox/Checkbox';
import type { CheckboxProps } from '@/components/Checkbox/Checkbox';
import { prefCodesSchema } from '@/models/prefCode';
import type { PrefCode } from '@/models/prefCode';
import { css, cx } from 'styled-system/css';

/**
 * 指定された都道府県コードが選択されているかどうかをsearchParamsから判定して返すカスタムフックです。
 *
 * @param prefCode 都道府県コード
 * @returns 選択されている場合は true、そうでない場合は false
 */
const useIsPrefectureSelected = (prefCode: PrefCode): boolean => {
  const searchParams = useSearchParams();
  const isSelected = useMemo(
    () =>
      (
        prefCodesSchema.parse(
          searchParams
            .getAll('prefCodes')
            .map((str) => str.split(','))
            .flat(),
        ) as PrefCode[]
      ).includes(prefCode),
    [searchParams, prefCode],
  );
  return isSelected;
};

/**
 * 都道府県コードの検索パラメータを更新するためのカスタムフックです。
 *
 * @returns {Object} addPrefCodeとremovePrefCodeの関数を含むオブジェクト
 * @property {Function} addPrefCode - 都道府県コードを追加するための関数
 * @property {Function} removePrefCode - 都道府県コードを削除するための関数
 */
const useUpdatePrefCodesSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const addPrefCode = useCallback(
    (prefCode: PrefCode) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentPrefCodes = prefCodesSchema.parse(
        params
          .getAll('prefCodes')
          .map((str) => str.split(','))
          .flat(),
      ) as PrefCode[];
      const newPrefCodes = Array.from(new Set([...currentPrefCodes, prefCode])).sort((a, b) => Number(a) - Number(b));
      params.set('prefCodes', newPrefCodes.join(','));
      router.push(`${pathname}?${params.toString().replace(/%2C/g, ',')}`, {
        scroll: false,
      });
    },
    [router, pathname, searchParams],
  );

  const removePrefCode = useCallback(
    (prefCode: PrefCode) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentPrefCodes = prefCodesSchema.parse(
        params
          .getAll('prefCodes')
          .map((str) => str.split(','))
          .flat(),
      ) as PrefCode[];
      const newPrefCodes = currentPrefCodes.filter((code) => code !== prefCode).sort((a, b) => Number(a) - Number(b));
      params.set('prefCodes', newPrefCodes.join(','));
      if (newPrefCodes.length === 0) {
        params.delete('prefCodes');
      }
      router.push(`${pathname}?${params.toString().replace(/%2C/g, ',')}`, {
        scroll: false,
      });
    },
    [router, pathname, searchParams],
  );

  return { addPrefCode, removePrefCode };
};

export type PrefectureCheckboxProps = Omit<CheckboxProps, 'id' | 'aria-labelledby' | 'checked'> & {
  prefCode: PrefCode;
  prefLocale: string;
};

/**
 * 都道府県のチェックボックスコンポーネント。
 * 値が変更されると、それに合わせてsearchParamsを更新します。
 *
 * @param prefCode 都道府県コード
 * @param prefLocale 都道府県の名称
 * @param onChange チェックボックスの変更イベントハンドラ
 * @param className クラス名
 * @param props 追加のプロパティ
 * @returns チェックボックスコンポーネント
 */
export const PrefectureCheckbox = ({
  prefCode,
  prefLocale,
  onChange,
  className,
  ...props
}: PrefectureCheckboxProps): ReactNode => {
  const { addPrefCode, removePrefCode } = useUpdatePrefCodesSearchParams();
  const checked = useIsPrefectureSelected(prefCode);
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        addPrefCode(prefCode);
      } else {
        removePrefCode(prefCode);
      }
      onChange?.(e);
    },
    [addPrefCode, removePrefCode, prefCode, onChange],
  );

  const checkboxId = `prefecture-${prefCode}`;
  const actualLabelId = `prefecture-${prefCode}-label`;
  return (
    <label
      id={actualLabelId}
      htmlFor={checkboxId}
      className={cx(
        css({
          pos: 'relative',
          display: 'flex',
          flexDir: 'row',
          justifyContent: 'start',
          alignItems: 'center',
          p: '1',
          gap: '2.5',
          rounded: 'lg',
          '&:has(input:checked)': {
            bg: 'primary.2',
            color: 'primary.11',
          },
          '&:has(input:disabled)': {
            color: 'keyplate.11',
            cursor: 'not-allowed',
          },
          '&:has(input:checked:disabled)': {
            bg: 'keyplate.2',
            color: 'keyplate.11',
          },
          _hover: {
            bg: 'keyplate.3',
            '&:has(input:checked)': {
              bg: 'primary.3',
            },
            '&:has(input:checked:disabled)': {
              bg: 'keyplate.2',
              color: 'keyplate.11',
            },
          },
        }),
        className,
      )}
    >
      <Checkbox id={checkboxId} aria-labelledby={actualLabelId} checked={checked} onChange={handleChange} {...props} />
      {prefLocale}
    </label>
  );
};
