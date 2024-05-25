import { ArrowDown } from 'lucide-react';
import { ReactNode, ComponentPropsWithoutRef } from 'react';
import { Suspense } from 'react';
import { Skeleton } from '../Skeleton/Skeleton';
import { PrefectureClearButton } from './PrefectureClearButton';
import { PrefectureCount } from './PrefectureCount';
import { css, cx } from 'styled-system/css';

export const SELECTION_STATE_LABEL_ID = 'selection-state-label' as const;

export type PrefectureStateBarProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

/**
 * 選択中の都道府県の状態を表示するバー。
 *
 * @param children 子要素
 * @param props 追加のプロパティ
 * @returns 都道府県の状態を表示するバー
 */
export const PrefectureStateBar = ({ className, ...props }: PrefectureStateBarProps): ReactNode => {
  return (
    <div
      id={SELECTION_STATE_LABEL_ID}
      className={cx(
        css({
          bg: 'keyplate.1',
          border: '1px solid',
          borderColor: 'keyplate.6',
          rounded: '26px', // 内側のクリアボタンに合わせる
          display: 'flex',
          flexDir: 'row',
          justifyContent: 'start',
          alignItems: 'center',
          p: '2',
          gap: '4',
        }),
        className,
      )}
      {...props}
    >
      <div
        id={SELECTION_STATE_LABEL_ID}
        className={cx(
          css({
            flexGrow: '1',
            display: 'flex',
            flexDir: 'row',
            justifyContent: 'start',
            alignItems: 'center',
            pl: '3',
            gap: '3',
          }),
          className,
        )}
        {...props}
      >
        <ArrowDown />
        <h2 id={SELECTION_STATE_LABEL_ID}>
          <Suspense
            fallback={
              <Skeleton
                className={css({
                  w: '3',
                })}
              />
            }
          >
            <PrefectureCount />
          </Suspense>
          つの都道府県を選択中
        </h2>
        <div
          aria-hidden
          className={css({
            pos: 'relative',
            w: '3',
            h: '3',
          })}
        >
          <div
            className={css({
              pos: 'absolute',
              animation: 'ping',
              w: 'full',
              h: 'full',
              bg: 'info.6',
              rounded: 'full',
            })}
          />
          <div
            className={css({
              pos: 'relative',
              w: 'full',
              h: 'full',
              bg: 'info.9',
              rounded: 'full',
              border: '2px solid',
              borderColor: 'info.7',
            })}
          />
        </div>
      </div>
      <PrefectureClearButton />
    </div>
  );
};
