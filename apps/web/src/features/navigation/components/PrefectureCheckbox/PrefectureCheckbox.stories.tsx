import type { Meta, StoryObj } from '@storybook/nextjs';
import { getRouter } from '@storybook/nextjs/navigation.mock';
import { expect, fn, userEvent, within } from 'storybook/test';
import { css } from 'styled-system/css';
import { PrefectureCheckbox } from './PrefectureCheckbox';

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
    Story => (
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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    const label = canvas.getByText(args.prefLocale);

    // チェックボックスがチェックされていないことを確認
    await expect(checkbox).not.toBeChecked();

    // ラベルが表示されていることを確認
    await expect(label).toBeVisible();

    checkbox.focus();
    await userEvent.keyboard('[Space]', { delay: 100 });

    // onChangeが1回呼び出されたことを確認
    await expect(args.onChange).toHaveBeenCalledTimes(1);
    // searchParamsのprefCodesに与えた都道府県コードが追加されたことを確認
    await expect(getRouter().push).toHaveBeenCalledTimes(1);
    await expect(getRouter().push).toHaveBeenCalledWith('/all?prefCodes=1,8,12,13,14', {
      scroll: false,
    });
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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    const label = canvas.getByText(args.prefLocale);

    // チェックボックスがチェックされていることを確認
    await expect(checkbox).toBeChecked();

    // ラベルが表示されていることを確認
    await expect(label).toBeVisible();

    checkbox.focus();
    await userEvent.keyboard('[Space]', { delay: 100 });

    // onChangeが1回呼び出されたことを確認
    await expect(args.onChange).toHaveBeenCalledTimes(1);
    // searchParamsのprefCodesに与えた都道府県コードが削除されたことを確認
    await expect(getRouter().push).toHaveBeenCalledTimes(1);
    await expect(getRouter().push).toHaveBeenCalledWith('/all?prefCodes=8,12,13,14', {
      scroll: false,
    });
  },
};

export const Disabled: Story = {
  parameters: Default.parameters,
  args: {
    disabled: true,
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');

    checkbox.focus();
    await userEvent.keyboard('[Space]', { delay: 100 });

    // onChangeが呼び出されなかったことを確認
    await expect(args.onChange).toHaveBeenCalledTimes(0);
    await expect(getRouter().push).toHaveBeenCalledTimes(0);
  },
};

export const DisabledChecked: Story = {
  parameters: Checked.parameters,
  args: {
    disabled: true,
  },
  play: Disabled.play,
};
