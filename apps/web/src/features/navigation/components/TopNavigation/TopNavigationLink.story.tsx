import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { Baby } from 'lucide-react';
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
    href: '/young',
    children: (
      <>
        <Baby />
        年少人口
      </>
    ),
  },
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/all',
        query: {
          prefCodes: '11,24',
        },
      },
    },
  },
  argTypes: {},
};

export default meta;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');
    expect(link).toHaveAttribute('href', `${args.href.toString()}?prefCodes=11,24`);
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    href: '/elderly',
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link');
    expect(link).toHaveAttribute('href', `${args.href.toString()}?prefCodes=11,24`);
    expect(link).toHaveAttribute('aria-current', 'page');
  },
};
