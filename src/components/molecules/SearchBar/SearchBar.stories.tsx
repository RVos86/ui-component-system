import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A search input with a pre-wired search icon. Composed from the Input atom.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof SearchBar>;

export const Playground: Story = {
  tags: ['!autodocs'],
  args: {
    label: 'Search',
    placeholder: 'Search tasks...',
  },
};

export const Default: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search tasks...',
    onSearch: action('onSearch'),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search tasks...',
    disabled: true,
  },
};
