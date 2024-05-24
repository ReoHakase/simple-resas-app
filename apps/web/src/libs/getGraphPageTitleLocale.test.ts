import { describe, it, expect } from 'vitest';
import { getGraphPageTitleLocaleJa } from './getGraphPageTitleLocale';

describe('getGraphPageTitleLocaleJa', () => {
  const prefCodes = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
  ] as const satisfies `${number}`[];
  const prefLocaleJa = {
    '1': '北海道',
    '10': '群馬県',
    '11': '埼玉県',
    '12': '千葉県',
    '13': '東京都',
    '14': '神奈川県',
    '15': '新潟県',
    '16': '富山県',
    '17': '石川県',
    '18': '福井県',
    '19': '山梨県',
    '2': '青森県',
    '20': '長野県',
    '21': '岐阜県',
    '22': '静岡県',
    '23': '愛知県',
    '24': '三重県',
    '25': '滋賀県',
    '26': '京都府',
    '27': '大阪府',
    '28': '兵庫県',
    '29': '奈良県',
    '3': '岩手県',
    '30': '和歌山県',
    '31': '鳥取県',
    '32': '島根県',
    '33': '岡山県',
    '34': '広島県',
    '35': '山口県',
    '36': '徳島県',
    '37': '香川県',
    '38': '愛媛県',
    '39': '高知県',
    '4': '宮城県',
    '40': '福岡県',
    '41': '佐賀県',
    '42': '長崎県',
    '43': '熊本県',
    '44': '大分県',
    '45': '宮崎県',
    '46': '鹿児島県',
    '47': '沖縄県',
    '5': '秋田県',
    '6': '山形県',
    '7': '福島県',
    '8': '茨城県',
    '9': '栃木県',
  } as const;

  it('都道府県コードが空の場合、統計データラベルのみを表示する', () => {
    const actual = getGraphPageTitleLocaleJa(prefLocaleJa, [], 'all');
    expect(actual).toBe('都道府県別の総人口');
  });

  it('都道府県コードが1つの場合、都道府県名と統計データラベルを表示する', () => {
    const actual = getGraphPageTitleLocaleJa(prefLocaleJa, ['1'], 'young');
    expect(actual).toBe('北海道の年少人口');
  });

  it('都道府県コードが複数の場合、都道府県名のリストと統計データラベルを表示する', () => {
    const actual = getGraphPageTitleLocaleJa(prefLocaleJa, ['1', '13', '27'], 'productive');
    expect(actual).toBe('北海道、東京都、大阪府の生産年齢人口');
  });

  it('全都道府県の場合、全都道府県と統計データラベルを表示する', () => {
    const actual = getGraphPageTitleLocaleJa(prefLocaleJa, prefCodes, 'elderly');
    expect(actual).toBe('全都道府県の老年人口');
  });
});
