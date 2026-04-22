import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders the label', () => {
    render(<Checkbox label="Mark as complete" />);

    expect(screen.getByLabelText('Mark as complete')).toBeInTheDocument();
  });

  it('renders without a label', () => {
    render(<Checkbox />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('is unchecked by default', () => {
    render(<Checkbox label="Mark as complete" />);

    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('can be checked by default', () => {
    render(<Checkbox label="Mark as complete" defaultChecked />);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('toggles when clicked', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Mark as complete" />);

    await user.click(screen.getByLabelText('Mark as complete'));

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onChange when toggled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox label="Mark as complete" onChange={handleChange} />);

    await user.click(screen.getByLabelText('Mark as complete'));

    expect(handleChange).toHaveBeenCalled();
  });

  it('reflects controlled checked state', () => {
    const { rerender } = render(
      <Checkbox label="Mark as complete" checked={false} onChange={vi.fn()} />
    );

    expect(screen.getByRole('checkbox')).not.toBeChecked();

    rerender(<Checkbox label="Mark as complete" checked={true} onChange={vi.fn()} />);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  describe('disabled state', () => {
    it('is disabled when disabled prop is set', () => {
      render(<Checkbox label="Mark as complete" disabled />);

      expect(screen.getByRole('checkbox')).toBeDisabled();
    });

    it('does not toggle when disabled', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Mark as complete" disabled />);

      await user.click(screen.getByRole('checkbox'));

      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<Checkbox label="Mark as complete" />);

      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no axe violations when checked', async () => {
      const { container } = render(<Checkbox label="Mark as complete" defaultChecked />);

      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no axe violations when disabled', async () => {
      const { container } = render(<Checkbox label="Mark as complete" disabled />);

      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no axe violations without a label', async () => {
      const { container } = render(<Checkbox aria-label="Mark as complete" />);

      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
