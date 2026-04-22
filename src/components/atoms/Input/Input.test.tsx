import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Search } from 'lucide-react';
import { Input } from './Input';

describe('Input', () => {
  it('renders correctly', () => {
    render(<Input label="Search" placeholder="Search tasks..." />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders the label', () => {
    render(<Input label="Search" />);

    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });

  it('associates label with input via htmlFor', () => {
    render(<Input label="Search" />);

    const input = screen.getByLabelText('Search');
    expect(input.tagName).toBe('INPUT');
  });

  it('renders without a label', () => {
    render(<Input placeholder="Search tasks..." />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<Input label="Search" />);

    await user.type(screen.getByLabelText('Search'), 'Testing 123');

    expect(screen.getByLabelText('Search')).toHaveValue('Testing 123');
  });

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input label="Search" onChange={handleChange} />);

    await user.type(screen.getByLabelText('Search'), 'a');

    expect(handleChange).toHaveBeenCalled();
  });

  it('reflects controlled value', async () => {
    const handleChange = vi.fn();
    const { rerender } = render(
      <Input label="Search" value="initial" onChange={handleChange} />
    );

    expect(screen.getByLabelText('Search')).toHaveValue('initial');

    rerender(<Input label="Search" value="updated" onChange={handleChange} />);

    expect(screen.getByLabelText('Search')).toHaveValue('updated');
  });

  describe('error state', () => {
    it('renders the error message', () => {
      render(<Input label="Search" error="Enter at least 3 characters." />);

      expect(screen.getByText('Enter at least 3 characters.')).toBeInTheDocument();
    });

    it('sets aria-invalid when error is present', () => {
      render(<Input label="Search" error="Required" />);

      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates error message via aria-describedby', () => {
      render(<Input label="Search" error="Required" />);

      const input = screen.getByRole('textbox');
      const errorId = input.getAttribute('aria-describedby');
      expect(document.getElementById(errorId!)).toHaveTextContent('Required');
    });

    it('applies error border class', () => {
      render(<Input label="Search" error="Required" />);

      expect(screen.getByRole('textbox')).toHaveClass('border-danger');
    });

    it('does not set aria-invalid when no error', () => {
      render(<Input label="Search" />);

      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid');
    });

    it('does not set aria-describedby when no error', () => {
      render(<Input label="Search" />);

      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-describedby');
    });
  });

  describe('disabled state', () => {
    it('is disabled when disabled prop is set', () => {
      render(<Input label="Search" disabled />);

      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('does not accept input when disabled', async () => {
      const user = userEvent.setup();
      render(<Input label="Search" disabled />);

      await user.type(screen.getByRole('textbox'), 'test');

      expect(screen.getByRole('textbox')).toHaveValue('');
    });
  });

  describe('icon', () => {
    it('renders an icon wrapper when icon is provided', () => {
      render(<Input label="Search" icon={<Search />} />);

      expect(screen.getByTestId('input-icon')).toBeInTheDocument();
    });

    it('does not render an icon wrapper when no icon is provided', () => {
      render(<Input label="Search" />);

      expect(screen.queryByTestId('input-icon')).not.toBeInTheDocument();
    });
  });

  describe('required', () => {
    it('sets aria-required when required prop is set', () => {
      render(<Input label="Search" required />);

      expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
    });

    it('does not set aria-required when not required', () => {
      render(<Input label="Search" />);

      expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-required');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(
        <Input label="Search" placeholder="Search tasks..." />
      );

      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no axe violations in error state', async () => {
      const { container } = render(<Input label="Search" error="Required" />);

      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no axe violations when disabled', async () => {
      const { container } = render(<Input label="Search" disabled />);

      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
