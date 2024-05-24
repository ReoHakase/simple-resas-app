import type { FetchPrefecturesResult } from '@/infra/resas/fetchPrefectures';
import type { PrefCode } from '@/models/prefCode';
import { prefCodesSchema } from '@/models/prefCode';
// import { prefLocaleJa } from '@/models/prefCode';
import type { StatLabel } from '@/models/statLabel';
import { statLabelLocaleJa } from '@/models/statLabel';

/**
 * 指定された都道府県コードと統計データラベルに基づいて、グラフページのタイトルの表示用文字列を取得します。
 *
 * @param prefCodes 都道府県コードの配列
 * @param statLabel 統計データのラベル
 * @returns グラフページのタイトルのロケール
 */
export const getGraphPageTitleLocaleJa = (
  prefLocaleJa: FetchPrefecturesResult['prefLocaleJa'],
  prefCodes: PrefCode[],
  statLabel: StatLabel,
): string => {
  if (prefCodes.length === 0) {
    return `都道府県別の${statLabelLocaleJa[statLabel]}`;
  }
  if (prefCodes.length === 47 && new Set(prefCodes).size == 47 && prefCodesSchema.safeParse(prefCodes).success) {
    return `全都道府県の${statLabelLocaleJa[statLabel]}`;
  }
  const formatter = new Intl.ListFormat('ja', {
    style: 'long',
    type: 'conjunction',
  });
  return `${formatter.format(prefCodes.map((x) => prefLocaleJa[x] || ''))}の${statLabelLocaleJa[statLabel]}`;
};
