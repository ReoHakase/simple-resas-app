import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from '@storybook/test';
import { PrefectureCheckboxFieldset } from './PrefectureCheckboxFieldset';

type Story = StoryObj<typeof PrefectureCheckboxFieldset>;

const meta: Meta<typeof PrefectureCheckboxFieldset> = {
  component: PrefectureCheckboxFieldset,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        push: fn(async (...args: unknown[]) => action('nextRouter.push')(...args)),
        pathname: '/all',
        query: {
          prefCodes: '11,24',
        },
      },
    },
  },
};

export default meta;

export const Default: Story = {
  parameters: {
    nextjs: {
      navigation: {
        query: {
          prefCodes: '8,12,13,14',
        },
      },
    },
  },
  play: async ({ canvasElement }) => {
    // TODO: RESAS APIからのレスポンスをモックする
    const canvas = within(canvasElement);
    const checkboxes = await canvas.findAllByRole('checkbox');
    expect(checkboxes).toHaveLength(47);
  },
};
