import type { PrefCode } from '@/models/prefCode';
import { z } from 'zod';
import {
  fetchPopulationComposition,
  fetchPopulationCompositionResultSchema,
} from '@/infra/resas/fetchPopulationComposition';
import { prefCodeSchema } from '@/models/prefCode';

export const getPopulationCompositionAllResultSchema = z.array(
  z
    .object({
      prefCode: prefCodeSchema,
    })
    .merge(fetchPopulationCompositionResultSchema),
);

export type GetPopulationCompositionAllResult = z.infer<typeof getPopulationCompositionAllResultSchema>;

/**
 * 人口構成データを取得する関数です。
 *
 * @param prefCodes 都道府県コードの配列
 * @returns 人口構成データの結果を返します
 * @throws もし結果の数が都道府県コードの数と一致しない場合にエラーをthrowします
 */
export async function getPopulationCompositionAll(prefCodes: PrefCode[]): Promise<GetPopulationCompositionAllResult> {
  z.array(prefCodeSchema).parse(prefCodes);
  const results = await Promise.all(prefCodes.map(fetchPopulationComposition));
  if (prefCodes.length !== results.length) {
    throw new Error('The number of results does not match the number of prefCodes.');
  }
  const formattedResults = getPopulationCompositionAllResultSchema.parse(
    results.map((result, index) => ({ prefCode: prefCodes[index], ...result })),
  );
  return formattedResults;
}
