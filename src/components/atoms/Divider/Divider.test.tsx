import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Divider } from './Divider';
import { TEST_IDS } from '@/test/test-ids';

describe('Divider', () => {
  it('renders a div with the correct classes', () => {
    render(<Divider />);

    const divider = screen.getByTestId(TEST_IDS.divider.root);
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
