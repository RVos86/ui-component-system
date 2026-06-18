import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Dropdown } from './Dropdown';
import { TEST_IDS } from '@/test/test-ids';

const options = ['Work', 'Personal', 'Shopping', 'Health'];

describe('Dropdown', () => {
  it('shows the placeholder when no value is selected', () => {
    render(<Dropdown label="Project" options={options} />);

    expect(screen.getByTestId(TEST_IDS.dropdown.trigger)).toHaveAttribute(
      'placeholder',
      'Select an option...'
    );
  });

  it('displays the selected value', () => {
    render(<Dropdown label="Project" options={options} value="Work" />);

    expect(screen.getByTestId(TEST_IDS.dropdown.trigger)).toHaveValue('Work');
  });

  it('opens the listbox when the trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<Dropdown label="Project" options={options} />);

    await user.click(screen.getByTestId(TEST_IDS.dropdown.trigger));

    expect(screen.getByTestId(TEST_IDS.dropdown.listbox)).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(options.length);
  });

  it('closes the listbox after selecting an option', async () => {
    const user = userEvent.setup();
    render(<Dropdown label="Project" options={options} />);

    await user.click(screen.getByTestId(TEST_IDS.dropdown.trigger));
    await user.click(screen.getByRole('option', { name: 'Work' }));

    expect(screen.queryByTestId(TEST_IDS.dropdown.listbox)).not.toBeInTheDocument();
  });

  it('calls onChange with the selected value', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Dropdown label="Project" options={options} onChange={handleChange} />);

    await user.click(screen.getByTestId(TEST_IDS.dropdown.trigger));
    await user.click(screen.getByRole('option', { name: 'Personal' }));

    expect(handleChange).toHaveBeenCalledWith('Personal');
  });

  it('marks the current value as selected', async () => {
    const user = userEvent.setup();
    render(<Dropdown label="Project" options={options} value="Shopping" />);

    await user.click(screen.getByTestId(TEST_IDS.dropdown.trigger));

    expect(screen.getByRole('option', { name: 'Shopping' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    expect(screen.getByRole('option', { name: 'Work' })).toHaveAttribute(
      'aria-selected',
      'false'
    );
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<Dropdown label="Project" options={options} disabled />);

    await user.click(screen.getByTestId(TEST_IDS.dropdown.trigger));

    expect(screen.queryByTestId(TEST_IDS.dropdown.listbox)).not.toBeInTheDocument();
  });

  describe('keyboard navigation', () => {
    it('opens the listbox on ArrowDown', async () => {
      const user = userEvent.setup();
      render(<Dropdown label="Project" options={options} />);

      screen.getByTestId(TEST_IDS.dropdown.trigger).focus();
      await user.keyboard('{ArrowDown}');

      expect(screen.getByTestId(TEST_IDS.dropdown.listbox)).toBeInTheDocument();
    });

    it('closes the listbox on Escape', async () => {
      const user = userEvent.setup();
      render(<Dropdown label="Project" options={options} />);

      await user.click(screen.getByTestId(TEST_IDS.dropdown.trigger));
      await user.keyboard('{Escape}');

      expect(screen.queryByTestId(TEST_IDS.dropdown.listbox)).not.toBeInTheDocument();
    });

    it('selects the focused option on Enter', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Dropdown label="Project" options={options} onChange={handleChange} />);

      screen.getByTestId(TEST_IDS.dropdown.trigger).focus();
      await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');

      expect(handleChange).toHaveBeenCalledWith(options[1]);
    });

    it('wraps from the last option to the first on ArrowDown', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Dropdown label="Project" options={options} onChange={handleChange} />);

      screen.getByTestId(TEST_IDS.dropdown.trigger).focus();
      for (let i = 0; i < options.length + 1; i++) await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');

      expect(handleChange).toHaveBeenCalledWith(options[0]);
    });

    it('opens and focuses the last option on ArrowUp when closed', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Dropdown label="Project" options={options} onChange={handleChange} />);

      screen.getByTestId(TEST_IDS.dropdown.trigger).focus();
      await user.keyboard('{ArrowUp}{Enter}');

      expect(handleChange).toHaveBeenCalledWith(options[options.length - 1]);
    });

    it('wraps from the first option to the last on ArrowUp', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Dropdown label="Project" options={options} onChange={handleChange} />);

      screen.getByTestId(TEST_IDS.dropdown.trigger).focus();
      await user.keyboard('{ArrowDown}{ArrowUp}{Enter}');

      expect(handleChange).toHaveBeenCalledWith(options[options.length - 1]);
    });

    it('opens and focuses the selected option on ArrowDown', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Dropdown
          label="Project"
          options={options}
          value="Shopping"
          onChange={handleChange}
        />
      );

      screen.getByTestId(TEST_IDS.dropdown.trigger).focus();
      await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');

      expect(handleChange).toHaveBeenCalledWith(options[3]);
    });

    it('opens and focuses the selected option on ArrowUp', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Dropdown
          label="Project"
          options={options}
          value="Shopping"
          onChange={handleChange}
        />
      );

      screen.getByTestId(TEST_IDS.dropdown.trigger).focus();
      await user.keyboard('{ArrowUp}{Enter}');

      expect(handleChange).toHaveBeenCalledWith(options[2]);
    });

    it('jumps to the first option on Home', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Dropdown label="Project" options={options} onChange={handleChange} />);

      screen.getByTestId(TEST_IDS.dropdown.trigger).focus();
      await user.keyboard('{ArrowUp}{Home}{Enter}');

      expect(handleChange).toHaveBeenCalledWith(options[0]);
    });

    it('jumps to the last option on End', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Dropdown label="Project" options={options} onChange={handleChange} />);

      screen.getByTestId(TEST_IDS.dropdown.trigger).focus();
      await user.keyboard('{ArrowDown}{End}{Enter}');

      expect(handleChange).toHaveBeenCalledWith(options[options.length - 1]);
    });

    it('opens and focuses the first option on Enter when no value is selected', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Dropdown label="Project" options={options} onChange={handleChange} />);

      screen.getByTestId(TEST_IDS.dropdown.trigger).focus();
      await user.keyboard('{Enter}{Enter}');

      expect(handleChange).toHaveBeenCalledWith(options[0]);
    });

    it('opens and focuses the selected option on Space', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(
        <Dropdown
          label="Project"
          options={options}
          value="Shopping"
          onChange={handleChange}
        />
      );

      screen.getByTestId(TEST_IDS.dropdown.trigger).focus();
      await user.keyboard('{ }{ }');

      expect(handleChange).toHaveBeenCalledWith('Shopping');
    });

    it('does not open or throw when there are no options', async () => {
      const user = userEvent.setup();
      render(<Dropdown label="Project" options={[]} />);

      screen.getByTestId(TEST_IDS.dropdown.trigger).focus();
      await user.keyboard('{ArrowDown}{ArrowUp}{Enter}');

      expect(screen.queryByTestId(TEST_IDS.dropdown.listbox)).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations when closed', async () => {
      const { container } = render(<Dropdown label="Project" options={options} />);

      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no axe violations when open', async () => {
      const user = userEvent.setup();
      const { container } = render(<Dropdown label="Project" options={options} />);

      await user.click(screen.getByTestId(TEST_IDS.dropdown.trigger));

      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no axe violations when disabled', async () => {
      const { container } = render(
        <Dropdown label="Project" options={options} disabled />
      );

      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
