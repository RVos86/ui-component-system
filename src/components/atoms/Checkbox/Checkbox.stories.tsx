import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A checkbox input with an optional label. Used to mark tasks as complete.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
  tags: ['!autodocs'],
  args: {
    label: 'Mark as complete',
  },
};

export const Default: Story = {
  args: {
    label: 'Mark as complete',
  },
};

export const Checked: Story = {
  args: {
    label: 'Mark as complete',
    defaultChecked: true,
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    label: 'Mark as complete',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Mark as complete',
    disabled: true,
    defaultChecked: true,
  },
};
