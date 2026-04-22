import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders as a span element', () => {
    render(<Badge variant="success">Completed</Badge>);

    expect(screen.getByText('Completed').tagName).toBe('SPAN');
  });

  it.each([
    ['danger', 'bg-danger', 'text-white'],
    ['warning', 'bg-warning', 'text-gray-800'],
    ['success', 'bg-success', 'text-white'],
    ['muted', 'bg-gray-200', 'text-gray-800'],
  ] as const)(
    'applies correct background and text color for %s variant',
    (variant, bgClass, textClass) => {
      render(<Badge variant={variant}>{variant}</Badge>);

      const badge = screen.getByText(variant);
      expect(badge).toHaveClass(bgClass);
      expect(badge).toHaveClass(textClass);
    }
  );

  it('defaults to muted variant', () => {
    render(<Badge>Label</Badge>);

    expect(screen.getByText('Label')).toHaveClass('bg-gray-200');
  });

  it('accepts additional className', () => {
    render(
      <Badge variant="success" className="custom-class">
        Label
      </Badge>
    );

    expect(screen.getByText('Label')).toHaveClass('custom-class');
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<Badge variant="danger">High</Badge>);

      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no axe violations for muted variant', async () => {
      const { container } = render(<Badge variant="muted">No due date</Badge>);

      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
