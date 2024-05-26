import type { ReactElement } from 'react';
import type { PopulationChartProps } from './PopulationChart';
import { Skeleton } from '@/features/navigation/components/Skeleton/Skeleton';
import { css, cx } from 'styled-system/css';

export type PopulationChartSkeletonProps = Omit<PopulationChartProps, 'prefCodes' | 'statLabel'>;

export const PopulationChartSkeleton = ({ className, ...props }: PopulationChartSkeletonProps): ReactElement => {
  return (
    <p
      className={cx(
        css({
          w: 'full',
          fontFamily: 'monospace',
          fontSize: 'sm',
          color: 'keyplate.11',
        }),
        className,
      )}
      {...props}
    >
      <Skeleton inline lines={14} className={css({ w: 'full' })} />
    </p>
  );
};
