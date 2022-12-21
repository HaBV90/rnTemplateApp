import {Platform} from 'react-native';

export default {
  normal: 'normal' as 'normal',
  bold: 'bold' as 'bold',
  extraBold: Platform.select({
    ios: '900' as '900',
    android: 'bold' as 'bold',
  }),
};
