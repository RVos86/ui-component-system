import { cva, type VariantProps } from 'class-variance-authority';
import { Folder, FolderOpen } from 'lucide-react';

const filterChipStyles = cva(
  'inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-primary',
  {
    variants: {
      active: {
        true: '',
        false: '',
      },
      variant: {
        filled: '',
        underline: '',
        folder: '',
      },
    },
    compoundVariants: [
      {
        active: true,
        variant: 'filled',
        className: 'bg-primary text-white',
      },
      {
        active: false,
        variant: 'filled',
        className: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      },
      {
        active: true,
        variant: 'underline',
        className: 'border-b-2 border-b-primary bg-gray-100 text-primary',
      },
      {
        active: false,
        variant: 'underline',
        className: 'bg-gray-100 text-gray-700 hover:bg-gray-50',
      },
      {
        active: true,
        variant: 'folder',
        className: 'bg-primary text-white',
      },
      {
        active: false,
        variant: 'folder',
        className: 'text-gray-700 hover:bg-gray-100',
      },
    ],
    defaultVariants: {
      active: false,
      variant: 'filled',
    },
  }
);

export type FilterChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof filterChipStyles>;

export function FilterChip({
  active,
  variant,
  className,
  children,
  ...props
}: FilterChipProps) {
  return (
    <button
      type="button"
      className={filterChipStyles({ active, variant, className })}
      aria-pressed={active ?? false}
      {...props}>
      {variant === 'folder' &&
        (active ? (
          <FolderOpen className="size-4 shrink-0" />
        ) : (
          <Folder className="size-4 shrink-0" />
        ))}
      {children}
    </button>
  );
}
