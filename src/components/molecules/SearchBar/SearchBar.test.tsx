import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { SearchBar } from './SearchBar';
import { TEST_IDS } from '@/test/test-ids';

describe('SearchBar', () => {
  it('renders a search input', () => {
    render(<SearchBar label="Search" />);

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('renders the search icon', () => {
    render(<SearchBar label="Search" />);

    expect(screen.getByTestId(TEST_IDS.input.icon)).toBeInTheDocument();
  });

  it('uses the default placeholder', () => {
    render(<SearchBar label="Search" />);

    expect(screen.getByRole('searchbox')).toHaveAttribute(
      'placeholder',
      'Search tasks...'
    );
  });

  it('accepts a custom placeholder', () => {
    render(<SearchBar label="Search" placeholder="Custom placeholder" />);

    expect(screen.getByRole('searchbox')).toHaveAttribute(
      'placeholder',
      'Custom placeholder'
    );
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<SearchBar label="Search" />);

    await user.type(screen.getByRole('searchbox'), 'design system');

    expect(screen.getByRole('searchbox')).toHaveValue('design system');
  });

  it('calls onSearch with the current value on every keystroke', async () => {
    const user = userEvent.setup();
    const handleSearch = vi.fn();
    render(<SearchBar label="Search" onSearch={handleSearch} />);

    await user.type(screen.getByRole('searchbox'), 'abc');

    expect(handleSearch).toHaveBeenCalledTimes(3);
    expect(handleSearch).toHaveBeenLastCalledWith('abc');
  });

  describe('clear button', () => {
    it('is not visible when the field is empty', () => {
      render(<SearchBar label="Search" />);

      expect(
        screen.queryByRole('button', { name: 'Clear search' })
      ).not.toBeInTheDocument();
    });

    it('appears when the user types', async () => {
      const user = userEvent.setup();
      render(<SearchBar label="Search" />);

      await user.type(screen.getByRole('searchbox'), 'abc');

      expect(screen.getByRole('button', { name: 'Clear search' })).toBeInTheDocument();
    });

    it('clears the input when clicked', async () => {
      const user = userEvent.setup();
      render(<SearchBar label="Search" />);

      await user.type(screen.getByRole('searchbox'), 'abc');
      await user.click(screen.getByRole('button', { name: 'Clear search' }));

      expect(screen.getByRole('searchbox')).toHaveValue('');
    });

    it('calls onSearch with an empty string when cleared', async () => {
      const user = userEvent.setup();
      const handleSearch = vi.fn();
      render(<SearchBar label="Search" onSearch={handleSearch} />);

      await user.type(screen.getByRole('searchbox'), 'abc');
      await user.click(screen.getByRole('button', { name: 'Clear search' }));

      expect(handleSearch).toHaveBeenLastCalledWith('');
    });
  });

  describe('disabled state', () => {
    it('is disabled when disabled prop is set', () => {
      render(<SearchBar label="Search" disabled />);

      expect(screen.getByRole('searchbox')).toBeDisabled();
    });

    it('does not accept input when disabled', async () => {
      const user = userEvent.setup();
      render(<SearchBar label="Search" disabled />);

      await user.type(screen.getByRole('searchbox'), 'test');

      expect(screen.getByRole('searchbox')).toHaveValue('');
    });
  });

  describe('accessibility', () => {
    it('has no axe violations', async () => {
      const { container } = render(
        <SearchBar label="Search" placeholder="Search tasks..." />
      );

      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no axe violations when disabled', async () => {
      const { container } = render(<SearchBar label="Search" disabled />);

      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
