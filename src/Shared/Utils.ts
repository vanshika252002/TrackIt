import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay = 300) => {
  const [debounce, setDebounce] = useState<T>(value);
  // console.log('debouncing ');
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(value);
    }, delay);
    return () => {
      // console.log('working fine debouncing');
      clearTimeout(timeout);
    };
  }, [value]);

  return debounce;
};
