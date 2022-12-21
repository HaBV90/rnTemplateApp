import React, {FC, memo} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';

interface AppStatusBarProps {
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content' | undefined | null;
  style?: StyleProp<ViewStyle>;
}
const statusBarHeight =
  Platform.OS === 'ios'
    ? isIphoneX()
      ? getStatusBarHeight() + 16
      : getStatusBarHeight()
    : StatusBar.currentHeight;

const AppStatusBar: FC<AppStatusBarProps> = ({
  backgroundColor,
  barStyle,
  style,
  ...props
}) => {
  return (
    <View style={[styles.statusBar, {backgroundColor}, style]}>
      <SafeAreaView>
        <StatusBar
          translucent
          barStyle={barStyle}
          backgroundColor={backgroundColor}
          {...props}
        />
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  statusBar: {
    height: statusBarHeight,
  },
});
export default memo(AppStatusBar);
