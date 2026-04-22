import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterChip } from './FilterChip';

const meta: Meta<typeof FilterChip> = {
  title: 'Atoms/FilterChip',
  component: FilterChip,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['filled', 'underline', 'folder'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A selectable pill button used for filtering. The active state is controlled by the parent.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FilterChip>;

export const Playground: Story = {
  tags: ['!autodocs'],
  args: {
    children: 'Work',
    active: false,
    variant: 'filled',
  },
};

export const Default: Story = {
  args: {
    children: 'Work',
    active: false,
  },
};

export const Active: Story = {
  args: {
    children: 'Work',
    active: true,
  },
};

export const UnderlineDefault: Story = {
  args: {
    children: 'Work',
    active: false,
    variant: 'underline',
  },
};

export const UnderlineActive: Story = {
  args: {
    children: 'Work',
    active: true,
    variant: 'underline',
  },
};

export const FolderDefault: Story = {
  args: {
    children: 'Work',
    active: false,
    variant: 'folder',
  },
};

export const FolderActive: Story = {
  args: {
    children: 'Work',
    active: true,
    variant: 'folder',
  },
};
