import AppStatusBar from '@app/components/AppStatusBar';
import theme from '@app/theme';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <AppStatusBar />
      <Text style={styles.text}>Notifications screen here</Text>
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
export default NotificationsScreen;
