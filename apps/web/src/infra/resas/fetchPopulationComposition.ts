import { z } from 'zod';
import { env } from '@/env';
import { prefCodeSchema } from '@/models/prefCode';
import type { PrefCode } from '@/models/prefCode';
import { statLabelSchema } from '@/models/statLabel';
import { StatLabel } from '@/models/statLabel';
import { yearSchema } from '@/models/year';

const rawFetchResultSchema = z.object({
  statusCode: z.string().length(3).optional(),
  message: z.string().nullable(),
  description: z.string().optional(),
  result: z
    .object({
      boundaryYear: yearSchema,
      data: z.array(
        z.object({
          label: z.preprocess((l: unknown) => {
            switch (l) {
              case '総人口':
                return 'all' satisfies StatLabel;
              case '年少人口':
                return 'young' satisfies StatLabel;
              case '生産年齢人口':
                return 'productive' satisfies StatLabel;
              case '老年人口':
                return 'elderly' satisfies StatLabel;
              default:
                return l;
            }
          }, statLabelSchema),
          data: z.array(
            z.object({
              year: yearSchema,
              value: z.number().int().min(0),
              rate: z.number().min(0).max(100).optional(),
            }),
          ),
        }),
      ),
    })
    .optional(),
});

export const fetchPopulationCompositionResultSchema = z.object({
  boundaryYear: yearSchema,
  stats: z.record(
    statLabelSchema,
    z.array(
      z.object({
        year: yearSchema,
        value: z.number().int().min(0),
        rate: z.number().min(0).max(100).optional(),
      }),
    ),
  ),
});

export type FetchPopulationComparisonResult = z.infer<typeof fetchPopulationCompositionResultSchema>;

/**
 * 人口構成データを取得する関数です。
 * @param prefCode 都道府県コード
 * @returns 整形された人口構成データ
 * @throws HTTPエラーが発生した場合にエラーメッセージをthrowします
 */
export const fetchPopulationComposition = async (prefCode: PrefCode) => {
  prefCodeSchema.parse(prefCode);
  const res = await fetch(
    `https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/population/composition/perYear?prefCode=${prefCode}`,
    {
      headers: {
        'X-API-KEY': env.RESAS_API_KEY,
      },
      cache: 'force-cache',
      next: {
        // デプロイ単位で保持されるデータキャッシュの有効期限を秒単位で設定する
        // @see https://nextjs.org/docs/app/building-your-application/caching#data-cache
        revalidate: 86400, // 24時間
      },
    },
  );
  const { statusCode, message, description, result } = rawFetchResultSchema.parse((await res.json()) as unknown);
  if ((!!statusCode && statusCode !== '200') || !result) {
    throw new Error(`A HTTP ${statusCode} error occured during fetching population: ${message}, ${description}`);
  }
  const processedResult = fetchPopulationCompositionResultSchema.parse({
    boundaryYear: result.boundaryYear,
    stats: Object.fromEntries(result.data.map(({ label, data }) => [label, data])),
  });
  return processedResult;
};
