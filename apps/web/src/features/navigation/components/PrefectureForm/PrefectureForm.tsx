import type { ReactElement, ComponentPropsWithoutRef } from 'react';
import { Suspense } from 'react';
import { PrefectureCheckboxFieldset } from '../PrefectureCheckboxFieldset/PrefectureCheckboxFieldset';
import { PrefectureStateBar } from '@/features/navigation/components/PrefectureStateBar/PrefectureStateBar';
import { SELECTION_STATE_LABEL_ID } from '@/features/navigation/components/PrefectureStateBar/PrefectureStateBar';
import { Skeleton } from '@/features/navigation/components/Skeleton/Skeleton';
import { cx, css } from 'styled-system/css';

export type PrefectureFormProps = ComponentPropsWithoutRef<'form'>;

/**
 * 都道府県の選択フォーム。
 * ユーザーの操作に合わせて、`prefCodes`の検索パラメータを更新します。
 *
 * @param props 追加のプロパティ
 * @returns 都道府県の選択フォーム
 */
export const PrefectureForm = async ({ className, ...props }: PrefectureFormProps): Promise<ReactElement> => {
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
        fallback={
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
        }
      >
        <PrefectureCheckboxFieldset />
      </Suspense>
    </form>
  );
};
