import theme from '@app/theme';
import React from 'react';
import {ColorValue, StyleProp, View, ViewProps, ViewStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';

interface Props extends ViewProps {
  size?: number;
  color?: ColorValue;
  style?: StyleProp<ViewStyle>;
  icon: React.FC<SvgProps>;
}

const AppIcon: React.FC<Props> = props => {
  const {color = theme.colors.base90, style, icon, size} = props;
  const viewStyle: StyleProp<ViewStyle> = {
    width: size ?? 24,
    height: size ?? 24,
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <View style={[viewStyle, style]} testID={'common-icon'}>
      {icon({fill: color})}
    </View>
  );
};

export default AppIcon;
