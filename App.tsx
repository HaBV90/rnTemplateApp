import {i18n, I18nextProvider} from '@app/locales';
import RootNavigator, {
  RootStackParamList,
} from '@app/navigation/navigators/RootNavigator';
import getActiveRouteName from '@app/navigation/utils/getActiveRouteName';
import {store} from '@app/store';
import {useTimeout} from '@app/utils/hooks';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import React, {createRef} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';

const navigationRef = createRef<NavigationContainerRef<RootStackParamList>>();

const App = () => {
  const timeout = useTimeout();
  React.useEffect(() => {
    timeout(() => {
      SplashScreen.hide();
    }, 200);
  });

  const routeNameRef = React.useRef<string | null>(null);
  React.useEffect(() => {
    const state = navigationRef?.current?.getRootState();
    if (!state) {
      return;
    }
    routeNameRef.current = getActiveRouteName(state);
  }, []);

  if (navigationRef === undefined) {
    return null;
  }

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <NavigationContainer
          onStateChange={state => {
            if (!state) {
              return;
            }
            const currentRouteName = getActiveRouteName(state);
            if (!currentRouteName) {
              return;
            }
            routeNameRef.current = currentRouteName;
          }}
          // fallback={<Loading />}
          ref={navigationRef}>
          <RootNavigator />
        </NavigationContainer>
      </I18nextProvider>
    </Provider>
  );
};

export default App;
