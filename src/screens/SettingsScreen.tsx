import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import themes from '../theme';

const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Settings screen here</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  text: {
    color: themes.colors.base90,
    textAlign: 'center',
  },
});

export default SettingsScreen;
