import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useClickOutside } from './useClickOutside';

function setup(onOutsideClick: () => void) {
  const inside = document.createElement('div');
  const outside = document.createElement('div');
  document.body.append(inside, outside);

  const { unmount } = renderHook(() => {
    const ref = useRef<HTMLDivElement>(inside);
    useClickOutside(ref, onOutsideClick);
  });

  return { inside, outside, unmount };
}

describe('useClickOutside', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('calls the handler when clicking outside the ref element', () => {
    const handler = vi.fn();
    const { outside } = setup(handler);

    outside.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('does not call the handler when clicking inside the ref element', () => {
    const handler = vi.fn();
    const { inside } = setup(handler);

    inside.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));

    expect(handler).not.toHaveBeenCalled();
  });

  it('removes the listener on unmount', () => {
    const handler = vi.fn();
    const { outside, unmount } = setup(handler);

    unmount();
    outside.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));

    expect(handler).not.toHaveBeenCalled();
  });
});
