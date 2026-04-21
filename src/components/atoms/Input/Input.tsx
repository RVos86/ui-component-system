import { useId } from 'react';
import { cva } from 'class-variance-authority';

const inputStyles = cva(
  'w-full rounded-md border bg-white px-3 py-2 font-sans text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      hasError: {
        true: 'border-danger focus:ring-danger',
        false: 'border-gray-300 focus:ring-primary',
      },
      hasIcon: {
        true: 'pl-9',
        false: null,
      },
    },
    defaultVariants: {
      hasError: false,
      hasIcon: false,
    },
  }
);

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
};

export function Input({
  label,
  error,
  icon,
  className,
  ...props
}: InputProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span data-testid="input-icon" className="pointer-events-none absolute inset-y-0 left-2.5 flex items-center text-gray-400 [&>svg]:size-4">
            {icon}
          </span>
        )}
        <input
          id={id}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? true : undefined}
          aria-required={props.required ? true : undefined}
          className={inputStyles({
            hasError: !!error,
            hasIcon: !!icon,
            className,
          })}
          {...props}
        />
      </div>
      {error && (
        <span id={errorId} className="text-sm text-danger">
          {error}
        </span>
      )}
    </div>
  );
}
