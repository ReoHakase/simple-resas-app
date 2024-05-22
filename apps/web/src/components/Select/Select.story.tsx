import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import {
  ChevronDown,
  Languages,
  CircleDotDashed,
  Sprout,
  Check,
  Sun,
  Moon,
  MonitorSmartphone,
  SwatchBook,
} from 'lucide-react';
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectIcon,
  SelectViewport,
  SelectPortal,
  SelectContent,
  SelectItemIndicator,
  SelectItemText,
  SelectItemDescription,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from './Select';
import { css } from 'styled-system/css';

type Story = StoryObj<typeof Select>;

const meta: Meta<typeof Select> = {
  component: Select,
  tags: ['autodocs'],
  args: {
    onOpenChange: fn(),
    onValueChange: fn(),
    children: (
      <>
        <SelectTrigger aria-label="Language selector" className={css({ w: '40' })}>
          <SelectValue placeholder="🌏 Language" />
          <SelectIcon>
            <ChevronDown />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal data-testid="select-portal">
          <SelectContent position="popper" side="bottom" sideOffset={4}>
            <SelectViewport>
              <SelectGroup>
                <SelectLabel>
                  <Languages className={css({ display: 'inline', w: '4', h: '4' })} /> Supported
                </SelectLabel>
                <SelectItem value="en">
                  <SelectItemText>🇺🇸 English</SelectItemText>
                  <SelectItemDescription>en-US</SelectItemDescription>
                  <SelectItemIndicator>
                    <Check />
                  </SelectItemIndicator>
                </SelectItem>
                <SelectItem value="ja">
                  <SelectItemText>🇯🇵 日本語</SelectItemText>
                  <SelectItemDescription>ja-JP</SelectItemDescription>
                  <SelectItemIndicator>
                    <Check />
                  </SelectItemIndicator>
                </SelectItem>
                <SelectItem value="ko">
                  <SelectItemText>🇰🇷 한국어</SelectItemText>
                  <SelectItemDescription>ko-KR</SelectItemDescription>
                  <SelectItemIndicator>
                    <Check />
                  </SelectItemIndicator>
                </SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>
                  <CircleDotDashed className={css({ display: 'inline', w: '4', h: '4' })} /> Work in Progress
                </SelectLabel>
                <SelectItem value="zh">
                  <SelectItemText>🇨🇳 中文</SelectItemText>
                  <SelectItemDescription>zh-CN</SelectItemDescription>
                  <SelectItemIndicator>
                    <Check />
                  </SelectItemIndicator>
                </SelectItem>
                <SelectItem value="es">
                  <SelectItemText>🇪🇸 Español</SelectItemText>
                  <SelectItemDescription>es-ES</SelectItemDescription>
                  <SelectItemIndicator>
                    <Check />
                  </SelectItemIndicator>
                </SelectItem>
                <SelectItem value="fr">
                  <SelectItemText>🇫🇷 Français</SelectItemText>
                  <SelectItemDescription>fr-FR</SelectItemDescription>
                  <SelectItemIndicator>
                    <Check />
                  </SelectItemIndicator>
                </SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>
                  <Sprout className={css({ display: 'inline', w: '4', h: '4' })} /> Planned
                </SelectLabel>
                <SelectItem value="de" disabled>
                  <SelectItemText>🇩🇪 Deutsch</SelectItemText>
                  <SelectItemDescription>de-DE</SelectItemDescription>
                </SelectItem>
                <SelectItem value="it" disabled>
                  <SelectItemText>🇮🇹 Italiano</SelectItemText>
                  <SelectItemDescription>it-IT</SelectItemDescription>
                </SelectItem>
              </SelectGroup>
            </SelectViewport>
          </SelectContent>
        </SelectPortal>
      </>
    ),
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
  args: {
    open: undefined,
    onOpenChange: fn(),
    onValueChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);
    expect(args.onOpenChange).toHaveBeenCalledWith(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}{ArrowUp}{ArrowDown}{ArrowDown}{ArrowUp}{Enter}', {
      delay: 300,
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(args.onOpenChange).toHaveBeenCalledWith(false);
    expect(args.onValueChange).toHaveBeenCalled();
    expect(args.onValueChange).toHaveBeenCalledWith('zh');
  },
};

export const AlwaysOpen: Story = {
  args: {
    open: true,
  },
  parameters: {
    a11y: {
      'test-runner': {
        // Disable a11y tests for this story since axe-playwright indicates false positives.
        // `@radix-ui/react-select` manually handles focus to trap it inside the select modal.
        // Tried to patch `@radix-ui/react-select` to give `<SelectContent>` an `aria-modal` attribute, but it was hard due to obfuscation.
        // See: https://stackoverflow.com/questions/62677291/aria-hidden-elements-do-not-contain-focusable-elements-issue-when-modal-is-sho
        disable: true,
      },
    },
  },
};

export const IconOnly: Story = {
  args: {
    defaultValue: 'system',
    children: (
      <>
        <SelectTrigger
          aria-label="Theme selector"
          className={css({ w: 'fit-content', aspectRatio: 'square', rounded: 'full' })}
        >
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectPortal aria-modal>
          <SelectContent position="popper" side="bottom" aria-modal>
            <SelectViewport aria-modal>
              <SelectGroup>
                <SelectLabel>
                  <SwatchBook className={css({ display: 'inline', w: '4', h: '4' })} /> Themes
                </SelectLabel>
                <SelectItem value="system">
                  <SelectItemText>
                    <MonitorSmartphone className={css({ display: 'inline', w: '4', h: '4' })} />
                  </SelectItemText>
                  System
                  <SelectItemIndicator>
                    <Check />
                  </SelectItemIndicator>
                </SelectItem>
                <SelectItem value="light">
                  <SelectItemText>
                    <Sun className={css({ display: 'inline', w: '4', h: '4' })} />
                  </SelectItemText>
                  Light
                  <SelectItemIndicator>
                    <Check />
                  </SelectItemIndicator>
                </SelectItem>
                <SelectItem value="dark">
                  <SelectItemText>
                    <Moon className={css({ display: 'inline', w: '4', h: '4' })} />
                  </SelectItemText>
                  Dark
                  <SelectItemIndicator>
                    <Check />
                  </SelectItemIndicator>
                </SelectItem>
              </SelectGroup>
            </SelectViewport>
          </SelectContent>
        </SelectPortal>
      </>
    ),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    await userEvent.click(trigger);
    expect(args.onOpenChange).toHaveBeenCalledWith(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowUp}{ArrowDown}{ArrowUp}{Enter}', {
      delay: 300,
    });
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(args.onOpenChange).toHaveBeenCalledWith(false);
    expect(args.onValueChange).toHaveBeenCalled();
    expect(args.onValueChange).toHaveBeenCalledWith('light');
  },
};
