import {useCallback, useEffect, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

interface AppStateChangeEvent {
  onForeground?: () => void;
  onBackground?: () => void;
}

export const useAppStateChange = (events: AppStateChangeEvent) => {
  const {onForeground, onBackground} = events;
  const [appState, setAppState] = useState<AppStateStatus>(
    AppState.currentState,
  );

  const handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        if (onForeground) {
          onForeground();
        }
      } else if (
        appState === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        if (onBackground) {
          onBackground();
        }
      }
      setAppState(nextAppState);
    },
    [appState, onBackground, onForeground],
  );

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, [handleAppStateChange]);
};
