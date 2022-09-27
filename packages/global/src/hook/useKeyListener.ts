import React from 'react';

export const useKeyListener = (handleKeyDown: (e: KeyboardEvent) => void) => {
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
};
