import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A line that visually divides sections on the screen.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {};
