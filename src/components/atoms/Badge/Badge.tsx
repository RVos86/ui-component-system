import { cva, type VariantProps } from 'class-variance-authority';
import { TEST_IDS } from '@/test/test-ids';

const badgeStyles = cva(
  'inline-flex items-center rounded-md px-3 py-1 text-sm font-medium',
  {
    variants: {
      variant: {
        danger: 'bg-danger text-white',
        warning: 'bg-warning text-gray-800',
        success: 'bg-success text-white',
        muted: 'bg-gray-200 text-gray-800',
      },
    },
    defaultVariants: {
      variant: 'muted',
    },
  }
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeStyles>;

export function Badge({ variant, className, children, ...props }: BadgeProps) {
  return (
    <span data-testid={TEST_IDS.badge.root} className={badgeStyles({ variant, className })} {...props}>
      {children}
    </span>
  );
}
