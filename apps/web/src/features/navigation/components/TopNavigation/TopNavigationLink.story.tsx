import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Newspaper } from 'lucide-react';
import { TopNavigationLink } from './TopNavigationLink';
import { css } from 'styled-system/css';

type Story = StoryObj<typeof TopNavigationLink>;

const meta: Meta<typeof TopNavigationLink> = {
  component: TopNavigationLink,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className={css({ w: '72' })}>
        <Story />
      </div>
    ),
  ],
  args: {
    href: '/docs/example',
    children: (
      <>
        <Newspaper />
        Example
      </>
    ),
  },
  argTypes: {},
};

export default meta;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');
    expect(link).toHaveAttribute('href', args.href);
  },
};

export const Selected: Story = {
  args: {
    selected: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');
    expect(link).toHaveAttribute('href', args.href);
    expect(link).toHaveAttribute('aria-current', 'page');
  },
};
