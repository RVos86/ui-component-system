import { cva, type VariantProps } from 'class-variance-authority';

const buttonStyles = cva(
  'inline-flex items-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary-hover focus-visible:ring-primary',
        secondary:
          'bg-secondary text-black hover:bg-secondary-hover focus-visible:ring-secondary',
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

const iconSize = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-5',
} as const;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  };

export function Button({
  variant,
  size = 'md',
  className,
  disabled,
  type,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  const iconClass = iconSize[size ?? 'md'];

  return (
    <button
      type={type ?? 'button'}
      className={buttonStyles({ variant, size, className })}
      disabled={disabled}
      {...props}
    >
      {leftIcon && (
        <span
          className={`inline-flex items-center ${iconClass} [&>svg]:size-full`}
        >
          {leftIcon}
        </span>
      )}
      {children}
      {rightIcon && (
        <span
          className={`inline-flex items-center ${iconClass} [&>svg]:size-full`}
        >
          {rightIcon}
        </span>
      )}
    </button>
  );
}
