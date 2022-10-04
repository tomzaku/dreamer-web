import { useState, useEffect } from 'react';

export function useLongPress(callback = () => {}, ms = 300) {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    if (startLongPress) {
      timerId = setTimeout(callback, ms);
    } else {
      timerId && clearTimeout(timerId);
    }

    return () => {
      timerId && clearTimeout(timerId);
    };
  }, [callback, ms, startLongPress]);

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
  };
}
