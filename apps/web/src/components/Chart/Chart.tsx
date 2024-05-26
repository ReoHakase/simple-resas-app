'use client';

import type { ReactNode } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import type { LineColor } from './lineColors';
import { lineColorsRecord } from './lineColors';
import { css } from 'styled-system/css';
import { token } from 'styled-system/tokens';

const formatNumber = new Intl.NumberFormat('ja-JP', { notation: 'compact' }).format;

export type ChartProps<X extends string, Y extends string> = {
  data: Array<Record<X, string | number> & Record<Y, number | null>>;
  dataKey: X;
  unitX?: string;
  unitY?: string;
  labelX?: string;
  labelY?: string;
  formatNumbers?: boolean;
  series: Array<{
    name: Y;
    label: string;
    color: LineColor;
  }>;
};

/**
 * チャートコンポーネントです。
 *
 * @template X - X軸のデータのキー
 * @template Y - Y軸のデータのキーの配列
 * @param data - チャートに表示するデータ
 * @param dataKey - X軸のデータキー
 * @param series - Y軸のデータの色とラベルの設定
 * @returns チャートコンポーネントのReact要素
 */
export const Chart = <X extends string, Y extends string>({
  unitX,
  unitY,
  labelX,
  labelY,
  formatNumbers,
  data,
  dataKey,
  series,
}: ChartProps<X, Y>): ReactNode => {
  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      className={css({
        color: 'keyplate.11',
      })}
    >
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="4 4" fill={token('colors.keyplate.a.2')} stroke={token('colors.keyplate.6')} />
        <XAxis
          dataKey={dataKey}
          tick={{ fill: token('colors.keyplate.11') }}
          unit={unitX}
          label={labelX}
          tickFormatter={formatNumbers ? formatNumber : undefined}
        />
        <YAxis
          tick={{ fill: token('colors.keyplate.11') }}
          unit={unitY}
          label={labelY}
          tickFormatter={formatNumbers ? formatNumber : undefined}
        />
        <Tooltip
          contentStyle={{
            background: token('colors.keyplate.1'),
            borderRadius: token('radii.lg'),
            border: '1px solid',
            borderColor: token('colors.keyplate.6'),
            display: 'flex',
            flexDirection: 'column',
            paddingInline: token('sizes.3'),
            paddingBlock: token('sizes.2'),
            gap: token('sizes.1'),
          }}
        />
        <Legend />
        {series.map(({ name, label, color }) => (
          <Line
            key={name}
            type="monotone"
            dataKey={name}
            name={label}
            stroke={lineColorsRecord[color]}
            strokeWidth={2}
            animationEasing="ease-in"
            animationDuration={250}
            dot={true}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
