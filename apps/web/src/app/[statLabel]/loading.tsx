import type { ReactElement } from 'react';
import { Skeleton } from '@/components/Skeleton';
import { PopulationChartSkeleton } from '@/features/population/components/PopulationChart/PopulationChart.skeleton';
import { css } from 'styled-system/css';

const GraphPageSkeleton = (): ReactElement => {
  return (
    <main
      className={css({
        w: 'full',
        display: 'flex',
        flexGrow: 1,
        flexDir: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        overflowX: 'hidden',
        gap: '4',
      })}
    >
      <h1
        className={css({
          w: 'full',
          textAlign: 'center',
          fontFamily: 'heading',
          fontWeight: 'bold',
          fontSize: '2xl',
          md: {
            fontSize: '4xl',
          },
        })}
      >
        <Skeleton inline className={css({ w: '75%', maxW: 'full' })} />
      </h1>
      <PopulationChartSkeleton />
    </main>
  );
};

export default GraphPageSkeleton;

/**
 * ルートが再生成されるまでの時間を秒単位で指定します。
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
 */
export const revalidate = false; // 再生成しない
