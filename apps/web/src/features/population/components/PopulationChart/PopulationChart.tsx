import type { ReactElement } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { extractDataPointsByStatLabel } from '@/libs/extractDataPointsByStatLabel';
import { getPopulationCompositionAll } from '@/libs/getPopulationCompositionAll';
import type { PrefCode } from '@/models/prefCode';
import type { StatLabel } from '@/models/statLabel';
import { css, cx } from 'styled-system/css';
import { Chart } from '@/components/Chart/Chart';
import { getUniqueLineColor } from '@/components/Chart/lineColors';
import type { ChartProps } from '@/components/Chart/Chart';
import { fetchPrefectures } from '@/infra/resas/fetchPrefectures';

export type PopulationChartProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  statLabel: StatLabel;
  prefCodes: PrefCode[];
};

export const PopulationChart = async ({
  statLabel,
  prefCodes,
  className,
  ...props
}: PopulationChartProps): Promise<ReactElement> => {
  const [prefLocaleJa, record] = await Promise.all([
    fetchPrefectures().then((data) => data.prefLocaleJa),
    getPopulationCompositionAll(prefCodes),
  ]);
  const dataPoints = extractDataPointsByStatLabel(record, statLabel);
  const chartProps: ChartProps<'year', string> = {
    data: dataPoints,
    dataKey: 'year',
    unitX: '年',
    unitY: '', // モバイル表示向けに非表示
    formatNumbers: true, // ~~万, ~~億 などにフォーマット
    series: prefCodes.map((prefCode) => ({
      name: prefCode,
      label: prefLocaleJa[prefCode],
      color: getUniqueLineColor(prefCode),
    })),
  };
  return (
    <div
      className={cx(
        css({
          w: 'full',
          h: '600px',
          mdDown: {
            h: '400px',
          },
        }),
        className,
      )}
      {...props}
    >
      <Chart {...chartProps} />
    </div>
  );
};

// /**
//  * ルートが再生成されるまでの時間を秒単位で指定します。
//  * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate
//  */
// export const revalidate = 3600 * 24; // 24時間
