import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { FilterChip } from '../../atoms/FilterChip';
import { FilterBar } from './FilterBar';

describe('FilterBar', () => {
  it('renders its children', () => {
    render(
      <FilterBar aria-label="Filter by project">
        <FilterChip>Work</FilterChip>
        <FilterChip>Personal</FilterChip>
      </FilterBar>
    );

    expect(screen.getByRole('button', { name: 'Work' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Personal' })).toBeInTheDocument();
  });

  it('renders all chips', () => {
    render(
      <FilterBar aria-label="Filter by project">
        <FilterChip>Work</FilterChip>
        <FilterChip>Personal</FilterChip>
        <FilterChip>Shopping</FilterChip>
      </FilterBar>
    );

    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('accepts additional className', () => {
    const { container } = render(
      <FilterBar aria-label="Filter by project" className="custom-class">
        <FilterChip>Work</FilterChip>
      </FilterBar>
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  describe('accessibility', () => {
    it('has role="group" with an accessible label', () => {
      render(
        <FilterBar aria-label="Filter by project">
          <FilterChip>Work</FilterChip>
        </FilterBar>
      );

      expect(
        screen.getByRole('group', { name: 'Filter by project' })
      ).toBeInTheDocument();
    });

    it('has no axe violations', async () => {
      const { container } = render(
        <FilterBar aria-label="Filter by project">
          <FilterChip active>All</FilterChip>
          <FilterChip>Work</FilterChip>
          <FilterChip>Personal</FilterChip>
        </FilterBar>
      );

      expect(await axe(container)).toHaveNoViolations();
    });
  });
});
