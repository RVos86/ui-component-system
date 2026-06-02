import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from 'lucide-react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A text input field with optional label, icon, and error state. Used as a base for search, forms, and other text entry.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Playground: Story = {
  tags: ['!autodocs'],
  args: {
    label: 'Task title',
    placeholder: 'Enter task title...',
  },
};

export const Default: Story = {
  args: {
    label: 'Task title',
    placeholder: 'Enter task title...',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Task title',
    placeholder: 'Enter task title...',
    icon: <Tag />,
  },
  parameters: {
    docs: {
      description: { story: 'Input with a leading icon.' },
    },
  },
};

export const WithError: Story = {
  args: {
    label: 'Task title',
    placeholder: 'Enter task title...',
    error: 'Task title is required.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input in an error state with a validation message.',
      },
    },
  },
};

export const GrayBackground: Story = {
  args: {
    label: 'Task title',
    placeholder: 'Enter task title...',
    background: 'gray',
  },
  parameters: {
    backgrounds: { default: 'white' },
    docs: {
      description: {
        story: 'Use background="gray" to give the input a gray background.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Task title',
    placeholder: 'Enter task title...',
    disabled: true,
  },
};
