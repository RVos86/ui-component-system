import { useId } from 'react';
import { Check } from 'lucide-react';

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string;
};

export function Checkbox({ label, disabled, ...props }: CheckboxProps) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={`inline-flex items-center gap-2 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
      <span className="relative inline-flex size-4 shrink-0">
        <input
          id={id}
          type="checkbox"
          disabled={disabled}
          className="peer absolute inset-0 size-full cursor-[inherit] opacity-0"
          {...props}
        />
        <span
          data-testid="checkbox-box"
          className="size-4 rounded-sm border border-gray-300 bg-white transition-colors peer-checked:border-success peer-checked:bg-success peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background"
        />
        <Check className="pointer-events-none absolute inset-0 m-auto size-3 text-transparent transition-colors peer-checked:text-white" />
      </span>
      {label && (
        <span className="select-none text-sm font-medium text-gray-700">{label}</span>
      )}
    </label>
  );
}
