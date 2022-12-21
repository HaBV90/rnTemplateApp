import theme from '@app/theme';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

interface Props extends ViewProps {
  color?: string;
  text?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Divider: React.FC<Props> = props => {
  const {color = theme.colors.base60, text, style, textStyle} = props;
  if (text) {
    return (
      <View style={[styles.textDividerWrapper, style]}>
        <View style={[styles.dividerBesideText, {backgroundColor: color}]} />
        <Text style={[styles.text, textStyle]}>{text}</Text>
        <View style={[styles.dividerBesideText, {backgroundColor: color}]} />
      </View>
    );
  }

  return <View style={[styles.divider, style, {backgroundColor: color}]} />;
};

const styles = StyleSheet.create({
  textDividerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginHorizontal: theme.spacing(3),
    ...theme.typography({
      fontSize: 16,
      lineHeight: 1.25,
      color: theme.colors.base90,
    }),
  },
  dividerBesideText: {
    height: StyleSheet.hairlineWidth,
    flex: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
});

export default Divider;
