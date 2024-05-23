import { describe, it, expect } from 'vitest';
import { getGraphPageTitleLocaleJa } from './getGraphPageTitleLocale';
import { prefCodes } from '@/models/prefCode';

describe('getGraphPageTitleLocaleJa', () => {
  it('都道府県コードが空の場合、統計データラベルのみを表示する', () => {
    const actual = getGraphPageTitleLocaleJa([], 'all');
    expect(actual).toBe('都道府県別の総人口');
  });

  it('都道府県コードが1つの場合、都道府県名と統計データラベルを表示する', () => {
    const actual = getGraphPageTitleLocaleJa(['1'], 'young');
    expect(actual).toBe('北海道の年少人口');
  });

  it('都道府県コードが複数の場合、都道府県名のリストと統計データラベルを表示する', () => {
    const actual = getGraphPageTitleLocaleJa(['1', '13', '27'], 'productive');
    expect(actual).toBe('北海道、東京都、大阪府の生産年齢人口');
  });

  it('全都道府県の場合、全都道府県と統計データラベルを表示する', () => {
    const actual = getGraphPageTitleLocaleJa(prefCodes, 'elderly');
    expect(actual).toBe('全都道府県の老年人口');
  });
});
