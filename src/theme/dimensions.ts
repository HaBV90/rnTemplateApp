import {Dimensions, Platform} from 'react-native';

// https://github.com/react-navigation/react-navigation/blob/main/packages/stack/src/views/Header/HeaderSegment.tsx#L52
const getDefaultHeaderHeight = () => {
  if (Platform.OS === 'ios') {
    return 44;
  } else if (Platform.OS === 'android') {
    return 56;
  } else {
    return 64;
  }
};
const {width: widthScreen, height: heightScreen} = Dimensions.get('window');
export default {
  screenSideEdge: 24,
  fabIconScale: 0.73,
  fabLarge: 48,
  fabSmall: 44,
  rounded: 8,
  defaultHeaderHeight: getDefaultHeaderHeight(),
  widthScreen,
  heightScreen,
};
