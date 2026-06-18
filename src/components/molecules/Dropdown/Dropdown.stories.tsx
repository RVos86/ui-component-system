import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { action } from 'storybook/actions';
import { userEvent, within } from 'storybook/test';
import { Dropdown } from './Dropdown';
import { TEST_IDS } from '@/test/test-ids';

const meta: Meta<typeof Dropdown> = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A single-select dropdown. Supports keyboard navigation (ArrowDown/Up, Enter, Escape).',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

const options = ['Work', 'Personal', 'Shopping', 'Health', 'Finance'];

function ControlledDropdown(args: React.ComponentProps<typeof Dropdown>) {
  const [value, setValue] = useState<string | undefined>(args.value);
  return (
    <Dropdown
      {...args}
      value={value}
      onChange={(v) => {
        setValue(v);
        action('onChange')(v);
      }}
    />
  );
}

export const Playground: Story = {
  tags: ['!autodocs'],
  render: (args) => <ControlledDropdown {...args} />,
  args: {
    label: 'Project',
    options,
  },
};

export const Default: Story = {
  render: (args) => <ControlledDropdown {...args} />,
  args: {
    label: 'Project',
    options,
  },
};

export const WithSelectedValue: Story = {
  render: (args) => <ControlledDropdown {...args} />,
  args: {
    label: 'Project',
    options,
    value: 'Work',
  },
  parameters: {
    docs: {
      description: { story: 'Dropdown with a pre-selected value.' },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Project',
    options,
    value: 'Work',
    disabled: true,
  },
};

export const Open: Story = {
  tags: ['!autodocs'],
  render: (args) => <ControlledDropdown {...args} />,
  args: {
    label: 'Project',
    options,
    value: 'Work',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId(TEST_IDS.dropdown.trigger));
  },
};
