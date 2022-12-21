import {Platform, StatusBar} from 'react-native';

import colors from './colors';

export default {
  header: {
    ...Platform.select({
      android: {
        height: 56 + StatusBar.currentHeight!,
        paddingTop: StatusBar.currentHeight,
      },
    }),
  },
  outlinedFormField: {
    borderWidth: 2,
    borderColor: colors.base70,
    borderRadius: 8,
  },
};
