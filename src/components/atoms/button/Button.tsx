import { cva, type VariantProps } from 'class-variance-authority';

const buttonStyles = cva(
  'px-4 py-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary-hover focus-visible:ring-primary',
        secondary: 'bg-secondary text-black hover:bg-secondary-hover focus-visible:ring-secondary',
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
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonStyles>;

export function Button({ variant, size, className, disabled, type, ...props }: ButtonProps) {
  return (
    <button
      type={type ?? 'button'}
      className={buttonStyles({ variant, size, className })}
      disabled={disabled}
      {...props}
    />
  );
}
