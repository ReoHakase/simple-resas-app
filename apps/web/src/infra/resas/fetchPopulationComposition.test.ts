import type { PrefCode } from '@/models/prefCode';
import { describe, expect, it } from 'vitest';
import { fetchPopulationComposition } from './fetchPopulationComposition';

describe('fetchPopulationComposition', () => {
  it('エラーがthrowされない (Zodスキーマ通りの返り値が得られる)', async () => {
    const prefCode: PrefCode = '1';
    await expect(fetchPopulationComposition(prefCode)).resolves.not.toThrow();
  });

  it('実績値と予測値の境界年を取得できる', async () => {
    const prefCode: PrefCode = '1';
    const result = await fetchPopulationComposition(prefCode);
    expect(result.boundaryYear).toBeGreaterThan(2000);
  });

  it('全ての種類(全人口、年少人口、生産年齢人口、老年人口)の値を取得できる', async () => {
    const prefCode: PrefCode = '1';
    const result = await fetchPopulationComposition(prefCode);
    expect(result.stats.all).toBeDefined();
    expect(result.stats.young).toBeDefined();
    expect(result.stats.productive).toBeDefined();
    expect(result.stats.elderly).toBeDefined();
  });

  it('スナップショットに合致する', async () => {
    const prefCode: PrefCode = '1';
    const result = await fetchPopulationComposition(prefCode);
    expect(result).toMatchSnapshot();
  });
});
