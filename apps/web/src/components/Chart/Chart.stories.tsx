import type { Meta, StoryObj } from '@storybook/react';
import { Chart } from './Chart';
import type { ChartProps } from './Chart';
import { css } from 'styled-system/css';

const chartProps: ChartProps<'year', 'apple' | 'banana' | 'grape'> = {
  dataKey: 'year',
  unitX: '年',
  unitY: '個',
  series: [
    {
      name: 'apple',
      label: 'りんご',
      color: 'red',
    },
    {
      name: 'banana',
      label: 'バナナ',
      color: 'amber',
    },
    {
      name: 'grape',
      label: 'ぶどう',
      color: 'purple',
    },
  ],
  data: [
    {
      year: '1960',
      apple: 100,
      banana: 200,
      grape: 300,
    },
    {
      year: '1965',
      apple: 104,
      banana: 190,
      grape: 305,
    },
    {
      year: '1970',
      apple: 97,
      banana: 130,
      grape: 290,
    },
    {
      year: '1975',
      apple: 122,
      banana: 150,
      grape: 215,
    },
    {
      year: '1980',
      apple: 119,
      banana: 162,
      grape: 420,
    },
    {
      year: '1985',
      apple: 127,
      banana: 250,
      grape: 325,
    },
    {
      year: '1990',
      apple: 174,
      banana: 180,
      grape: 340,
    },
    {
      year: '1995',
      apple: 128,
      banana: 130,
      grape: 335,
    },
    {
      year: '2000',
      apple: 132,
      banana: 120,
      grape: 340,
    },
    {
      year: '2005',
      apple: 236,
      banana: 150,
      grape: 375,
    },
    {
      year: '2010',
      apple: 140,
      banana: 100,
      grape: 350,
    },
    {
      year: '2015',
      apple: 164,
      banana: 10,
      grape: 255,
    },
    {
      year: '2020',
      apple: 148,
      banana: 80,
      grape: 360,
    },
  ],
};

type Story = StoryObj<typeof Chart>;

const meta: Meta<typeof Chart> = {
  component: Chart,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className={css({ w: 'full', h: '500px' })}>
        <Story />
      </div>
    ),
  ],
  args: chartProps as ChartProps<string, string>,
};

export default meta;

export const Default: Story = {};
