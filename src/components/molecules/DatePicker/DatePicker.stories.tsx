import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { action } from 'storybook/actions';
import { userEvent, within } from 'storybook/test';
import { DatePicker } from './DatePicker';
import { TEST_IDS } from '@/test/test-ids';

const meta: Meta<typeof DatePicker> = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A date picker built on react-day-picker. Click the input to open the calendar.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

function ControlledDatePicker(args: React.ComponentProps<typeof DatePicker>) {
  const [date, setDate] = useState<Date | undefined>(args.selected);
  return (
    <DatePicker
      {...args}
      selected={date}
      onDateChange={(d) => {
        setDate(d);
        action('onDateChange')(d);
      }}
    />
  );
}

export const Playground: Story = {
  tags: ['!autodocs'],
  render: (args) => <ControlledDatePicker {...args} />,
  args: {
    label: 'Due date',
    placeholder: 'Select a date...',
  },
};

export const Default: Story = {
  render: (args) => <ControlledDatePicker {...args} />,
  args: {
    label: 'Due date',
    placeholder: 'Select a date...',
  },
};

export const WithSelectedDate: Story = {
  render: (args) => <ControlledDatePicker {...args} />,
  args: {
    label: 'Due date',
    selected: new Date(2026, 5, 15),
  },
  parameters: {
    docs: {
      description: { story: 'DatePicker with a pre-selected date.' },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Due date',
    placeholder: 'Select a date...',
    disabled: true,
  },
};

export const Open: Story = {
  tags: ['!autodocs'],
  render: (args) => <ControlledDatePicker {...args} />,
  args: {
    label: 'Due date',
    selected: new Date(2026, 5, 15),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId(TEST_IDS.datePicker.input));
  },
};
