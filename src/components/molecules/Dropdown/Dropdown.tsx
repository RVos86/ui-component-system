import { useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Input } from '@/components/atoms/Input';
import { useClickOutside } from '@/hooks/useClickOutside';
import { TEST_IDS } from '@/test/test-ids';

export type DropdownProps = {
  label?: string;
  placeholder?: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export function Dropdown({
  label,
  placeholder = 'Select an option...',
  options,
  value,
  onChange,
  disabled,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  function closeDropdown() {
    setIsOpen(false);
    setFocusedIndex(-1);
  }

  useClickOutside(containerRef, closeDropdown);

  function handleTriggerClick() {
    if (disabled) return;
    if (isOpen) {
      closeDropdown();
    } else {
      setIsOpen(true);
    }
  }

  function handleSelect(option: string) {
    onChange?.(option);
    closeDropdown();
  }

  function getOpenFocusIndex(fallback: number) {
    if (value === undefined) return fallback;
    const selectedIndex = options.indexOf(value);
    return selectedIndex === -1 ? fallback : selectedIndex;
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (disabled || options.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(getOpenFocusIndex(0));
        } else {
          setFocusedIndex((i) => (i + 1) % options.length);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(getOpenFocusIndex(options.length - 1));
        } else {
          setFocusedIndex((i) => (i <= 0 ? options.length - 1 : i - 1));
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(getOpenFocusIndex(0));
        } else if (focusedIndex >= 0) {
          handleSelect(options[focusedIndex]);
        } else {
          closeDropdown();
        }
        break;
      case 'Home':
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(options.length - 1);
        break;
      case 'Escape':
        closeDropdown();
        break;
    }
  }

  const activeDescendantId =
    focusedIndex >= 0 ? `${listboxId}-option-${focusedIndex}` : undefined;

  return (
    <div ref={containerRef} className="relative">
      <Input
        data-testid={TEST_IDS.dropdown.trigger}
        role="combobox"
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-activedescendant={activeDescendantId}
        label={label}
        placeholder={placeholder}
        value={value ?? ''}
        readOnly
        disabled={disabled}
        onClick={handleTriggerClick}
        onKeyDown={handleKeyDown}
        className="cursor-pointer"
        trailing={
          <span
            onClick={handleTriggerClick}
            className={disabled ? 'cursor-not-allowed' : 'cursor-pointer'}>
            <ChevronDown
              className={`size-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </span>
        }
      />
      {isOpen && (
        <ul
          id={listboxId}
          data-testid={TEST_IDS.dropdown.listbox}
          role="listbox"
          aria-label={label}
          className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          {options.map((option, index) => (
            <li
              key={`${option}-${index}`}
              id={`${listboxId}-option-${index}`}
              role="option"
              aria-selected={value === option}
              onClick={() => handleSelect(option)}
              className={`cursor-pointer px-3 py-2 text-sm ${
                index === focusedIndex
                  ? 'bg-gray-100'
                  : value === option
                    ? 'font-medium text-primary'
                    : 'text-gray-700 hover:bg-gray-50'
              }`}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
