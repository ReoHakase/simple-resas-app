import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerScrollArea,
  DrawerKnob,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from './Drawer';

type Story = StoryObj<typeof Drawer>;

const meta: Meta<typeof Drawer> = {
  component: Drawer,
  tags: ['autodocs'],
  args: {
    scrollable: false,
    onOpenChange: fn(),
    modal: true,
    children: (
      <>
        <DrawerTrigger asChild>
          <button>Open Drawer</button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerKnob />
            <DrawerScrollArea>
              <DrawerTitle>Drawer Title</DrawerTitle>
              <DrawerDescription>Drawer Description</DrawerDescription>
            </DrawerScrollArea>
            <DrawerClose>Close</DrawerClose>
          </DrawerContent>
        </DrawerPortal>
      </>
    ),
  },
  argTypes: {
    scrollable: {
      control: {
        type: 'boolean',
      },
      description: 'If true, the drawer content will be scrollable',
    },
    direction: {
      control: {
        type: 'radio',
        options: ['right', 'left', 'top', 'bottom'],
      },
      description: 'The direction from which the drawer will open',
    },
    modal: {
      control: {
        type: 'boolean',
      },
      description:
        'When `false` it allows to interact with elements outside of the drawer without closing it. Defaults to `true`.',
    },
    snapPoints: {
      control: {
        type: 'array',
      },
      description:
        "Array of numbers from 0 to 100 that corresponds to % of the screen a given snap point should take up. Should go from least visible. Example [0.2, 0.5, 0.8]. You can also use px values, which doesn't take screen height into account.",
    },
  },
};

export default meta;

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    await userEvent.click(trigger);
    expect(args.onOpenChange).toHaveBeenCalledWith(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await userEvent.keyboard('{Escape}', {
      delay: 300,
    });
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(args.onOpenChange).toHaveBeenCalledWith(false);
  },
};

export const Scrollable: Story = {
  args: {
    scrollable: true,
    children: (
      <>
        <DrawerTrigger asChild>
          <button>Open Drawer</button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerKnob />
            <DrawerScrollArea>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum. Dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
              ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum. Dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
              ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum. Dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
              ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
              <br />
            </DrawerScrollArea>
          </DrawerContent>
        </DrawerPortal>
      </>
    ),
  },
};

export const Undissmissable: Story = {
  args: {
    scrollable: true,
    open: true,
    dismissible: false,
    children: (
      <>
        <DrawerTrigger asChild>
          <button>Open Drawer</button>
        </DrawerTrigger>
        <DrawerPortal>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerKnob />
            <DrawerScrollArea>
              <DrawerTitle>Drawer Title</DrawerTitle>
              <DrawerDescription>Drawer Description</DrawerDescription>
            </DrawerScrollArea>
          </DrawerContent>
        </DrawerPortal>
      </>
    ),
  },
};

export const FromTop: Story = {
  // NOTE: You have to specify a variant via render function since this is the only way to let PandaCSS know about the usage.
  render: (args) => <Drawer {...args} direction={'top'} />,
  play: Default.play,
};

export const FromLeft: Story = {
  // NOTE: You have to specify a variant via render function since this is the only way to let PandaCSS know about the usage.
  render: (args) => <Drawer {...args} direction={'left'} />,
  play: Default.play,
};

export const FromRight: Story = {
  // NOTE: You have to specify a variant via render function since this is the only way to let PandaCSS know about the usage.
  render: (args) => <Drawer {...args} direction={'right'} />,
  play: Default.play,
};
