import type { ReactElement } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { extractDataPointsByStatLabel } from '@/libs/extractDataPointsByStatLabel';
import { getPopulationCompositionAll } from '@/libs/getPopulationCompositionAll';
import type { PrefCode } from '@/models/prefCode';
import type { StatLabel } from '@/models/statLabel';
import { css, cx } from 'styled-system/css';

export type PopulationChartProps = Omit<ComponentPropsWithoutRef<'p'>, 'children'> & {
  statLabel: StatLabel;
  prefCodes: PrefCode[];
};

export const PopulationChart = async ({
  statLabel,
  prefCodes,
  className,
  ...props
}: PopulationChartProps): Promise<ReactElement> => {
  const record = await getPopulationCompositionAll(prefCodes);
  const dataPoints = extractDataPointsByStatLabel(record, statLabel);
  return (
    <p
      className={cx(
        css({
          fontFamily: 'monospace',
          fontSize: 'sm',
          color: 'keyplate.11',
        }),
        className,
      )}
      {...props}
    >
      {JSON.stringify(dataPoints, null, 2)}
    </p>
  );
};

// /**
//  * ルートが再生成されるまでの時間を秒単位で指定します。
//  * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
//  */
// export const revalidate = 3600 * 24; // 24時間
