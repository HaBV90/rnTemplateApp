import theme from '@app/theme';
import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

import Icon from './Icon';

export interface Props extends TouchableOpacityProps {
  text?: string;
  icon?: string;
  mode?: 'contained' | 'outlined' | 'text' | 'blur';
  color?: string;
  iconColor?: string;
  size?: 'normal' | 'large';
  disabled?: boolean;
  loading?: boolean;
  numberOfLines?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  underline?: boolean;
  borderOutlinedColor?: string;
  iconOnly?: boolean;
}

const AppButton: React.FC<Props> = props => {
  const {
    text,
    icon,
    mode = 'contained',
    color = theme.colors.red100,
    size = 'normal',
    disabled = false,
    loading = false,
    numberOfLines = 1,
    style,
    textStyle,
    onPress,
    underline,
    borderOutlinedColor,
    iconOnly = false,
    iconColor,
  } = props;
  let backgroundColor = color;
  let foregroundColor = color;
  if (mode) {
    if (mode === 'contained') {
      backgroundColor = color;
      foregroundColor = theme.colors.white;
    } else if (mode === 'blur') {
      foregroundColor = disabled ? theme.colors.base50 : theme.colors.red100;
      backgroundColor = theme.colors.base30;
    } else {
      foregroundColor = color;
      backgroundColor = 'transparent';
    }
  }
  const borderWidth = 1;
  const borderColor =
    mode === 'outlined'
      ? borderOutlinedColor
        ? borderOutlinedColor
        : theme.colors.base40
      : 'transparent';

  const paddingVertical = theme.spacing(size === 'normal' ? 1.5 : 2);
  const textDecorationLine =
    mode === 'text' && underline ? 'underline' : undefined;
  const opacity = disabled || loading ? 1.0 : 1.0;

  const touchableStyle: StyleProp<ViewStyle> = {
    backgroundColor,
    paddingVertical,
    borderWidth,
    borderColor,
    opacity: opacity,
  };

  return (
    <TouchableOpacity
      {...props}
      hitSlop={styles.hitslop}
      activeOpacity={0.5}
      style={[styles.touchable, touchableStyle, style]}
      disabled={disabled || loading}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator color={foregroundColor} />
      ) : iconOnly ? (
        <>{icon && <Icon name={icon} color={iconColor ?? foregroundColor} />}</>
      ) : (
        <>
          {icon && (
            <View style={styles.iconWrapper}>
              <Icon name={icon} color={iconColor ?? foregroundColor} />
            </View>
          )}
          <Text
            numberOfLines={numberOfLines}
            style={[
              styles.text,
              {
                color: foregroundColor,
                textDecorationLine,
              },
              textStyle,
            ]}>
            {text}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 48,
    borderRadius: 48,
  },
  iconWrapper: {
    marginLeft: theme.spacing(2),
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textAlign: 'center',
    paddingHorizontal: theme.spacing(2),
  },
  hitslop: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default AppButton;
