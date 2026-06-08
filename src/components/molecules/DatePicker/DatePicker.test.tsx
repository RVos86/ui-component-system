import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { useState } from 'react';
import { DatePicker } from './DatePicker';
import { TEST_IDS } from '@/test/test-ids';

function ControlledDatePicker({ initialDate }: { initialDate?: Date }) {
  const [date, setDate] = useState<Date | undefined>(initialDate);
  return <DatePicker label="Due date" selected={date} onDateChange={setDate} />;
}

describe('DatePicker', () => {
  it('shows the placeholder when no date is selected', () => {
    render(<DatePicker label="Due date" placeholder="Select a date..." />);

    expect(screen.getByTestId(TEST_IDS.datePicker.input)).toHaveValue('');
    expect(screen.getByTestId(TEST_IDS.datePicker.input)).toHaveAttribute(
      'placeholder',
      'Select a date...'
    );
  });

  it('displays a pre-selected date', () => {
    render(<DatePicker label="Due date" selected={new Date(2030, 5, 15)} />);

    expect(screen.getByTestId(TEST_IDS.datePicker.input)).toHaveValue('15 Jun 2030');
  });

  it('opens the calendar when the input is clicked', async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Due date" />);

    await user.click(screen.getByTestId(TEST_IDS.datePicker.input));

    expect(screen.getByTestId(TEST_IDS.datePicker.calendar)).toBeInTheDocument();
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('closes the calendar after selecting a date', async () => {
    const user = userEvent.setup();
    render(<ControlledDatePicker initialDate={new Date(2026, 5, 1)} />);

    await user.click(screen.getByTestId(TEST_IDS.datePicker.input));
    await user.click(within(screen.getByRole('grid')).getByText('15'));

    expect(screen.queryByTestId(TEST_IDS.datePicker.calendar)).not.toBeInTheDocument();
  });

  it('updates the input after selecting a date', async () => {
    const user = userEvent.setup();
    render(<ControlledDatePicker initialDate={new Date(2026, 5, 1)} />);

    await user.click(screen.getByTestId(TEST_IDS.datePicker.input));
    await user.click(within(screen.getByRole('grid')).getByText('15'));

    expect(screen.getByTestId(TEST_IDS.datePicker.input)).toHaveValue('15 Jun 2026');
  });

  it('calls onDateChange with the selected date', async () => {
    const user = userEvent.setup();
    const handleDateChange = vi.fn();
    render(
      <DatePicker
        label="Due date"
        selected={new Date(2026, 5, 1)}
        onDateChange={handleDateChange}
      />
    );

    await user.click(screen.getByTestId(TEST_IDS.datePicker.input));
    await user.click(within(screen.getByRole('grid')).getByText('15'));

    expect(handleDateChange).toHaveBeenCalledWith(new Date(2026, 5, 15));
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<DatePicker label="Due date" disabled />);

    await user.click(screen.getByTestId(TEST_IDS.datePicker.input));

    expect(screen.queryByTestId(TEST_IDS.datePicker.calendar)).not.toBeInTheDocument();
  });

  describe('accessibility', () => {
    it('has no axe violations when closed', async () => {
      const { container } = render(<DatePicker label="Due date" />);

      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no axe violations when open', async () => {
      const user = userEvent.setup();
      const { container } = render(<DatePicker label="Due date" />);

      await user.click(screen.getByTestId(TEST_IDS.datePicker.input));

      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
