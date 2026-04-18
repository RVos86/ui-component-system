import { render, screen } from '@testing-library/react';
import { Typography } from './Typography';
import { axe } from 'jest-axe';

describe('Typography', () => {
  it('renders children correctly', () => {
    render(<Typography>Hello world</Typography>);

    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders body variant as <p> by default', () => {
    render(<Typography variant="body">Text</Typography>);

    expect(screen.getByText('Text').tagName).toBe('P');
  });

  it.each([
    ['h1', 'H1'],
    ['h2', 'H2'],
    ['h3', 'H3'],
    ['h4', 'H4'],
    ['h5', 'H5'],
    ['h6', 'H6'],
  ] as const)(
    '%s variant renders the correct semantic element',
    (variant, expectedTag) => {
      render(<Typography variant={variant}>Heading</Typography>);

      expect(screen.getByText('Heading').tagName).toBe(expectedTag);
    }
  );

  it.each([
    ['small', 'SPAN'],
    ['caption', 'SPAN'],
  ] as const)(
    '%s variant renders as <span> by default',
    (variant, expectedTag) => {
      render(<Typography variant={variant}>Text</Typography>);

      expect(screen.getByText('Text').tagName).toBe(expectedTag);
    }
  );

  it('allows overriding the element via `as` for flexible variants', () => {
    render(
      <Typography variant="body" as="label">
        Label text
      </Typography>
    );

    expect(screen.getByText('Label text').tagName).toBe('LABEL');
  });

  it.each([
    ['h1', 'text-5xl'],
    ['h2', 'text-4xl'],
    ['h3', 'text-3xl'],
    ['h4', 'text-2xl'],
    ['h5', 'text-xl'],
    ['h6', 'text-lg'],
    ['body', 'text-base'],
    ['small', 'text-sm'],
    ['caption', 'text-xs'],
  ] as const)(
    '%s variant applies correct text size class',
    (variant, expectedClass) => {
      render(<Typography variant={variant}>Text</Typography>);

      expect(screen.getByText('Text')).toHaveClass(expectedClass);
    }
  );

  it('forwards additional className', () => {
    render(<Typography className="custom-class">Text</Typography>);

    expect(screen.getByText('Text')).toHaveClass('custom-class');
  });

  describe('accessibility', () => {
    it('has no axe violations for body variant', async () => {
      const { container } = render(
        <Typography variant="body">Body text</Typography>
      );

      expect(await axe(container)).toHaveNoViolations();
    });

    it.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const)(
      'has no axe violations for %s variant',
      async (variant) => {
        const { container } = render(
          <Typography variant={variant}>Heading</Typography>
        );

        expect(await axe(container)).toHaveNoViolations();
      }
    );
  });
});
