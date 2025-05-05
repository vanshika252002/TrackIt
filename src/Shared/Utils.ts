import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay = 300) => {
  const [debounce, setDebounce] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(value);
    }, delay);
    return () => {
     
      clearTimeout(timeout);
    };
  }, [value]);

  return debounce;
};
