import { describe, expect, it } from 'vitest';
import { fetchPrefectures } from './fetchPrefectures';

describe('fetchPrefectures', () => {
  it('エラーがthrowされない (Zodスキーマ通りの返り値が得られる)', async () => {
    await expect(fetchPrefectures()).resolves.not.toThrow();
  });

  it('都道府県の一覧を取得できる', async () => {
    const { allPrefCodes } = await fetchPrefectures();
    expect(allPrefCodes.length).toBe(47);
    expect(allPrefCodes[0]).toBe('1');
  });

  it('取得した都道府県には、都道府県コードと都道府県名が含まれる', async () => {
    const { prefLocaleJa } = await fetchPrefectures();
    expect(prefLocaleJa['8']).toBe('茨城県');
  });

  it('スナップショットに合致する', async () => {
    const result = await fetchPrefectures();
    expect(result).toMatchSnapshot();
  });
});
