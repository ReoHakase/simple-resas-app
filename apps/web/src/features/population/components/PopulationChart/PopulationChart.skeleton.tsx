import type { ComponentPropsWithoutRef, ReactElement } from 'react';
import { Loader } from 'lucide-react';
import { css, cx } from 'styled-system/css';

export type PopulationChartSkeletonProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

export function PopulationChartSkeleton({ className, ...props }: PopulationChartSkeletonProps): ReactElement {
  return (
    <div
      className={cx(
        css({
          w: 'full',
          h: '400px',
          animation: 'pulse',
          bg: 'keyplate.a.2',
          rounded: '2xl',
          ring: 'none',
          userSelect: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }),
        className,
      )}
      {...props}
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
}
