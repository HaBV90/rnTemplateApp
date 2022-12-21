import AppStatusBar from '@app/components/AppStatusBar';
import LoadingModal from '@app/components/LoadingModal';
import theme from '@app/theme';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import useHomeScreenModel from './useHomeScreenModel';

const HomeScreen = () => {
  const {isLoading} = useHomeScreenModel();

  return (
    <View style={styles.container}>
      <AppStatusBar />
      <LoadingModal isVisible={isLoading} />
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  text: {
    color: theme.colors.base90,
    textAlign: 'center',
  },
});

export default HomeScreen;
