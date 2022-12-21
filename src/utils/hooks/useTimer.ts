import {useEffect, useRef, useState} from 'react';

export const useTimer = (interval: number = 1000) => {
  const [time, setTime] = useState(new Date());
  const timerRef = useRef<number>();
  useEffect(() => {
    timerRef.current = setInterval(() => setTime(new Date()), interval) as any;
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [interval]);
  return time;
};
