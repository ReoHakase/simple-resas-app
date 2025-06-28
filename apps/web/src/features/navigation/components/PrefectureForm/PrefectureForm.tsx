import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { Suspense } from 'react';
import { css, cx } from 'styled-system/css';
import { Skeleton } from '@/components/Skeleton';
import { PrefectureCheckboxFieldset } from '../PrefectureCheckboxFieldset';
import { PrefectureStateBar, SELECTION_STATE_LABEL_ID } from '../PrefectureStateBar';

export type PrefectureFormProps = ComponentPropsWithoutRef<'form'>;

/**
 * 都道府県の選択フォーム。
 * ユーザーの操作に合わせて、`prefCodes`の検索パラメータを更新します。
 *
 * @param props - フォームのプロパティ
 * @param props.className - 追加のクラス名
 * @returns 都道府県の選択フォーム
 */
export async function PrefectureForm({ className, ...props }: PrefectureFormProps): Promise<ReactElement> {
  return (
    <form
      aria-labelledby={SELECTION_STATE_LABEL_ID}
      className={cx(
        css({
          display: 'flex',
          flexDir: 'column',
          gap: '3',
        }),
        className,
      )}
      {...props}
    >
      <PrefectureStateBar
        className={css({
          pos: 'sticky',
          w: 'full',
          top: '24', // ヘッダーと重ならないようにする
          smDown: {
            top: '32',
          },
          zIndex: '10',
        })}
      />
      <Suspense
        fallback={(
          <fieldset
            className={css({
              w: 'full',
              bg: 'keyplate.1',
              border: '1px solid',
              borderColor: 'keyplate.6',
              rounded: '2xl',
              p: '2',
              gap: '0',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
            })}
          >
            {Array.from({ length: 47 }, (_, i) => (
              <Skeleton key={i} inline={false} className={css({ w: 'auto', h: '8', m: '1' })} />
            ))}
          </fieldset>
        )}
      >
        <PrefectureCheckboxFieldset />
      </Suspense>
    </form>
  );
}
