import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus, ArrowRight, Trash2 } from 'lucide-react';
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

export const Small: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'lg',
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: 'Create task',
    variant: 'primary',
    leftIcon: <Plus />,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'Continue',
    variant: 'primary',
    rightIcon: <ArrowRight />,
  },
};

export const WithBothIcons: Story = {
  args: {
    children: 'Delete',
    variant: 'secondary',
    leftIcon: <Trash2 />,
    rightIcon: <ArrowRight />,
  },
};
