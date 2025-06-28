'use client';

import type { ReactNode } from 'react';
import type { LineColor } from './lineColors';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { css } from 'styled-system/css';
import { token } from 'styled-system/tokens';
import { lineColorsRecord } from './lineColors';

const formatter = new Intl.NumberFormat('ja-JP', { notation: 'compact' });
const formatNumber = (value: number) => formatter.format(value);

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
 * データを折れ線グラフで表示するチャートコンポーネントです。
 *
 * @template X - X軸のデータのキーの型（文字列）
 * @template Y - Y軸のデータのキーの型（文字列）
 * @param props - チャートコンポーネントのプロパティ
 * @param props.data - チャートに表示するデータの配列。各要素はX軸のデータとY軸のデータを含むオブジェクト
 * @param props.dataKey - X軸のデータとして使用するオブジェクトのキー
 * @param props.unitX - X軸の単位（オプション）
 * @param props.unitY - Y軸の単位（オプション）
 * @param props.labelX - X軸のラベル（オプション）
 * @param props.labelY - Y軸のラベル（オプション）
 * @param props.formatNumbers - 数値をコンパクト表記（例：1000 → 1K）にするかどうか（オプション）
 * @param props.series - Y軸のデータ系列の設定配列。各要素は{name: データのキー, label: 凡例のラベル, color: 線の色}を含むオブジェクト
 * @returns {ReactNode} レスポンシブな折れ線グラフのコンポーネント
 */
export function Chart<X extends string, Y extends string>({
  unitX,
  unitY,
  labelX,
  labelY,
  formatNumbers,
  data,
  dataKey,
  series,
}: ChartProps<X, Y>): ReactNode {
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
          tickFormatter={formatNumbers ? formatter.format : undefined}
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
}
