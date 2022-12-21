declare global {
  declare module '*.svg' {
    import React from 'react';
    import {SvgProps} from 'react-native-svg';
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const content: React.FC<SvgProps>;
    export default content;
  }

  namespace ReactNavigation {
    interface RootParamList extends MainStackParamList {}
  }
}
