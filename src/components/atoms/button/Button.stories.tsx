import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A reusable button component that supports multiple variants. Used for primary and secondary actions across the application.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Used for main call-to-action buttons.',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    children: 'Click me',
    variant: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Used for secondary call-to-action buttons.',
      },
    },
  },
};
