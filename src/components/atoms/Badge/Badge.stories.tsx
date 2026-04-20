import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['danger', 'warning', 'success', 'muted'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A compact label used to communicate status or priority. Variants express visual intent — the consumer maps business values (e.g. "High", "Today") to the appropriate variant.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Playground: Story = {
  tags: ['!autodocs'],
  args: {
    children: 'High',
    variant: 'danger',
  },
};

export const Danger: Story = {
  args: { children: 'High', variant: 'danger' },
  parameters: {
    docs: {
      description: { story: 'Used for high priority or tasks due today.' },
    },
  },
};

export const Warning: Story = {
  args: { children: 'Medium', variant: 'warning' },
  parameters: {
    docs: {
      description: {
        story: 'Used for medium priority or tasks due tomorrow.',
      },
    },
  },
};

export const Success: Story = {
  args: { children: 'Low', variant: 'success' },
  parameters: {
    docs: {
      description: { story: 'Used for low priority or completed tasks.' },
    },
  },
};

export const Muted: Story = {
  args: { children: 'No due date', variant: 'muted' },
  parameters: {
    docs: {
      description: {
        story: 'Used for tasks with no due date or an upcoming date.',
      },
    },
  },
};
