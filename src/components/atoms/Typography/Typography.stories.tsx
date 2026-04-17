import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'UI/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'small', 'caption'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A typography component that renders the correct semantic HTML element for each variant. Heading variants enforce their semantic element; body, small, and caption support an `as` override.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const Playground: Story = {
  tags: ['!autodocs'],
  args: {
    variant: 'body',
    children: 'The quick brown fox jumps over the lazy dog.',
  },
};

export const H1: Story = {
  args: { variant: 'h1', children: 'Heading 1' },
};

export const H2: Story = {
  args: { variant: 'h2', children: 'Heading 2' },
};

export const H3: Story = {
  args: { variant: 'h3', children: 'Heading 3' },
};

export const H4: Story = {
  args: { variant: 'h4', children: 'Heading 4' },
};

export const H5: Story = {
  args: { variant: 'h5', children: 'Heading 5' },
};

export const H6: Story = {
  args: { variant: 'h6', children: 'Heading 6' },
};

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'The quick brown fox jumps over the lazy dog.',
  },
};

export const Small: Story = {
  args: {
    variant: 'small',
    children: 'Small text for supporting content.',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Caption text for labels and metadata.',
  },
};

export const BodyAsLabel: Story = {
  args: {
    variant: 'body',
    as: 'label',
    children: 'Body rendered as a label element.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Flexible variants (body, small, caption) support an `as` prop to override the rendered element.',
      },
    },
  },
};
