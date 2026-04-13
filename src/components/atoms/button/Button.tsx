import { cva, type VariantProps } from 'class-variance-authority';

const buttonStyles = cva('px-4 py-2 rounded-md font-medium transition-colors', {
  variants: {
    variant: {
      primary: 'bg-primary text-white hover:bg-primary-hover',
      secondary: 'bg-secondary text-black hover:bg-secondary-hover',
    },
    size: {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-md',
      lg: 'px-6 py-3 text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonStyles>;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}
