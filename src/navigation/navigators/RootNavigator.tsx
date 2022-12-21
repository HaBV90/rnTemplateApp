import theme from '@app/theme';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import BottomTabNavigator from './BottomTabNavigator';

export type RootStackParamList = {
  BottomTab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'BottomTab'}
      screenOptions={{
        headerBackTitle: '',
        headerTintColor: theme.colors.base90,
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: theme.colors.white,
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
