import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

type Story = StoryObj<typeof Header>;

const meta: Meta<typeof Header> = {
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
export const Default: Story = {};
