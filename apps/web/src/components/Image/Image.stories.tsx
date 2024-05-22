import type { Meta, StoryObj } from '@storybook/react';
import { Image } from './Image';
import SampleImage from '@public/icon.webp';

type Story = StoryObj<typeof Image>;

const meta: Meta<typeof Image> = {
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    src: {
      description: 'An url of the image.',
      control: {
        type: 'text',
      },
    },
    alt: {
      description: 'A text description of the image.',
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    src: SampleImage,
    alt: '代替テキスト',
  },
};
