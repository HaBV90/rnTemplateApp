import {useEffect, useRef} from 'react';

export const useTimeout = () => {
  const timerRef = useRef<number>();
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  return (handler: () => void, timeout: number) => {
    timerRef.current = setTimeout(handler, timeout) as any;
  };
};
