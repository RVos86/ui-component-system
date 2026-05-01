import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders a div with the correct classes', () => {
    const { container } = render(<Divider />);

    const divider = container.firstChild as HTMLElement;
    expect(divider.tagName).toBe('DIV');
    expect(divider).toHaveClass('h-px', 'bg-gray-300');
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(<Divider />);

      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
