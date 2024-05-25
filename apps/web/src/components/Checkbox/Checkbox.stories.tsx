import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { Checkbox } from './Checkbox';
import { css } from 'styled-system/css';

type Story = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    id: 'example',
    'aria-labelledby': 'example-label',
    onChange: fn(),
    checked: undefined,
  },
  decorators: [
    // a11yテストでラベルが存在しないエラーを防ぐために<label>を追加する。ストーリー内では見えない方が都合がいいので、スクリーンリーダーにしか見えないようにする。
    (Story) => (
      <>
        <Story />
        <label id="example-label" htmlFor="example" className={css({ srOnly: true })}>
          Example
        </label>
      </>
    ),
  ],
  argTypes: {
    id: {
      description: 'チェックボックスのID',
      control: {
        type: 'text',
      },
    },
    'aria-labelledby': {
      description:
        'ユーザーに向けた実際のラベルのID。独自の見た目を持つチェックボックスの実装に`<label>`を用いているため、スクリーンリーダーが読み上げるべきものを区別するために必要',
      control: {
        type: 'text',
      },
    },
    checked: {
      description: 'チェックボックスの値',
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      description: 'チェックボックスを無効にする',
      control: {
        type: 'boolean',
      },
    },
    defaultChecked: {
      description: 'チェックボックスの初期値',
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    checked: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    checkbox.click();

    checkbox.focus();
    await userEvent.keyboard('[Space][Space][Space]', { delay: 100 });

    // onChangeが1回呼び出されたことを確認
    expect(args.onChange).toHaveBeenCalledTimes(4);
  },
};

export const Unchecked: Story = {
  args: {
    checked: false,
  },
  play: Default.play,
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    checkbox.click();

    checkbox.focus();
    await userEvent.keyboard('[Space][Space][Space]', { delay: 100 });

    // onChangeが1回呼び出されたことを確認
    expect(args.onChange).toHaveBeenCalledTimes(0);
  },
};

export const CheckedDisabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
  play: Disabled.play,
};
