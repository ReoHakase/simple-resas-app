import type { ReactElement } from 'react';
import type { PopulationChartProps } from './PopulationChart';
import { css, cx } from 'styled-system/css';
import { Loader } from 'lucide-react';

export type PopulationChartSkeletonProps = Omit<PopulationChartProps, 'prefCodes' | 'statLabel'>;

export const PopulationChartSkeleton = ({ className, ...props }: PopulationChartSkeletonProps): ReactElement => {
  return (
    <div
      className={css({
        w: 'full',
        h: '600px',
        mdDown: {
          h: '400px',
        },
        animation: 'pulse',
        bg: 'keyplate.a.2',
        rounded: '2xl',
        ring: 'none',
        userSelect: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <Loader
        className={cx(
          css({
            w: '8',
            h: '8',
            color: 'keyplate.a.9',
            animation: 'spin',
          }),
          className,
        )}
      />
    </div>
  );
};
