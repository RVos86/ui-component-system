import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { FilterChip } from './FilterChip';

describe('FilterChip', () => {
  it('renders the label', () => {
    render(<FilterChip>Work</FilterChip>);

    expect(screen.getByRole('button', { name: 'Work' })).toBeInTheDocument();
  });

  it('renders as a button element', () => {
    render(<FilterChip>Work</FilterChip>);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<FilterChip onClick={handleClick}>Work</FilterChip>);

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  describe('active state', () => {
    it('applies active styles when active is true', () => {
      render(<FilterChip active>Work</FilterChip>);

      expect(screen.getByRole('button')).toHaveClass('bg-primary');
    });

    it('applies inactive styles when active is false', () => {
      render(<FilterChip active={false}>Work</FilterChip>);

      expect(screen.getByRole('button')).toHaveClass('bg-gray-100');
    });

    it('sets aria-pressed to true when active', () => {
      render(<FilterChip active>Work</FilterChip>);

      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    });

    it('sets aria-pressed to false when inactive', () => {
      render(<FilterChip active={false}>Work</FilterChip>);

      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<FilterChip>Work</FilterChip>);

      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no axe violations when active', async () => {
      const { container } = render(<FilterChip active>Work</FilterChip>);

      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
