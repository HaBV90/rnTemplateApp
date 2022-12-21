import {useState} from 'react';

import {useAppStateChange} from './useAppStateChange';

export const useAppInBackground = (): boolean => {
  const [inBackground, setInBackground] = useState<boolean>(false);
  useAppStateChange({
    onBackground: () => setInBackground(true),
    onForeground: () => setInBackground(false),
  });
  return inBackground;
};
