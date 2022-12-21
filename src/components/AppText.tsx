import React, {ReactNode} from 'react';
import {Text, TextProps, TextStyle} from 'react-native';
interface AppTextProps extends TextProps {
  children?: ReactNode | string;
  style?: TextStyle;
}
const AppText = (props: AppTextProps) => {
  if (!props.children) {
    return null;
  }
  return (
    <Text
      style={[props.style]}
      numberOfLines={1}
      allowFontScaling={false}
      {...props}>
      {props.children}
    </Text>
  );
};

export default AppText;
