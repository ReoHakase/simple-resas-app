import type { Meta, StoryObj } from '@storybook/react';
import { Aurora } from './Aurora';
// import { css } from 'styled-system/css';

type Story = StoryObj<typeof Aurora>;

const meta: Meta<typeof Aurora> = {
  component: Aurora,
  tags: ['autodocs'],
  args: {},
};

export default meta;

export const Default: Story = {};
