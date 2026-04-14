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
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
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

export const Playground: Story = {
  tags: ['!autodocs'],
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'md',
  },
};

export const PrimaryButton: Story = {
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

export const SecondaryButton: Story = {
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

export const SmallButton: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'sm',
  },
};

export const MediumButton: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'md',
  },
};

export const LargeButton: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'lg',
  },
};
