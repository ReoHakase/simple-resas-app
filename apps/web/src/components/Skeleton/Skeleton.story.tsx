import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { css } from 'styled-system/css';

type Story = StoryObj<typeof Skeleton>;

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  tags: ['autodocs'],
  args: {
    inline: true,
    className: css({ w: '80' }),
  },
  argTypes: {
    inline: {
      control: {
        type: 'boolean',
      },
      description: 'If true, the skeleton gets displayed in inline style with `<span>` tag.',
    },
    lines: {
      control: {
        type: 'number',
      },
      description: 'The number of lines to display',
    },
    level: {
      control: {
        type: 'select',
        options: ['title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'normal'],
      },
      description: 'The level of the skeleton, which determines the size when `inline` is `true`.',
    },
  },
};

export default meta;

export const Default: Story = {};

export const MultipleLines: Story = {
  args: {
    lines: 6,
  },
};
