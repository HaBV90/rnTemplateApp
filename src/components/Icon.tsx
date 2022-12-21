import fontelloConfig from '@app/assets/fonts/config.json';
import theme from '@app/theme';
import React from 'react';
import {ColorValue} from 'react-native';
import {TextStyle, ViewStyle} from 'react-native';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const AppIcon = createIconSetFromFontello(fontelloConfig);

const component = (prefix: string) => {
  switch (prefix) {
    case 'md':
      return MaterialIcon;
    case 'app':
      return AppIcon;
    default:
      throw new Error('No icon set');
  }
};

interface Props {
  name: string;
  size?: number;
  color?: ColorValue;
  style?: ViewStyle | TextStyle;
  testID?: string;
}

const Icon: React.FC<Props> = ({name, size, color, style, testID}) => {
  const match = name.match(/^(md|app)-(.*)$/)!;
  const Component = component(match[1]);
  return (
    <Component
      testID={testID}
      name={match[2]}
      size={size || 24}
      color={color || theme.colors.base90}
      style={style}
    />
  );
};

export default Icon;
