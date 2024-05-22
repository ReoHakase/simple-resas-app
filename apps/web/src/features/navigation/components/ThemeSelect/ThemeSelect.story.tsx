import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { ThemeSelect } from './ThemeSelect';
import { ThemeProvider } from '@/providers/ThemeProvider';

type Story = StoryObj<typeof ThemeSelect>;

const meta: Meta<typeof ThemeSelect> = {
  component: ThemeSelect,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
    (Story) => {
      const { setTheme } = useTheme();
      useEffect(() => {
        setTheme('light');
      }, [setTheme]);
      return <Story />;
    },
  ],
  args: {
    onOpenChange: fn(),
    onValueChange: fn(),
  },
  argTypes: {
    open: {
      control: {
        type: 'boolean',
      },
      description: 'If true, the select content will be visible',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Event handler for when the select content visibility changes',
    },
    onValueChange: {
      action: 'onValueChange',
      description: 'Event handler for when the select value changes',
    },
    value: {
      control: {
        type: 'text',
      },
      description: 'The current value of the select',
    },
  },
};

export default meta;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);
    expect(args.onOpenChange).toHaveBeenCalledWith(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.keyboard('{ArrowUp}{ArrowUp}{ArrowUp}{ArrowDown}{ArrowDown}{ArrowUp}{ArrowDown}{Enter}', {
      delay: 300,
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(args.onOpenChange).toHaveBeenCalledWith(false);
    expect(args.onValueChange).toHaveBeenCalled();
    expect(args.onValueChange).toHaveBeenCalledWith('dark');
  },
};
