import type { GetPopulationCompositionAllResult } from './getPopulationCompositionAll';
import type { DataPoint, DataPointValueRecord } from '@/models/dataPoint';
import type { StatLabel } from '@/models/statLabel';
import type { Year } from '@/models/year';
import { statLabels } from '@/models/statLabel';

/**
 * 指定された統計ラベルに基づいて、与えられたデータから、プロットに最適なデータ点の配列を抽出します。
 * @param record - 人口構成データの結果を含むレコード
 * @param statLabel - 抽出する統計ラベル
 * @returns 抽出されたデータポイントの配列
 */
export function extractDataPointsByStatLabel(
  record: GetPopulationCompositionAllResult,
  statLabel: StatLabel,
): DataPoint[] {
  const yearMap = new Map<Year, DataPointValueRecord>();
  const containedPrefCodes = record.map(({ prefCode }) => prefCode);
  const initialDataPointValueRecord = Object.fromEntries(
    containedPrefCodes.map(prefCode => [prefCode, null]),
  ) as DataPointValueRecord;
  record.forEach(({ prefCode, stats }) => {
    statLabels.forEach((label) => {
      if (stats[label] === undefined) {
        return;
      }
      (stats as Required<typeof stats>)[label].forEach(({ year, value }) => {
        if (label === statLabel) {
          const dataPointValueRecord = yearMap.get(year) ?? initialDataPointValueRecord;
          yearMap.set(year, { ...dataPointValueRecord, [prefCode]: value });
        }
      });
    });
  });
  const dataPoints = Array.from(yearMap.entries())
    .map(([year, dataPointValueRecord]): DataPoint => ({ year, ...dataPointValueRecord }))
    .sort((a, b) => a.year - b.year);
  return dataPoints;
}
