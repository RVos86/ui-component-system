import { Children, cloneElement, isValidElement } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const filterBarStyles = cva('flex', {
  variants: {
    direction: {
      horizontal: 'scrollbar-hide flex-row overflow-x-auto',
      vertical: 'flex-col gap-2',
    },
    variant: {
      default: '',
      segmented: '',
    },
  },
  compoundVariants: [
    {
      direction: 'horizontal',
      variant: 'default',
      className: 'gap-1',
    },
    {
      direction: 'horizontal',
      variant: 'segmented',
      className:
        'w-fit rounded-md border border-gray-200 [&>*:not(:last-child)]:border-r [&>*:not(:last-child)]:border-r-gray-200 [&>*]:rounded-none',
    },
  ],
  defaultVariants: {
    direction: 'horizontal',
    variant: 'default',
  },
});

export type FilterBarProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof filterBarStyles>;

export function FilterBar({ direction, variant, className, children, ...props }: FilterBarProps) {
  const chipVariant = variant === 'segmented' ? 'underline' : direction === 'vertical' ? 'folder' : 'filled';

  const chips = Children.map(children, (child) =>
    isValidElement(child) ? cloneElement(child as React.ReactElement<{ variant?: string }>, { variant: chipVariant }) : child
  );

  return (
    <div
      role="group"
      className={filterBarStyles({ direction, variant, className })}
      {...props}>
      {chips}
    </div>
  );
}
