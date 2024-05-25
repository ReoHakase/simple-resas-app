import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { PrefectureStateBar } from './PrefectureStateBar';

type Story = StoryObj<typeof PrefectureStateBar>;

const meta: Meta<typeof PrefectureStateBar> = {
  component: PrefectureStateBar,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/all',
        query: {
          prefCodes: '8,12,13,14',
        },
      },
    },
  },
  argTypes: {},
};

export default meta;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const clearButton = canvas.getByRole('link');
    const heading = canvas.getByRole('heading');

    expect(heading).toHaveTextContent('4つの都道府県を選択中');
    expect(clearButton.getAttribute('href')).toBe('/all');
  },
};
