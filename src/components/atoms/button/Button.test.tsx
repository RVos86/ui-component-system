import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Button } from './Button';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button variant="primary">Click me</Button>);

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button variant="primary" onClick={handleClick}>
        Click me
      </Button>
    );

    await user.click(screen.getByText('Click me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire click when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button variant="primary" disabled onClick={handleClick}>
        Click me
      </Button>
    );

    await user.click(screen.getByText('Click me'));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it.each([
    ['primary', 'bg-primary'],
    ['secondary', 'bg-secondary'],
  ] as const)('applies %s variant classes', (variant, expectedClass) => {
    render(<Button variant={variant}>Click me</Button>);

    expect(screen.getByText('Click me')).toHaveClass(expectedClass);
  });

  it.each([
    ['sm', 'text-sm'],
    ['md', 'text-md'],
    ['lg', 'text-lg'],
  ] as const)('applies %s size classes', (size, expectedClass) => {
    render(<Button size={size}>Click me</Button>);

    expect(screen.getByText('Click me')).toHaveClass(expectedClass);
  });

  describe('accessibility', () => {
    it('has type="button" by default', () => {
      render(<Button>Click me</Button>);

      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('sets aria-disabled when disabled', () => {
      render(<Button disabled>Click me</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('does not set aria-disabled when enabled', () => {
      render(<Button>Click me</Button>);

      expect(screen.getByRole('button')).not.toHaveAttribute('aria-disabled');
    });

    it('applies disabled styles when disabled', () => {
      render(<Button disabled>Click me</Button>);

      expect(screen.getByRole('button')).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
    });
  });
});
