import { useEffect, useId, useRef, useState } from 'react';

import { CalendarDays } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { Input } from '@/components/atoms/Input';
import { useClickOutside } from '@/hooks/useClickOutside';
import { TEST_IDS } from '@/test/test-ids';

const dayPickerClassNames = {
  root: 'font-sans text-sm',
  month_caption: 'flex items-center justify-between px-1 mb-3',
  caption_label: 'font-medium text-gray-900',
  nav: 'flex items-center gap-1',
  button_previous: 'rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900',
  button_next: 'rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-900',
  weeks: 'mt-1',
  weekdays: 'flex',
  weekday: 'w-9 text-center text-xs font-medium text-gray-500 py-1',
  week_number_header: 'w-9 text-center text-xs font-medium text-gray-500 py-1',
  week_number:
    'w-9 h-9 text-center text-xs text-gray-500 flex items-center justify-center',
  week: 'flex mt-1',
  day: 'w-9 h-9',
  day_button:
    'w-full h-full rounded flex items-center justify-center text-gray-700 hover:bg-gray-100',
  selected: '[&>button]:bg-primary [&>button]:text-white [&>button]:hover:bg-primary',
  today: '[&>button]:font-bold [&>button]:text-primary',
  outside: '[&>button]:text-gray-300',
  disabled: '[&>button]:opacity-40 [&>button]:cursor-not-allowed',
};

export type DatePickerProps = {
  label?: string;
  placeholder?: string;
  selected?: Date;
  onDateChange?: (date: Date) => void;
  disabled?: boolean;
};

export function DatePicker({
  label,
  placeholder = 'Select a date...',
  selected,
  onDateChange,
  disabled,
}: DatePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCalendarOpen) calendarRef.current?.focus();
  }, [isCalendarOpen]);

  useClickOutside(containerRef, () => setIsCalendarOpen(false));

  const formattedDate = selected
    ? selected.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '';

  function handleSelect(date: Date | undefined) {
    if (date) {
      onDateChange?.(date);
      setIsCalendarOpen(false);
    }
  }

  function handleTriggerKeyDown(e: React.KeyboardEvent) {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setIsCalendarOpen((o) => !o);
        break;
      case 'Escape':
        setIsCalendarOpen(false);
        break;
    }
  }

  function handleCalendarKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setIsCalendarOpen(false);
      containerRef.current?.querySelector('input')?.focus();
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <Input
        data-testid={TEST_IDS.datePicker.input}
        role="combobox"
        aria-controls={calendarId}
        aria-expanded={isCalendarOpen}
        aria-haspopup="dialog"
        label={label}
        icon={<CalendarDays />}
        placeholder={placeholder}
        value={formattedDate}
        readOnly
        disabled={disabled}
        onClick={() => !disabled && setIsCalendarOpen((o) => !o)}
        onKeyDown={handleTriggerKeyDown}
        className="cursor-pointer"
      />
      {isCalendarOpen && (
        <div
          ref={calendarRef}
          id={calendarId}
          data-testid={TEST_IDS.datePicker.calendar}
          role="dialog"
          aria-label="Calendar"
          aria-modal="true"
          tabIndex={-1}
          onKeyDown={handleCalendarKeyDown}
          className="absolute z-10 mt-1 rounded-md border border-gray-200 bg-white p-3 shadow-lg outline-none">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            showWeekNumber
            classNames={dayPickerClassNames}
          />
        </div>
      )}
    </div>
  );
}
