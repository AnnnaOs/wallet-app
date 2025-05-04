import { useEffect } from 'react';

export const useBodyScrollLock = isLocked => {
  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;

    if (isLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLocked]);
};
