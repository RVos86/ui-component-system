import type { Meta, StoryObj } from '@storybook/react-vite';
import { Search } from 'lucide-react';
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
    label: 'Search',
    placeholder: 'Search tasks...',
  },
};

export const Default: Story = {
  args: {
    placeholder: 'Search tasks...',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search tasks...',
    icon: <Search />,
  },
  parameters: {
    docs: {
      description: { story: 'Input with a leading search icon.' },
    },
  },
};

export const WithError: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search tasks...',
    error: 'Please enter at least 3 characters.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input in an error state with a validation message.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search tasks...',
    icon: <Search />,
    disabled: true,
  },
};
