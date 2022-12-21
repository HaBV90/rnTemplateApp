import {Platform} from 'react-native';

import colors from './colors';

export default (elevation: number) => {
  let height: number;
  let radius: number;
  switch (elevation) {
    case 1:
      height = 0.5;
      radius = 0.75;
      break;
    case 2:
      height = 0.75;
      radius = 1.5;
      break;
    default:
      height = elevation - 1;
      radius = elevation;
  }
  return Platform.select({
    ios: {
      shadowColor: colors.shadow,
      shadowOffset: {
        width: 0,
        height,
      },
      shadowOpacity: 0.24,
      shadowRadius: radius,
    },
    android: {
      elevation,
    },
  });
};
