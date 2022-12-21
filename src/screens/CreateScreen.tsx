import AppStatusBar from '@app/components/AppStatusBar';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import themes from '../theme';

const CreateScreen = () => {
  return (
    <View style={styles.container}>
      <AppStatusBar />
      <Text style={styles.text}>Create screen here</Text>
    </View>
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

export default CreateScreen;
