import theme from '@app/theme';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';

import AppText from './AppText';
export interface LoadingProps {
  isVisible: boolean;
  backdropOpacity?: number | undefined;
  color?: string;
  size?: 'large' | 'small';
  animationOutTiming?: number | undefined;
  title?: string;
}
const LoadingModal = (props: LoadingProps) => {
  const {isVisible, backdropOpacity, animationOutTiming, title} = props;
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={backdropOpacity ?? 0.2}
      animationOutTiming={animationOutTiming ?? 300}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      style={styles.container}>
      <View style={styles.view} testID={'loading-modal-container'}>
        <ActivityIndicator color={theme.colors.red100} size={30} />
        {title && (
          <AppText style={styles.textTitle} testID={'loading-modal-text'}>
            {title}
          </AppText>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    color: theme.colors.base60,
    fontWeight: '400',
  },
  view: {
    // height: 96,
    // width: 96,
    // backgroundColor: theme.colors.white,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default LoadingModal;
