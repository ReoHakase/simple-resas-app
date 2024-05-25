import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { PrefectureCheckbox } from './PrefectureCheckbox';
import { css } from 'styled-system/css';

type Story = StoryObj<typeof PrefectureCheckbox>;

const meta: Meta<typeof PrefectureCheckbox> = {
  component: PrefectureCheckbox,
  tags: ['autodocs'],
  args: {
    prefCode: '1',
    prefLocale: '北海道',
    onChange: fn(),
  },
  decorators: [
    // a11yテストでラベルが存在しないエラーを防ぐために見えない<label>を追加
    (Story) => (
      <>
        <Story />
        <label htmlFor="example" className={css({ srOnly: true })}>
          Example
        </label>
      </>
    ),
  ],
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
  argTypes: {
    prefCode: {
      description: 'チェックボックスの都道府県コード',
      control: {
        type: 'text',
      },
    },
    prefLocale: {
      description: '都道府県名',
      control: {
        type: 'text',
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
  parameters: {
    nextjs: {
      navigation: {
        query: {
          prefCodes: '8,12,13,14',
        },
      },
    },
  },
  play: async ({ args, parameters, canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    const label = canvas.getByText(args.prefLocale);

    // チェックボックスがチェックされていないことを確認
    expect(checkbox).not.toBeChecked();

    // ラベルが表示されていることを確認
    expect(label).toBeVisible();

    checkbox.focus();
    await userEvent.keyboard('[Space]', { delay: 100 });

    // onChangeが1回呼び出されたことを確認
    expect(args.onChange).toHaveBeenCalledTimes(1);
    // searchParamsのprefCodesに与えた都道府県コードが追加されたことを確認
    expect(parameters.nextjs.navigation.push).toHaveBeenCalledTimes(1);
    expect(parameters.nextjs.navigation.push).toHaveBeenCalledWith('/all?prefCodes=1,8,12,13,14');
  },
};

export const Checked: Story = {
  parameters: {
    nextjs: {
      navigation: {
        query: {
          prefCodes: '1,8,12,13,14',
        },
      },
    },
  },
  play: async ({ args, parameters, canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    const label = canvas.getByText(args.prefLocale);

    // チェックボックスがチェックされていることを確認
    expect(checkbox).toBeChecked();

    // ラベルが表示されていることを確認
    expect(label).toBeVisible();

    checkbox.focus();
    await userEvent.keyboard('[Space]', { delay: 100 });

    // onChangeが1回呼び出されたことを確認
    expect(args.onChange).toHaveBeenCalledTimes(1);
    // searchParamsのprefCodesに与えた都道府県コードが削除されたことを確認
    expect(parameters.nextjs.navigation.push).toHaveBeenCalledTimes(1);
    expect(parameters.nextjs.navigation.push).toHaveBeenCalledWith('/all?prefCodes=8,12,13,14');
  },
};

export const Disabled: Story = {
  parameters: Default.parameters,
  args: {
    disabled: true,
  },
  play: async ({ args, parameters, canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    checkbox.focus();
    await userEvent.keyboard('[Space]', { delay: 100 });

    // onChangeが呼び出されなかったことを確認
    expect(args.onChange).toHaveBeenCalledTimes(0);
    expect(parameters.nextjs.navigation.push).toHaveBeenCalledTimes(0);
  },
};

export const DisabledChecked: Story = {
  parameters: Checked.parameters,
  args: {
    disabled: true,
  },
  play: Disabled.play,
};
