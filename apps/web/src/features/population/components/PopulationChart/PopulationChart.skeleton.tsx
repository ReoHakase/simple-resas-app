import { Loader } from 'lucide-react';
import type { ReactElement, ComponentPropsWithoutRef } from 'react';
import { css, cx } from 'styled-system/css';

export type PopulationChartSkeletonProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

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
};
