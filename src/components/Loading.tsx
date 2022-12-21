import theme from '@app/theme';
import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  text?: string;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
}

const Loading: React.FC<Props> = ({
  text,
  style,
  backgroundColor = theme.colors.white,
}) => {
  return (
    <View style={[styles.wrapper, {backgroundColor}, style]}>
      <ActivityIndicator color={theme.colors.red100} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...theme.typography({fontSize: 14, fontWeight: 'bold', lineHeight: 1.25}),
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
});

export default Loading;
