import {NavigationState, PartialState} from '@react-navigation/native';

const getActiveRouteName = (
  state: NavigationState | PartialState<NavigationState>,
): string | null => {
  if (state.index === undefined) {
    return null;
  }
  const route = state.routes[state.index];
  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }
  return route.name;
};

export default getActiveRouteName;
