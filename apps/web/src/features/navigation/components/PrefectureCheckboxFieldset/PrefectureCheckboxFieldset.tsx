import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { css, cx } from 'styled-system/css';
import { fetchPrefectures } from '@/infra/resas/fetchPrefectures';
import { PrefectureCheckbox } from '../PrefectureCheckbox';

export type PrefectureCheckboxFieldsetProps = ComponentPropsWithoutRef<'fieldset'>;

/**
 * 都道府県のチェックボックスを含むフィールドセットです。
 * RESAS APIから都道府県のデータを取得してチェックボックスを生成します。
 *
 * @param props - フィールドセットのプロパティ
 * @param props.className - クラス名
 * @returns フィールドセットコンポーネントのReact要素
 */
export async function PrefectureCheckboxFieldset({
  className,
  ...props
}: PrefectureCheckboxFieldsetProps): Promise<ReactElement> {
  const { allPrefCodes, prefLocaleJa } = await fetchPrefectures();
  return (
    <fieldset
      className={cx(
        css({
          w: 'full',
          bg: 'keyplate.1',
          border: '1px solid',
          borderColor: 'keyplate.6',
          rounded: '2xl',
          p: '2',
          gap: '0',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
        }),
        className,
      )}
      {...props}
    >
      <legend className={css({ srOnly: true })}>都道府県を選択してください(複数可)</legend>
      {allPrefCodes.map(prefCode => (
        <PrefectureCheckbox key={prefCode} prefCode={prefCode} prefLocale={prefLocaleJa[prefCode]} />
      ))}
    </fieldset>
  );
}
