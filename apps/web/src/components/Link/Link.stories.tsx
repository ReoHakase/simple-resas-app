import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

type Story = StoryObj<typeof Link>;

const meta: Meta<typeof Link> = {
  component: Link,
  tags: ['autodocs'],
  args: {
    external: undefined,
  },
  argTypes: {
    external: {
      description: 'If true, only an anchor tag <a> will be rendered instead of `next/link`.',
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;

export const Default: Story = {
  render: () => <Link href="/">Link</Link>,
};

export const External: Story = {
  ...Default,
  args: {
    external: true,
  },
};
