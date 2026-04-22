import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FilterChip } from '../../atoms/FilterChip';
import { FilterBar } from './FilterBar';

const meta: Meta<typeof FilterBar> = {
  title: 'Molecules/FilterBar',
  component: FilterBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A filter bar that renders chips either as a horizontally scrollable row or a vertical stack, controlled via the direction prop.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FilterBar>;

const filters = ['Work', 'Personal', 'Shopping', 'Health', 'Finance', 'Home', 'Travel'];

function FilterBarDemo({
  filters,
  direction,
  variant,
}: {
  filters: string[];
  direction?: 'horizontal' | 'vertical';
  variant?: 'default' | 'segmented';
}) {
  const [active, setActive] = useState(filters[0]);
  return (
    <FilterBar direction={direction} variant={variant} aria-label="Filter by project">
      {filters.map((label) => (
        <FilterChip
          key={label}
          active={active === label}
          onClick={() => setActive(label)}>
          {label}
        </FilterChip>
      ))}
    </FilterBar>
  );
}

export const Playground: Story = {
  tags: ['!autodocs'],
  argTypes: {
    direction: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'radio',
      options: ['default', 'segmented'],
    },
  },
  args: {
    direction: 'horizontal',
    variant: 'default',
  },
  render: ({ direction, variant }) => (
    <FilterBarDemo
      filters={filters}
      direction={direction ?? 'horizontal'}
      variant={variant ?? 'default'}
    />
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div>
      <FilterBarDemo filters={filters} />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div>
      <FilterBarDemo filters={filters} direction="vertical" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Used on large viewports only (e.g. a left sidebar). Automatically uses the folder chip variant — folder icon when inactive, folder-open when active.',
      },
    },
  },
};

export const Segmented: Story = {
  render: () => <FilterBarDemo filters={filters} variant="segmented" />,
};
