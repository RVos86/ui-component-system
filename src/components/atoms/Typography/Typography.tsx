import { cva } from 'class-variance-authority';

const typographyStyles = cva('', {
  variants: {
    variant: {
      h1: 'text-5xl font-bold leading-tight',
      h2: 'text-4xl font-bold leading-tight',
      h3: 'text-3xl font-semibold leading-snug',
      h4: 'text-2xl font-semibold leading-snug',
      h5: 'text-xl font-medium leading-normal',
      h6: 'text-lg font-medium leading-normal',
      body: 'text-base leading-relaxed',
      small: 'text-sm leading-normal',
      caption: 'text-xs leading-normal',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

type HeadingVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type FlexibleVariant = 'body' | 'small' | 'caption';

type HeadingProps = React.HTMLAttributes<HTMLElement> & {
  variant: HeadingVariant;
  as?: never;
};

type FlexibleProps = React.HTMLAttributes<HTMLElement> & {
  variant?: FlexibleVariant;
  as?: React.ElementType;
};

export type TypographyProps = HeadingProps | FlexibleProps;

const elementMap: Record<HeadingVariant | FlexibleVariant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  small: 'span',
  caption: 'span',
};

export function Typography({ variant = 'body', className, ...props }: TypographyProps) {
  const { as: Component = elementMap[variant], ...rest } = props as FlexibleProps;

  return (
    <Component
      className={typographyStyles({ variant, className })}
      {...rest}
    />
  );
}
