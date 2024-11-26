import { z } from 'zod';
import { env } from '@/env';
import { prefCodeSchema, prefCodesSchema } from '@/models/prefCode';
import type { PrefCode, PrefLocale } from '@/models/prefCode';

const rawFetchResultSchema = z.object({
  statusCode: z.string().length(3).optional(),
  message: z.string().nullable(),
  description: z.string().optional(),
  result: z
    .array(
      z.object({
        prefCode: z.number().int().min(1),
        prefName: z.string().min(1),
      }),
    )
    .optional(),
});

export const fetchPrefecturesResultSchema = z.object({
  allPrefCodes: prefCodesSchema,
  prefLocaleJa: z.record(prefCodeSchema, z.string().min(1)),
});

export type FetchPrefecturesResult = {
  allPrefCodes: PrefCode[];
  prefLocaleJa: PrefLocale;
};

/**
 * 都道府県コードと名称のレコードを取得する関数です。
 * @returns 整形された都道府県コードと名称
 * @throws HTTPエラーが発生した場合にエラーメッセージをthrowします
 */
export const fetchPrefectures = async (): Promise<FetchPrefecturesResult> => {
  const res = await fetch(`https://opendata.resas-portal.go.jp/api/v1/prefectures`, {
    headers: {
      'X-API-KEY': env.RESAS_API_KEY,
    },
    cache: 'force-cache',
    next: {
      // デプロイ単位で保持されるデータキャッシュの有効期限を秒単位で設定する
      // @see https://nextjs.org/docs/app/building-your-application/caching#data-cache
      revalidate: 86400, // 24時間
    },
  });
  const { statusCode, message, description, result } = rawFetchResultSchema.parse((await res.json()) as unknown);
  if ((!!statusCode && statusCode !== '200') || !result) {
    throw new Error(`A HTTP ${statusCode} error occured during fetching population: ${message}, ${description}`);
  }
  const processedResult = fetchPrefecturesResultSchema.parse({
    allPrefCodes: result.sort().map(({ prefCode }) => String(prefCode) as `${number}`),
    prefLocaleJa: Object.fromEntries(result.map(({ prefCode, prefName }) => [String(prefCode), prefName])),
  });
  return processedResult as FetchPrefecturesResult;
};
