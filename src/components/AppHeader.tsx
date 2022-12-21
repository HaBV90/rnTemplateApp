import theme from '@app/theme';
import {useNavigation} from '@react-navigation/native';
import React, {FC, memo} from 'react';
import {
  ColorValue,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import AppStatusBar from './AppStatusBar';
import Icon from './Icon';

export interface HeaderBaseProps extends ViewProps {
  onPressLeft?: () => void;
  title?: string;
  leftIcon?: string;
  leftTitle?: string;
  fontSizeTitle?: number;
  leftIconColor?: ColorValue;
  rightTitle?: string;
  rightIcon?: string;
  onPressRight?: () => void;
  isNotShowBack?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  txtRightStyle?: StyleProp<TextStyle>;
  rightIconColor?: ColorValue;
  colorTitle?: string;
  statusBar?: boolean;
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content' | undefined | null;
}
const AppHeader: FC<HeaderBaseProps> = ({
  onPressLeft,
  title,
  leftIcon,
  leftTitle,
  fontSizeTitle,
  leftIconColor,
  rightTitle,
  rightIcon,
  onPressRight,
  isNotShowBack,
  containerStyle,
  txtRightStyle,
  rightIconColor,
  colorTitle,
  backgroundColor,
  statusBar = true,
  barStyle,
}) => {
  const navigation = useNavigation();

  const onPress = () => {
    if (onPressLeft) {
      onPressLeft();
    } else {
      navigation.goBack();
    }
  };

  // const tintColor = {
  //   tintColor: tintColorIcon ? tintColorIcon : theme.colors.base90,
  // };
  const titleTxtColor = {
    color: colorTitle ? colorTitle : theme.colors.black,
    fontSize: fontSizeTitle || 16,
  };

  const renderLeftButton = () => {
    return (
      <>
        {isNotShowBack ? (
          leftTitle ? (
            <TouchableOpacity
              style={styles.buttonLeft}
              onPress={onPressLeft}
              hitSlop={styles.hitslop}>
              <Text
                numberOfLines={1}
                style={[styles.rightText, txtRightStyle]}
                testID={`common-header-left-title-${leftTitle}`}>
                {leftTitle}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.viewEmpty} />
          )
        ) : (
          <TouchableOpacity
            onPress={onPress}
            style={[styles.buttonLeft]}
            testID={'common-header-left-icon-button'}>
            <Icon name={leftIcon ?? 'app-chevron-left'} color={leftIconColor} />
          </TouchableOpacity>
        )}
      </>
    );
  };

  const renderTitle = () => {
    return (
      <>
        {title && (
          <View style={styles.titleView}>
            <Text
              style={[styles.titleStyle, titleTxtColor]}
              numberOfLines={1}
              testID={'common-header-title'}>
              {title}
            </Text>
          </View>
        )}
      </>
    );
  };

  const renderRightButton = () => {
    return (
      <>
        {rightTitle ? (
          <TouchableOpacity style={styles.buttonRight} onPress={onPressRight}>
            <Text
              numberOfLines={1}
              style={[styles.rightText, txtRightStyle]}
              testID={`common-header-right-title-${rightTitle}`}>
              {rightTitle}
            </Text>
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity
            onPress={onPressRight}
            style={styles.buttonRight}
            testID={'common-header-right-icon-button'}>
            <Icon name={rightIcon ?? 'app-settings'} color={rightIconColor} />
          </TouchableOpacity>
        ) : (
          <View style={styles.viewEmpty} />
        )}
      </>
    );
  };

  return (
    <>
      {statusBar && (
        <AppStatusBar
          backgroundColor={backgroundColor}
          barStyle={barStyle}
        />
      )}
      <View style={[styles.container, containerStyle]}>
        {renderLeftButton()}
        {renderTitle()}
        {renderRightButton()}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.transparent,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Platform.OS === 'android' ? 8 : 0,
  },
  buttonLeft: {
    paddingLeft: 16,
    paddingVertical: 8,
    width: '20%',
  },
  buttonRight: {
    alignItems: 'flex-end',
    paddingRight: 16,
    paddingVertical: 8,
    width: '20%',
  },
  rightText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: '400',
  },
  titleStyle: {
    color: theme.colors.black,
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 8,
    textAlign: 'center',
  },
  titleView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '60%',
  },
  viewEmpty: {
    width: '20%',
    backgroundColor: theme.colors.transparent,
  },
  hitslop: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default memo(AppHeader);
