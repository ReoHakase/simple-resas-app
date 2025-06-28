import type { PrefCode } from '@/models/prefCode';
import { describe, expect, it, vi } from 'vitest';
import { getPopulationCompositionAll } from './getPopulationCompositionAll';

describe('getPopulationCompositionAll', () => {
  it('エラーがthrowされない (Zodスキーマ通りの返り値が得られる)', async () => {
    vi.mock('../infra/resas/fetchPopulationComposition', async (importOriginal) => {
      const actual = await importOriginal<typeof import('../infra/resas/fetchPopulationComposition')>();
      return {
        ...actual,
        fetchPopulationComposition: vi.fn().mockReturnValue({
          boundaryYear: 2020,
          stats: {
            all: [
              {
                value: 1234567890,
                year: 1960,
              },
              {
                value: 5171800,
                year: 1965,
              },
              {
                value: 5184287,
                year: 1970,
              },
              {
                value: 5338206,
                year: 1975,
              },
              {
                value: 5575989,
                year: 1980,
              },
              {
                value: 5679439,
                year: 1985,
              },
              {
                value: 5643647,
                year: 1990,
              },
              {
                value: 5692321,
                year: 1995,
              },
              {
                value: 5683062,
                year: 2000,
              },
              {
                value: 5627737,
                year: 2005,
              },
              {
                value: 5506419,
                year: 2010,
              },
              {
                value: 5381733,
                year: 2015,
              },
              {
                value: 5224614,
                year: 2020,
              },
              {
                value: 5016554,
                year: 2025,
              },
              {
                value: 4791592,
                year: 2030,
              },
              {
                value: 4546357,
                year: 2035,
              },
              {
                value: 4280427,
                year: 2040,
              },
              {
                value: 4004973,
                year: 2045,
              },
            ],
            elderly: [
              {
                rate: 4.21,
                value: 212063,
                year: 1960,
              },
              {
                rate: 4.82,
                value: 249318,
                year: 1965,
              },
              {
                rate: 5.77,
                value: 299069,
                year: 1970,
              },
              {
                rate: 6.87,
                value: 366651,
                year: 1975,
              },
              {
                rate: 8.1,
                value: 451727,
                year: 1980,
              },
              {
                rate: 9.68,
                value: 549487,
                year: 1985,
              },
              {
                rate: 11.96,
                value: 674881,
                year: 1990,
              },
              {
                rate: 14.84,
                value: 844927,
                year: 1995,
              },
              {
                rate: 18.15,
                value: 1031552,
                year: 2000,
              },
              {
                rate: 21.42,
                value: 1205692,
                year: 2005,
              },
              {
                rate: 24.66,
                value: 1358068,
                year: 2010,
              },
              {
                rate: 28.96,
                value: 1558387,
                year: 2015,
              },
              {
                rate: 31.85,
                value: 1664023,
                year: 2020,
              },
              {
                rate: 34.36,
                value: 1723702,
                year: 2025,
              },
              {
                rate: 36.14,
                value: 1731567,
                year: 2030,
              },
              {
                rate: 38.02,
                value: 1728745,
                year: 2035,
              },
              {
                rate: 40.85,
                value: 1748560,
                year: 2040,
              },
              {
                rate: 42.79,
                value: 1713531,
                year: 2045,
              },
            ],
            productive: [
              {
                rate: 62.42,
                value: 3145664,
                year: 1960,
              },
              {
                rate: 66.91,
                value: 3460359,
                year: 1965,
              },
              {
                rate: 68.97,
                value: 3575731,
                year: 1970,
              },
              {
                rate: 68.52,
                value: 3657884,
                year: 1975,
              },
              {
                rate: 68.58,
                value: 3823808,
                year: 1980,
              },
              {
                rate: 68.86,
                value: 3910729,
                year: 1985,
              },
              {
                rate: 69.54,
                value: 3924717,
                year: 1990,
              },
              {
                rate: 69.27,
                value: 3942868,
                year: 1995,
              },
              {
                rate: 67.44,
                value: 3832902,
                year: 2000,
              },
              {
                rate: 65.68,
                value: 3696064,
                year: 2005,
              },
              {
                rate: 63.24,
                value: 3482169,
                year: 2010,
              },
              {
                rate: 59.29,
                value: 3190804,
                year: 2015,
              },
              {
                rate: 56.38,
                value: 2945727,
                year: 2020,
              },
              {
                rate: 55.44,
                value: 2781175,
                year: 2025,
              },
              {
                rate: 54.15,
                value: 2594718,
                year: 2030,
              },
              {
                rate: 52.66,
                value: 2394230,
                year: 2035,
              },
              {
                rate: 50.01,
                value: 2140781,
                year: 2040,
              },
              {
                rate: 48.22,
                value: 1931265,
                year: 2045,
              },
            ],
            young: [
              {
                rate: 33.37,
                value: 1681479,
                year: 1960,
              },
              {
                rate: 28.27,
                value: 1462123,
                year: 1965,
              },
              {
                rate: 25.26,
                value: 1309487,
                year: 1970,
              },
              {
                rate: 24.59,
                value: 1312611,
                year: 1975,
              },
              {
                rate: 23.28,
                value: 1298324,
                year: 1980,
              },
              {
                rate: 21.45,
                value: 1217959,
                year: 1985,
              },
              {
                rate: 18.33,
                value: 1034251,
                year: 1990,
              },
              {
                rate: 15.79,
                value: 898673,
                year: 1995,
              },
              {
                rate: 13.94,
                value: 792352,
                year: 2000,
              },
              {
                rate: 12.78,
                value: 719057,
                year: 2005,
              },
              {
                rate: 11.94,
                value: 657312,
                year: 2010,
              },
              {
                rate: 11.3,
                value: 608296,
                year: 2015,
              },
              {
                rate: 10.64,
                value: 555804,
                year: 2020,
              },
              {
                rate: 10.2,
                value: 511677,
                year: 2025,
              },
              {
                rate: 9.71,
                value: 465307,
                year: 2030,
              },
              {
                rate: 9.31,
                value: 423382,
                year: 2035,
              },
              {
                rate: 9.14,
                value: 391086,
                year: 2040,
              },
              {
                rate: 8.99,
                value: 360177,
                year: 2045,
              },
            ],
          },
        }),
      } satisfies typeof actual;
    });
    const prefCodes: PrefCode[] = ['1', '2', '3'];
    await expect(getPopulationCompositionAll(prefCodes)).resolves.not.toThrow();
    const result = await getPopulationCompositionAll(prefCodes);
    expect(result[0].stats.all && result[0].stats.all[0].value).toBe(1234567890); // モックが返す値
  });
});
