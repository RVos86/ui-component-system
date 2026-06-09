import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input, type InputProps } from '@/components/atoms/Input';
import { TEST_IDS } from '@/test/test-ids';

export type SearchBarProps = Omit<
  InputProps,
  'icon' | 'type' | 'onChange' | 'trailing'
> & {
  onSearch?: (value: string) => void;
};

export function SearchBar({
  onSearch,
  placeholder = 'Search tasks...',
  ...props
}: SearchBarProps) {
  const [value, setValue] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
    onSearch?.(e.target.value);
  }

  function handleClear() {
    setValue('');
    onSearch?.('');
  }

  return (
    <Input
      type="search"
      icon={<Search />}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="[&::-webkit-search-cancel-button]:hidden"
      trailing={
        value ? (
          <button
            data-testid={TEST_IDS.searchBar.clearButton}
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="flex items-center hover:text-gray-600">
            <X />
          </button>
        ) : null
      }
      {...props}
    />
  );
}
