import type { GetPopulationCompositionAllResult } from './getPopulationCompositionAll';
import { describe, expect, it } from 'vitest';
import { extractDataPointsByStatLabel } from './extractDataPointsByStatLabel';

describe('extractDataPointsByStatLabel', () => {
  it('指定した都道府県を含むデータ点の配列を抽出できる', () => {
    const record: GetPopulationCompositionAllResult = [
      {
        prefCode: '1',
        boundaryYear: 2020,
        stats: {
          all: [
            { year: 2000, value: 1000000 },
            { year: 2005, value: 1100000 },
            { year: 2010, value: 1200000 },
            { year: 2015, value: 1300000 },
            { year: 2020, value: 1400000 },
            { year: 2025, value: 1500000 },
          ],
          young: [
            { year: 2000, value: 100000 },
            { year: 2005, value: 110000 },
            { year: 2010, value: 120000 },
            { year: 2015, value: 130000 },
            { year: 2020, value: 140000 },
            { year: 2025, value: 150000 },
          ],
          productive: [
            { year: 2000, value: 800000 },
            { year: 2005, value: 880000 },
            { year: 2010, value: 960000 },
            { year: 2015, value: 1040000 },
            { year: 2020, value: 1120000 },
            { year: 2025, value: 1200000 },
          ],
          elderly: [
            { year: 2000, value: 100000 },
            { year: 2005, value: 110000 },
            { year: 2010, value: 120000 },
            { year: 2015, value: 130000 },
            { year: 2020, value: 140000 },
            { year: 2025, value: 150000 },
          ],
        },
      },
      {
        prefCode: '2',
        boundaryYear: 2020,
        stats: {
          all: [
            { year: 2000, value: 2000000 },
            { year: 2005, value: 2200000 },
            { year: 2010, value: 2400000 },
            { year: 2015, value: 2600000 },
            { year: 2020, value: 2800000 },
            { year: 2025, value: 3000000 },
          ],
          young: [
            { year: 2000, value: 200000 },
            { year: 2005, value: 220000 },
            { year: 2010, value: 240000 },
            { year: 2015, value: 260000 },
            { year: 2020, value: 280000 },
            { year: 2025, value: 300000 },
          ],
          productive: [
            { year: 2000, value: 1600000 },
            { year: 2005, value: 1760000 },
            { year: 2010, value: 1920000 },
            { year: 2015, value: 2080000 },
            { year: 2020, value: 2240000 },
            { year: 2025, value: 2400000 },
          ],
          elderly: [
            { year: 2000, value: 100000 },
            { year: 2005, value: 110000 },
            { year: 2010, value: 120000 },
            { year: 2015, value: 130000 },
            { year: 2020, value: 140000 },
            { year: 2025, value: 150000 },
          ],
        },
      },
    ];

    const allDataPoints = extractDataPointsByStatLabel(record, 'all');
    const youngDataPoints = extractDataPointsByStatLabel(record, 'young');
    const productiveDataPoints = extractDataPointsByStatLabel(record, 'productive');
    const elderlyDataPoints = extractDataPointsByStatLabel(record, 'elderly');

    expect(allDataPoints).toEqual([
      {
        year: 2000,
        1: 1000000,
        2: 2000000,
      },
      {
        year: 2005,
        1: 1100000,
        2: 2200000,
      },
      {
        year: 2010,
        1: 1200000,
        2: 2400000,
      },
      {
        year: 2015,
        1: 1300000,
        2: 2600000,
      },
      {
        year: 2020,
        1: 1400000,
        2: 2800000,
      },
      {
        year: 2025,
        1: 1500000,
        2: 3000000,
      },
    ]);
    expect(youngDataPoints).toEqual([
      {
        year: 2000,
        1: 100000,
        2: 200000,
      },
      {
        year: 2005,
        1: 110000,
        2: 220000,
      },
      {
        year: 2010,
        1: 120000,
        2: 240000,
      },
      {
        year: 2015,
        1: 130000,
        2: 260000,
      },
      {
        year: 2020,
        1: 140000,
        2: 280000,
      },
      {
        year: 2025,
        1: 150000,
        2: 300000,
      },
    ]);
    expect(productiveDataPoints).toEqual([
      {
        year: 2000,
        1: 800000,
        2: 1600000,
      },
      {
        year: 2005,
        1: 880000,
        2: 1760000,
      },
      {
        year: 2010,
        1: 960000,
        2: 1920000,
      },
      {
        year: 2015,
        1: 1040000,
        2: 2080000,
      },
      {
        year: 2020,
        1: 1120000,
        2: 2240000,
      },
      {
        year: 2025,
        1: 1200000,
        2: 2400000,
      },
    ]);
    expect(elderlyDataPoints).toEqual([
      {
        year: 2000,
        1: 100000,
        2: 100000,
      },
      {
        year: 2005,
        1: 110000,
        2: 110000,
      },
      {
        year: 2010,
        1: 120000,
        2: 120000,
      },
      {
        year: 2015,
        1: 130000,
        2: 130000,
      },
      {
        year: 2020,
        1: 140000,
        2: 140000,
      },
      {
        year: 2025,
        1: 150000,
        2: 150000,
      },
    ]);
  });

  it('欠損を含むデータ点の配列を抽出できる', () => {
    const record: GetPopulationCompositionAllResult = [
      {
        prefCode: '1',
        boundaryYear: 2020,
        stats: {
          all: [
            { year: 2000, value: 1000000 },
            { year: 2005, value: 1100000 },
            { year: 2020, value: 1400000 },
            { year: 2025, value: 1500000 },
          ],
          young: [
            { year: 2000, value: 100000 },
            { year: 2005, value: 110000 },
            { year: 2020, value: 140000 },
            { year: 2025, value: 150000 },
          ],
          productive: [
            { year: 2000, value: 800000 },
            { year: 2005, value: 880000 },
            { year: 2020, value: 1120000 },
            { year: 2025, value: 1200000 },
          ],
          elderly: [
            { year: 2000, value: 100000 },
            { year: 2005, value: 110000 },
            { year: 2020, value: 140000 },
            { year: 2025, value: 150000 },
          ],
        },
      },
      {
        prefCode: '2',
        boundaryYear: 2020,
        stats: {
          all: [
            { year: 2000, value: 2000000 },
            { year: 2005, value: 2200000 },
            { year: 2010, value: 2400000 },
            { year: 2015, value: 2600000 },
            { year: 2020, value: 2800000 },
            { year: 2025, value: 3000000 },
          ],
          young: [
            { year: 2000, value: 200000 },
            { year: 2005, value: 220000 },
            { year: 2010, value: 240000 },
            { year: 2015, value: 260000 },
            { year: 2020, value: 280000 },
            { year: 2025, value: 300000 },
          ],
          productive: [
            { year: 2000, value: 1600000 },
            { year: 2005, value: 1760000 },
            { year: 2010, value: 1920000 },
            { year: 2015, value: 2080000 },
            { year: 2020, value: 2240000 },
            { year: 2025, value: 2400000 },
          ],
          elderly: [
            { year: 2000, value: 100000 },
            { year: 2005, value: 110000 },
            { year: 2010, value: 120000 },
            { year: 2015, value: 130000 },
            { year: 2020, value: 140000 },
            { year: 2025, value: 150000 },
          ],
        },
      },
    ];

    const allDataPoints = extractDataPointsByStatLabel(record, 'all');
    const youngDataPoints = extractDataPointsByStatLabel(record, 'young');
    const productiveDataPoints = extractDataPointsByStatLabel(record, 'productive');
    const elderlyDataPoints = extractDataPointsByStatLabel(record, 'elderly');

    expect(allDataPoints).toEqual([
      {
        year: 2000,
        1: 1000000,
        2: 2000000,
      },
      {
        year: 2005,
        1: 1100000,
        2: 2200000,
      },
      {
        year: 2010,
        1: null,
        2: 2400000,
      },
      {
        year: 2015,
        1: null,
        2: 2600000,
      },
      {
        year: 2020,
        1: 1400000,
        2: 2800000,
      },
      {
        year: 2025,
        1: 1500000,
        2: 3000000,
      },
    ]);
    expect(youngDataPoints).toEqual([
      {
        year: 2000,
        1: 100000,
        2: 200000,
      },
      {
        year: 2005,
        1: 110000,
        2: 220000,
      },
      {
        year: 2010,
        1: null,
        2: 240000,
      },
      {
        year: 2015,
        1: null,
        2: 260000,
      },
      {
        year: 2020,
        1: 140000,
        2: 280000,
      },
      {
        year: 2025,
        1: 150000,
        2: 300000,
      },
    ]);
    expect(productiveDataPoints).toEqual([
      {
        year: 2000,
        1: 800000,
        2: 1600000,
      },
      {
        year: 2005,
        1: 880000,
        2: 1760000,
      },
      {
        year: 2010,
        1: null,
        2: 1920000,
      },
      {
        year: 2015,
        1: null,
        2: 2080000,
      },
      {
        year: 2020,
        1: 1120000,
        2: 2240000,
      },
      {
        year: 2025,
        1: 1200000,
        2: 2400000,
      },
    ]);
    expect(elderlyDataPoints).toEqual([
      {
        year: 2000,
        1: 100000,
        2: 100000,
      },
      {
        year: 2005,
        1: 110000,
        2: 110000,
      },
      {
        year: 2010,
        1: null,
        2: 120000,
      },
      {
        year: 2015,
        1: null,
        2: 130000,
      },
      {
        year: 2020,
        1: 140000,
        2: 140000,
      },
      {
        year: 2025,
        1: 150000,
        2: 150000,
      },
    ]);
  });
});
