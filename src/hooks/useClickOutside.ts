import { useEffect, useRef, type RefObject } from 'react';

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutsideClick: () => void
) {
  const handlerRef = useRef(onOutsideClick);

  useEffect(() => {
    handlerRef.current = onOutsideClick;
  }, [onOutsideClick]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const element = ref.current;

      if (element && !element.contains(event.target as Node)) {
        handlerRef.current();
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [ref]);
}
